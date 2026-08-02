"use client";

import React, { useEffect, useState } from "react";
import { FadeIn } from "./FadeIn";
import { Counter } from "./Counter";
import { supabase } from "@/lib/supabase";
import type { TransparencyItem } from "@/lib/types";

export function TransparencyChart() {
  const [data, setData] = useState<TransparencyItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: items } = await supabase
        .from("transparency_data")
        .select("*")
        .order("sort_order");
      setData(items ?? []);
    }
    fetchData();
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
      
      <div className="relative z-10 flex flex-col gap-8">
        {data.map((item, index) => (
          <FadeIn key={item.id} delay={0.2 + index * 0.1} direction="up" className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-white">
              <span className="font-bold text-lg">{item.label}</span>
              <span className="font-bold text-xl font-mono">
                <Counter to={item.percentage} suffix="%" duration={2} />
              </span>
            </div>
            {/* The Track */}
            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden shadow-inner relative">
              {/* The Fill */}
              <div
                className={`h-full rounded-full ${item.color ?? 'bg-primary'} shadow-[0_0_10px_currentColor]`}
                style={{ 
                  width: `${item.percentage}%`,
                  transition: "width 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              />
            </div>
          </FadeIn>
        ))}
      </div>
      
      <FadeIn delay={0.8} direction="up" className="mt-10 pt-6 border-t border-white/20 text-center relative z-10">
        <p className="text-white/70 text-sm font-bold tracking-wider">
          * تقاريرنا المالية خاضعة للتدقيق السنوي لضمان أعلى معايير الشفافية
        </p>
      </FadeIn>
    </div>
  );
}
