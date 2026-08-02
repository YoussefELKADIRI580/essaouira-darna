"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const languages = [
    { code: "ar", name: "العربية", dir: "rtl" },
    { code: "fr", name: "Français", dir: "ltr" },
    { code: "en", name: "English", dir: "ltr" },
  ];

  const currentLang = languages.find(l => l.code === currentLocale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (code: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: code });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 sm:px-3 sm:py-2 rounded-full sm:rounded-xl bg-surface text-charcoal border border-border-custom hover:bg-primary/10 hover:text-primary transition-colors shadow-sm flex items-center gap-1.5"
        aria-label="Select Language"
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm font-bold hidden sm:block">{currentLang.name}</span>
        <ChevronDown className="h-4 w-4 hidden sm:block opacity-70" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-32 bg-white rounded-xl shadow-xl border border-border-custom overflow-hidden z-50"
          >
            <div className="flex flex-col py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`px-4 py-2.5 text-sm text-start transition-colors font-medium ${
                    lang.code === currentLocale 
                      ? "text-primary bg-primary/5 font-bold" 
                      : "text-charcoal hover:bg-surface hover:text-primary"
                  }`}
                  dir={lang.dir}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
