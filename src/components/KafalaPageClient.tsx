"use client";

import React, { useState } from "react";
import { Heart, CheckCircle2, ShieldCheck, Sparkles, HelpCircle, ChevronDown, Award, Users, BookOpen, Star, Building2, CreditCard, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { KafalaCalculator } from "@/components/KafalaCalculator";
import { KafalaFormModal } from "@/components/KafalaFormModal";

interface KafalaPageClientProps {
  associationBankRib?: string;
  associationBankName?: string;
}

export function KafalaPageClient({
  associationBankRib = "011 810 0000 1234567890 123 45",
  associationBankName = "البنك الشعبي - وكالة الصويرة الغزوة",
}: KafalaPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(3000);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState("كفالة شاملة 100%");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleOpenModal = (amount: number, title: string) => {
    setSelectedAmount(amount);
    setSelectedPlanTitle(title);
    setIsModalOpen(true);
  };

  const plans = [
    {
      id: "full",
      title: "الكفالة الشاملة الكاملة",
      badge: "الأكثر أثراً ورعاية",
      price: "3,000",
      period: "د.م / شهرياً",
      popular: true,
      description: "رعاية كاملة 100% تغطي حياة الطفل بالكامل من الإقامة، الدراسة الخاصة، التغذية، الصحة والملابس.",
      features: [
        "السكن والإقامة الكاملة بالدار بالصويرة",
        "تغذية متكاملة 3 وجبات رئيسية يومياً + لمجة",
        "التمدرس بالتعليم الخاص/العام والدروس الخصوصية",
        "التغطية الطبية الكاملة والأدوية والمتابعة النفسية",
        "الملابس الموسمية للأنشطة والأعياد والدراسة",
        "تقرير فصلي تقييمي حول التطور الدراسي والصحي",
      ],
    },
    {
      id: "partial",
      title: "الكفالة الجزئية (الرعاية)",
      badge: "مساهمة قوية ومباشرة",
      price: "1,000",
      period: "د.م / شهرياً",
      popular: false,
      description: "تغطية جزء كبير محوري من التغذية اليومية والتمدرس والرعاية الصحية للطفل.",
      features: [
        "المساهمة في السكن والتغذية اليومية بالدار",
        "توفير المستلزمات المدرسية ودروس الدعم",
        "التغطية الطبية الأساسية والفحوصات",
        "الملابس المدرسية والموسمية",
        "تقرير دوري عن حالة الطفل الصحية والتعليمية",
      ],
    },
    {
      id: "education",
      title: "كفالة التعليم والتطبيب",
      badge: "دعم دراسي وصحي",
      price: "500",
      period: "د.م / شهرياً",
      popular: false,
      description: "تخصص لكفالة دراسة طفل، أدواته المدرسية، دروس التقوية ورعايته الصحية المستعجلة.",
      features: [
        "تأمين حقيبة الكتب واللوازم المدرسية كاملة",
        "تسديد رسوم الأنشطة ودروس التقوية اللغوية",
        "الفحوصات الطبية والأدوية والعلاجات الوقائية",
        "تأطير وتتبع تربوي مستمر",
      ],
    },
  ];

  const faqs = [
    {
      q: "كيف تضمن الجمعية توجيه مبلغ الكفالة للطفل بشكل مباشر؟",
      a: "تدار جميع مبالغ الكفالات تحت إشراف مالي وتربوي دقيق عبر حساب رسمي مخصص لدار الأطفال. ويصلكم تقرير فصلي يتضمن نتائج الطفل الدراسية والأنشطة التي شارك فيها بالتفصيل.",
    },
    {
      q: "هل يمكنني التواصل مع الطفل المكفول أو زيارته؟",
      a: "نعم، ترحب إدارة دارنا بالصويرة بزيارات الكافلين بالتنسيق المسبق مع الإدارة التربوية لحماية خصوصية الأطفال، كما يمكن توجيه رسائل ودية وبطاقات معايدة وتشجيع للطفل عبر إدارة الدار.",
    },
    {
      q: "ما هي طرق دفع مبلغ الكفالة الشهري؟",
      a: "يمكنك سداد الكفالة عبر التحويل البنكي المباشر للحساب البنكي الرسمي للجمعية، أو تفعيل اقتطاع بنكي دوري (Ordre التوفير الدائم)، أو عبر التسليم المباشر بمقر الجمعية مع الحصول على وصل رسمي.",
    },
    {
      q: "هل يمكنني إلغاء أو تعديل الكفالة في أي وقت؟",
      a: "نعم، الكفالة عمل تطوعي إنساني، يمكنك تعديل المبلغ أو التوقف في أي وقت مع إشعار الإدارة مسبقاً لتغطية كفالة الطفل عبر الحساب الاحتياطي للدار.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 py-12 md:py-24 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mx-auto border border-primary/20">
              <Heart className="w-4 h-4 fill-current text-primary" />
              برنامج كفالة الأطفال • دارنا بالصويرة
            </span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-black text-charcoal sm:text-6xl leading-tight">
              كن سَنَداً وراعياً لأطفال دارنا بالصويرة
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl leading-relaxed text-charcoal/80 font-medium max-w-3xl mx-auto">
              تتيح لك الكفالة تقديم رعاية شاملة أو جزئية لطفل بالدار تغطي مصاريف دراسته، ملابسه، تطبيبه وتغذيته. اترك أثراً طيباً يدوم للأبد في حياة طفل يتيم أو فاقد للسند العائلي.
            </p>
          </FadeIn>

          {/* Impact Badges */}
          <FadeIn delay={0.4} direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-primary font-mono block">3,000 د.م</span>
                <span className="text-xs font-bold text-charcoal/70">كفالة شاملة 100%</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-primary font-mono block">500 د.م</span>
                <span className="text-xs font-bold text-charcoal/70">تبدأ من (كفالة تعليمية)</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-emerald-600 font-mono block">100%</span>
                <span className="text-xs font-bold text-charcoal/70">شفافية وتتبع دوري</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-border-custom shadow-sm text-center">
                <span className="text-2xl font-black text-primary font-mono block">+420</span>
                <span className="text-xs font-bold text-charcoal/70">طفل مستفيد بالدار</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Kafala Calculator Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn delay={0.1} direction="up">
          <KafalaCalculator
            onSelectPlan={(amount, title) => handleOpenModal(amount, title)}
          />
        </FadeIn>
      </section>

      {/* 3. Kafala Tiers Grid */}
      <section className="bg-surface/60 py-20 relative overflow-hidden border-y border-border-custom">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <FadeIn delay={0.1} direction="up">
              <span className="text-sm font-bold text-primary tracking-wider uppercase">خطط وبرامج الكفالة</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-charcoal">
                اختر نوع الكفالة المناسب لك
              </h2>
              <p className="text-base sm:text-lg text-charcoal/70">
                يمكنك كفالة طفل بكفالة كاملة مفردة أو الاشتراك مع كافلين آخرين في كفالة جزئية أو تعليمية.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, idx) => (
              <FadeIn key={plan.id} delay={0.15 * (idx + 1)} direction="up">
                <div
                  className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-300 h-full ${
                    plan.popular
                      ? "bg-white border-2 border-primary shadow-2xl shadow-primary/15 scale-[1.03] z-20"
                      : "bg-white border border-border-custom shadow-lg hover:shadow-xl hover:border-primary/30 z-10"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-primary text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md tracking-wider">
                      {plan.badge}
                    </div>
                  )}

                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-xs font-bold text-primary">{plan.badge}</span>
                    <h3 className="font-heading text-2xl font-black text-charcoal">{plan.title}</h3>
                    <p className="text-xs leading-relaxed text-charcoal/70 min-h-[40px] font-medium">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="bg-surface p-5 rounded-2xl border border-border-custom mb-6 flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-black text-primary font-mono" dir="ltr">
                      {plan.price}
                    </span>
                    <span className="text-sm font-bold text-charcoal/70">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3.5 mb-8 flex-1 text-sm text-charcoal/80 font-medium">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action CTA */}
                  <button
                    type="button"
                    onClick={() => handleOpenModal(parseInt(plan.price.replace(/,/g, "")), plan.title)}
                    className={`w-full h-14 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
                      plan.popular
                        ? "bg-primary hover:bg-primary-hover text-white shadow-primary/25 hover:scale-105"
                        : "bg-charcoal hover:bg-charcoal/90 text-white shadow-charcoal/10"
                    }`}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                    تفعيل هذا الخيار
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Transparency & Guarantee Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-primary/5 via-white to-primary/10 rounded-3xl border border-primary/20 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeIn delay={0.1} direction="up">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal">تقارير فصلية شفافة</h3>
                <p className="text-sm text-charcoal/75 leading-relaxed font-medium">
                  يتلقى الكافل تقريراً دورياً حول تطور الطفل الدراسي، صحته وتفوقه في الورشات والأندية التربوية بالدار.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal">زيارات ورسائل ودية</h3>
                <p className="text-sm text-charcoal/75 leading-relaxed font-medium">
                  إكانية إرسال رسائل تشجيعية وتلقي بطاقات معايدة وتفوق بالتنسيق التام مع إدارة الرعاية التربوية.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal">إشراف وحساب رسمي</h3>
                <p className="text-sm text-charcoal/75 leading-relaxed font-medium">
                  تُودع أموال الكفالات في الحساب الرسمي المعتمد للجمعية بحكامة تدبير وتتبع مالي وافتخاص دوري.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-3">
            <span className="text-sm font-bold text-primary">الشفافية والإجابات</span>
            <h2 className="font-heading text-3xl font-black text-charcoal">الأسئلة الشائعة حول الكفالة</h2>
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

      {/* Kafala Modal */}
      <KafalaFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAmount={selectedAmount}
        initialPlanTitle={selectedPlanTitle}
        associationBankRib={associationBankRib}
        associationBankName={associationBankName}
      />
    </div>
  );
}
