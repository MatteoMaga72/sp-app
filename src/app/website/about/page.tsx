"use client";

import { useState } from "react";
import {
  Users,
  Globe,
  Calendar,
  Building2,
  Target,
  Eye,
  Award,
  ChevronRight,
  Zap,
  Leaf,
  Shield,
  Star,
} from "lucide-react";

const STATS = [
  { label: "Customers Served", value: "1.6M", icon: Users },
  { label: "Years of Excellence", value: "30+", icon: Calendar },
  { label: "Countries", value: "5", icon: Globe },
  { label: "Employees", value: "4,000+", icon: Building2 },
] as const;

const LEADERSHIP = [
  { name: "Stanley Huang", role: "Group CEO", initials: "SH" },
  { name: "Chen Wei Lin", role: "CFO", initials: "CW" },
  { name: "Ng Lay Khim", role: "COO, Distribution", initials: "NL" },
  { name: "Samuel Nair", role: "CTO", initials: "SN" },
  { name: "Lim Soo Ping", role: "Chief Sustainability Officer", initials: "LS" },
  { name: "Priya Sharma", role: "Chief Digital Officer", initials: "PS" },
] as const;

const MILESTONES = [
  {
    year: "1995",
    title: "Founding of SP Group",
    description:
      "Singapore Power was established as the holding company for the electricity and gas transmission and distribution businesses.",
  },
  {
    year: "2003",
    title: "Corporatisation",
    description:
      "SP Group corporatised its regulated network businesses, enhancing operational efficiency and service delivery across Singapore.",
  },
  {
    year: "2018",
    title: "International Expansion",
    description:
      "Expanded operations to Australia, Vietnam, Thailand, and the UK, bringing Singapore's energy expertise to global markets.",
  },
  {
    year: "2020",
    title: "Green Credits Launch",
    description:
      "Launched the SP Green Energy Credits programme, enabling consumers and businesses to offset their carbon footprint.",
  },
  {
    year: "2024",
    title: "Smart Meter Rollout Complete",
    description:
      "Completed nationwide deployment of 1.6 million Advanced Metering Infrastructure (AMI) smart meters across all households.",
  },
  {
    year: "2026",
    title: "Digital Transformation",
    description:
      "Fully digital utility platform with AI-powered energy management, predictive maintenance, and real-time consumption insights.",
  },
] as const;

const AWARDS = [
  { title: "Asia's Best Utility Company", org: "Asian Power Awards", year: "2025" },
  { title: "Smart Grid Excellence", org: "Enlit Asia", year: "2024" },
  { title: "Best Sustainability Initiative", org: "Singapore Business Awards", year: "2024" },
  { title: "Digital Transformation Leader", org: "IDC Future Enterprise", year: "2023" },
] as const;

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  return (
    <div
      className="!max-w-none min-h-screen bg-gray-950 text-gray-100"
      style={{ maxWidth: "100%" }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #042f2e 0%, #064e3b 30%, #0c2340 60%, #030712 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full floating-orb"
            style={{
              background:
                "radial-gradient(circle, rgba(0,191,165,0.4) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full floating-orb"
            style={{
              background:
                "radial-gradient(circle, rgba(0,150,136,0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
              animationDelay: "4s",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <p className="text-sp-teal font-semibold tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
            About SP Group
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up delay-100">
            Powering Singapore
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sp-teal to-emerald-400">
              Since 1995
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-200">
            As Singapore&apos;s national grid operator, we deliver reliable and
            sustainable energy to every home and business across the nation.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`glass rounded-2xl p-6 text-center hover-lift animate-fade-in-up delay-${(i + 1) * 100}`}
              >
                <Icon className="w-8 h-8 text-sp-teal mx-auto mb-3" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Who We Are
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              SP Group is a leading energy utilities group in the Asia Pacific,
              owning and operating electricity and gas transmission and
              distribution businesses in Singapore and Australia. We also
              provide district cooling and smart energy solutions.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              With a network spanning over 30,000 km of electricity cables and
              3,400 km of gas pipelines, we serve 1.6 million industrial,
              commercial, and residential customers in Singapore.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our commitment to innovation drives us to develop smart energy
              solutions that enhance efficiency, reliability, and
              sustainability for the communities we serve.
            </p>
          </div>
          <div className="glass rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <Zap className="w-16 h-16 text-sp-teal mx-auto mb-4" />
              <p className="text-gray-400 text-sm">
                SP Group Corporate Headquarters
              </p>
              <p className="text-gray-500 text-xs mt-1">
                2 Kallang Sector, Singapore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Our Purpose
        </h2>
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("mission")}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors spring-button ${
              activeTab === "mission"
                ? "bg-sp-teal text-white"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Our Mission
          </button>
          <button
            onClick={() => setActiveTab("vision")}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors spring-button ${
              activeTab === "vision"
                ? "bg-sp-teal text-white"
                : "glass text-gray-400 hover:text-white"
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Our Vision
          </button>
        </div>
        <div className="glass rounded-3xl p-10 max-w-3xl mx-auto text-center animate-fade-in-scale">
          {activeTab === "mission" ? (
            <>
              <Target className="w-12 h-12 text-sp-teal mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Empowering a Sustainable Future
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                To be a world-class energy utilities group, delivering reliable,
                affordable, and sustainable energy solutions while driving
                innovation and digital transformation for the benefit of our
                customers and the communities we serve.
              </p>
            </>
          ) : (
            <>
              <Eye className="w-12 h-12 text-sp-teal mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Leading the Energy Transition
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                To lead the energy transition in Asia Pacific by harnessing
                technology and innovation, enabling a low-carbon, smart energy
                future that powers economic growth and enhances the quality of
                life for all.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Leadership Team */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Leadership Team
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Our experienced leadership team drives strategic direction and
            operational excellence across all business units.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="glass rounded-2xl p-6 text-center hover-lift group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sp-teal to-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-xl font-bold text-white">
                    {leader.initials}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg">
                  {leader.name}
                </h3>
                <p className="text-sp-teal text-sm mt-1">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Our Journey
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
          Three decades of powering Singapore&apos;s growth and leading the
          energy transition.
        </p>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-sp-teal via-sp-teal/50 to-transparent" />

          <div className="space-y-12">
            {MILESTONES.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-sp-teal border-4 border-gray-950 z-10" />

                  <div
                    className={`w-5/12 glass rounded-2xl p-6 hover-lift ${
                      isLeft ? "mr-auto text-right" : "ml-auto text-left"
                    }`}
                  >
                    <span className="text-sp-teal font-bold text-xl">
                      {milestone.year}
                    </span>
                    <h3 className="text-white font-semibold mt-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Awards &amp; Recognition
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Our efforts have been recognised by industry leaders across Asia
          Pacific and beyond.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {AWARDS.map((award) => (
            <div
              key={award.title}
              className="glass rounded-2xl p-6 flex items-start gap-4 hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{award.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{award.org}</p>
                <p className="text-sp-teal text-xs mt-1">{award.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.05) 50%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Safety First", desc: "Uncompromising commitment to safety in everything we do." },
              { icon: Star, title: "Excellence", desc: "Delivering world-class standards across all operations." },
              { icon: Leaf, title: "Sustainability", desc: "Championing green energy and environmental stewardship." },
              { icon: Users, title: "People", desc: "Empowering our people to innovate and grow together." },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="glass rounded-2xl p-6 text-center hover-lift"
                >
                  <Icon className="w-10 h-10 text-sp-teal mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="glass rounded-3xl p-12 glow-teal">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Us in Powering the Future
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Explore career opportunities and be part of Singapore&apos;s energy
            transformation.
          </p>
          <a
            href="/website/about/careers"
            className="inline-flex items-center gap-2 bg-sp-teal hover:bg-sp-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors spring-button"
          >
            View Careers
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
