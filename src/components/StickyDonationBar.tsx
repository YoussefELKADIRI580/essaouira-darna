"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function StickyDonationBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px down
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on donation page itself to avoid redundancy
  if (pathname.includes("/donate") || pathname === "/projects") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
        >
          <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-white/90 backdrop-blur-md p-2 pl-6 shadow-2xl shadow-primary/10 border border-border-custom hover:border-primary/30 transition-colors">
            <span className="font-bold text-sm text-charcoal hidden sm:block mr-2">هل تود المساهمة في رسم ابتسامة؟</span>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cta px-6 text-sm font-bold text-white transition-all hover:bg-cta-hover hover:scale-105 shadow-lg shadow-cta/30 group"
            >
              <span>تبرع الآن</span>
              <Heart className="h-4 w-4 group-hover:scale-110 transition-transform fill-current" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
