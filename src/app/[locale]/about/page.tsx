import { Heart, Compass, ShieldCheck, Users, ImageIcon, FileText, Download, Calendar, Award, Handshake, Star, Building2, Gift, Coins, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { WatermarkText } from "@/components/WatermarkText";
import { AmbientSidePeek } from "@/components/AmbientSidePeek";
import { getStats, getHistoryTimeline, getAboutContent, getValues, getMembers, getPartners, getAnnualReports } from "@/lib/queries";
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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Compass, ShieldCheck, Users, Award, Handshake, Star, Building2, Gift,
};

export default async function About() {
  const t = await getTranslations("About");
  const locale = await getLocale();
  const [stats, historySteps, introContent, visionContent, missionContent, values, activeMembers, honoraryMembers, centerTeam, donorPartners, institutionalPartners, civilPartners, donorMembers, reports] = await Promise.all([
    getStats("about"),
    getHistoryTimeline(),
    getAboutContent("intro_blocks"),
    getAboutContent("vision"),
    getAboutContent("mission"),
    getValues("about"),
    getMembers("active"),
    getMembers("honorary"),
    getMembers("center_team"),
    getPartners("donor"),
    getPartners("institutional"),
    getPartners("civil"),
    getPartners("donor_member"),
    getAnnualReports(),
  ]);

  const vision = visionContent[0];
  const mission = missionContent[0];

  return (
    <div className="flex flex-col gap-20 py-12 md:py-24 relative overflow-hidden">
      {/* Side Photo Peeks for About Page */}
      <AmbientSidePeek side="left" badgeText="مقر جمعية الصويرة دارنا" className="top-[15%]" />
      <AmbientSidePeek side="right" badgeText="فريق العمل والمتطوعين" className="top-[45%]" />
      <AmbientSidePeek side="left" badgeText="الرسالة والرؤية الميدانية" className="top-[75%]" />
      {/* Intro Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mx-auto">{t("discoverMission")}</span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-extrabold text-charcoal sm:text-6xl leading-tight">{t("associationName")}</h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl leading-relaxed text-charcoal/80">
              {t("associationIntroText")}
            </p>
          </FadeIn>
          <FadeIn delay={0.4} direction="up">
            <div className="mt-12 w-full h-[400px] md:h-[500px] rounded-3xl bg-surface border border-border-custom flex flex-col items-center justify-center text-primary/40 shadow-2xl shadow-primary/5">
              <ImageIcon className="h-20 w-20 mb-4 opacity-50" />
              <span className="font-heading text-2xl font-bold">{t("groupImageSpace")}</span>
              <span className="text-sm font-mono mt-2">{t("suggestedSize")}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4" dir="ltr">
          {stats.map((stat, idx) => (
            <FadeIn key={stat.id} delay={0.1 * idx} direction="up">
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
      </section>

      {/* History Section */}
      <section className="bg-surface/50 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[60px] text-background fill-current rtl:-scale-x-100 transition-transform duration-300 rotate-180" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-extrabold text-charcoal mb-4">{t("associationHistory")}</h2>
              <p className="text-lg text-charcoal/70">{t("historySubtitle")}</p>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:mr-5 before:translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
            {historySteps.map((step, idx) => (
              <FadeIn key={step.id} delay={0.2 + idx * 0.1} direction="up">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] mr-auto md:mr-0 md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-border-custom bg-white shadow-sm group-hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-heading text-2xl font-black text-primary">{step.year}</span>
                      {step.date && <span className="text-sm font-bold text-charcoal/50 bg-surface px-2 py-1 rounded-md">{step.date}</span>}
                    </div>
                    <p className="text-charcoal/80 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Panel */}
      <section className="bg-surface/50 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <WatermarkText text="رسالة" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {vision && (
              <FadeIn delay={0.1} direction="right">
                <div className="flex flex-col gap-6 p-10 rounded-3xl border border-border-custom bg-white/80 backdrop-blur-md shadow-xl shadow-primary/5 hover-lift h-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-charcoal text-xs font-bold w-fit">{t("ourVision")}</span>
                  <h2 className="font-heading text-3xl font-extrabold text-charcoal">{vision.title}</h2>
                  <p className="text-base leading-relaxed text-charcoal/80">{vision.content}</p>
                </div>
              </FadeIn>
            )}
            {mission && (
              <FadeIn delay={0.2} direction="left">
                <div className="flex flex-col gap-6 p-10 rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-md shadow-xl shadow-primary/10 hover-lift h-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold w-fit">{t("ourMission")}</span>
                  <h2 className="font-heading text-3xl font-extrabold text-charcoal">{mission.title}</h2>
                  <p className="text-base leading-relaxed text-charcoal/80">{mission.content}</p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px] pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[60px] text-background fill-current rtl:-scale-x-100 transition-transform duration-300" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
              <h2 className="font-heading text-4xl font-extrabold text-charcoal">{t("ourCoreValues")}</h2>
              <p className="text-lg text-charcoal/70">{t("coreValuesSubtitle")}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val: AssociationValue, idx: number) => {
              const IconComp = val.icon_name ? iconMap[val.icon_name] : Heart;
              return (
                <FadeIn key={val.id} delay={0.2 + idx * 0.1} direction="up">
                  <div className="flex flex-col gap-5 p-8 rounded-2xl border border-border-custom bg-white shadow-xl shadow-primary/5 text-center items-center hover-lift group h-full">
                    <div className="rounded-2xl bg-surface p-4 text-primary group-hover:scale-110 transition-transform duration-300">
                      {IconComp && <IconComp className="h-8 w-8" />}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal">
                      {locale === 'fr' ? (val.title_fr || val.title) : locale === 'en' ? (val.title_en || val.title) : val.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal/80">
                      {locale === 'fr' ? (val.description_fr || val.description) : locale === 'en' ? (val.description_en || val.description) : val.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teams and Members */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1} direction="up">
          <div className="text-center mb-16 border-t border-border-custom/50 pt-20">
            <h2 className="font-heading text-4xl font-extrabold text-charcoal mb-4">{t("teamAndFounders")}</h2>
            <p className="text-lg text-charcoal/70">{t("teamSubtitle")}</p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn delay={0.2} direction="right">
              <div className="p-8 rounded-3xl border border-border-custom bg-surface h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl"><Users className="w-6 h-6" /></div>
                  <h3 className="font-heading text-2xl font-bold text-charcoal">{t("activeMembers")}</h3>
                </div>
                <ul className="flex flex-col gap-4">
                  {activeMembers.map((m) => (
                    <li key={m.id} className="flex justify-between items-center p-4 bg-white rounded-xl border border-border-custom/50 hover:border-primary/30 transition-colors">
                      <span className="font-bold text-charcoal">{m.name}</span>
                      <span className="text-sm text-primary bg-primary/5 px-3 py-1 rounded-full font-medium" dir="ltr">{m.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="left">
              <div className="p-8 rounded-3xl border border-border-custom bg-surface h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl"><Award className="w-6 h-6" /></div>
                  <h3 className="font-heading text-2xl font-bold text-charcoal">{t("centerTeam")}</h3>
                </div>
                <ul className="flex flex-col gap-4">
                  {centerTeam.map((m) => (
                    <li key={m.id} className="flex justify-between items-center p-4 bg-white rounded-xl border border-border-custom/50 hover:border-secondary/30 transition-colors">
                      <span className="font-bold text-charcoal">{m.name}</span>
                      <span className="text-sm text-secondary bg-secondary/5 px-3 py-1 rounded-full font-medium" dir="ltr">{m.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Honorary Members */}
          <FadeIn delay={0.4} direction="up">
            <div className="p-8 md:p-12 rounded-3xl bg-charcoal text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-white/10 text-yellow-400 rounded-xl"><Star className="w-6 h-6" /></div>
                  <h3 className="font-heading text-3xl font-bold">{t("honoraryMembers")}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {honoraryMembers.map((m) => (
                    <div key={m.id} className="flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <span className="font-bold text-xl">{m.name}</span>
                      <span className="text-white/60 font-medium" dir="ltr">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-surface/50 relative py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[60px] text-background fill-current rtl:-scale-x-100 transition-transform duration-300 rotate-180" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-extrabold text-charcoal mb-4">{t("sponsorsAndPartners")}</h2>
              <p className="text-lg text-charcoal/70">{t("sponsorsSubtitle")}</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <FadeIn delay={0.2} direction="up">
              <div className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-border-custom shadow-sm h-full hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 border-b border-border-custom pb-4">
                  <Handshake className="w-6 h-6 text-primary" />
                  <h3 className="font-heading text-xl font-bold text-charcoal">{t("donorPartners")}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {donorPartners.map((p) => (
                    <li key={p.id} className="text-charcoal/80 flex items-start gap-2 before:content-['•'] before:text-primary before:font-bold" dir="ltr">
                      <span className="text-right w-full">{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <div className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-border-custom shadow-sm h-full hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 border-b border-border-custom pb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h3 className="font-heading text-xl font-bold text-charcoal">{t("institutionalPartners")}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {institutionalPartners.map((p) => (
                    <li key={p.id} className="text-charcoal/80 flex items-start gap-2 before:content-['•'] before:text-primary before:font-bold" dir="ltr">
                      <span className="text-right w-full">{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <div className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-border-custom shadow-sm h-full hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 border-b border-border-custom pb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="font-heading text-xl font-bold text-charcoal">{t("civilPartners")}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {civilPartners.map((p) => (
                    <li key={p.id} className="text-charcoal/80 flex items-start gap-2 before:content-['•'] before:text-primary before:font-bold" dir="ltr">
                      <span className="text-right w-full">{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} direction="up">
            <div className="p-8 rounded-3xl border border-primary/20 bg-primary/5 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Gift className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl font-bold text-charcoal">{t("donorMembers")}</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {donorMembers.map((m) => (
                  <span key={m.id} className="px-4 py-2 bg-white border border-border-custom shadow-sm rounded-full text-sm font-medium text-charcoal hover:border-primary/40 transition-colors" dir="ltr">
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 mb-16">
              <span className="text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 py-1.5 px-4 rounded-full w-max mx-auto">{t("transparency")}</span>
              <h2 className="font-heading text-4xl font-extrabold text-charcoal">{t("annualReports")}</h2>
              <p className="text-lg text-charcoal/70">{t("reportsSubtitle")}</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reports.map((report, idx) => (
              <FadeIn key={report.id} delay={0.2 + idx * 0.1} direction="up">
                <div className="flex flex-col p-6 rounded-2xl border border-border-custom bg-surface hover:border-primary/40 transition-colors shadow-sm hover:shadow-lg group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:scale-110 transition-transform">
                      <FileText className="w-8 h-8" />
                    </div>
                    <span className="font-mono text-charcoal/50 text-sm font-bold bg-white px-3 py-1 rounded-lg border border-border-custom">
                      {report.file_size}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-charcoal mb-2">{t("annualReport")} {report.year}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-6 flex-grow">{report.description}</p>
                  <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white border border-border-custom text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    {t("downloadReport")}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
