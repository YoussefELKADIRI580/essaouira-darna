"use client";

import React from "react";

interface AmbientSidePeekProps {
  readonly side: "left" | "right";
  readonly src?: string | null;
  readonly alt?: string;
  readonly badgeText?: string;
  readonly rotation?: string;
  readonly className?: string;
}

export function AmbientSidePeek({
  side,
  src,
  alt = "صورة توثيقية - جمعية الصويرة دارنا",
  badgeText = "صورة ميدانية - الصويرة دارنا",
  rotation = side === "right" ? "rotate-3" : "-rotate-3",
  className = "",
}: AmbientSidePeekProps) {
  const isRight = side === "right";

  // Default: Exactly 50% Visible on Screen, 50% Hidden Offscreen.
  // On Hover: Slides completely IN (100% Visible on Screen!)
  const positionClasses = isRight
    ? "right-0 translate-x-[50%] group-hover:translate-x-0 md:group-hover:-translate-x-4"
    : "left-0 -translate-x-[50%] group-hover:translate-x-0 md:group-hover:translate-x-4";

  return (
    <div
      className={`hidden lg:flex absolute z-30 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group cursor-pointer ${positionClasses} ${className}`}
      dir="rtl"
    >
      {/* Studio Photo Frame (Wide Horizontal Landscape Card) */}
      <div
        className={`relative w-[23rem] h-[15rem] xl:w-[27rem] xl:h-[17rem] rounded-[2.2rem] bg-white p-3.5 pb-11 shadow-[0_20px_50px_rgba(0,0,0,0.18)] group-hover:shadow-[0_35px_80px_rgba(0,0,0,0.3)] border border-slate-200/90 backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out ${rotation} group-hover:rotate-0`}
      >
        {/* Metallic Clip Accent on Top Corner */}
        <div
          className={`absolute -top-3.5 ${
            isRight ? "left-10" : "right-10"
          } w-14 h-7 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 border border-amber-300/80 rounded-md shadow-md rotate-6 group-hover:rotate-0 transition-transform duration-500`}
        />

        {/* Inner Photo Area */}
        <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-inner flex flex-col items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src || "/img/darna-1.jpeg"}
            alt={alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Photo Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Floating Badge Tag (Bottom) */}
          <div
            className={`absolute bottom-3 ${
              isRight ? "right-3" : "left-3"
            } max-w-[88%] bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/90 shadow-xl flex items-center gap-2 text-xs font-extrabold text-charcoal transition-transform duration-500 group-hover:scale-105`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cta animate-ping shrink-0" />
            <span className="truncate">{badgeText}</span>
          </div>
        </div>

        {/* Bottom Studio Frame Footer */}
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-charcoal/60 font-bold px-1">
          <span>DARNA ESSAOUIRA 📍</span>
          <span>50% DEFAULT • 100% HOVER</span>
        </div>
      </div>
    </div>
  );
}
