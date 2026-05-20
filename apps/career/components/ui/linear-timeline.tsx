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

interface LinearTimelineProps {
  timelineData: TimelineItem[];
}

interface LinearTimelineNodeProps {
  item: TimelineItem;
  index: number;
  timelineData: TimelineItem[];
  flowOffset: MotionValue<number>;
  itemSpacing: number;
  travelWidth: number;
  containerWidth: number;
  edgeBuffer: number;
  isExpanded: boolean;
  isPulsing: boolean;
  onToggle: (id: string, index: number) => void;
}

function wrapPosition(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;
  return ((((value - min) % range) + range) % range) + min;
}

function FlowTimelineNode({
  item,
  index,
  timelineData,
  flowOffset,
  itemSpacing,
  travelWidth,
  containerWidth,
  edgeBuffer,
  isExpanded,
  isPulsing,
  onToggle,
}: LinearTimelineNodeProps) {
  const Icon = item.icon;

  const nodeX = useTransform(flowOffset, (offset) =>
    wrapPosition(
      containerWidth + edgeBuffer + index * itemSpacing - offset,
      -edgeBuffer,
      travelWidth - edgeBuffer,
    ),
  );

  return (
    <motion.div
      className="absolute left-0 top-1/2"
      style={{ x: nodeX, zIndex: isExpanded ? 200 : 50 }}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer transition duration-700"
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
          className="absolute left-1/2 top-1/2 h-px -translate-x-full bg-[var(--accent-color)]/20"
          style={{ width: itemSpacing / 2 }}
        />
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            border-[1.5px] shadow-warm-sm
            transition duration-300 transform relative z-10
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
            transition duration-300 pointer-events-none
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
            absolute top-24 left-1/2 -translate-x-1/2 w-72 transition duration-500 origin-top
            ${isExpanded ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
          `}
          onClick={(event) => event.stopPropagation()}
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
                  <Button className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-dark)] text-white shadow-warm-sm rounded-[4px] transition-colors">
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

                      if (!relatedItem || relatedIndex < 0) return null;

                      return (
                        <button
                          key={relatedId}
                          className="flex items-center h-6 px-2.5 py-0 text-xs rounded-full border border-[var(--border)] bg-white/50 hover:bg-[var(--surface-2)] hover:border-[var(--accent-color)]/40 text-[var(--muted-fg)] hover:text-[var(--foreground)] transition"
                          onClick={(event) => {
                            event.stopPropagation();
                            onToggle(relatedId, relatedIndex);
                          }}
                        >
                          {relatedItem.label}
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
  );
}

export default function LinearTimeline({
  timelineData,
}: LinearTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<string, boolean>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const flowOffset = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(960);
  const [itemSpacing, setItemSpacing] = useState(190);
  const edgeBuffer = itemSpacing;
  const travelWidth = Math.max(
    timelineData.length * itemSpacing,
    containerWidth + edgeBuffer * 2,
    1,
  );

  useEffect(() => {
    const updateMetrics = () => {
      setContainerWidth(containerRef.current?.clientWidth || window.innerWidth);
      setItemSpacing(window.innerWidth < 768 ? 150 : 190);
    };

    updateMetrics();

    const observer = new ResizeObserver(updateMetrics);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", updateMetrics);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

  // High-performance flow loop using requestAnimationFrame (no React re-renders)
  useAnimationFrame((time, delta) => {
    if (autoRotate) {
      flowOffset.set(flowOffset.get() + delta * 0.04);
    }
  });

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking outside nodes, reset everything and resume rotation
    if (e.target === containerRef.current || (e.target as HTMLElement).closest(".timeline-flow-bg")) {
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
    if (nodeIndex < 0 || timelineData.length === 0) return;

    setAutoRotate(false);
    const currentOffset = flowOffset.get();
    const centerX = containerWidth / 2;
    const targetBase = containerWidth + edgeBuffer + nodeIndex * itemSpacing - centerX;
    
    let target = targetBase;
    while (target < currentOffset - travelWidth / 2) target += travelWidth;
    while (target > currentOffset + travelWidth / 2) target -= travelWidth;

    animate(flowOffset, target, { type: "spring", stiffness: 70, damping: 22 });
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
      style={{ minHeight: "520px" }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="timeline-flow-bg relative w-full max-w-6xl h-[520px] flex items-center justify-center">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--foreground)]/10" />
        <div className="absolute left-0 right-0 top-1/2 h-px border-t border-dashed border-[var(--foreground)]/10" />
        <motion.div
          className="absolute top-1/2 h-px w-1/3 bg-gradient-to-l from-transparent via-[var(--accent-color)]/45 to-transparent"
          animate={{ left: ["100%", "-35%"] }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-[60]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-[60]" />

        <div className="absolute left-1/2 top-1/2 z-20 h-8 w-px -translate-y-1/2 bg-[var(--accent-color)]/30">
          <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-color)]/70 shadow-warm-sm" />
        </div>

        {timelineData.map((item, index) => (
          <FlowTimelineNode
            key={item.id}
            item={item}
            index={index}
            timelineData={timelineData}
            flowOffset={flowOffset}
            itemSpacing={itemSpacing}
            travelWidth={travelWidth}
            containerWidth={containerWidth}
            edgeBuffer={edgeBuffer}
            isExpanded={Boolean(expandedItems[item.id])}
            isPulsing={Boolean(pulseEffect[item.id])}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </div>
  );
}
