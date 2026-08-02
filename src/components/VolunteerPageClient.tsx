"use client";

import React, { useState } from "react";
import { Handshake, BookOpen, Stethoscope, Palette, Wrench, CheckCircle2, Heart, Clock, Calendar, Users, Award, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { VolunteerFormModal } from "@/components/VolunteerFormModal";

export function VolunteerPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("الدعم التربوي والدراسي");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleOpenModal = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setIsModalOpen(true);
  };

  const volunteerCategories = [
    {
      id: "edu",
      title: "الدعم التربوي والتأطير المدرسي",
      icon: BookOpen,
      badge: "دعم مستمر",
      color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
      iconBg: "bg-sky-500 text-white",
      description: "مساعدة أطفال الدار في مراجعة الدروس، تقوية اللغات والأدبيات، والدعم العلمي لمواكبة التحصيل الدراسي بتفوق.",
      tasks: [
        "دروس الدعم والمراجعة في الرياضيات، العلوم، واللغات",
        "تعليّم القراءة والكتابة للأطفال الصغار",
        "التوجيه الدراسي والأكاديمي ومساعدة الناجحين في الباكالوريا",
        "تأطير ساعات المطالعة بالمكتبة",
      ],
    },
    {
      id: "health",
      title: "الرعاية الصحية والنفسية",
      icon: Stethoscope,
      badge: "تخصص طبي",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      iconBg: "bg-emerald-500 text-white",
      description: "تقديم الفحوصات والاستشارات الطبية وتأمين الرعاية النفسية والسلوكية لتأمين سلامة وجاهزية الأطفال الصحية.",
      tasks: [
        "فحوصات طبية عامة وتتبع صحة الأسنان والعيون",
        "تقديم استشارات طبية متخصصة وحصص التمريض",
        "المواكبة والاستشارات النفسية والسلوكية للأطفال",
        "ورشات التوعية بالنظافة والتغذية الصحية",
      ],
    },
    {
      id: "arts",
      title: "الأنشطة الثقافية والفنية والرياضية",
      icon: Palette,
      badge: "إبداع وترفيه",
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      iconBg: "bg-amber-500 text-white",
      description: "تنشيط الأمسيات والورشات الإبداعية وتأطير الفرق الرياضية والمسرح لتنمية مواهب وثقة الأطفال بنفسهم.",
      tasks: [
        "ورشات الرسم، التلوين والأشغال اليدوية الموسيقية",
        "تأطير التداريب الرياضية (كرة القدم، السباحة، الألعاب الجماعية)",
        "ورشات المسرح، التعبير الشفهي وقراءة القصص",
        "المشاركة في تنظيم الرحلات والمخيمات الصيفية",
      ],
    },
    {
      id: "tech",
      title: "الدعم التقني والصيانة والتنظيم",
      icon: Wrench,
      badge: "دعم لوجستي وتطوير",
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      iconBg: "bg-purple-500 text-white",
      description: "المساهمة في صيانة تجهيزات الدار، دعم الأنظمة المعلوماتية، التصوير، وتنظيم الفعاليات بالجمعية.",
      tasks: [
        "صيانة تجهيزات الدار الكهربائية، السباكة، والأثاث",
        "صيانة حواسيب قاعة الإعلاميات والشبكة",
        "التصوير، إنتاج المحتوى التوثيقي والتسويق الرقمي",
        "تنظيم الأنشطة والمعارض الخيرية للدار",
      ],
    },
  ];

  const steps = [
    {
      num: "1",
      title: "اختيار مجال التطوع",
      desc: "تحديد المهارة والمجال الذي يرغب المتطوع في تقديم إضافته فيه.",
    },
    {
      num: "2",
      title: "تعبئة الاستمارة والطلب",
      desc: "إرسال البيانات الأساسية والوقت والأيام المتاحة لديك.",
    },
    {
      num: "3",
      title: "التنسيق والمقابلة",
      desc: "اتصال مسؤول الأنشطة لتحديد برنامج التطوع وتوضيح ضوابط العمل بالدار.",
    },
    {
      num: "4",
      title: "انطلاق تجربة التطوع",
      desc: "الاندماج في أسرة الدار مع الحصول على شهادة تطوع رسمية وتأطير مستمر.",
    },
  ];

  const faqs = [
    {
      q: "هل يتطلب التطوع التواجد في مدينة الصويرة حصراً؟",
      a: "معظم الأنشطة الميدانية المباشرة مع الأطفال تتطلب التواجد بمقر الدار بالصويرة، ولكن نوفر أيضاً فرص تطوع عن بُعد في مجالات الدعم المعلوماتي، التصميم، البرمجة، والترجمة.",
    },
    {
      q: "هل نحصل على شهادة تطوع رسمية من الجمعية؟",
      a: "نعم، تمنح جمعية دارنا بالصويرة شهادة تطوع رسمية معتمدة لكل متطوع يكمل الساعات المحددة بالتزام وانضباط تقديرياً لمساهمته الإنسانية.",
    },
    {
      q: "كيف يتم التأطير وضمان حماية وخصوصية الأطفال؟",
      a: "يخضع جميع المتطوعين لميثاق وحسن السلوك والتأطير التربوي المباشر تحت إشراف أخصائيي ومربيي الدار لحفظ سلامة وخصوصية الأطفال.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 py-12 md:py-24 overflow-hidden">
      {/* 1. Hero Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-charcoal text-sm font-bold tracking-wider mx-auto border border-secondary/30">
              <Handshake className="w-4 h-4 text-primary" />
              منصة التطوع بالمهارات • دارنا بالصويرة
            </span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-black text-charcoal sm:text-6xl leading-tight">
              تطوّع بمهاراتك واصنع فارقاً في حياة أطفالنا
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl leading-relaxed text-charcoal/80 font-medium max-w-3xl mx-auto">
              التطوع بوقتك أو خبرتك هو من أرقى صور التضامن. سواء كنت أستاذاً، طبيباً، فناناً أو تقنياً، أثرك يغير مستقبل أطفال دارنا بالصويرة.
            </p>
          </FadeIn>

          {/* Quick Stats */}
          <FadeIn delay={0.4} direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-primary font-mono block">4 مجالات</span>
                <span className="text-xs font-bold text-charcoal/70">تطوعية تخصصية</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-secondary-hover font-mono block">ساعتان</span>
                <span className="text-xs font-bold text-charcoal/70">أسبوعياً كحد أدنى</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-emerald-600 font-mono block">شهادة</span>
                <span className="text-xs font-bold text-charcoal/70">تطوع رسمية معتمدة</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-primary font-mono block">مرونة</span>
                <span className="text-xs font-bold text-charcoal/70">في تحديد الأوقات</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Interactive Volunteer Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <FadeIn delay={0.1} direction="up">
              <span className="text-sm font-bold text-primary tracking-wider uppercase">مجالات التطوع المتاحة</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-charcoal">
                اختر المجال الذي تود الإسهام فيه
              </h2>
              <p className="text-base sm:text-lg text-charcoal/70">
                انقر على المجال المناسب لمهاراتك لتعبئة طلب التطوع المباشر.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {volunteerCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <FadeIn key={cat.id} delay={0.15 * (idx + 1)} direction="up">
                  <div className="group relative flex flex-col justify-between rounded-3xl p-8 bg-white border border-border-custom shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 h-full">
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className={`p-4 rounded-2xl ${cat.iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${cat.color}`}>
                          {cat.badge}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-charcoal group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-charcoal/80 font-medium">
                        {cat.description}
                      </p>

                      <div className="border-t border-gray-100 pt-4">
                        <span className="text-xs font-bold text-charcoal/60 block mb-3">أبرز مهام التطوع بالمجال:</span>
                        <ul className="flex flex-col gap-2.5">
                          {cat.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal/80 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(cat.title)}
                        className="w-full h-13 rounded-xl bg-surface hover:bg-primary text-charcoal hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-border-custom hover:border-primary shadow-sm group-hover:shadow-md"
                      >
                        <Handshake className="w-4 h-4" />
                        قدم طلب التطوع في {cat.title.split(" ")[0]}
                      </button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Volunteering Process Steps */}
      <section className="bg-surface/60 py-20 border-y border-border-custom relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <FadeIn delay={0.1} direction="up">
              <span className="text-sm font-bold text-primary tracking-wider uppercase">مسار الانضمام</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-charcoal">
                خطوات التطوع بدارنا
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <FadeIn key={idx} delay={0.1 * (idx + 1)} direction="up">
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-border-custom shadow-md hover:shadow-xl transition-all relative h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-black text-lg flex items-center justify-center border border-primary/20">
                    {step.num}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-charcoal">{step.title}</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={() => handleOpenModal("الدعم التربوي والدراسي")}
              className="inline-flex h-14 items-center justify-center rounded-xl bg-secondary px-10 text-lg font-bold text-charcoal transition-all hover:bg-secondary-hover active:scale-95 shadow-lg shadow-secondary/20 gap-2"
            >
              <Handshake className="w-5 h-5" />
              قدم طلب التطوع الآن
            </button>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-3">
            <span className="text-sm font-bold text-primary">أسئلة وشروط التطوع</span>
            <h2 className="font-heading text-3xl font-black text-charcoal">الأسئلة الشائعة حول التطوع</h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-border-custom overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-charcoal hover:text-primary transition-colors text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-charcoal/75 leading-relaxed font-medium border-t border-gray-100 pt-4 bg-surface/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Modal */}
      <VolunteerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategory={selectedCategory}
      />
    </div>
  );
}
