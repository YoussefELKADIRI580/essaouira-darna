import React from "react";
import Link from "next/link";
import { Heart, ShieldCheck, Award, ArrowRight, HeartHandshake, ImageIcon, Users, BookOpen, Handshake, CheckCircle, Eye, Network, Coins, Wallet, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { WatermarkText } from "@/components/WatermarkText";
import { PartnersMarquee } from "@/components/animations/PartnersMarquee";
import { NewsCarousel } from "@/components/NewsCarousel";
import { AmbientSidePeek } from "@/components/AmbientSidePeek";
import { getStats, getValues, getNews, getAboutContent } from "@/lib/queries";
import { getTranslations, getLocale } from "next-intl/server";
import type { AssociationValue } from "@/lib/types";

// Helper to return icon specific to stat type
function getStatIcon(label?: string | null) {
  const l = (label || "").toLowerCase();
  if (l.includes("beneficiary") || l.includes("مستفيد") || l.includes("bénéficiaire")) {
    return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors duration-300" />;
  }
  if (l.includes("mad") || l.includes("درهم") || l.includes("budget") || l.includes("donation") || l.includes("تبرع")) {
    return <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors duration-300" />;
  }
  return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors duration-300" />;
}

// Map icon names from DB to actual Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Handshake, CheckCircle, Network, Users, ShieldCheck, Heart, Eye, BookOpen,
};

export const revalidate = 0; // Force dynamic rendering so news updates instantly

export default async function Home() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const locale = await getLocale();
  const [stats, values, newsItems, introBlocks] = await Promise.all([
    getStats("home"),
    getValues("home"),
    getNews(),
    getAboutContent("intro_blocks"),
  ]);

  return (
    <div className="flex flex-col w-full selection:bg-secondary/30">

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] text-white overflow-hidden flex items-center justify-center pt-20 bg-charcoal">
        {/* Cinematic Video Background & Overlays */}
        <div className="absolute inset-0 z-0 bg-charcoal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/association-darna-4.jpg"
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-primary/30 to-charcoal/95" />
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-secondary rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-cta rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full py-12 md:py-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left side (RTL -> Right side): Headline & description */}
            <div className="flex flex-col gap-8">
              <FadeIn delay={0.1} direction="up">
                <div className="inline-flex max-w-max items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm font-bold text-secondary shadow-lg">
                  <span className="relative flex h-3 w-3 mr-2 rtl:ml-2 rtl:mr-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                  </span>
                  {t("heroMission")}
                </div>
              </FadeIn>

              <FadeIn delay={0.2} direction="up">
                <h1 className="font-heading text-5xl font-extrabold leading-[1.2] tracking-tight sm:text-6xl md:text-7xl drop-shadow-lg">
                  <span className="block text-white">{t("heroTitle1")}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">
                    {t("heroTitle2")}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3} direction="up">
                <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-xl font-medium drop-shadow-md">
                  {t("heroSubtitle")}
                </p>
              </FadeIn>

              <FadeIn delay={0.4} direction="up">
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link
                    href="/donate"
                    className="inline-flex h-14 items-center justify-center rounded-xl bg-cta px-8 font-bold text-white transition-all hover:bg-cta-hover hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-95 text-lg"
                  >
                    {tCommon("donateNow")}
                    <ArrowRight className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right side (RTL -> Left side): Hero Featured Image Frame */}
            <div className="relative">
              <FadeIn delay={0.5} direction="left">
                <div className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center mt-8 lg:mt-0">
                  {/* Orbiting dashed circles */}
                 <div className="absolute inset-0 rounded-full border-[1px] border-dashed border-white/30 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-8 rounded-full border-[1px] border-dashed border-secondary/40 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-16 rounded-full border-[1px] border-solid border-primary/30 animate-[spin_30s_linear_infinite]" />
                   {/* Glowing center orb */}
                  <div className="relative z-10 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 backdrop-blur-xl border border-white/30 shadow-[0_0_50px_rgba(249,115,22,0.4)] animate-pulse">
                    <HeartHandshake className="w-16 h-16 text-white drop-shadow-xl" />
                  </div>

                  {/* Floating badge elements */}
                 <div className="absolute top-[10%] left-[15%] animate-[bounce_3s_ease-in-out_infinite]">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rotate-12">
                      <Users className="w-8 h-8 text-secondary drop-shadow-md" />
                    </div>
                  </div>

                  <div className="absolute bottom-[15%] right-[10%] animate-[bounce_4s_ease-in-out_infinite_reverse]">
                    <div className="p-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl -rotate-12">
                      <ShieldCheck className="w-10 h-10 text-primary drop-shadow-md" />
                    </div>
                  </div>

                   <div className="absolute top-[20%] right-[15%] animate-[bounce_5s_ease-in-out_infinite]">
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                      <Heart className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="absolute bottom-[25%] left-[10%] animate-[bounce_6s_ease-in-out_infinite_reverse]">
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rotate-45">
                      <Award className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                  </div>
                  
                  {/* Expanding ripples */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-secondary/40 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '1s' }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Wave bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[2px]">
          <svg className="relative block w-full h-[60px] md:h-[120px] text-background fill-current drop-shadow-sm rtl:-scale-x-100 transition-transform duration-300" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C150,120 250,0 400,50 C550,100 650,-10 800,40 C950,90 1050,-20 1200,30 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Partners Marquee */}
      <PartnersMarquee />

      {/* Impact Summary Section */}
      <section className="bg-background py-20 relative z-20 overflow-hidden">
        <AmbientSidePeek side="left" badgeText="مأوى ورعاية الأطفال - الصويرة" src="/img/darna-1.jpeg" className="top-16" />
        <WatermarkText text="معاينة" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-4 max-w-5xl mx-auto mb-16" dir="ltr">
            {(stats || []).map((stat, idx) => (
              <FadeIn key={stat.id} delay={0.1 + idx * 0.08} direction="up">
                <div className="group relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 border border-border-custom shadow-md shadow-primary/5 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-6">
                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/20 group-hover:bg-primary transition-colors duration-300 rounded-l-2xl" />

                  {/* 1. Far Left: Icon specific to type */}
                  <div className="shrink-0 pl-2 sm:pl-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all duration-300 border border-primary/20 shadow-sm">
                      {getStatIcon(stat.label || stat.label_en || stat.label_fr)}
                    </div>
                  </div>

                  {/* 2. Middle-Left: Context / Description */}
                  <div className="flex-1 text-left px-2">
                    <p className="text-xs sm:text-base text-charcoal/80 font-medium leading-snug sm:leading-relaxed">
                      {locale === 'fr' ? (stat.description_fr || stat.description) : locale === 'en' ? (stat.description_en || stat.description) : stat.description}
                    </p>
                  </div>

                  {/* 3. Center: Type / Label (نوع) */}
                  <div className="shrink-0 text-center px-2">
                    <span className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      {locale === 'fr' ? (stat.label_fr || stat.label) : locale === 'en' ? (stat.label_en || stat.label) : stat.label}
                    </span>
                  </div>

                  {/* 4. Far Right: Number / Value (رقم) */}
                  <div className="shrink-0 text-right pr-1 sm:pr-2">
                    <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight group-hover:text-primary transition-colors duration-300 whitespace-nowrap" dir="ltr">
                      {stat.value}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6} direction="up">
            <div className="flex justify-center">
              <Link href="/donate" className="inline-flex h-14 items-center justify-center rounded-xl bg-cta px-10 font-bold text-white transition-all hover:bg-cta-hover hover:scale-105 active:scale-95 text-lg shadow-lg">
                {t("donateHope")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* من نحن Section Grid */}
      <section className="py-24 bg-white border-y border-border-custom relative overflow-hidden">
        <AmbientSidePeek side="right" badgeText="أنشطة الجمعية الميدانية" src="/img/darna-2.jpeg" className="top-12" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 mb-16">
              <h2 className="font-heading text-4xl font-extrabold text-charcoal">{t("aboutUs")}</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(introBlocks || []).map((block, idx) => (
              <FadeIn key={block.id} delay={0.2 + idx * 0.1} direction="up">
                <div className="flex items-start gap-6 p-8 rounded-2xl bg-surface border border-border-custom h-full hover:border-primary/30 transition-colors">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <span className="font-bold text-2xl font-heading">{idx + 1}</span>
                  </div>
                  <p className="text-lg text-charcoal/80 leading-relaxed pt-2 font-medium">
                    {locale === 'fr' ? (block.content_fr || block.content) : locale === 'en' ? (block.content_en || block.content) : block.content}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
        <AmbientSidePeek side="left" badgeText="كفالة وحقيبة مدرسية" src="/img/darna-3.jpeg" className="top-20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-6 mb-16">
              <h2 className="font-heading text-4xl font-extrabold text-primary">{t("ourValues")}</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                {t("valuesDesc")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(values || []).map((val: AssociationValue, idx: number) => {
              const IconComp = val.icon_name ? iconMap[val.icon_name] : Award;
              return (
                <FadeIn key={val.id} delay={0.2 + idx * 0.1} direction="up">
                  <div className="flex flex-col items-center text-center p-10 rounded-2xl bg-white shadow-lg shadow-primary/5 border border-border-custom hover-lift h-full group">
                    <div className="rounded-2xl bg-surface p-5 text-primary mb-6 transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      {IconComp && <IconComp className="h-8 w-8" />}
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      {locale === 'fr' ? (val.title_fr || val.title) : locale === 'en' ? (val.title_en || val.title) : val.title}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed text-sm font-medium">
                      {locale === 'fr' ? (val.description_fr || val.description) : locale === 'en' ? (val.description_en || val.description) : val.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Wave to News */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="relative block w-full h-[40px] md:h-[80px] text-white fill-current rtl:-scale-x-100 transition-transform duration-300" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C400,150 800,-30 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white border-t border-border-custom relative overflow-hidden">
        <AmbientSidePeek side="right" badgeText="فعاليات ومناسبات دارنا" src="/img/darna-4.jpeg" className="top-16" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-6 mb-16">
              <h2 className="font-heading text-4xl font-extrabold text-charcoal relative inline-block">
                {t("newsSectionTitle")}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary/20 rounded-full"></span>
              </h2>
            </div>
          </FadeIn>

          <NewsCarousel newsItems={newsItems} />
        </div>

        {/* Wave to CTA */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="relative block w-full h-[60px] md:h-[120px] text-charcoal fill-current rtl:-scale-x-100 transition-transform duration-300" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative w-full bg-charcoal py-32 text-white text-center overflow-hidden">
        {/* Abstract shapes for CTA */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[20%] w-[70%] h-[200%] bg-primary/20 transform rotate-12 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[50%] -right-[20%] w-[70%] h-[200%] bg-secondary/20 transform -rotate-12 rounded-full blur-[100px]" />
        </div>

        <FadeIn delay={0.2} direction="up" className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 text-cta border border-white/20 shadow-2xl hover:scale-110 transition-transform duration-500">
            <HeartHandshake className="h-12 w-12" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white">{t("ctaTitle")}</h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-6 w-full sm:w-auto">
            <Link
              href="/donate"
              className="inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-xl bg-cta px-12 text-xl font-bold text-white transition-all hover:bg-cta-hover hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              {t("donateHope")}
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
