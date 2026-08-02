"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { ImageIcon, ChevronRight, ChevronLeft } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";

interface NewsCarouselProps {
  newsItems: NewsItem[];
}

export function NewsCarousel({ newsItems }: NewsCarouselProps) {
  const locale = useLocale();
  const t = useTranslations("Common");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Responsive logic to know how many items are shown
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const totalPages = Math.max(1, Math.ceil(newsItems.length / itemsToShow));
  const maxIndex = Math.max(0, newsItems.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsToShow, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsToShow, 0));
  };

  const goToDot = (pageIndex: number) => {
    // pageIndex is 0-based
    const newIndex = Math.min(pageIndex * itemsToShow, maxIndex);
    setCurrentIndex(newIndex);
  };

  if (!newsItems || newsItems.length === 0) return null;

  // Calculate the translate percentage based on currentIndex and RTL
  // Each item takes 100% / itemsToShow width. 
  // In RTL, translating to the right (positive X) goes to previous, positive X goes to next?
  // Wait, in RTL, the items flow right-to-left. To see the next items (which are visually on the left), we must translate the container to the right (positive X).
  // Actually, CSS flex with gap makes translation math tricky. Let's just slice the array for simplicity and perfectly smooth fading.

  const visibleItems = newsItems.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden min-h-[500px]">
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 z-20 bg-white/80 hover:bg-white backdrop-blur-md text-charcoal p-3 rounded-full shadow-lg border border-border-custom transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {currentIndex < maxIndex && (
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 z-20 bg-white/80 hover:bg-white backdrop-blur-md text-charcoal p-3 rounded-full shadow-lg border border-border-custom transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Cards Grid */}
        <div 
          className="grid gap-8 transition-all duration-500 ease-in-out"
          style={{ 
            gridTemplateColumns: `repeat(${itemsToShow}, minmax(0, 1fr))`
          }}
        >
          {visibleItems.map((news, idx) => (
            <FadeIn key={`${news.id}-${currentIndex}`} delay={idx * 0.1} direction="up">
              <div className="flex flex-col bg-white/60 backdrop-blur-md border border-border-custom rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 h-full group overflow-hidden">
                <div className="relative aspect-[4/3] bg-surface flex flex-col items-center justify-center text-primary/40 group-hover:text-primary/60 transition-colors overflow-hidden">
                  {news.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={news.image_url} alt={news.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 mb-2 transition-transform duration-500 group-hover:scale-110" />
                      <span className="text-xs font-bold text-center">مساحة لصورة الخبر<br />600x400</span>
                    </>
                  )}

                  {/* Date Badge */}
                  {news.day_text && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl text-center shadow-lg flex flex-col min-w-[3.5rem] transform transition-transform duration-500 group-hover:-translate-y-1">
                      <span className="text-2xl font-black text-charcoal leading-none" dir="ltr">{news.day_text}</span>
                      <span className="text-xs font-bold text-charcoal/60 mt-1">{news.month_text}</span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-1 text-center items-center">
                  <h3 className="font-heading text-xl font-bold text-charcoal mb-4 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                    {locale === 'fr' ? (news.title_fr || news.title) : locale === 'en' ? (news.title_en || news.title) : news.title}
                  </h3>
                  <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                    {locale === 'fr' ? (news.excerpt_fr || news.excerpt) : locale === 'en' ? (news.excerpt_en || news.excerpt) : news.excerpt}
                  </p>
                  {(news.content && news.content.replace(/<[^>]*>?/gm, '').trim().length > 0) ? (
                    <Link href={news.slug ? `/news/${news.slug}` : "#"} className="text-xs font-bold text-primary uppercase tracking-wider hover:text-secondary transition-colors inline-flex items-center gap-2">
                      {t("readMore")}
                      <span className="text-lg leading-none">&rarr;</span>
                    </Link>
                  ) : (
                    <div className="h-4"></div> /* Spacer if no link */
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Interactive Dots Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12 mb-4">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const isActivePage = Math.floor(currentIndex / itemsToShow) === idx;
            return (
              <button
                key={idx}
                onClick={() => goToDot(idx)}
                className={`transition-all duration-300 rounded-full ${
                  isActivePage 
                    ? "w-8 h-2.5 bg-primary shadow-md shadow-primary/30" 
                    : "w-2.5 h-2.5 bg-charcoal/20 hover:bg-charcoal/40"
                }`}
                aria-label={`الذهاب للصفحة ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
