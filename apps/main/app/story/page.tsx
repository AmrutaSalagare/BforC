"use client";

import { Award, Compass, Heart, Users, Target, Shield, BookOpen, Globe } from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion";

const values = [
  {
    title: "Innovative Messy",
    description: "We value innovation over perfection. Great ideas can come from anyone; our professionalism is defined by actual social impact, not superficial appearances.",
    icon: Compass,
  },
  {
    title: "Ethics & Being Right",
    description: "We possess the courage to follow our deep convictions in bringing positive, sustainable, and ethical change to communities.",
    icon: Shield,
  },
  {
    title: "Embrace Knowledge & Wisdom",
    description: "A continuous pursuit of local insights and global wisdom, combined with ethical conduct in every project we execute.",
    icon: BookOpen,
  },
  {
    title: "Unity & Integrity",
    description: "Collaborative honesty is at the heart of everything we do, bridging global expertise with local grassroot actions.",
    icon: Users,
  },
  {
    title: "Do What Your Heart Says",
    description: "Purpose-driven action guided by profound compassion and empathy, ensuring humanity stays at the center of development.",
    icon: Heart,
  },
];

const team = [
  { name: "Varsha Kothari", role: "Founder", desc: "A visionary social catalyst driving strategic development and women-led community empowerment across India." },
  { name: "Jyothi G Swamy", role: "Director", desc: "A program design expert managing institutional partnerships and CSR program implementations." },
  { name: "Tatsama", role: "Freelance Consultant & Advisor", desc: "Specializes in donor landscape audits, baseline studies, and strategic advisory." },
  { name: "Ashlesha", role: "Freelance Consultant", desc: "Leading monitor & evaluation audits and field implementation strategies." },
  { name: "Savitri", role: "Freelance Consultant", desc: "Expert in soft skills training, life visioning, and capacity building." },
  { name: "Tanishi", role: "Freelance Consultant", desc: "Focuses on content writing, programmatic donor reporting, and success stories." },
];

const advisors = [
  { name: "Guldana", country: "Kazakhstan" },
  { name: "Yvonne", country: "United States" },
  { name: "Anna", country: "Germany" },
  { name: "Lama", country: "Syria" },
  { name: "Raheil", country: "Eritrea" },
  { name: "Sarah Katz", country: "United States" },
  { name: "Katie Morton", country: "South Africa" },
];

export default function Story() {
  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* EDITORIAL HERO */}
      <section className="bg-[var(--muted)]/40 py-24 px-6 border-b border-[var(--border)]/20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-gradient from-[var(--accent)]/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
              About BrainsForCompassion
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[-0.03em] max-w-3xl mx-auto text-balance">
              Bridging Global Insights with Local Change.
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mt-6">
            <div className="w-12 h-px bg-[var(--primary)] mx-auto" />
          </Reveal>
        </div>
      </section>

      {/* STORY BODY */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal className="flex flex-col gap-8">
            <p className="font-display text-xl sm:text-2xl font-light italic leading-relaxed text-[var(--primary)] text-balance">
              Brains for Compassion (BforC) is a fully women-led social impact organisation acting as a catalyst for change.
            </p>
            <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
              We partner with NGOs, governments, corporations, and institutions striving to bring positive impact within communities. Women from different parts of the world join hands and work with BforC to bring knowledge and wisdom under one roof — providing global solutions to local problems.
            </p>
            <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
              We believe that local developmental challenges deserve professional, world-class design and execution. By bridging the resource and expertise gap, we ensure that the value and commitment of local leaders are recognized and scaled to give a new direction to development and humanity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="py-16 px-6 bg-[var(--muted)]/15 border-y border-[var(--border)]/10">
        <div className="mx-auto max-w-3xl border-l border-[var(--primary)] pl-8 py-2">
          <Reveal direction="left" distance={20}>
            <blockquote className="font-display text-2xl font-light italic leading-relaxed text-[var(--foreground)]">
              “True developmental success occurs at the intersection of professional competence, deep local relationships, and a global sharing of wisdom.”
            </blockquote>
            <cite className="block text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm mt-4 not-italic">
              — BforC Founders&apos; Belief
            </cite>
          </Reveal>
        </div>
      </section>

      {/* VISION, MISSION, PURPOSE */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="mx-auto max-w-5xl">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-3 block">
                Foundational Pillars
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
                Our Compass & Guiding Principles
              </h2>
            </Reveal>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision Card */}
            <StaggerItem className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm hover:border-[var(--primary)]/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center mb-6">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Our Vision</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                All women and men learn, contribute, and grow equally for the elevation and positive development of the world.
              </p>
            </StaggerItem>

            {/* Mission Card */}
            <StaggerItem className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm hover:border-[var(--primary)]/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center mb-6">
                <Award size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                To introduce best practices and strategic frameworks to strengthen positive, lasting social impact around the world.
              </p>
            </StaggerItem>

            {/* Purpose Card */}
            <StaggerItem className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm hover:border-[var(--primary)]/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center mb-6">
                <Compass size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Our Purpose</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                To bestow wisdom and professional knowledge through a highly collaborative, participatory approach to program strategy.
              </p>
            </StaggerItem>
          </StaggerReveal>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20">
        <div className="mx-auto max-w-5xl">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-3 block">
                Ethical Identity
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
                Our Core Values
              </h2>
            </Reveal>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <StaggerItem
                  key={val.title}
                  className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center mb-6">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold mb-3">{val.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {val.description}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerReveal>

        </div>
      </section>

      {/* FOUNDER STATEMENT */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="mx-auto max-w-4xl bg-[var(--muted)]/20 border border-[var(--border)]/30 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          
          <div className="flex-1 flex flex-col gap-6">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm">
              Leadership Word
            </span>
            <blockquote className="font-display text-2xl font-light italic leading-relaxed text-[var(--foreground)]">
              “We built Brains for Compassion to bring global wisdom to local change-makers. Many NGOs and institutions are driving beautiful change but remain in the veil due to lacks of structural resources. We exist to scale them up, with quiet confidence, dignity, and deep empathy.”
            </blockquote>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Varsha Kothari & Jyothi G Swamy</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Founders & Leadership Cohort, BforC</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM DIRECTORY */}
      <section className="py-24 px-6 bg-[var(--muted)]/10 border-t border-[var(--border)]/20">
        <div className="mx-auto max-w-5xl">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-3 block">
                The Cohort
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
                Our Core Team & Consultants
              </h2>
            </Reveal>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <StaggerItem
                key={member.name}
                className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-xl p-8 shadow-warm-sm hover:border-[var(--primary)]/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold leading-tight">{member.name}</h3>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--primary)] font-mono-dm mt-1.5 mb-4">
                  {member.role}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {member.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerReveal>

        </div>
      </section>

      {/* GLOBAL ADVISORS */}
      <section className="py-24 px-6 bg-[var(--background)] border-t border-[var(--border)]/20">
        <div className="mx-auto max-w-4xl">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-3 block">
                Global Network
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
                Global Advisors & Peers
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="max-w-xl mx-auto mt-4">
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Representation from countries around the world bringing international best practices to local community programs in India.
              </p>
            </Reveal>
          </div>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {advisors.map((advisor) => (
              <StaggerItem
                key={advisor.name}
                className="bg-[var(--surface)] border border-[var(--border)]/20 rounded-lg p-5 text-center shadow-warm-sm"
              >
                <span className="block font-semibold text-sm">{advisor.name}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-mono-dm mt-1">
                  <Globe size={10} className="text-[var(--primary)]" />
                  {advisor.country}
                </span>
              </StaggerItem>
            ))}
          </StaggerReveal>

        </div>
      </section>

    </div>
  );
}
