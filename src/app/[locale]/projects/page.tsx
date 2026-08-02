import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ImageIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Counter } from "@/components/animations/Counter";
import { TransparencyChart } from "@/components/animations/TransparencyChart";
import { AmbientSidePeek } from "@/components/AmbientSidePeek";
import { getProjectsWithSupplies } from "@/lib/queries";
import { getLocale } from "next-intl/server";

export const dynamic = 'force-dynamic';

export default async function Projects() {
  const projectsData = await getProjectsWithSupplies();
  const locale = await getLocale();

  return (
    <div className="flex flex-col gap-16 py-12 md:py-24 relative overflow-hidden">
      {/* Side Photo Peeks for Projects Page */}
      <AmbientSidePeek side="right" badgeText="مشاريع إيواء وتأهيل الأطفال" className="top-[20%]" />
      <AmbientSidePeek side="left" badgeText="توفير الكتب والأدوات المدرسية" className="top-[60%]" />
      {/* Intro Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-charcoal text-sm font-bold tracking-wider mx-auto">
              مبادراتنا وتأثيرنا
            </span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              نصنع <span className="text-secondary relative whitespace-nowrap">
                الأمل
                <svg className="absolute -bottom-2 right-0 w-full" viewBox="0 0 100 15" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-secondary/30" />
                </svg>
              </span>
              <br />
              <span className="text-primary mt-2 block">في حياة كل طفل</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-lg leading-relaxed text-charcoal/80 max-w-2xl mx-auto">
              تتنوع برامجنا ومشاريعنا لتشمل جميع جوانب حياة الأطفال الصعبة بالصويرة. من توفير المأوى إلى التعليم والرعاية الصحية، نسعى لتقديم دعم متكامل ومستدام.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, idx) => {
            const actualTargetAmount = project.supplies && project.supplies.length > 0 
              ? project.supplies.reduce((acc: number, item: any) => acc + (item.cost || 0), 0) 
              : (project.target_amount || 0);
              
            const raised = project.raised_amount || 0;
            const rawPercentage = (raised / actualTargetAmount) * 100;
            const progressPercentage = Math.min(
              100,
              raised > 0 && rawPercentage < 1 ? 1 : Math.round(rawPercentage)
            );

            const isActive = raised < actualTargetAmount;

            const localizedTitle = locale === 'fr' ? project.title_fr : locale === 'en' ? project.title_en : project.title;
            const localizedShortDesc = locale === 'fr' ? project.short_description_fr : locale === 'en' ? project.short_description_en : project.short_description;

            return (
              <FadeIn key={project.id} delay={0.1 + idx * 0.1} direction="up">
                <div
                  className="flex flex-col overflow-hidden rounded-3xl border border-border-custom bg-white shadow-xl shadow-primary/5 hover-lift group h-full"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] w-full bg-surface border-b border-border-custom flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 group-hover:scale-105 transition-transform duration-500"></div>
                    <ImageIcon className="h-12 w-12 text-primary/30 mb-2 relative z-10" />
                    <span className="text-sm font-bold text-primary/40 relative z-10">صورة المشروع ({localizedTitle || project.title})</span>
                    <span className="text-xs font-mono text-primary/40 relative z-10">المقاس: 600x450 بكسل</span>
                    
                    <div
                      className={`absolute top-4 right-4 rounded-xl px-3 py-1.5 text-xs font-bold text-white shadow-md z-20 backdrop-blur-md ${
                        isActive ? "bg-cta/90 border border-cta" : "bg-charcoal/70 border border-charcoal"
                      }`}
                    >
                      {isActive ? "مستمر" : "منجز كامل"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-5 p-8 flex-1 justify-between">
                    <div className="flex flex-col gap-5">
                      <h3 className="font-heading text-2xl font-bold text-charcoal">{localizedTitle || project.title}</h3>
                      <p className="text-sm leading-relaxed text-charcoal/80">
                        {localizedShortDesc || project.short_description}
                      </p>

                      {/* Funding Progress */}
                      <div className="flex flex-col gap-3 mt-2 bg-surface/50 p-4 rounded-2xl border border-border-custom/50">
                        <div className="flex items-center justify-between text-sm font-bold text-charcoal/80">
                          <span className="text-charcoal/60">تم جمع <span className="text-cta"><Counter to={project.raised_amount || 0} duration={1.5} /> د.م.</span></span>
                          <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md"><Counter to={progressPercentage} duration={1.5} />%</span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-white overflow-hidden border border-border-custom/50 shadow-inner">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              isActive ? "bg-gradient-to-r from-primary to-secondary" : "bg-charcoal/40"
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-charcoal/60">
                          <span>الهدف: {actualTargetAmount.toLocaleString()} د.م.</span>
                          {!isActive && (
                            <span className="text-charcoal bg-charcoal/10 px-2 py-1 rounded-md flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" /> تم التمويل بنجاح
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Button / Details Link */}
                    <div className="mt-4 flex items-center justify-between pt-2">
                      {isActive ? (
                        <Link
                          href={`/donate/${project.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary-hover active:scale-95 shadow-md hover:shadow-[0_0_15px_rgba(8,145,178,0.3)]"
                        >
                          تبرع الآن
                        </Link>
                      ) : (
                        <span className="text-sm text-charcoal/60 font-bold bg-surface px-4 py-2.5 rounded-xl border border-border-custom">مكتمل بالكامل</span>
                      )}
                      <Link
                        href={`/donate/${project.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-charcoal/70 hover:text-primary transition-colors group/link"
                      >
                        التفاصيل <ChevronRight className="h-4 w-4 group-hover/link:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-charcoal pt-32 pb-20 text-center relative overflow-hidden">
        {/* Top Wave from previous white section */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[60px] text-background fill-current rtl:-scale-x-100 transition-transform duration-300 rotate-180" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8 relative z-10">
          <FadeIn delay={0.2} direction="up" className="flex flex-col gap-8">
            <h2 className="font-heading text-4xl font-extrabold text-white">كيف تصرف التبرعات؟</h2>
            <p className="text-xl leading-relaxed text-white/80">
              نحن ملتزمون بالشفافية المطلقة. يوجه كل درهم تتبرع به مباشرة لتلبية الاحتياجات الأساسية للأطفال المقيمين أو لتمويل البرامج التعليمية والصحية التي يستفيدون منها. يمكنك تتبع الفواتير والتقارير المالية السنوية عبر التواصل معنا أو زيارة مقر الجمعية بالصويرة.
            </p>
          </FadeIn>
          
          <TransparencyChart />
        </div>
      </section>
    </div>
  );
}
