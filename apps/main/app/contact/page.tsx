"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, MapPin, CheckCircle2, ChevronDown, MessageSquare, Send 
} from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion";

const faqs = [
  {
    question: "What types of organisations do you collaborate with?",
    answer: "We partner with NGOs, social enterprises, corporate CSR bodies, governmental institutions, and donor organisations looking to design, audit, and execute highly impactful community development programs."
  },
  {
    question: "Who can join the Free Soft Skills Academy?",
    answer: "The academy is open to all ambitious female professionals, job seekers, and career changers looking to build executive communication skills, professional confidence, interview preparation, and leadership skills."
  },
  {
    question: "How do your Mentorship Circles operate?",
    answer: "We connect candidates with accomplished female executives, corporate leaders, and subject matter experts for regular 1-on-1 coaching sessions, career progression planning, and industry-specific guidance."
  },
  {
    question: "How does BforC guarantee a safe workplace?",
    answer: "We conduct rigorous vetting and safety audits of all corporate hiring partners, verifying POSH (Prevention of Sexual Harassment) compliance, workplace culture, and professional growth opportunities to ensure a secure environment."
  },
  {
    question: "How can corporate hiring partners get involved?",
    answer: "Corporations can partner with us for diversity hiring initiatives, CSR-aligned recruitment drives, custom workplace inclusivity audits, and employee engagement opportunities with our academy candidates."
  }
];

const CAREER_SITE_URL = process.env.NEXT_PUBLIC_CAREER_SITE_URL || "/career";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    subject: "",
    message: ""
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      // Clear form
      setFormData({
        name: "",
        email: "",
        org: "",
        subject: "",
        message: ""
      });
    }
  };

  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-[var(--muted)]/40 py-24 px-6 border-b border-[var(--border)]/20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-gradient from-[var(--primary)]/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
              Get in Touch
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[-0.03em] max-w-3xl mx-auto text-balance">
              Let&apos;s build something meaningful.
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mt-6 max-w-lg mx-auto">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Reach out to our Jodhpur headquarters, email our cohort directly, or submit a collaboration inquiry below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <Reveal>
              <div className="bg-[var(--surface)] border border-[var(--border)]/20 rounded-2xl p-6 shadow-warm-sm flex gap-4 items-start">
                <Mail className="text-[var(--primary)] shrink-0 mt-0.5" size={16} />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm">
                    Email the Cohort
                  </h3>
                  <a 
                    href="mailto:brainsforcompassion@gmail.com" 
                    className="text-sm font-semibold hover:text-[var(--primary)] transition-colors mt-1 block truncate"
                  >
                    brainsforcompassion@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[var(--surface)] border border-[var(--border)]/20 rounded-2xl p-6 shadow-warm-sm flex gap-4 items-start">
                <MapPin className="text-[var(--primary)] shrink-0 mt-0.5" size={16} />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm">
                    Headquarters
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
                    F6, Mahaveer Nagar, Pal Link Road, Jodhpur, Rajasthan, India
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[var(--surface)] border border-[var(--border)]/20 rounded-2xl p-6 shadow-warm-sm flex gap-4 items-start">
                <MessageSquare className="text-[var(--primary)] shrink-0 mt-0.5" size={16} />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm">
                    Portal Support
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
                    For career board queries, visit{" "}
                    <a 
                      href={CAREER_SITE_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[var(--primary)] hover:underline"
                    >
                      {CAREER_SITE_URL.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8 bg-[var(--surface)] border border-[var(--border)]/30 rounded-2xl p-8 md:p-12 shadow-warm-md">
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold">Thank You!</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-sm">
                  Your message was successfully sent. Our women-led cohort will review your inquiry and respond within 2 business days.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[var(--primary)] hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#fcf9fb] border border-[var(--border)]/60 hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:outline-none rounded-[4px] px-4 py-3 text-xs transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#fcf9fb] border border-[var(--border)]/60 hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:outline-none rounded-[4px] px-4 py-3 text-xs transition-colors"
                      placeholder="name@organization.org"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="org" className="text-[10px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm">
                      Organisation / NGO Name
                    </label>
                    <input 
                      type="text" 
                      id="org"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full bg-[#fcf9fb] border border-[var(--border)]/60 hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:outline-none rounded-[4px] px-4 py-3 text-xs transition-colors"
                      placeholder="Organisation name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-[10px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#fcf9fb] border border-[var(--border)]/60 hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:outline-none rounded-[4px] px-4 py-3 text-xs transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm">
                    Message Details *
                  </label>
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#fcf9fb] border border-[var(--border)]/60 hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:outline-none rounded-[4px] px-4 py-3 text-xs transition-colors resize-none"
                    placeholder="Tell us about your strategic baseline study, donor audit, or CSR upskilling requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[#8c365c] text-white px-8 py-4 rounded-[4px] text-xs font-semibold transition-all duration-300 self-start shadow-warm-sm"
                >
                  Send Message <Send size={12} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-3 block">
                Frictionless Help
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
                Frequently Asked Questions
              </h2>
            </Reveal>
          </div>

          <StaggerReveal className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <StaggerItem 
                  key={idx}
                  className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl overflow-hidden shadow-warm-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-semibold transition-colors hover:text-[var(--primary)]"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[var(--muted-foreground)]"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-xs text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)]/10">
                      <p className="font-light">{faq.answer}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>

        </div>
      </section>

    </div>
  );
}
