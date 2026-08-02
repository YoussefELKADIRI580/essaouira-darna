"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Premium Cinematic Entrance Preloader (Direct Video Start)
 * ────────────────────────────────────────────────────────
 * 1. Playback Phase: Video starts immediately. First frame serves as initial static view.
 * 2. Portal Transition: 0.8s before the video ends, a solid whiteout screen expands,
 *    revealing the website underneath as it fades away.
 */

type PreloaderPhase = "playing" | "transitioning" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("playing");
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredTransition = useRef(false);

  // ── Hide scrollbars completely during preloader ──────────
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (phase !== "done") {
      html.style.setProperty("overflow", "hidden", "important");
      body.style.setProperty("overflow", "hidden", "important");
    } else {
      html.style.removeProperty("overflow");
      body.style.removeProperty("overflow");
    }

    return () => {
      html.style.removeProperty("overflow");
      body.style.removeProperty("overflow");
    };
  }, [phase]);

  // ── Set Timers and Attempt Immediate Playback ────────────
  useEffect(() => {
    // Show skip after 2.5 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2500);

    // Global safety exit timer (closes the preloader entirely after 9s if stuck)
    const exitFallbackTimer = setTimeout(() => {
      setPhase("done");
    }, 9000);

    // Force try autoplay immediately on mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked or failed:", err);
      });
    }

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(exitFallbackTimer);
    };
  }, []);

  // ── Trigger Transition to Website ────────────────────────
  const triggerTransition = useCallback(() => {
    if (hasTriggeredTransition.current) return;
    hasTriggeredTransition.current = true;
    setPhase("transitioning");

    // Fade out completely after the transition animation finishes
    setTimeout(() => {
      setPhase("done");
    }, 1200);
  }, []);

  // ── Monitor Playback Progress for Exact Transition Timing ──
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Trigger transition exactly 0.8 seconds before the video ends
    const timeLeft = video.duration - video.currentTime;
    if (timeLeft <= 0.8) {
      triggerTransition();
    }
  }, [triggerTransition]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader-overlay"
        className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center w-full h-full"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* ── CINEMATIC VIDEO LAYER ─────────────────────────── */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onEnded={triggerTransition}
            style={{
              transform: phase === "transitioning" ? "scale(1.25)" : "scale(1.02)",
              filter: phase === "transitioning" ? "blur(8px)" : "blur(0px)",
              opacity: phase === "transitioning" ? 0 : 1,
              transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/entrance_video.mp4" type="video/mp4" />
          </video>

          {/* Premium Ambient Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%),
                linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 30%)
              `,
            }}
          />
        </div>

        {/* ── PORTAL WHITE FLASH OVERLAY ─────────────────────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === "transitioning" ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeIn",
          }}
          style={{
            background: "#ffffff",
          }}
        />

        {/* ── LOGO & ASSOCIATION TITLE (Cinematic Frameless Typography) ── */}
        <AnimatePresence>
          {phase === "playing" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-16 left-0 right-0 z-20 flex flex-col items-center pointer-events-none text-center"
            >
              <div className="flex flex-col items-center gap-4 px-4 max-w-xl">
                {/* Glowing Logo */}
                <div className="relative h-16 w-16 md:h-20 md:w-20">
                  <Image
                    src="/logo.png"
                    alt="جمعية الصويرة دارنا"
                    fill
                    className="object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                    priority
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  {/* Title with deep cinematic text shadow */}
                  <h1 className="text-white font-heading text-2xl md:text-4xl font-black tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    جمعية الصويرة دارنا
                  </h1>
                  
                  {/* Premium Gold Gradient Divider Line */}
                  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-3 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                  
                  {/* Elegant gold subtitle */}
                  <p className="text-yellow-400 font-sans text-xs md:text-sm font-extrabold tracking-[0.15em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    أهلاً بكم في داركم
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SKIP BUTTON ─────────────────────────────────────── */}
        <AnimatePresence>
          {showSkip && phase === "playing" && (
            <motion.button
              key="skip-btn"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={triggerTransition}
              className="absolute top-6 left-6 z-40 text-white/60 hover:text-white text-xs md:text-sm font-bold tracking-wider px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 bg-black/30 backdrop-blur-md transition-all duration-300 shadow-lg"
            >
              تخطي الدخول
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
