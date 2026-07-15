"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Users, CheckCircle2, Plus, Minus,
  Shield, Briefcase, Heart,
  Compass, BookOpen, Landmark, Activity, Globe
} from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion";

function PremiumButton({ 
  href, 
  label, 
  variant = "purple", 
  icon: Icon,
  size = "md"
}: { 
  href: string; 
  label: string; 
  variant?: "purple" | "pink" | "white"; 
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  size?: "md" | "lg";
}) {
  const isPurple = variant === "purple";
  const isPink = variant === "pink";
  const isLg = size === "lg";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group relative inline-flex items-center gap-4 rounded-xl overflow-hidden cursor-pointer shadow-warm-md hover:scale-[1.02] transition-transform duration-300 ${
        isLg ? "h-16 pl-8 pr-2 text-sm font-semibold" : "h-11 pl-5 pr-1.5 text-xs font-semibold"
      } ${
        isPurple 
          ? "bg-[#501854] text-white hover:bg-[#631e68]" 
          : isPink
            ? "bg-[#db2777] text-white hover:bg-[#c22169]"
            : "bg-white text-[#501854] border border-[#efbdeb]/60 hover:bg-[#faf6f9]"
      }`}
    >
      <span className="relative overflow-hidden flex flex-col h-[1.20em]">
        <span className="block group-hover:-translate-y-full transition-transform duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
          {label}
        </span>
        <span className="absolute top-full group-hover:-translate-y-full transition-transform duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
          {label}
        </span>
      </span>
      <span className={`rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 ${
        isLg ? "w-12 h-12" : "w-8 h-8"
      } ${
        isPurple || isPink
          ? "bg-[#db2777] text-white" 
          : "bg-[#db2777] text-white"
      }`}>
        {Icon ? <Icon size={isLg ? 16 : 13} /> : <ArrowRight size={isLg ? 16 : 13} />}
      </span>
    </a>
  );
}

/* 
  InteractiveMarquee handles smooth auto-scrolling via requestAnimationFrame,
  supporting cursor drag-to-scroll, touch swipe-to-scroll, and pauses on hover.
*/
function InteractiveMarquee({ 
  children, 
  direction = "forward",
  speed = 40 
}: { 
  children: React.ReactNode; 
  direction?: "forward" | "reverse";
  speed?: number; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!container) return;
      
      const delta = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current && !isDownRef.current) {
        const step = (speed * delta) / 1000;
        
        if (direction === "forward") {
          container.scrollLeft += step;
          const maxScroll = container.scrollWidth / 2;
          if (container.scrollLeft >= maxScroll) {
            container.scrollLeft = 0;
          }
        } else {
          container.scrollLeft -= step;
          if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollWidth / 2;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
    isHoveredRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDownRef.current = true;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleTouchEnd = () => {
    isDownRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDownRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      className="w-full overflow-x-auto flex gap-6 py-4 cursor-grab active:cursor-grabbing hide-scrollbar select-none relative"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        touchAction: 'pan-x'
      }}
    >
      <div className="flex gap-6 shrink-0">
        {children}
      </div>
      <div className="flex gap-6 shrink-0" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

const CAREER_SITE_URL = process.env.NEXT_PUBLIC_CAREER_SITE_URL || "/career";

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const benefits = [
    {
      title: "Access to job listings",
      desc: "Get access to hand-picked job listings through the BforC Careers portal and start your professional journey. We have opportunities for women in every walk of life.",
      icon: Briefcase
    },
    {
      title: "BforC club membership",
      desc: "Get access to networking opportunities with the founders group and fellow BforC members in your location. Become a part of our regular networking meetings and avail shopping and travel benefits.",
      icon: Users
    },
    {
      title: "Entrepreneurship guidance and funding",
      desc: "For women who are starting their own ventures, BforC provides guidance and seed funding to support budding ideas. New businesses and entrepreneurs can get funds and a chance at incubation.",
      icon: Landmark
    },
    {
      title: "Health and wellness benefits",
      desc: "Get life skills coaching and training, and participate in meditation sessions with fellow BforC members. We believe in supporting your mental well-being at all times.",
      icon: Activity
    },
    {
      title: "Global connections",
      desc: "Get connected to a rich network of amazing women across the globe and make connections that will last a lifetime. BforC provides all women a platform for making strong and meaningful connections.",
      icon: Globe
    }
  ];

  const values = [
    {
      title: "BELIEVING IN EVERYONE",
      desc: "We believe that great and innovative ideas can come from anyone and everyone. We welcome all unique and motivated individuals to join us!",
      icon: Compass
    },
    {
      title: "MAINTAINING UNITY & INTEGRITY",
      desc: "Sticking and working together is the key to the success of a good organisation, and we pride ourselves on maintaining our integrity.",
      icon: Shield
    },
    {
      title: "DOING WHAT THE HEART SAYS",
      desc: "Limiting our ideas only holds us back. We believe in doing what our hearts say to bring about the right and positive changes in the world.",
      icon: Heart
    },
    {
      title: "EMBRACING KNOWLEDGE & WISDOM",
      desc: "We are always on a hunt for knowledge and ideas, ready to learn and accept all wisdom! We believe that we all can learn something new every day.",
      icon: BookOpen
    },
    {
      title: "BEING ETHICAL & TRUTHFUL",
      desc: "Being ethically correct and true to our cause is one of our greatest values at BforC. We believe in always standing up for what is morally right.",
      icon: CheckCircle2
    }
  ];

  const programs = [
    {
      num: "01",
      title: "LIFESKILL TRAINING",
      subtitle: "Experiential learning camps",
      desc: "Confidence building, communications workshops, and peer-to-peer leadership coaching."
    },
    {
      num: "02",
      title: "GLOBAL TO LOCAL",
      subtitle: "Volunteering and internships",
      desc: "Bridging international advisor insights with grassroots implementation teams across India."
    },
    {
      num: "03",
      title: "PROJECT HAUSHALA",
      subtitle: "Technology and innovation",
      desc: "Digital literacy modules, career transition tools, and employer onboarding portals."
    },
    {
      num: "04",
      title: "PROJECT AZADI (FREEDOM)",
      subtitle: "Make menstruation easy",
      desc: "Breaking taboos, auditing workspaces, and providing clean, sustainable sanitary solutions."
    },
    {
      num: "05",
      title: "ADOPT A GRANNY",
      subtitle: "Support who supported us",
      desc: "Generational exchange circles and direct livelihood support initiatives for elderly women."
    }
  ];

  const offerings = [
    {
      title: "Project Strategy & Development",
      bullets: [
        "Need assessment & baseline studies",
        "Situational analysis & feasibility reports",
        "Competitor & programmatic donor audits"
      ]
    },
    {
      title: "Training & Development",
      bullets: [
        "Lifeskills & experiential learning camps",
        "Recruitment matching & capacity development",
        "Adolescent workshops & advocacy"
      ]
    },
    {
      title: "Program Management",
      bullets: [
        "Program design & grantmaking implementation",
        "Nonprofit due diligence & CSR audits",
        "Impact investing & social cause campaigns"
      ]
    },
    {
      title: "Impact Assessment / ROI",
      bullets: [
        "Monitoring & evaluation (M&E) design",
        "Metrics reporting & dashboard creation",
        "Site learning visits & donor trips"
      ]
    },
    {
      title: "Reporting & Development",
      bullets: [
        "Philanthropic pooled fund management",
        "Events, convenings, and webinars curation",
        "Partnership strategies & funding vehicles"
      ]
    },
    {
      title: "Networking & Communication",
      bullets: [
        "Major donor planning & pitch research",
        "Donor messaging, copywriting & proposals",
        "Websites content strategy & success stories"
      ]
    }
  ];

  const pricing = [
    {
      title: "For professionals",
      price: "Rs. 5,000",
      period: "per year",
      desc: "Quarterly payment option available (Rs. 1,250 / quarter). Best for career builders.",
      tag: "Popular"
    },
    {
      title: "For students",
      price: "Rs. 3,000",
      period: "per year",
      desc: "Entry-level upskilling, mentorship, and internships access for university candidates.",
      tag: "Aspirant"
    },
    {
      title: "For organizations",
      price: "Rs. 50,000",
      period: "for 50 candidates",
      desc: "Recruiting, safety compliance tracking, and customized CSR program integration.",
      tag: "Enterprise"
    }
  ];

  const testimonials = [
    {
      quote: "Partnering with BforC transformed our diversity hiring from a checkbox metric to a core competitive advantage. The candidates from their soft-skills academy are exceptionally prepared.",
      name: "Deepa Krishnamurthy",
      role: "VP of Talent Acquisition",
      company: "Infosys BPM",
      initials: "DK"
    },
    {
      quote: "BforC's leadership upskilling and corporate collaborations ensure we receive highly skilled, diverse talent while perfectly aligning with our CSR commitments.",
      name: "Karthik Venkataraman",
      role: "Head of Diversity & Inclusion",
      company: "Mahindra Group",
      initials: "KV"
    },
    {
      quote: "Through BforC's Mentorship Circles, I've guided brilliant women who have successfully transitioned into senior engineering roles. The impact is profound and national.",
      name: "Nandita Iyer",
      role: "Product Lead & Mentor",
      company: "Razorpay",
      initials: "NI"
    },
    {
      quote: "BforC conducts thorough inclusivity audits and provides stellar diverse talent. They've helped us build a truly safe, high-growth, and inclusive workplace.",
      name: "Rohit Rajendran",
      role: "Director of HR Operations",
      company: "Tata Consultancy Services",
      initials: "RR"
    }
  ];

  const faqs = [
    {
      question: "What types of companies do you collaborate with?",
      answer: "We partner with top MNCs, tech firms, domestic conglomerates, and high-growth startups committed to building safe, diverse, and inclusive workplaces."
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

  return (
    <div className="flex flex-col bg-[var(--background)] text-[var(--foreground)] relative">
      
      {/* Full-width Subtle Hero Background Image */}
      <div 
        className="absolute top-[-4rem] left-0 right-0 w-full h-[480px] sm:h-[600px] md:h-[714px] opacity-[0.18] pointer-events-none z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 30%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent)',
        }}
      >
        <Image 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600" 
          alt="Workspace Background"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-36 pb-16 md:pb-24 min-h-[85svh] md:min-h-[90svh] flex items-center px-6 md:px-12 max-w-5xl mx-auto w-full z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1c4e6]/60 text-[#a84370] text-xs font-bold uppercase tracking-wider font-mono-dm">
                A Women-Led Career Movement
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(44px,5.5vw,72px)] text-balance">
                Providing global solutions<br />
                <em className="italic text-[var(--primary)]">to local problems</em>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-[1.7] max-w-xl font-light">
                Brains for Compassion is a women-led organisation that works towards women&apos;s empowerment through life-skill training, supporting women&apos;s careers, raising awareness, and providing opportunities.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <PremiumButton 
                href={CAREER_SITE_URL} 
                label="Find your passion with BforC careers" 
                variant="purple" 
                size="lg"
              />
              <PremiumButton 
                href="#benefits" 
                label="Explore BforC Club" 
                variant="white" 
                size="lg"
              />
            </Reveal>
          </div>

          {/* Right Column: Bento Metrics Cards */}
          <StaggerReveal className="lg:col-span-5 w-full grid grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <StaggerItem className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[140px] md:min-h-[160px] transition-all duration-300">
                <div>
                  <span className="inline-block px-3 md:px-4 py-1.5 rounded-full text-[10px] font-semibold text-white" style={{ background: "#db2777" }}>
                    Corporate Partners
                  </span>
                  <div className="font-display text-[clamp(28px,4vw,44px)] font-light text-[#501854] tracking-[-0.02em] tabular-nums mt-3">
                    483+
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 border-t border-[var(--primary)]/5 pt-3">
                  <div className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] text-[var(--muted-foreground)] font-medium">Vetted Hiring Partners</span>
                </div>
              </StaggerItem>

              {/* Card 2 */}
              <StaggerItem className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[140px] md:min-h-[160px] transition-all duration-300">
                <div>
                  <span className="inline-block px-3 md:px-4 py-1.5 rounded-full text-[10px] font-semibold text-white" style={{ background: "#db2777" }}>
                    Careers Launched
                  </span>
                  <div className="font-display text-[clamp(28px,4vw,44px)] font-light text-[#501854] tracking-[-0.02em] tabular-nums mt-3">
                    1,247+
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 border-t border-[var(--primary)]/5 pt-3">
                  <span className="text-[10px] text-[var(--muted-foreground)]">Empowered Alumni</span>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="inline-block h-5 w-5 rounded-full ring-1 ring-white bg-[#501854] text-[7px] text-white flex items-center justify-center font-bold">DK</div>
                    <div className="inline-block h-5 w-5 rounded-full ring-1 ring-white bg-[#db2777] text-[7px] text-white flex items-center justify-center font-bold">KV</div>
                    <div className="inline-block h-5 w-5 rounded-full ring-1 ring-white bg-[#c04090] text-[7px] text-white flex items-center justify-center font-bold">NI</div>
                    <div className="inline-block h-5 w-5 rounded-full ring-1 ring-white bg-[#f6e5f3] text-[7px] text-[#501854] flex items-center justify-center font-bold font-mono">+1.2k</div>
                  </div>
                </div>
              </StaggerItem>

              {/* Card 3 - Image Background with Stat Overlay */}
              <StaggerItem className="col-span-2 relative overflow-hidden border border-[var(--primary)]/10 shadow-warm-md hover:shadow-warm-lg rounded-2xl min-h-[160px] md:min-h-[200px] transition-all duration-300 group">
                <Image 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800" 
                  alt="Professional Women Collaborating"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#501854]/95 via-[#501854]/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <span className="inline-block self-start px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white bg-[#db2777]/90 backdrop-blur-xs">
                    Cities Covered
                  </span>
                  <span className="font-display text-[clamp(32px,6vw,56px)] font-light text-white leading-none tracking-[-0.03em] tabular-nums">
                    38+
                  </span>
                </div>
              </StaggerItem>

              {/* Card 4 - Placement Rate */}
              <StaggerItem className="col-span-2 bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-6 flex flex-col justify-between min-h-[140px] md:min-h-[160px] transition-all duration-300">
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 md:px-4 py-1.5 rounded-full text-[11px] font-semibold text-white" style={{ background: "#db2777" }}>
                    Placement Rate
                  </span>
                  <span className="font-display text-2xl font-light text-[#501854] tracking-tight tabular-nums">
                    94.3%
                  </span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full mt-4">
                  <div className="w-full h-2 bg-[#f1c4e6]/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#501854] to-[#db2777] rounded-full" 
                      style={{ width: "94.3%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-[var(--muted-foreground)]">
                    <span>Target: 100%</span>
                    <span>Direct Corporate Placements</span>
                  </div>
                </div>
              </StaggerItem>

          </StaggerReveal>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-14 md:py-24 px-6 bg-white/70 border-t border-[var(--border)]/20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-2 block">
                BforC Club
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)]">
                As a BforC member, you become a part of our empowered community.
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-4">
              <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                When you sign up as a member, BforC will support you with:
              </p>
            </Reveal>
          </div>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <StaggerItem 
                  key={idx}
                  className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/25 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-xs md:text-sm font-semibold tracking-tight text-[var(--foreground)]">{b.title}</h3>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                      {b.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>

          <div className="text-center mt-12">
            <Reveal>
              <PremiumButton 
                href="#detailed-benefits" 
                label="View all member benefits" 
                variant="white" 
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-14 md:py-24 px-6 bg-[var(--background)] border-t border-[var(--border)]/20">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
            {/* Left copy column */}
            <div className="lg:col-span-7 flex flex-col gap-6 items-start">
              <Reveal>
                <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-1 block">
                  About Us
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-[clamp(32px,4.5vw,48px)] font-light leading-[1.05] tracking-[-0.04em] text-[var(--foreground)] text-balance">
                  Serving as a strong<br />
                  <span className="italic text-[var(--primary)]">
                    Catalyst for Change
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-col gap-4 text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                  <p>
                    Brains for Compassion (BforC) is a fully women-led organisation that serves as a strong catalyst for change by partnering with like-minded organisations and institutions, striving to make a positive impact in communities. Women from different parts of the world have joined hands and are working with BforC to bring their knowledge and skills together to provide global solutions to local problems.
                  </p>
                  <p>
                    BforC has been successfully working for positive impact and growth since March 2020. Our mission is to bring together the best practices for strengthening the positive impact around the world, while simultaneously creating an equal space for both men and women.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <a href="#detailed-benefits" className="text-[#501854] hover:underline flex items-center gap-1.5 text-xs font-semibold mt-4">
                  Explore our services <ArrowRight size={12} className="text-[#db2777]" />
                </a>
              </Reveal>
            </div>

            {/* Right Column: Premium Ethos Card with Image */}
            <Reveal delay={0.2} className="lg:col-span-5 w-full relative">
              <div className="bg-white border border-[#efbdeb]/30 rounded-2xl shadow-[0_8px_30px_rgba(80,24,84,0.04)] flex flex-col overflow-hidden min-h-[400px] group">
                <div className="relative w-full h-[220px]">
                  <Image 
                    src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=600"
                    alt="BforC Mentorship"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="p-8 flex flex-col justify-center text-center relative">
                  <p className="font-display text-lg md:text-xl italic text-[#501854] leading-relaxed font-light">
                    &ldquo;True equality begins with economic independence.&rdquo;
                  </p>
                  <div className="w-10 h-[2px] bg-[#db2777] mx-auto my-4" />
                  <span className="text-[10px] font-bold tracking-widest text-[#db2777] font-mono-dm uppercase">
                    BforC Ethos
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Staggered pillars: Vision, Mission, Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 pt-8 border-t border-[var(--border)]/20">
            <Reveal>
              <div className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-8 min-h-[160px] transition-all duration-300">
                <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-2">Vision</span>
                <p className="text-xs md:text-sm italic leading-[1.7] text-[var(--foreground)] font-light">
                  &ldquo;All individuals learn, contribute & grow equally for the elevation of the world.&rdquo;
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <div className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-8 min-h-[160px] transition-all duration-300">
                <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-2">Mission</span>
                <p className="text-xs md:text-sm italic leading-[1.7] text-[var(--foreground)] font-light">
                  &ldquo;To introduce the best practices for strengthening the positive impact around the world.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-8 min-h-[160px] transition-all duration-300">
                <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-2">Purpose</span>
                <p className="text-xs md:text-sm italic leading-[1.7] text-[var(--foreground)] font-light">
                  &ldquo;Bestow wisdom and knowledge through a participatory approach.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          {/* VALUES BLOCK */}
          <div className="border-t border-[var(--border)]/20 pt-20">
            <div className="text-center mb-16">
              <Reveal>
                <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-2 block">
                  Ethical Code
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)]">
                  Our Values
                </h2>
              </Reveal>
            </div>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <StaggerItem 
                    key={idx}
                    className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-8 transition-all duration-300 flex flex-col gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--muted)] text-[var(--primary)] flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-semibold tracking-tight text-[var(--foreground)]">
                        {idx + 1}. {val.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light mt-2">
                        {val.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerReveal>
          </div>

        </div>
      </section>

      {/* DETAILED MEMBER BENEFITS SECTION */}
      <section id="detailed-benefits" className="py-14 md:py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-2 block">
                Member Benefits
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)]">
                Unlock Exclusive Platform Benefits
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-4">
              <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                By signing up with us as a BforC community member, you will become a valued member of the BforC Club, an empowered group of like-minded and passionate women.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8">
            {/* Benefit 1 */}
            <Reveal className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row transition-all duration-300">
              <div className="flex-1 p-8 flex flex-col justify-between items-start gap-6">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-1">Opportunity</span>
                  <h3 className="text-base font-semibold mb-2">Get access to job listings</h3>
                  <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                    The BforC career portal provides a platform to all job-seeking women who are looking to start their careers, grow professionally, or even return to work after a break. We understand everyone&apos;s situation and take care of every woman&apos;s career needs. Whether you want remote work, flexible schedules, training, or more, BforC offers opportunities of all kinds.
                  </p>
                </div>
                <PremiumButton 
                  href={CAREER_SITE_URL} 
                  label="Visit BforC career portal" 
                  variant="white" 
                />
              </div>
              <div className="relative w-full lg:w-[320px] min-h-[260px] sm:min-h-[300px] lg:min-h-auto shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
                  alt="Job search and coaching"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </Reveal>

            {/* Benefit 2 */}
            <Reveal delay={0.05} className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row-reverse transition-all duration-300">
              <div className="flex-1 p-8">
                <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-1">Networking</span>
                <h3 className="text-base font-semibold mb-3">BforC Club membership</h3>
                <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light mb-4">
                  As a BforC club member, you will become a part of a tight-knit community with the following benefits:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-3 text-xs md:text-sm leading-[1.7] font-light">
                    <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Network and connect with the BforC founders group and grow your contacts.</span>
                  </li>
                  <li className="flex gap-3 text-xs md:text-sm leading-[1.7] font-light">
                    <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Engage with like-minded community members residing locally in your city and build a close, supportive community.</span>
                  </li>
                  <li className="flex gap-3 text-xs md:text-sm leading-[1.7] font-light">
                    <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Get various kinds of benefits on products, shopping, and travel.</span>
                  </li>
                  <li className="flex gap-3 text-xs md:text-sm leading-[1.7] font-light">
                    <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>Get an opportunity to attend BforC&apos;s quarterly networking meetings where you can connect with like-minded, empowered women.</span>
                  </li>
                </ul>
              </div>
              <div className="relative w-full lg:w-[320px] min-h-[260px] sm:min-h-[300px] lg:min-h-auto shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=600"
                  alt="Networking community"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </Reveal>

            {/* Benefit 3 */}
            <Reveal delay={0.1} className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row transition-all duration-300">
              <div className="flex-1 p-8 flex flex-col justify-center">
                <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-1">Ventures</span>
                <h3 className="text-base font-semibold mb-2">Entrepreneurship guidance and funding</h3>
                <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                  BforC provides guidance, training, and seed funding to support all women with budding ideas. If you are an entrepreneur who is starting your own business, organization, or venture, BforC will support your efforts through necessary funds and a chance at incubation.
                </p>
              </div>
              <div className="relative w-full lg:w-[320px] min-h-[260px] sm:min-h-[300px] lg:min-h-auto shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=600"
                  alt="Entrepreneurship and funding"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </Reveal>

            {/* Benefit 4 */}
            <Reveal delay={0.15} className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row-reverse transition-all duration-300">
              <div className="flex-1 p-8 flex flex-col justify-center">
                <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-1">Wellbeing</span>
                <h3 className="text-base font-semibold mb-2">Health and wellness benefits</h3>
                <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                  BforC cares about every strong woman who gets associated with us. As a BforC member, you will be able to get life skills coaching and training, contributing to your upliftment. Along with that, BforC also facilitates meditation and wellbeing sessions with fellow BforC members so that you always feel your best!
                </p>
              </div>
              <div className="relative w-full lg:w-[320px] min-h-[260px] sm:min-h-[300px] lg:min-h-auto shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600"
                  alt="Health and wellness wellbeing"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </Reveal>

            {/* Benefit 5 */}
            <Reveal delay={0.2} className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row transition-all duration-300">
              <div className="flex-1 p-8 flex flex-col justify-between items-start gap-6">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-[var(--primary)] font-mono-dm uppercase block mb-1">Global Connect</span>
                  <h3 className="text-base font-semibold mb-2">Global connections</h3>
                  <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                    BforC is a rapidly growing community of amazing women. As a member, you get to connect with a rich network of women across the globe and make connections that will last a lifetime. BforC provides all women a platform for making strong and meaningful connections.
                  </p>
                </div>
                <PremiumButton 
                  href={CAREER_SITE_URL} 
                  label="Become a member now" 
                  variant="purple" 
                />
              </div>
              <div className="relative w-full lg:w-[320px] min-h-[260px] sm:min-h-[300px] lg:min-h-auto shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=600"
                  alt="Global connections networking"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="py-14 md:py-24 px-6 bg-[var(--background)] border-t border-[var(--border)]/20">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-2 block">
                Membership Plans
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)]">
                Pricing Plans
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-4">
              <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                Individual member onboarding
              </p>
            </Reveal>
          </div>

          {/* Pricing features check */}
          <Reveal className="bg-[var(--background)]/90 border border-[var(--primary)]/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto mb-12 shadow-warm-md">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)] font-mono-dm mb-4">
              As a BforC member, you will get:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="flex gap-2.5 text-xs md:text-sm font-light leading-[1.7]">
                <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <span>All member benefits.</span>
              </li>
              <li className="flex gap-2.5 text-xs md:text-sm font-light leading-[1.7]">
                <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <span>An all-event pass for every BforC-organized event.</span>
              </li>
              <li className="flex gap-2.5 text-xs md:text-sm font-light leading-[1.7]">
                <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <span>Opportunity to go on a trip of empowerment, a community service trip to impactful NGOs.</span>
              </li>
            </ul>
          </Reveal>

          {/* Pricing Cards Grid - Stretched for alignment */}
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricing.map((p, idx) => {
              return (
                <StaggerItem 
                  key={idx}
                  className="h-full bg-[var(--background)]/90 border border-[var(--primary)]/10 rounded-2xl p-8 shadow-warm-md flex flex-col md:min-h-[340px] relative transition-all duration-300 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 hover:shadow-warm-lg hover:-translate-y-2"
                >
                  <div className="flex-1 flex flex-col">
                    <span className="text-xs font-bold tracking-widest uppercase text-[var(--muted-foreground)] font-mono-dm block mb-4">
                      {p.title}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-6">
                      <span className="text-3xl md:text-4xl font-light text-[var(--foreground)] tracking-tight whitespace-nowrap">
                        {p.price}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)] font-light">
                        {p.period}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light mb-6 flex-1">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--primary)]/10 mt-auto">
                    <PremiumButton 
                      href={CAREER_SITE_URL} 
                      label="Get Onboarded" 
                      variant="purple" 
                    />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>

        </div>
      </section>

      {/* PROGRAMS & SERVICES - INFINITE MARQUEES */}
      <section className="py-14 md:py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20">
        <div className="max-w-5xl mx-auto overflow-hidden">
          
          {/* Programs Marquee */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Reveal>
                <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-2 block">
                  Action Modules
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)]">
                  Our Ongoing Programs
                </h2>
              </Reveal>
            </div>

            {/* Infinite Horizontal Sliding marquee - Reverse Direction */}
            <InteractiveMarquee direction="reverse" speed={40}>
              {programs.map((p, idx) => (
                <div 
                  key={idx}
                  className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-6 flex flex-col justify-between w-[280px] shrink-0 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-center border-b border-[var(--primary)]/10 pb-3 mb-4">
                      <span className="text-xs font-bold tracking-wider text-[var(--primary)] font-mono-dm">{p.title}</span>
                      <span className="text-[10px] text-[var(--muted-foreground)] font-mono-dm">{p.num}</span>
                    </div>
                    <h4 className="text-xs md:text-sm font-semibold text-[var(--foreground)]">{p.subtitle}</h4>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light mt-2 whitespace-normal">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </InteractiveMarquee>
          </div>

          {/* Offerings Marquee */}
          <div className="border-t border-[var(--border)]/20 pt-20">
            <div className="text-center mb-12">
              <Reveal>
                <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-2 block">
                  Capability Statement
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)]">
                  What We Offer
                </h2>
              </Reveal>
            </div>

            {/* Infinite Horizontal Sliding marquee - Forward Direction */}
            <InteractiveMarquee direction="forward" speed={45}>
              {offerings.map((off, idx) => (
                <div 
                  key={idx}
                  className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-8 w-[300px] shrink-0 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold tracking-tight text-[var(--foreground)] mb-4 border-b border-[var(--primary)]/10 pb-3">
                      {off.title}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {off.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs md:text-sm font-light leading-[1.7] whitespace-normal">
                          <CheckCircle2 size={12} className="text-[var(--primary)] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </InteractiveMarquee>
          </div>

        </div>
      </section>

      {/* OUR PARTNERS */}
      <section className="py-14 md:py-24 px-6 bg-[var(--background)] border-t border-[var(--border)]/20 text-center">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-3 block">
              Collaborations
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)] mb-12">
              Our Partners
            </h2>
          </Reveal>
          
          <Reveal delay={0.2} className="bg-[var(--background)]/90 border border-[var(--primary)]/10 rounded-2xl p-8 md:p-12 shadow-warm-md flex items-center justify-center max-w-4xl mx-auto overflow-hidden">
            <div className="relative w-full aspect-[4/1] max-w-[800px] flex items-center justify-center">
              <Image 
                src="/Partners.png" 
                alt="BforC Collaborative Partners logo sheet" 
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain transition-all duration-500"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS - INFINITE MARQUEE */}
      <section className="py-14 md:py-24 px-6 bg-[var(--muted)]/15 border-t border-[var(--border)]/20">
        <div className="max-w-5xl mx-auto overflow-hidden">
          
          <div className="text-center mb-12">
            <Reveal>
              <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-2 block">
                Testimonials
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-light text-[var(--foreground)] leading-[1.05] tracking-[-0.04em] text-[clamp(32px,3.5vw,48px)] text-[var(--foreground)]">
                Trusted by Forward-Thinking Enterprises
              </h2>
            </Reveal>
          </div>

          {/* Infinite Horizontal Sliding marquee - Matching Screenshot 2 styling */}
          <InteractiveMarquee direction="forward" speed={35}>
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="group relative flex-shrink-0 w-[290px] md:w-[360px] bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/5 shadow-warm-md rounded-2xl p-8 flex flex-col gap-6 overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Quote glyph decoration - Matching Screenshot 2 */}
                <span 
                  className="absolute top-5 right-7 font-display text-7xl font-light leading-none select-none pointer-events-none"
                  style={{ color: "var(--border)", opacity: 0.7 }}
                >
                  &ldquo;
                </span>
                
                <p className="text-[var(--foreground)] text-sm leading-[1.7] flex-1 opacity-90 relative z-10 whitespace-normal font-sans font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--primary)]/10 relative z-10 mt-auto">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor: '#c04090' }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-semibold text-[var(--foreground)] truncate">{t.name}</span>
                    <span className="text-xs text-[var(--muted-foreground)] truncate">{t.role}</span>
                    <span className="text-xs text-[var(--primary)] font-medium truncate">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </InteractiveMarquee>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-14 md:py-24 px-6 bg-[var(--background)] border-t border-[var(--border)]/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <Reveal>
              <span className="text-xs font-bold tracking-widest uppercase text-[#db2777] font-mono-dm mb-1 block">
                FAQ
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-light leading-[1.05] tracking-[-0.04em] text-[var(--foreground)]">
                Frequently Asked<br />
                Questions
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xs md:text-sm text-[var(--muted-foreground)] font-light leading-[1.7] max-w-sm">
                Have more questions? Reach out to our team &mdash; we&apos;d love to help you find the right path.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="pt-2">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#501854] hover:underline"
              >
                Contact us <ArrowRight size={12} className="text-[#db2777]" />
              </Link>
            </Reveal>
          </div>

          {/* Right Column: White Accordions Card */}
          <Reveal delay={0.2} className="lg:col-span-7 w-full">
            <div className="bg-[var(--background)]/90 border border-[var(--primary)]/10 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 shadow-warm-md hover:shadow-warm-lg rounded-2xl p-8 flex flex-col transition-all duration-300">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="border-b border-[#efbdeb]/20 py-5 last:border-0 last:pb-0 first:pt-0"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs md:text-sm font-semibold text-[#501854] transition-colors hover:text-[#db2777]"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <div className="w-8 h-8 rounded-full bg-[#501854] text-white flex items-center justify-center font-bold text-xs shrink-0 hover:scale-105 transition-transform duration-200">
                        {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 text-xs md:text-sm text-[var(--muted-foreground)] leading-[1.7] font-light">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  );
}
