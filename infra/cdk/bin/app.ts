#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SpAppStack } from '../lib/sp-app-stack';

const app = new cdk.App();
new SpAppStack(app, 'SpAppStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT || '020236748452',
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  tags: {
    Project: 'sp-app',
    Environment: 'production',
    ManagedBy: 'cdk',
  },
});
