"use client";

import React, { useState } from "react";
import { Building2, GraduationCap, Lightbulb, Handshake, CheckCircle2, Sparkles, Award, Users, ChevronDown, ArrowRight, Star, Heart } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { IdeaSubmissionModal } from "@/components/IdeaSubmissionModal";

export function PartnershipsPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("corporate");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleOpenModal = (track: string) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const tracks = [
    {
      id: "corporate",
      title: "شراكات الشركات والمؤسسات (CSR)",
      icon: Building2,
      badge: "المسؤولية المجتمعية",
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      iconBg: "bg-purple-600 text-white",
      description: "تمكّن المؤسسات والشركات الوطنية والدولية من رعاية برامج ومشاريع إعادة التأهيل، البنية التحتية بالدار، وكفالة الاستدامة التشغيلية.",
      features: [
        "تمويل وتجهيز المشاريع المستدامة (قاعة حواسيب، ترميم الأجنحة، طاقة شمسية)",
        "رعاية الأندية التربوية والرياضية والتأهيل المهني لليافعين",
        "تغطية التكاليف التشغيلية السنوية عبر عقود شراكة موثقة",
        "تقرير إنجاز وحصيلة سنوية مخصصة للمؤسسة الشريكة",
      ],
      btnText: "تقديم طلب شراكة مؤسساتية",
    },
    {
      id: "school",
      title: "مبادرات المدارس، الجامعات والأندية",
      icon: GraduationCap,
      badge: "مبادرات شبابية",
      color: "bg-primary/10 text-primary border-primary/20",
      iconBg: "bg-primary text-white",
      description: "فتح الباب للمؤسسات التعليمية والأندية الطلابية والجمعيات الشريكة لتنظيم حملات تضامنية وأيام تربوية بالدار.",
      features: [
        "تنظيم حملات جمع الأدوات المدرسية والملابس بالأوساط الطلابية",
        "تنظيم أيام ترفيهية، ورشات فنية ومسرحية مع أطفال الدار",
        "تنظيم زيارات تربوية وتوعية بثقافة العطاء والتكافل",
        "شهادات شكر وتقدير رسمية للمؤسسات والنوادي المشاركة",
      ],
      btnText: "تقديم مبادرة مدرسية أو نادي",
    },
    {
      id: "idea",
      title: "صندوق تقديم الأفكار والمشاريع المبتكرة",
      icon: Lightbulb,
      badge: "ابتكار ومقترحات",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      iconBg: "bg-emerald-600 text-white",
      description: "إذا كانت لديك فكرة مشروع مبتكر، تطبيق الكتروني، فكرة تسويقية، أو معرض فني خيري لخدمة الدار، فنحن نسعد بدراستها وتنزيلها معك.",
      features: [
        "تقديم أفكار ومشاريع مبتكرة لخدمة دار الأيتام بالصويرة",
        "تقديم استشارات تسويقية أو تقنية أو فنية مجانية",
        "المشاركة في تنظيم تظاهرات ومعارض تضامنية لصالح الأطفال",
        "مواكبة وتأطير الفكرة من طرف مكتب العلاقات بالجمعية",
      ],
      btnText: "تقديم فكرة مشروع مبتكر",
    },
  ];

  const pastInitiatives = [
    {
      title: "مشروع قاعة الإعلاميات والربط بالأنترنت",
      partner: "شراكة مع شركة تقنية بالصويرة",
      desc: "تم تزويد الدار بـ 15 حاسوباً جديداً وشاشة تفاعلية وتأمين دروس التكوين الرقمي للأطفال.",
    },
    {
      title: "حملة المحفظة المدرسية والتفوق الدراسي",
      partner: "مبادرة ثانوية الصويرة والنادي التضامني",
      desc: "توزيع أكثر من 200 حقيبة مدرسية بالكتب واللوازم وتأطير ورشات استقبال الموسم الدراسي.",
    },
    {
      title: "مشروع الألواح الشمسية والنجاعة الطاقية",
      partner: "مبادرة مؤسسة دولية للتنمية المستدامة",
      desc: "تثبيت ألواح شمسية سخانات لتأمين الماء الساخن وتقفيض الفاتورة الطاقية للدار بنسبة 40%.",
    },
  ];

  const faqs = [
    {
      q: "كيف يتم توثيق الشراكات المؤسساتية مع الشركات؟",
      a: "تُبرم جميع الشراكات عبر اتفاقيات رسمية متبادلة تحدد الأهداف، الالتزامات المالية واللوجستية، والبرنامج الزمني، مع تسليم تقارير افتخاص دورية وشواهد تقديرية للمؤسسة الشريكة.",
    },
    {
      q: "هل يمكن للجمعيات الطلابية والنوادي تنظيم زيارات وأنشطة؟",
      a: "نعم، ترحب الجمعية بمبادرات المدارس والجامعات والأندية الشبابية بالتنسيق المسبق وتحديد برنامج الأنشطة لضمان حسن التأطير وسلامة الأطفال.",
    },
    {
      q: "ما هي الفترة الاستغراقية لتقييم الأفكار والمشاريع المقدمة؟",
      a: "يتولى مكتب الشراكات والمبادرات بالجمعية دراسة كافة الأفكار والمقترحات المقدمة عبر الاستمارة والرد على أصحابها خلال 48 إلى 72 ساعة كحد أقصى.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 py-12 md:py-24 overflow-hidden">
      {/* 1. Hero Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/15 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-700/10 text-purple-700 text-sm font-bold tracking-wider mx-auto border border-purple-700/20">
              <Sparkles className="w-4 h-4" />
              منصة الشراكات والمبادرات المبتكرة • دارنا بالصويرة
            </span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-black text-charcoal sm:text-6xl leading-tight">
              كن شريكاً مؤسساتياً أو صاحب فكرة متميزة
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl leading-relaxed text-charcoal/80 font-medium max-w-3xl mx-auto">
              نفتح أبواب الجمعية للشركات، المدارس، الجامعات والمواطنين المبتكرين لتطوير مبادرت وشراكات نوعية تترك أثراً مستداماً في حياة أطفال دارنا.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Tracks Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tracks.map((track, idx) => {
            const IconComp = track.icon;
            return (
              <FadeIn key={track.id} delay={0.15 * (idx + 1)} direction="up">
                <div className="group relative flex flex-col justify-between rounded-3xl p-8 bg-white border border-border-custom shadow-lg hover:shadow-2xl hover:border-purple-600/40 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className={`p-4 rounded-2xl ${track.iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${track.color}`}>
                        {track.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-charcoal group-hover:text-purple-700 transition-colors">
                      {track.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-charcoal/80 font-medium min-h-[60px]">
                      {track.description}
                    </p>

                    <div className="border-t border-gray-100 pt-4">
                      <span className="text-xs font-bold text-charcoal/60 block mb-3">مجالات ومخرجات المسار:</span>
                      <ul className="flex flex-col gap-2.5">
                        {track.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal/80 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(track.id)}
                      className="w-full h-13 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-700/20 hover:scale-[1.02]"
                    >
                      <Handshake className="w-4 h-4" />
                      {track.btnText}
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 3. Past Initiatives Showcase */}
      <section className="bg-surface/60 py-20 border-y border-border-custom relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <FadeIn delay={0.1} direction="up">
              <span className="text-sm font-bold text-purple-700 tracking-wider uppercase">قصص نجاح الشراكات</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-charcoal">
                مبادرات شريكة تركت أثراً بالدار
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastInitiatives.map((init, idx) => (
              <FadeIn key={idx} delay={0.1 * (idx + 1)} direction="up">
                <div className="bg-white p-7 rounded-3xl border border-border-custom shadow-md flex flex-col gap-4 h-full">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 w-fit">
                    {init.partner}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-charcoal">{init.title}</h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-medium">{init.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-3">
            <span className="text-sm font-bold text-purple-700">أسئلة وتأطير الشراكات</span>
            <h2 className="font-heading text-3xl font-black text-charcoal">الأسئلة الشائعة حول المبادرات والشراكة</h2>
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
                  className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-charcoal hover:text-purple-700 transition-colors text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-700 shrink-0 transition-transform duration-300 ${
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

      {/* Modal */}
      <IdeaSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTrack={selectedTrack}
      />
    </div>
  );
}
