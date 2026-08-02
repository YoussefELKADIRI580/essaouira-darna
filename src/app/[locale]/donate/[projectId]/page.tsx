import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Heart, ChevronLeft, Calendar, UserCheck, ImageIcon } from "lucide-react";
import { getProjectBySlug } from "@/lib/queries";
import DonationCard from "@/components/DonationCard";
import RecentDonors from "@/components/RecentDonors";
import { FadeIn } from "@/components/animations/FadeIn";

import { getTranslations, getLocale } from "next-intl/server";

interface PageProps {
  readonly params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProjectBySlug(projectId);
  const locale = await getLocale();

  if (!project) return {};

  const title = locale === 'fr' ? project.title_fr || project.title : locale === 'en' ? project.title_en || project.title : project.title;
  const description = locale === 'fr' ? project.short_description_fr || project.short_description : locale === 'en' ? project.short_description_en || project.short_description : project.short_description;

  return {
    title: `${title} | جمعية الصويرة دارنا`,
    description: description || "مشروع تبرع لدى جمعية الصويرة دارنا لرعاية وتكفل الأطفال",
    openGraph: {
      title: `${title} | جمعية الصويرة دارنا`,
      description: description || "ساهم في تمويل هذا المشروع الإنساني لصالح أطفال دارنا بالصويرة",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | جمعية الصويرة دارنا`,
      description: description || "ساهم في دعم هذا المشروع الإنساني",
    },
  };
}

export default async function ProjectDonationPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = await getProjectBySlug(projectId);
  const t = await getTranslations("Donate");
  const locale = await getLocale();

  if (!project) {
    notFound();
  }

  const actualTargetAmount = project.supplies && project.supplies.length > 0 
    ? project.supplies.reduce((acc: number, item: any) => acc + (item.cost || 0), 0) 
    : (project.target_amount || 0);

  const isCompleted = (project.raised_amount || 0) >= actualTargetAmount;

  const localizedTitle = locale === 'fr' ? project.title_fr : locale === 'en' ? project.title_en : project.title;
  const localizedLongDesc = locale === 'fr' ? project.long_description_fr : locale === 'en' ? project.long_description_en : project.long_description;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      {/* Breadcrumb Navigation */}
      <FadeIn delay={0.1} direction="up">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-charcoal/70 hover:text-primary transition-colors bg-surface px-4 py-2 rounded-xl border border-border-custom hover:border-primary/30"
          >
            <ChevronLeft className="h-4 w-4 transform rtl:rotate-180" />
            {t("backToProjects")}
          </Link>
          <span className="text-sm text-charcoal/50 font-mono bg-surface px-3 py-1.5 rounded-xl border border-border-custom">{t("donationId")}: <span className="font-bold text-primary">{project.slug}</span></span>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Right Details Column (RTL visual start) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <FadeIn delay={0.2} direction="right">
            {/* Status Badge */}
            <div className="flex items-center gap-4 mb-4">
              <span
                className={`inline-flex items-center rounded-xl px-4 py-1.5 text-sm font-bold border ${
                  isCompleted
                    ? "bg-surface text-charcoal/60 border-border-custom"
                    : "bg-cta/10 text-cta border-cta/20"
                }`}
              >
                {isCompleted ? "منجز كامل" : "مستمر ويحتاج تمويلاً"}
              </span>
              <div className="flex items-center gap-2 text-sm text-charcoal/60 font-bold bg-surface px-4 py-1.5 rounded-xl border border-border-custom">
                <Calendar className="h-4 w-4 text-primary" />
                <span>مفتوح للتبرع</span>
              </div>
            </div>

            <h1 className="font-heading text-4xl font-extrabold leading-tight text-charcoal sm:text-5xl">
              {localizedTitle || project.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} direction="right">
            {/* Project Large Image Placeholder */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border-custom bg-surface flex flex-col items-center justify-center text-primary/30 shadow-xl shadow-primary/5">
              <ImageIcon className="h-20 w-20 mb-4 opacity-50" />
              <span className="font-heading text-2xl font-bold text-primary/40">صورة المشروع التفصيلية</span>
              <span className="text-sm font-mono mt-2 text-primary/40">المقاس المقترح: 1200x750 بكسل</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} direction="up">
            {/* Descriptions */}
            <div className="flex flex-col gap-6 text-charcoal/80 leading-relaxed text-lg bg-surface/30 p-8 rounded-3xl border border-border-custom/50">
              <h2 className="font-heading text-3xl font-extrabold text-charcoal flex items-center gap-3">
                <span className="bg-primary/10 w-2 h-8 rounded-full inline-block"></span>
                حول هذا المشروع
              </h2>
              <p className="text-lg">{localizedLongDesc || project.long_description}</p>
              <p className="text-base font-bold text-charcoal/90 bg-white p-5 rounded-2xl border border-border-custom shadow-sm border-r-4 border-r-secondary">
                نحن نحرص في جمعية الصويرة دارنا على الشفافية التامة. سيتم توجيه الدعم المالي مباشرة لتمويل توفير السلع والمستلزمات المبينة في القائمة المقابلة. يمكنك اختيار توفير بند معين بالكامل أو المساهمة بما تجود به نفسك.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} direction="up">
            {/* Guarantee Panel */}
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 flex flex-col sm:flex-row items-start gap-6 shadow-lg shadow-primary/5 hover-lift">
              <div className="rounded-2xl bg-white p-4 text-primary shrink-0 border border-border-custom shadow-sm">
                <UserCheck className="h-8 w-8" />
              </div>
              <div className="flex flex-col gap-2 text-base text-charcoal/80">
                <h3 className="font-heading text-2xl font-extrabold text-charcoal">كفالة وشفافية الصويرة دارنا</h3>
                <p className="leading-relaxed">
                  نلتزم بتزويد جميع المتبرعين بتقارير دورية وصور حية تثبت وصول السلع والمعدات التي تم شراؤها إلى الأطفال المستفيدين داخل الدار.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6} direction="up">
            <RecentDonors projectId={project.id} />
          </FadeIn>
        </div>

        {/* Left Interactive Checklist Column */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <FadeIn delay={0.3} direction="left" className="h-full">
            <div className="rounded-3xl border border-border-custom bg-surface p-8 shadow-2xl shadow-primary/10 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-8 border-b border-border-custom/50 pb-6">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-border-custom">
                  <Heart className="h-6 w-6 text-cta fill-current shrink-0" />
                </div>
                <h2 className="font-heading text-2xl font-extrabold text-charcoal">لوحة المساهمة المباشرة</h2>
              </div>
              
              <DonationCard
                projectId={project.id}
                projectTitle={localizedTitle || project.title}
                initialSupplies={project.supplies ?? []}
                initialRaised={project.raised_amount || 0}
                target={project.supplies && project.supplies.length > 0 
                  ? project.supplies.reduce((acc: number, item: any) => acc + (item.cost || 0), 0) 
                  : (project.target_amount || 0)}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
