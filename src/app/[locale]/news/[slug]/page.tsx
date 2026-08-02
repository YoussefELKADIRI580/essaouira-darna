import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FadeIn } from "@/components/animations/FadeIn";
import { NewsItem } from "@/lib/types";

import { getTranslations, getLocale } from "next-intl/server";

export const revalidate = 0; // Force dynamic rendering for fresh news content

async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data;
}

export default async function NewsDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const news = await getNewsItem(decodedSlug);
  const t = await getTranslations("Home");
  const locale = await getLocale();

  if (!news) {
    notFound();
  }

  // If there is no real content, redirect to homepage or just show excerpt
  const hasContent = news.content && news.content.replace(/<[^>]*>?/gm, '').trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <main className="flex-1 pt-12 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <FadeIn direction="up">
            <Link href="/#news" className="inline-flex items-center gap-2 text-charcoal/60 hover:text-primary transition-colors font-bold mb-8">
              <ArrowRight className="h-5 w-5 rtl:rotate-0 rotate-180" />
              {t("backToNews")}
            </Link>
          </FadeIn>

          <FadeIn delay={0.1} direction="up">
            <header className="mb-12">
              <div className="flex items-center gap-2 text-secondary font-bold mb-4">
                <Calendar className="h-5 w-5" />
                <span>{news.day_text} {news.month_text}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-charcoal leading-tight mb-8">
                {locale === 'fr' ? (news.title_fr || news.title) : locale === 'en' ? (news.title_en || news.title) : news.title}
              </h1>
            </header>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 bg-white flex items-center justify-center border border-border-custom">
              {news.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={news.image_url} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-charcoal/20">
                  <ImageIcon className="h-20 w-20 mb-4" />
                  <span className="font-bold">{t("noImage")}</span>
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border-custom">
              {hasContent ? (
                <div 
                  className="rich-text text-charcoal/80"
                  dangerouslySetInnerHTML={{ __html: locale === 'fr' ? (news.content_fr || news.content || "") : locale === 'en' ? (news.content_en || news.content || "") : (news.content || "") }}
                />
              ) : (
                <p className="text-xl text-charcoal/80 leading-relaxed font-bold text-center py-12">
                  {locale === 'fr' ? (news.excerpt_fr || news.excerpt) : locale === 'en' ? (news.excerpt_en || news.excerpt) : news.excerpt}
                </p>
              )}
            </div>
          </FadeIn>
        </article>
      </main>
    </div>
  );
}
