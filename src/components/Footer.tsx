import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Heart, MapPin, Phone, Mail, Handshake, Gift, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

interface FooterProps {
  readonly navLinks: { href: string; label: string }[];
  readonly associationInfo: {
    name: string;
    tagline: string;
    address: string;
    phone: string;
    email: string;
  };
}

export default function Footer({ navLinks, associationInfo }: FooterProps) {
  const t = useTranslations("Footer");

  return (
    <footer className="relative w-full bg-primary py-12 text-white mt-12 md:mt-24">
      {/* Global Top Wave Separator sticking up into the section above */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-50 -translate-y-[99%] pointer-events-none">
        <svg className="relative block w-full h-[60px] md:h-[120px] text-primary fill-current rtl:-scale-x-100 transition-transform duration-300" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <div className="relative h-16 w-16 bg-white/10 rounded-xl p-2">
                <Image
                  src="/logo.png"
                  alt={associationInfo.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/80">
              {associationInfo.tagline}
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-secondary">
              {t("quickLinks")}
            </h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sponsor"
                  className="text-sm font-bold text-secondary hover:underline transition-colors flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  كفالة طفل (3,000 د.م / 500 د.م)
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className="text-sm font-bold text-white/90 hover:text-secondary transition-colors flex items-center gap-1"
                >
                  <Handshake className="w-3.5 h-3.5" />
                  برنامج التطوع بالمهارات
                </Link>
              </li>
              <li>
                <Link
                  href="/in-kind"
                  className="text-sm font-bold text-white/90 hover:text-secondary transition-colors flex items-center gap-1"
                >
                  <Gift className="w-3.5 h-3.5 text-secondary" />
                  التبرعات العينية والمستلزمات
                </Link>
              </li>
              <li>
                <Link
                  href="/partnerships"
                  className="text-sm font-bold text-white/90 hover:text-secondary transition-colors flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-300" />
                  المبادرات وصندوق الأفكار
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-secondary">
              {t("contactInfo")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-white/85">
                <MapPin className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                <span>{associationInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/85">
                <Phone className="h-4.5 w-4.5 text-secondary shrink-0" />
                <span dir="ltr">{associationInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/85">
                <Mail className="h-4.5 w-4.5 text-secondary shrink-0" />
                <span>{associationInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-hover pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            {t("rightsReserved")} &copy; {associationInfo.name} {new Date().getFullYear()}
          </p>
          <Link href="/privacy" className="hover:text-white transition-colors underline underline-offset-4">
            {t("privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
