"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Landmark, GraduationCap, Hospital, HeartHandshake, ShieldCheck, FileCheck } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase";
import type { Partner } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark, Building2, HeartHandshake, Hospital, GraduationCap, ShieldCheck, FileCheck,
};

export function PartnersMarquee() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    async function fetchPartners() {
      const { data } = await supabase
        .from("partners")
        .select("*")
        .eq("partner_type", "official")
        .order("sort_order");
      setPartners(data ?? []);
    }
    fetchPartners();
  }, []);

  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...partners, ...partners];

  if (partners.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-background py-12 border-b border-border-custom relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h3 className="text-sm font-bold tracking-widest text-charcoal/50 uppercase">{t("partners")}</h3>
      </div>
      
      <div className="relative flex max-w-[100vw] overflow-hidden">
        {/* Gradients to fade the edges for a smooth entrance/exit effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex whitespace-nowrap gap-12 md:gap-20 items-center px-8"
          dir="ltr" // Force LTR for predictable animation direction
        >
          {marqueeItems.map((partner, index) => {
            const Icon = partner.icon_name ? iconMap[partner.icon_name] : Building2;
            return (
              <div 
                key={index} 
                className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 min-w-max cursor-pointer"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  {Icon && <Icon className="h-8 w-8 text-primary" />}
                </div>
                <span className="font-heading font-bold text-xl text-charcoal" dir={locale === 'ar' ? "rtl" : "ltr"}>
                  {locale === 'fr' ? (partner.name_fr || partner.name) : locale === 'en' ? (partner.name_en || partner.name) : partner.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
