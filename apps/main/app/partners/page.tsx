"use client";

import Image from "next/image";
import { Handshake, Heart } from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion";

const partnersList = [
  {
    name: "Heartful Chi",
    desc: "A global wellness coalition integrating mindfulness, inner connection, and chi movement practices to elevate individual and communal wellness.",
    category: "Mindfulness & Wellbeing"
  },
  {
    name: "Center for Mindfulness",
    desc: "Dedicated to introducing secular mindfulness practices and cognitive grounding research into educational institutions and local NGOs.",
    category: "Education & Mental Health"
  },
  {
    name: "Heartful Being",
    desc: "Supporting rural health programs and counseling initiatives focusing on women's emotional and psychological resilience in Jodhpur region.",
    category: "Community Wellbeing"
  },
  {
    name: "Global AID",
    desc: "An international aid syndicate funding critical infrastructure, water sanitation, and hygiene audits for underprivileged schools.",
    category: "Global Development Aid"
  },
  {
    name: "RLHP",
    desc: "Collaborating on grassroot human rights advocacy, child protection systems, and economic inclusion programs for urban migrants.",
    category: "Human Rights & Advocacy"
  },
  {
    name: "Sahaj Sansthan",
    desc: "Promoting community development, organic farming, and micro-loan systems for rural women-led cooperatives in Rajasthan.",
    category: "Rural Livelihoods"
  },
  {
    name: "Women Serve",
    desc: "A prominent women's NGO focusing on maternal health, access to clean drinking water, and safe menstrual hygiene programs.",
    category: "Maternal Health & WASH"
  },
  {
    name: "Project Baala",
    desc: "An innovative social enterprise breaking menstrual taboos and supplying sustainable, reusable sanitary solutions to rural schoolgirls.",
    category: "Menstrual Hygiene & Health"
  },
  {
    name: "Jagriti Mahila Samiti",
    desc: "Fostering leadership, safety audits, and anti-harassment training for women labor forces working in informal industries.",
    category: "Labor Inclusion & Safety"
  },
  {
    name: "Jyoti Foundation",
    desc: "Pioneering primary school education, nutritional security programs, and digital literacy classes for rural children.",
    category: "Primary Education & Nutrition"
  },
  {
    name: "Akshaya Patra",
    desc: "An esteemed national foundation feeding millions of underprivileged children, partnering on mid-day meal logistics and research.",
    category: "Nutritional Security"
  }
];

export default function Partners() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* HEADER */}
      <section className="bg-[var(--muted)]/40 py-24 px-6 border-b border-[var(--border)]/20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-gradient from-[var(--primary)]/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
              Our Affiliations
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[-0.03em] max-w-3xl mx-auto text-balance">
              We grow together
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mt-6 max-w-xl mx-auto">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              We partner with forward-thinking organisations, foundations, and grassroot NGOs to introduce best practices and elevate community outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PARTNER LOGO BANNER */}
      <section className="py-12 px-6 bg-[var(--background)] border-b border-[var(--border)]/10">
        <div className="max-w-5xl mx-auto">
          <Reveal className="bg-[var(--surface)] border border-[var(--border)]/20 rounded-2xl p-8 md:p-12 shadow-warm-md flex items-center justify-center overflow-hidden">
            <div className="relative w-full aspect-[4/1] max-w-[800px] flex items-center justify-center">
              <Image 
                src="/Partners.png" 
                alt="BforC Partners logo board" 
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain transition-all duration-500"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNERS GRID */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto">
          
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnersList.map((partner) => {
              return (
                <StaggerItem
                  key={partner.name}
                  className="group bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm hover:shadow-warm-md hover:border-[var(--primary)]/30 hover:bg-[#faf6f9] transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm px-2.5 py-1 rounded bg-[var(--muted)] self-start">
                      {partner.category}
                    </span>
                    <h3 className="text-lg font-bold group-hover:text-[var(--primary)] transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-light">
                      {partner.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)]/20 flex items-center gap-2 text-[10px] text-[var(--muted-foreground)] font-mono-dm">
                    <Handshake size={12} className="text-[var(--primary)]" />
                    Verified Collaborator
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20 text-center">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-6">
          <Heart className="text-[var(--primary)] shrink-0 animate-pulse" size={24} />
          <h2 className="font-display text-3xl sm:text-4xl font-light leading-tight">
            Interested in partnering with BrainsForCompassion?
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-md">
            Whether you are a donor agency seeking strategic field audits, or an NGO wanting program strategy capacity building, we align our skills to your goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-3.5 rounded-[4px] text-sm font-semibold hover:bg-[#8c365c] transition-all duration-300"
          >
            Become a Partner
          </a>
        </div>
      </section>

    </div>
  );
}
