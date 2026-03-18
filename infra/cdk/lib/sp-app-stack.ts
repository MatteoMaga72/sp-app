import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class SpAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ========== VPC (Fully Isolated) ==========
    const vpc = new ec2.Vpc(this, 'SpAppVpc', {
      vpcName: 'sp-app-vpc',
      cidr: '10.99.0.0/16',
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        { name: 'Public', subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        { name: 'Private', subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, cidrMask: 24 },
      ],
    });

    // ========== ECR Repository ==========
    const ecrRepo = new ecr.Repository(this, 'SpAppEcr', {
      repositoryName: 'sp-app',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
      lifecycleRules: [{ maxImageCount: 10, description: 'Keep last 10 images' }],
    });

    // ========== RDS PostgreSQL ==========
    const dbCredentials = new secretsmanager.Secret(this, 'SpAppDbCredentials', {
      secretName: 'sp-app/db-credentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'spapp' }),
        generateStringKey: 'password',
        excludePunctuation: true,
        passwordLength: 32,
      },
    });

    const dbSecurityGroup = new ec2.SecurityGroup(this, 'SpAppDbSg', {
      vpc,
      securityGroupName: 'sp-app-db-sg',
      description: 'Security group for SP App RDS',
      allowAllOutbound: false,
    });

    const database = new rds.DatabaseInstance(this, 'SpAppDb', {
      instanceIdentifier: 'sp-app-db',
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_16 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [dbSecurityGroup],
      credentials: rds.Credentials.fromSecret(dbCredentials),
      databaseName: 'spapp',
      allocatedStorage: 20,
      maxAllocatedStorage: 50,
      multiAz: false,
      backupRetention: cdk.Duration.days(7),
      deletionProtection: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ========== ECS Cluster ==========
    const cluster = new ecs.Cluster(this, 'SpAppCluster', {
      clusterName: 'sp-app-cluster',
      vpc,
      containerInsights: true,
    });

    // ========== ECS Task Definition ==========
    const taskDef = new ecs.FargateTaskDefinition(this, 'SpAppTaskDef', {
      family: 'sp-app-task',
      cpu: 512,
      memoryLimitMiB: 1024,
    });

    const logGroup = new logs.LogGroup(this, 'SpAppLogGroup', {
      logGroupName: '/sp-app/ecs',
      retention: logs.RetentionDays.TWO_WEEKS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Build DATABASE_URL from secret
    const dbUrl = `postgresql://${dbCredentials.secretValueFromJson('username').unsafeUnwrap()}:${dbCredentials.secretValueFromJson('password').unsafeUnwrap()}@${database.dbInstanceEndpointAddress}:${database.dbInstanceEndpointPort}/spapp`;

    const container = taskDef.addContainer('sp-app', {
      image: ecs.ContainerImage.fromEcrRepository(ecrRepo, 'latest'),
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'sp-app', logGroup }),
      environment: {
        NODE_ENV: 'production',
        NEXT_TELEMETRY_DISABLED: '1',
        PORT: '3000',
      },
      secrets: {
        DATABASE_URL: ecs.Secret.fromSecretsManager(dbCredentials, 'password'),
      },
      portMappings: [{ containerPort: 3000, protocol: ecs.Protocol.TCP }],
      healthCheck: {
        command: ['CMD-SHELL', 'wget -q -O /dev/null http://localhost:3000/api/health || exit 1'],
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(5),
        retries: 3,
        startPeriod: cdk.Duration.seconds(60),
      },
    });

    // ========== ALB ==========
    const albSecurityGroup = new ec2.SecurityGroup(this, 'SpAppAlbSg', {
      vpc,
      securityGroupName: 'sp-app-alb-sg',
      description: 'Security group for SP App ALB',
      allowAllOutbound: true,
    });
    albSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP');

    const ecsSecurityGroup = new ec2.SecurityGroup(this, 'SpAppEcsSg', {
      vpc,
      securityGroupName: 'sp-app-ecs-sg',
      description: 'Security group for SP App ECS',
      allowAllOutbound: true,
    });
    ecsSecurityGroup.addIngressRule(albSecurityGroup, ec2.Port.tcp(3000), 'Allow from ALB');
    dbSecurityGroup.addIngressRule(ecsSecurityGroup, ec2.Port.tcp(5432), 'Allow from ECS');

    // ========== Fargate Service with ALB ==========
    const fargateService = new ecs.FargateService(this, 'SpAppService', {
      serviceName: 'sp-app-service',
      cluster,
      taskDefinition: taskDef,
      desiredCount: 1,
      securityGroups: [ecsSecurityGroup],
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      assignPublicIp: false,
    });

    const alb = new elbv2.ApplicationLoadBalancer(this, 'SpAppAlb', {
      loadBalancerName: 'sp-app-alb',
      vpc,
      internetFacing: true,
      securityGroup: albSecurityGroup,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    const listener = alb.addListener('SpAppListener', {
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
    });

    listener.addTargets('SpAppTarget', {
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [fargateService],
      healthCheck: {
        path: '/api/health',
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(10),
        healthyThresholdCount: 2,
        unhealthyThresholdCount: 3,
      },
    });

    // ========== S3 Bucket (DAM) ==========
    const assetsBucket = new s3.Bucket(this, 'SpAppAssets', {
      bucketName: `sp-app-assets-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      }],
    });

    // ========== Outputs ==========
    new cdk.CfnOutput(this, 'AlbDnsName', {
      value: alb.loadBalancerDnsName,
      description: 'Application Load Balancer DNS name',
    });

    new cdk.CfnOutput(this, 'EcrRepositoryUri', {
      value: ecrRepo.repositoryUri,
      description: 'ECR Repository URI',
    });

    new cdk.CfnOutput(this, 'RdsEndpoint', {
      value: database.dbInstanceEndpointAddress,
      description: 'RDS endpoint address',
    });

    new cdk.CfnOutput(this, 'AssetsBucketName', {
      value: assetsBucket.bucketName,
      description: 'S3 Assets Bucket',
    });
  }
}
