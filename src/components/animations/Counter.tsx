"use client";
import { animate, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function Counter({ from = 0, to, duration = 2.5, className = "", suffix = "", prefix = "" }: CounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const prevToRef = useRef(from);

  useEffect(() => {
    const node = nodeRef.current;
    if (inView && node) {
      const controls = animate(prevToRef.current, to, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate(value) {
          node.textContent = `${prefix}${Math.round(value).toLocaleString('en-US')}${suffix}`;
        },
      });
      prevToRef.current = to;
      return () => controls.stop();
    }
  }, [to, duration, inView, prefix, suffix]);

  return <span ref={nodeRef} className={className}>{prefix}{prevToRef.current}{suffix}</span>;
}
