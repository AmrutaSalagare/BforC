"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NextLink from "next/link";
import {
  animate,
  motion,
  type MotionValue,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

export interface TimelineItem {
  id: string;
  label: string;
  href: string;
  color: string;
  icon: React.ElementType;
  description: string;
  relatedIds: string[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

interface OrbitalTimelineNodeProps {
  item: TimelineItem;
  index: number;
  totalItems: number;
  timelineData: TimelineItem[];
  orbitAngle: MotionValue<number>;
  radius: number;
  isExpanded: boolean;
  isPulsing: boolean;
  onToggle: (id: string, index: number) => void;
}

function OrbitalTimelineNode({
  item,
  index,
  totalItems,
  timelineData,
  orbitAngle,
  radius,
  isExpanded,
  isPulsing,
  onToggle,
}: OrbitalTimelineNodeProps) {
  const initialAngle = (index / totalItems) * 360;
  const Icon = item.icon;

  // Wrapper rotation handles orbiting; content counter-rotation keeps the icon upright.
  const wrapperRotate = useTransform(orbitAngle, (angle) => angle + initialAngle);
  const contentRotate = useTransform(orbitAngle, (angle) => -(angle + initialAngle));

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-0 h-0"
      style={{ rotate: wrapperRotate, zIndex: isExpanded ? 200 : 50 }}
    >
      <motion.div
        className="absolute"
        style={{
          x: radius,
          y: 0,
          marginLeft: "-24px",
          marginTop: "-24px",
          rotate: contentRotate,
        }}
      >
        <div
          className="relative transition-all duration-700 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            onToggle(item.id, index);
          }}
        >
          <div
            className={`absolute rounded-full -inset-1 ${
              isPulsing ? "animate-pulse duration-1000" : ""
            }`}
            style={{
              background: `radial-gradient(circle, ${item.color}40 0%, ${item.color}00 70%)`,
              width: "80px",
              height: "80px",
              left: "-16px",
              top: "-16px",
              opacity: isPulsing ? 1 : 0,
              pointerEvents: "none",
            }}
          />

          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              border-[1.5px] shadow-warm-sm
              transition-all duration-300 transform relative z-10
              ${
                isExpanded
                  ? "scale-125 border-[var(--accent-color)] bg-white"
                  : "hover:scale-110 bg-white/95 border-[var(--border)]/50"
              }
            `}
          >
            <Icon size={20} className="text-[var(--foreground)]" />
          </div>

          <div
            className={`
              absolute top-14 whitespace-nowrap
              text-sm font-semibold tracking-wide
              transition-all duration-300 pointer-events-none
              ${isExpanded ? "text-[var(--accent-dark)] scale-110" : "text-[var(--foreground)]"}
            `}
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            <span className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-white/40 block">
              {item.label}
            </span>
          </div>

          <div
            className={`
              absolute top-24 left-1/2 -translate-x-1/2 w-72 transition-all duration-500 origin-top
              ${isExpanded ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
            `}
          >
            <Card className="bg-white/95 backdrop-blur-xl border-white/60 shadow-warm-lg overflow-visible">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[var(--accent-color)]/30" />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg mt-1 text-[var(--foreground)] font-display">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[var(--muted-fg)]">
                <p>{item.description}</p>

                <div className="mt-5">
                  <NextLink href={item.href} className="inline-flex w-full">
                    <Button className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-dark)] text-white shadow-warm-sm rounded-full transition-colors">
                      Explore Roles
                    </Button>
                  </NextLink>
                </div>

                {item.relatedIds.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[var(--foreground)]/5">
                    <div className="flex items-center mb-2">
                      <Link size={12} className="text-[var(--faint-fg)] mr-1.5" />
                      <h4 className="text-[0.65rem] uppercase tracking-wider font-semibold text-[var(--faint-fg)]">
                        Related Categories
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.relatedIds.map((relatedId) => {
                        const relatedItem = timelineData.find((candidate) => candidate.id === relatedId);
                        const relatedIndex = timelineData.findIndex((candidate) => candidate.id === relatedId);

                        return (
                          <button
                            key={relatedId}
                            className="flex items-center h-6 px-2.5 py-0 text-xs rounded-full border border-[var(--border)] bg-white/50 hover:bg-[var(--surface-2)] hover:border-[var(--accent-color)]/40 text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-all"
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggle(relatedId, relatedIndex);
                            }}
                          >
                            {relatedItem?.label}
                            <ArrowRight size={10} className="ml-1.5 text-[var(--faint-fg)]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<string, boolean>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitAngle = useMotionValue(0);
  const [radius, setRadius] = useState(200);

  useEffect(() => {
    const checkSize = () => setRadius(window.innerWidth < 768 ? 130 : 200);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // High-performance rotation loop using requestAnimationFrame (no React re-renders)
  useAnimationFrame((time, delta) => {
    if (autoRotate) {
      // delta is typically 16.6ms at 60fps. Adjust multiplier for speed.
      orbitAngle.set(orbitAngle.get() + (delta * 0.007));
    }
  });

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking outside nodes, reset everything and resume rotation
    if (e.target === containerRef.current || (e.target as HTMLElement).closest('.orbit-bg')) {
      setExpandedItems({});
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: string): string[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeIndex: number) => {
    setAutoRotate(false);
    const targetNodeAngle = (nodeIndex / timelineData.length) * 360;
    
    const currentAngle = orbitAngle.get();
    // 270 degrees is top center
    let target = 270 - targetNodeAngle;
    
    // Normalize target so it rotates via the shortest path
    while (target < currentAngle - 180) target += 360;
    while (target > currentAngle + 180) target -= 360;

    animate(orbitAngle, target, { type: "spring", stiffness: 60, damping: 20 });
  };

  const toggleItem = (id: string, index: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (key !== id) newState[key] = false;
      });

      newState[id] = !prev[id];

      if (newState[id]) {
        // Expanding
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<string, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(index);
      } else {
        // Collapsing
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "600px" }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="orbit-bg relative w-full max-w-4xl h-[600px] flex items-center justify-center">
        
        {/* Central Core */}
        <div className="absolute w-20 h-20 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: "var(--lavender)" }}>
          <div className="absolute w-28 h-28 rounded-full border border-[var(--accent-color)]/20 animate-ping opacity-70"></div>
          <div
            className="absolute w-32 h-32 rounded-full border border-[var(--mint)]/30 animate-ping opacity-50"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-warm-sm flex items-center justify-center">
             <div className="w-3 h-3 rounded-full bg-[var(--accent-color)] opacity-60"></div>
          </div>
        </div>

        {/* Orbit rings */}
        <div className="absolute w-[clamp(260px,70vw,400px)] h-[clamp(260px,70vw,400px)] rounded-full border border-[var(--foreground)]/5"></div>
        <div className="absolute w-[clamp(300px,80vw,440px)] h-[clamp(300px,80vw,440px)] rounded-full border border-[var(--foreground)]/5 border-dashed"></div>

        {timelineData.map((item, index) => (
          <OrbitalTimelineNode
            key={item.id}
            item={item}
            index={index}
            totalItems={timelineData.length}
            timelineData={timelineData}
            orbitAngle={orbitAngle}
            radius={radius}
            isExpanded={Boolean(expandedItems[item.id])}
            isPulsing={Boolean(pulseEffect[item.id])}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </div>
  );
}
