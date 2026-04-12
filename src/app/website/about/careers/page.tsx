"use client";

import { useState } from "react";
import {
  Zap,
  Lightbulb,
  TrendingUp,
  MapPin,
  Clock,
  Building2,
  Search,
  ChevronRight,
  Heart,
  GraduationCap,
  Globe,
  Users,
  Coffee,
  Award,
} from "lucide-react";

type Department = "All" | "Engineering" | "Design" | "Data" | "Product" | "Security";

const DEPARTMENTS: Department[] = [
  "All",
  "Engineering",
  "Design",
  "Data",
  "Product",
  "Security",
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Impact",
    description:
      "Work on projects that directly affect 1.6 million households. Your code powers the nation's grid and shapes Singapore's energy future.",
    color: "from-sp-teal to-emerald-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Access cutting-edge technology including AI/ML, IoT, blockchain, and smart grid systems. We invest heavily in R&D and emerging tech.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description:
      "Structured career development, international secondment opportunities, and generous sponsorship for certifications and advanced degrees.",
    color: "from-blue-500 to-indigo-600",
  },
] as const;

const JOBS = [
  {
    id: 1,
    title: "Software Engineer",
    department: "Engineering" as Department,
    team: "Digital Platform",
    location: "Singapore",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "Build and maintain our customer-facing digital platforms using React, Next.js, and cloud-native architectures.",
  },
  {
    id: 2,
    title: "Senior UX Designer",
    department: "Design" as Department,
    team: "Consumer Experience",
    location: "Singapore",
    type: "Full-time",
    posted: "5 days ago",
    description:
      "Lead the design of utility management experiences for millions of users. Research, prototype, and ship design systems.",
  },
  {
    id: 3,
    title: "Data Scientist",
    department: "Data" as Department,
    team: "Energy Analytics",
    location: "Singapore",
    type: "Full-time",
    posted: "1 week ago",
    description:
      "Develop predictive models for energy demand forecasting, anomaly detection, and smart grid optimisation using ML/AI.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering" as Department,
    team: "Platform Infrastructure",
    location: "Singapore",
    type: "Full-time",
    posted: "3 days ago",
    description:
      "Design and manage CI/CD pipelines, Kubernetes clusters, and AWS infrastructure for mission-critical energy systems.",
  },
  {
    id: 5,
    title: "Product Manager",
    department: "Product" as Department,
    team: "Consumer Products",
    location: "Singapore",
    type: "Full-time",
    posted: "1 week ago",
    description:
      "Own the product roadmap for the SP App serving 1.6M users. Drive strategy, prioritisation, and go-to-market execution.",
  },
  {
    id: 6,
    title: "Cybersecurity Analyst",
    department: "Security" as Department,
    team: "Critical Infrastructure Security",
    location: "Singapore",
    type: "Full-time",
    posted: "4 days ago",
    description:
      "Protect Singapore's critical energy infrastructure. Conduct threat analysis, incident response, and security assessments.",
  },
] as const;

const CULTURE_CARDS = [
  { title: "Hackathon Culture", desc: "Quarterly innovation sprints with real project outcomes", icon: Lightbulb },
  { title: "Flexible Work", desc: "Hybrid work model with modern collaborative spaces", icon: Coffee },
  { title: "Learning & Development", desc: "Annual $5,000 learning budget per employee", icon: GraduationCap },
  { title: "Global Exposure", desc: "Opportunities across 5 countries in Asia Pacific", icon: Globe },
  { title: "Community Impact", desc: "Volunteer days and sustainability ambassador programme", icon: Heart },
  { title: "Recognition", desc: "Peer recognition programme and annual awards ceremony", icon: Award },
] as const;

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState<Department>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = JOBS.filter((job) => {
    const matchesDept = activeDept === "All" || job.department === activeDept;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div
      className="!max-w-none min-h-screen bg-gray-950 text-gray-100"
      style={{ maxWidth: "100%" }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0c2340 0%, #042f2e 30%, #064e3b 60%, #030712 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 left-1/3 w-[500px] h-[500px] rounded-full floating-orb"
            style={{
              background:
                "radial-gradient(circle, rgba(0,191,165,0.4) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Users className="w-4 h-4 text-sp-teal" />
            <span className="text-sp-teal text-sm font-medium">Careers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up delay-100">
            Shape the Future
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sp-teal to-blue-400">
              of Energy
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Join 4,000+ professionals powering Singapore&apos;s energy transformation.
            Build technology that impacts millions of lives every day.
          </p>
          <a
            href="#positions"
            className="inline-flex items-center gap-2 bg-sp-teal hover:bg-sp-teal-dark text-white font-semibold px-8 py-4 rounded-full mt-8 transition-colors spring-button animate-fade-in-up delay-300"
          >
            View Open Positions
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Why SP Group */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Why SP Group
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          More than a career — a chance to power the future.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="glass rounded-2xl p-8 hover-lift group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section
        id="positions"
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Open Positions
          </h2>
          <p className="text-gray-400 text-center mb-10">
            {JOBS.length} roles available across our digital and technology teams.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-sp-teal/50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors spring-button ${
                    activeDept === dept
                      ? "bg-sp-teal text-white"
                      : "glass text-gray-400 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  No positions match your search. Try adjusting your filters.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="glass rounded-2xl p-6 hover-lift group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-sp-teal transition-colors">
                          {job.title}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                          {job.posted}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          {job.team}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button className="bg-sp-teal hover:bg-sp-teal-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors spring-button flex items-center gap-2 self-start md:self-center">
                      Apply
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Life at SP Group
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          A vibrant, inclusive workplace where innovation meets purpose.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {CULTURE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="glass rounded-2xl p-6 hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-sp-teal/20 transition-colors">
                  <Icon className="w-6 h-6 text-sp-teal" />
                </div>
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Employee Testimonial */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass rounded-3xl p-12 max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sp-teal to-emerald-600 flex items-center justify-center mx-auto mb-6">
              <span className="text-xl font-bold text-white">JT</span>
            </div>
            <blockquote className="text-xl text-gray-300 italic leading-relaxed mb-6">
              &ldquo;At SP Group, I get to work on systems that power an entire
              nation. The scale of impact and the pace of innovation here is
              unmatched in Southeast Asia.&rdquo;
            </blockquote>
            <p className="text-white font-semibold">Jamie Tan</p>
            <p className="text-sp-teal text-sm">
              Senior Software Engineer, Digital Platform
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="glass rounded-3xl p-12 glow-teal">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Explore our open roles and take the first step towards an
            extraordinary career in energy.
          </p>
          <a
            href="#positions"
            className="inline-flex items-center gap-2 bg-sp-teal hover:bg-sp-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors spring-button"
          >
            Browse All Roles
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
