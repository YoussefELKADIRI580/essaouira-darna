import React from "react";

interface WatermarkTextProps {
  text: string;
  className?: string;
}

export function WatermarkText({ text, className = "" }: WatermarkTextProps) {
  return (
    <div
      className={`absolute select-none pointer-events-none opacity-[0.04] font-heading font-black text-[12rem] sm:text-[18rem] md:text-[24rem] leading-none whitespace-nowrap z-0 text-charcoal flex justify-center items-center tracking-tighter ${className}`}
      aria-hidden="true"
    >
      {text}
    </div>
  );
}
