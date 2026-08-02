"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Heart } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface NavbarProps {
  readonly navLinks: { href: string; label: string }[];
  readonly associationName: string;
}

export default function Navbar({ navLinks, associationName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Common");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Check if we are on home page to determine initial transparency
  const isHomePage = pathname === "/";
  const navbarBgClass = isHomePage
    ? isScrolled
      ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border-custom py-3 text-charcoal"
      : "bg-transparent py-5 text-white"
    : "bg-white/90 backdrop-blur-md shadow-sm border-b border-border-custom py-3 text-charcoal";

  const textColorClass = isHomePage && !isScrolled ? "text-white/90" : "text-charcoal/80";
  const hoverTextColorClass = isHomePage && !isScrolled ? "hover:text-white" : "hover:text-primary";
  const activeColorClass = isHomePage && !isScrolled ? "text-white" : "text-primary";
  const indicatorColorClass = isHomePage && !isScrolled ? "bg-white" : "bg-primary";
  const logoTextColor = isHomePage && !isScrolled ? "text-white" : "text-primary";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${navbarBgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] md:h-20 items-center justify-between">
          {/* Logo & Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative h-14 w-14 md:h-16 md:w-16 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt={associationName}
                  fill
                  sizes="(max-width: 768px) 56px, 64px"
                  className="object-contain drop-shadow-md"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-bold transition-colors ${hoverTextColorClass} ${
                    isActive ? activeColorClass : textColorClass
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`absolute -bottom-2 right-0 left-0 h-0.5 rounded-full ${indicatorColorClass}`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Toggles */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />
            <Link
              href="/projects"
              className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all shadow-md hover:-translate-y-0.5 ${
                isHomePage && !isScrolled
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-cta text-white hover:bg-cta-hover"
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>{t("donateNow")}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 focus:outline-none transition-colors ${
                isHomePage && !isScrolled ? "text-white hover:bg-white/10" : "text-charcoal hover:bg-surface"
              }`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-border-custom bg-white shadow-xl animate-in slide-in-from-top duration-200" id="mobile-menu">
          <div className="space-y-1 px-4 pb-6 pt-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-bold transition-colors ${
                    isActive ? "bg-surface text-primary" : "text-charcoal/80 hover:bg-surface hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border-custom mt-2">
              <Link
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-cta py-3.5 text-center text-base font-bold text-white transition-all hover:bg-cta-hover shadow-md"
              >
                {t("donateNow")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
