"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Target, Users, Globe, BookOpen, Layers, Award, Sparkles, CheckCircle2 
} from "lucide-react";
import { Reveal } from "@/components/motion";

const servicesList = [
  {
    id: "identify",
    num: "01",
    title: "Identify Opportunities",
    icon: Target,
    intro: "Surface the right interventions through thorough research, data auditing, and strategic analysis.",
    items: [
      "Strategy Development",
      "Situational Analysis & Baseline Studies",
      "Market Research & Feasibility Studies",
      "Competitor Analysis",
      "Programmatic and Donor Engagement Audit"
    ]
  },
  {
    id: "donors",
    num: "02",
    title: "Find & Engage Donors",
    icon: Users,
    intro: "Build lasting relationships with major donors, foundations, and institutional partners.",
    items: [
      "Strategy and planning for major donor engagement",
      "Research & analysis on donor landscape and prospective donors",
      "Donor engagement messaging and marketing materials",
      "Fundraising support",
      "Donor relations and stewardship (reporting, relationship management)"
    ]
  },
  {
    id: "collaborate",
    num: "03",
    title: "Collaborate with Others",
    icon: Globe,
    intro: "Form strategic partnerships and funding mechanisms to scale developmental outcomes.",
    items: [
      "Creation and management of pooled philanthropic funds",
      "Events, convenings, and webinars",
      "Partnership strategies",
      "Funding mechanisms and vehicles to facilitate donor partnerships"
    ]
  },
  {
    id: "writing",
    num: "04",
    title: "Content Writing",
    icon: BookOpen,
    intro: "Express your impact and mission clearly through copy built for social sector audiences.",
    items: [
      "Websites content strategy & copywriting",
      "Project & program documentation",
      "Events & convenings copywriting",
      "Funding & grant proposals writing",
      "Success Stories & Case Studies research & writing"
    ]
  },
  {
    id: "programs",
    num: "05",
    title: "Create High-Impact Programs",
    icon: Layers,
    intro: "Design, build, and deploy strategic social programs that align with modern CSR regulations.",
    items: [
      "Program strategy design and development",
      "Grantmaking implementation",
      "Nonprofit due diligence audits",
      "NGO capacity building support",
      "CSR and employee engagement programs",
      "Impact investing design"
    ]
  },
  {
    id: "impact",
    num: "06",
    title: "Understand & Communicate Impact",
    icon: Award,
    intro: "Measure operational metrics and report community benefits accurately to stakeholders.",
    items: [
      "Monitoring and Evaluation (M&E) systems design",
      "Metrics reporting and dashboard creation",
      "Program communication and transparency reports",
      "Site visits & donor learning trips curation"
    ]
  },
  {
    id: "training",
    num: "07",
    title: "Training & Development",
    icon: Sparkles,
    intro: "Nurture essential life skills, mindfulness, leadership, and connection with self and others.",
    items: [
      "Inner Consciousness & Mindfulness workshops",
      "Entrepreneurship & Social Innovation coaching",
      "Communication & Connecting with Others",
      "Teamwork, Leadership & Life Visioning",
      "Sustainability practices & Eco-conscious living",
      "Experiential learning: Journey of Connect with Self — Connect with Others"
    ]
  }
];

export default function Services() {
  const [activeSection, setActiveSection] = useState(servicesList[0].id);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const service of servicesList) {
        const ref = sectionRefs.current[service.id];
        if (ref) {
          const top = ref.offsetTop;
          const height = ref.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(service.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const ref = sectionRefs.current[id];
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 100,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      
      {/* SECTION HERO */}
      <section className="bg-[var(--muted)]/40 py-24 px-6 border-b border-[var(--border)]/20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-gradient from-[var(--primary)]/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">
              Our Capabilities
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[-0.03em] max-w-3xl mx-auto text-balance">
              What We Do
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="mt-6 max-w-xl mx-auto">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              We provide comprehensive consulting and developmental services to NGOs, donors, governments, and corporations, enabling them to optimize and scale up positive community interventions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCROLL-LINKED STACK LAYOUT */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Sticky Left Sidebar Navigation */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:flex flex-col gap-2 p-4 bg-[var(--surface)] border border-[var(--border)]/20 rounded-2xl shadow-warm-sm">
            <span className="text-[9px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm px-3 mb-2 block">
              Categories
            </span>
            {servicesList.map((service) => {
              const isActive = activeSection === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => scrollToSection(service.id)}
                  className={`text-left text-xs font-semibold px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 w-full border ${
                    isActive
                      ? "bg-[var(--muted)] text-[var(--foreground)] border-[var(--primary)]/20 shadow-warm-sm"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)] border-transparent"
                  }`}
                >
                  <span className="font-mono-dm text-[10px] text-[var(--primary)]">{service.num}</span>
                  <span className="truncate">{service.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Detail Panels */}
          <div className="lg:col-span-8 flex flex-col gap-20">
            {servicesList.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    sectionRefs.current[service.id] = el;
                  }}
                  className="bg-[var(--surface)] border border-[var(--border)]/30 rounded-2xl p-8 md:p-12 shadow-warm-sm hover:border-[var(--primary)]/20 transition-all duration-300 scroll-mt-24"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border)]/20 pb-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="font-mono-dm text-[10px] uppercase text-[var(--primary)] block tracking-widest">
                          Service {service.num}
                        </span>
                        <h2 className="text-xl font-bold mt-0.5">{service.title}</h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-8">
                    {service.intro}
                  </p>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm mb-1">
                      Key Deliverables
                    </span>
                    <ul className="grid grid-cols-1 gap-3">
                      {service.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs text-[var(--foreground)]"
                        >
                          <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20 text-center">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-6">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--primary)] font-mono-dm">
            Collaborate With Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light leading-tight">
            Need customized consulting assistance?
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-md">
            We adapt our baseline studies, fundraising decks, and soft skills academies to fit your organization&apos;s budget and location.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-3.5 rounded-[4px] text-sm font-semibold hover:bg-[#8c365c] transition-all duration-300"
          >
            Schedule a Consultation Call
          </a>
        </div>
      </section>

    </div>
  );
}
