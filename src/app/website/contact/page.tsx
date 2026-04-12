"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ChevronDown,
  Send,
  AlertTriangle,
  Flame,
  Clock,
  HelpCircle,
  Building2,
} from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "1800-222-2333",
    subtitle: "Mon-Fri 8am-6pm, Sat 8am-1pm",
    color: "from-sp-teal to-emerald-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "customerservice@spgroup.com.sg",
    subtitle: "We respond within 1 business day",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    detail: "Chat with SPBuddy",
    subtitle: "Available 24/7 via SP App",
    color: "from-violet-500 to-purple-600",
  },
] as const;

const SUBJECT_OPTIONS = [
  "General Enquiry",
  "Billing & Payments",
  "Account Management",
  "Service Interruption",
  "EV Charging",
  "Green Energy Credits",
  "Feedback & Complaints",
  "Partnership Enquiry",
] as const;

const FAQ_ITEMS = [
  {
    question: "How do I pay my utility bill?",
    answer:
      "You can pay via GIRO, credit card, internet banking, AXS, SAM, or the SP App. GIRO is the most convenient option and can be set up in the SP App under Account > Payment Settings. For one-time payments, use the 'Pay Bill' feature in the app or visit any AXS/SAM station.",
  },
  {
    question: "What should I do during a power outage?",
    answer:
      "Check if your neighbours are also affected. If it's a localised outage, check your circuit breaker. For wider outages, call our 24-hour fault reporting line at 1800-778-8888. You can also check real-time outage maps on the SP App under 'Service Status'. We typically restore supply within 1 hour for most cases.",
  },
  {
    question: "How do I find and use an SP EV charging station?",
    answer:
      "Open the SP App and navigate to 'EV Charging' to find the nearest available charger. You can filter by charger type (AC/DC), availability, and pricing. Simply scan the QR code on the charger to start a session. Payment is automatically processed through your SP account or linked payment method.",
  },
  {
    question: "How do I transfer my utilities account when moving?",
    answer:
      "Submit a transfer request at least 3 working days before your move-in date via the SP App (Account > Move In/Out) or our website. You'll need your new address, move-in date, and NRIC/FIN. The deposit from your previous address will be transferred to the new account automatically.",
  },
  {
    question: "What are SP Green Energy Credits and how do they work?",
    answer:
      "SP Green Energy Credits allow you to offset the carbon footprint of your electricity consumption by supporting renewable energy generation. Each credit represents 1 kWh of renewable energy fed into Singapore's grid. You can purchase credits via the SP App under 'Green Goals'. Pricing starts from $0.01 per kWh.",
  },
] as const;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  }

  function toggleFaq(index: number) {
    setExpandedFaq((prev) => (prev === index ? null : index));
  }

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
              "linear-gradient(135deg, #042f2e 0%, #0c2340 30%, #064e3b 60%, #030712 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full floating-orb"
            style={{
              background:
                "radial-gradient(circle, rgba(0,191,165,0.4) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <MessageCircle className="w-4 h-4 text-sp-teal" />
            <span className="text-sp-teal text-sm font-medium">Contact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up delay-100">
            Get in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sp-teal to-blue-400">
              {" "}
              Touch
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-200">
            We&apos;re here to help with your energy needs. Reach out through
            any of our channels below.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {CONTACT_METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.title}
                className="glass rounded-2xl p-8 text-center hover-lift group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-sp-teal font-semibold text-lg mb-1">
                  {method.detail}
                </p>
                <p className="text-gray-500 text-sm">{method.subtitle}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form + Office Location */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Send Us a Message
            </h2>
            <p className="text-gray-400 mb-8">
              Fill in the form below and we&apos;ll get back to you within 1
              business day.
            </p>

            {isSubmitted ? (
              <div className="glass rounded-2xl p-12 text-center animate-fade-in-scale">
                <div className="w-16 h-16 rounded-full bg-sp-green/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-sp-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Message Sent
                </h3>
                <p className="text-gray-400 mb-6">
                  Thank you for reaching out. Our team will respond within 1
                  business day.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sp-teal font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-sp-teal/50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-sp-teal/50"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full glass rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-sp-teal/50 bg-transparent"
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select a subject
                    </option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-gray-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-sp-teal/50 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sp-teal hover:bg-sp-teal-dark disabled:opacity-50 text-white font-semibold px-8 py-4 rounded-xl transition-colors spring-button flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Office Location */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-400 mb-8">
              Our Singapore headquarters is located in the Kallang area.
            </p>

            {/* Map Placeholder */}
            <div className="glass rounded-2xl overflow-hidden mb-6">
              <div className="h-[280px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-sp-teal mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">
                    Interactive Map
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    2 Kallang Sector, Singapore 349277
                  </p>
                </div>
                {/* Grid overlay for map feel */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,191,165,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,165,0.3) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Office Details */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Building2 className="w-5 h-5 text-sp-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">SP Group Headquarters</p>
                  <p className="text-gray-400 text-sm">
                    2 Kallang Sector, Singapore 349277
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-sp-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Office Hours</p>
                  <p className="text-gray-400 text-sm">
                    Monday - Friday: 8:30am - 5:30pm
                  </p>
                  <p className="text-gray-400 text-sm">
                    Saturday: 8:30am - 12:30pm
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-sp-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Nearest MRT</p>
                  <p className="text-gray-400 text-sm">
                    Aljunied MRT (EW9) - 10 min walk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-sp-teal mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Quick answers to the most common questions.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-semibold pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 animate-fade-in-up">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Emergency Contacts
        </h2>
        <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
          For emergencies requiring immediate attention, please call the
          relevant hotline below. Available 24/7.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-6 border-l-4 border-red-500 hover-lift">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <Flame className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Gas Leak Emergency</h3>
                <p className="text-red-400 font-bold text-2xl mt-1">
                  1800-752-1800
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  If you smell gas, leave the area immediately, do not use
                  electrical switches, and call this number.
                </p>
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 border-l-4 border-amber-500 hover-lift">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  Electrical Hazard
                </h3>
                <p className="text-amber-400 font-bold text-2xl mt-1">
                  1800-778-8888
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Report fallen power lines, exposed wiring, electrical fires,
                  or any electrical emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24 text-center">
        <div className="glass rounded-3xl p-12 glow-teal">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Our AI-powered SPBuddy chatbot is available 24/7 for quick answers
            to common queries.
          </p>
          <button className="inline-flex items-center gap-2 bg-sp-teal hover:bg-sp-teal-dark text-white font-semibold px-8 py-4 rounded-full transition-colors spring-button">
            <MessageCircle className="w-5 h-5" />
            Chat with SPBuddy
          </button>
        </div>
      </section>
    </div>
  );
}
