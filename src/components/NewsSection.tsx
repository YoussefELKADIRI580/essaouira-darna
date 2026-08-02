import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { getNews } from "@/lib/queries";
import { ImageIcon } from "lucide-react";

export async function NewsSection() {
  const news = await getNews();

  if (!news || news.length === 0) {
    return null; // Don't show the section if there's no news
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="news">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-charcoal mb-6 relative inline-block">
              الإخبارية
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-primary rounded-full"></span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <FadeIn key={item.id} delay={0.1 * (index + 1)} direction="up">
              <div className="group flex flex-col h-full bg-white border border-border-custom hover:border-primary/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Image Section */}
                <div className="relative h-56 bg-surface overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url || `/img/darna-${(index % 25) + 1}.jpeg`}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-2 min-w-[3.5rem] transform transition-transform group-hover:-translate-y-1">
                    <span className="text-xl font-extrabold text-charcoal leading-none">{item.day_text}</span>
                    <span className="text-xs font-bold text-charcoal/60 mt-1">{item.month_text}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow p-6 sm:p-8">
                  <h3 className="font-heading text-xl font-bold text-charcoal mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {item.excerpt}
                  </p>
                  
                  <Link 
                    href={`/news/${item.slug}`} 
                    className="inline-flex items-center text-xs font-extrabold text-primary tracking-wider uppercase hover:text-primary-hover transition-colors mt-auto"
                    dir="ltr"
                  >
                    CONTINUE READING
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        
        {/* Pagination Dots Indicator (Visual Only for now based on screenshot) */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <div className="w-2.5 h-2.5 rounded-full bg-charcoal/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-charcoal"></div>
        </div>
      </div>
    </section>
  );
}
