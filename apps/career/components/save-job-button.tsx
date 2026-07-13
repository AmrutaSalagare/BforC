"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "bforc_saved_jobs";

function getSaved(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function setSaved(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function SaveJobButton({ jobId }: { jobId: string }) {
  const [saved, setSavedState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSavedState(getSaved().includes(jobId));
  }, [jobId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = getSaved();
    const isSaved = next.includes(jobId);
    const updated = isSaved ? next.filter((id) => id !== jobId) : [...next, jobId];
    setSaved(updated);
    setSavedState(!isSaved);
  };

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Unsave job" : "Save job"}
      className="p-2 rounded-xl border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 bg-[var(--background)] backdrop-blur-sm transition-all duration-300 group"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={saved ? "saved" : "unsaved"}
          initial={{ scale: 0.5, opacity: 0, y: 5 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Heart
            size={16}
            className={`transition-colors duration-300 ${
              saved
                ? "fill-[var(--primary)] text-[var(--primary)]"
                : "text-[var(--foreground)]/50 group-hover:text-[var(--primary)]"
            }`}
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

export function SavedJobsCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(getSaved().length);
    const onStorage = () => setCount(getSaved().length);
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/5 border border-[var(--primary)]/10 px-3 py-1.5 rounded-xl">
      <Heart size={10} className="fill-[var(--primary)]" />
      {count} saved
    </span>
  );
}
