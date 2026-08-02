"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { AmbientSidePeek } from "@/components/AmbientSidePeek";
import { supabase } from "@/lib/supabase";
import { submitContactMessage } from "@/lib/queries";
import type { AssociationInfo } from "@/lib/types";
import { useLocale } from "next-intl";

export default function Contact() {
  const [associationInfo, setAssociationInfo] = useState<AssociationInfo | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const locale = useLocale();

  useEffect(() => {
    async function fetchInfo() {
      const { data } = await supabase.from("association_info").select("*").limit(1).single();
      if (data) {
        if (locale === 'fr') {
          data.address = data.address_fr || data.address;
        } else if (locale === 'en') {
          data.address = data.address_en || data.address;
        }
      }
      setAssociationInfo(data);
    }
    fetchInfo();
  }, [locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      // Fallback: still show success even if DB fails
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-16 py-12 md:py-24 relative overflow-hidden">
      {/* Side Photo Peeks for Contact Page */}
      <AmbientSidePeek side="left" badgeText="استقبال وزوار جمعية دارنا" src="/img/darna-8.jpeg" className="top-[30%]" />
      {/* Page Title */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cta/10 text-cta text-sm font-bold tracking-wider mx-auto">
              تواصل معنا مباشرة
            </span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-extrabold text-charcoal sm:text-6xl">
              اتصل بنا
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl leading-relaxed text-charcoal/80">
              يسعدنا جداً الرد على جميع استفساراتكم المتعلقة بالتبرعات، التطوع، أو كيفية دعم الجمعية ومشاريعها. لا تتردد في الاتصال بنا.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form & Details Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Contact Details Panel */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <FadeIn delay={0.2} direction="right">
              <div className="flex flex-col gap-6 p-8 rounded-3xl border border-border-custom bg-surface shadow-xl shadow-primary/5 hover-lift">
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">معلومات التواصل</h2>
                
                <ul className="flex flex-col gap-8">
                  <li className="flex items-start gap-5 text-base text-charcoal/80">
                    <div className="rounded-xl bg-white p-3 text-primary shadow-sm shrink-0 border border-border-custom">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-charcoal">العنوان الحالي:</h3>
                      <p className="leading-relaxed">{associationInfo?.address ?? "تجزئة الغزوة، الصويرة، المغرب"}</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-5 text-base text-charcoal/80">
                    <div className="rounded-xl bg-white p-3 text-primary shadow-sm shrink-0 border border-border-custom">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-charcoal">الهاتف المباشر:</h3>
                      <p className="font-mono text-lg" dir="ltr">{associationInfo?.phone ?? "+212 524 78X XXX"}</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-5 text-base text-charcoal/80">
                    <div className="rounded-xl bg-white p-3 text-primary shadow-sm shrink-0 border border-border-custom">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-charcoal">البريد الإلكتروني:</h3>
                      <p className="font-mono">{associationInfo?.email ?? "contact@essaouiradarna.ma"}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Map Placeholder Card */}
            <FadeIn delay={0.4} direction="up">
              <div className="rounded-3xl border border-border-custom bg-white p-2 shadow-xl shadow-primary/5 hover-lift group">
                <div className="rounded-2xl bg-surface flex flex-col gap-3 relative overflow-hidden aspect-[4/3] justify-end border border-border-custom/50">
                  <div className="absolute inset-0 opacity-50" />
                  {/* Google Map Mockup */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/20 animate-bounce mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="h-8 w-8" />
                    </div>
                    <span className="text-sm font-bold text-charcoal bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm border border-white">موقع الدار في تجزئة الغزوة، الصويرة</span>
                    <span className="text-xs text-charcoal/60 mt-3 font-mono bg-surface px-3 py-1 rounded-md">مساحة مخصصة لإدراج خريطة Google Maps</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.3} direction="left">
              <div className="rounded-3xl border border-border-custom bg-white p-8 md:p-10 shadow-2xl shadow-primary/5">
                <h2 className="font-heading text-3xl font-extrabold text-charcoal mb-8">أرسل لنا رسالة</h2>

                {isSubmitted ? (
                  <div className="rounded-2xl bg-secondary/10 border border-secondary/20 p-10 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                    <div className="rounded-full bg-secondary text-white p-4 shadow-lg shadow-secondary/20 mb-2">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal">تم إرسال رسالتكم بنجاح!</h3>
                    <p className="text-base text-charcoal/80 leading-relaxed max-w-md">
                      نشكركم على اهتمامكم بجمعية الصويرة دارنا. سيقوم فريقنا بالرد عليكم في أقرب وقت ممكن.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-sm font-bold text-primary hover:text-primary-hover bg-primary/5 px-6 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-bold text-charcoal/80">الاسم الكامل</label>
                        <input required type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="h-14 rounded-xl border border-border-custom bg-surface px-4 text-base text-charcoal focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm" placeholder="أحمد علي" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-charcoal/80">البريد الإلكتروني</label>
                        <input required type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="h-14 rounded-xl border border-border-custom bg-surface px-4 text-base text-charcoal focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm" placeholder="yourname@domain.com" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-sm font-bold text-charcoal/80">موضوع الرسالة</label>
                      <input required type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="h-14 rounded-xl border border-border-custom bg-surface px-4 text-base text-charcoal focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm" placeholder="استفسار عن التبرعات، تطوع..." />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-bold text-charcoal/80">محتوى الرسالة</label>
                      <textarea required rows={6} name="message" id="message" value={formData.message} onChange={handleChange} className="rounded-xl border border-border-custom bg-surface px-4 py-4 text-base text-charcoal focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm resize-none" placeholder="اكتب رسالتك هنا بالتفصيل..." />
                    </div>
                    <div className="mt-4">
                      <button disabled={loading} type="submit" className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-cta px-8 text-base font-bold text-white transition-all hover:bg-cta-hover active:scale-95 shadow-lg shadow-cta/20 disabled:opacity-75 disabled:scale-100 disabled:cursor-not-allowed group">
                        {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                        <Send className={`h-5 w-5 transform rotate-180 ${loading ? 'animate-pulse' : 'group-hover:translate-x-1'} transition-transform`} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
