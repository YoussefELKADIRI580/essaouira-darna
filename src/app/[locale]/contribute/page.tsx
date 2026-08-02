import React from "react";
import Link from "next/link";
import { Handshake, HeartHandshake, BookOpen, Gift, ShieldAlert, Heart, CreditCard } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { WatermarkText } from "@/components/WatermarkText";
import { getVolunteeringSteps, getDonationCategories, getAssociationInfo } from "@/lib/queries";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Handshake, HeartHandshake, Gift, ShieldAlert, Heart,
};

export default async function Contribute() {
  const [steps, categories, info] = await Promise.all([
    getVolunteeringSteps(),
    getDonationCategories(),
    getAssociationInfo(),
  ]);

  return (
    <div className="flex flex-col gap-20 py-12 md:py-24 overflow-hidden">
      {/* Intro Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pt-8">
          <FadeIn delay={0.1} direction="up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mx-auto">كن شريكاً في الخير</span>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h1 className="font-heading text-4xl font-extrabold text-charcoal sm:text-6xl">كيف تساهم معنا؟</h1>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="text-xl leading-relaxed text-charcoal/80">
              مساهمتك، مهما كانت صغيرة، تصنع فرقاً حقيقياً في حياة أطفالنا. نقدم لك عدة طرق لدعم ومساندة الجمعية.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Guide: Financial support */}
      <section className="bg-surface/50 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[60px] text-background fill-current rtl:-scale-x-100 transition-transform duration-300 rotate-180" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn delay={0.1} direction="right">
              <div className="flex flex-col gap-8 p-10 rounded-3xl border border-border-custom bg-white/80 backdrop-blur-md shadow-xl shadow-primary/5 hover-lift h-full">
                <div className="flex flex-col gap-4">
                  <h2 className="font-heading text-3xl font-extrabold text-charcoal flex items-center gap-3">
                    <span className="bg-primary/10 p-2.5 rounded-xl text-primary"><Heart className="h-6 w-6 fill-current" /></span>
                    الدعم المالي المباشر
                  </h2>
                  <p className="text-base leading-relaxed text-charcoal/80">
                    التبرع المالي يمنحنا المرونة الكافية لتغطية التكاليف التشغيلية الطارئة لدار الرعاية بالصويرة (مثل فواتير الماء والكهرباء، شراء اللوازم الطبية المستعجلة، أو إصلاح التجهيزات).
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-inner mt-auto">
                  <h3 className="font-bold text-charcoal text-lg">الحساب البنكي الرسمي للجمعية:</h3>
                  <div className="bg-white px-4 py-3 rounded-xl border border-primary/20 flex flex-col gap-1">
                    <p className="text-xl text-primary font-mono font-bold tracking-widest text-center" dir="ltr">
                      {info?.bank_account ?? "011 810 0000 1234567890 123 45"}
                    </p>
                    <p className="text-sm text-charcoal/60 text-center font-bold">{info?.bank_name ?? "البنك الشعبي - وكالة الصويرة الغزوة"}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 rounded-2xl border border-border-custom bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-charcoal text-base flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-secondary" />
                    الدفع الإلكتروني الآمن (قريباً):
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1.5 bg-[#1434CB]/10 text-[#1434CB] rounded-lg font-bold text-xs tracking-wider flex items-center border border-[#1434CB]/20">
                      <span className="italic">VISA</span>
                    </span>
                    <span className="px-3 py-1.5 bg-[#FF5F00]/10 text-charcoal rounded-lg font-bold text-xs tracking-wider flex items-center gap-1 border border-[#FF5F00]/20">
                      <div className="flex -space-x-1.5 rtl:space-x-reverse"><div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-90"/><div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90"/></div>
                      Mastercard
                    </span>
                    <span className="px-3 py-1.5 bg-[#00457C]/10 text-[#00457C] rounded-lg font-bold text-xs tracking-wider flex items-center gap-1 border border-[#00457C]/20">
                      <span className="text-[#0079C1] italic font-black">PayPal</span>
                    </span>
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-bold text-xs border border-green-200">
                      CMI (بطاقات وطنية)
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href="/projects" className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-cta px-8 text-base font-bold text-white transition-all hover:bg-cta-hover active:scale-95 shadow-lg shadow-cta/20">
                    تبرع لمشاريعنا عبر الإنترنت
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <div className="flex flex-col gap-8 p-10 rounded-3xl border-2 border-primary/20 bg-white/90 backdrop-blur-md shadow-xl shadow-primary/10 hover-lift h-full relative overflow-hidden">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit">
                  برنامج الكفالة الشاملة والجزئية
                </span>
                <h3 className="font-heading text-3xl font-extrabold text-charcoal">كفالة طفل يتيم بالدار</h3>
                <p className="text-base leading-relaxed text-charcoal/80">
                  تتيح لك الكفالة تقديم رعاية شاملة لطفل بالدار تغطي مصاريف دراسته الخاصة، ملابسه، تطبيبه، وتغذيته. يمكنك الاختيار بين الكفالة الشاملة (3,000 د.م) أو الكفالة الجزئية (تبدأ من 500 د.م).
                </p>
                <ul className="flex flex-col gap-4 text-base text-charcoal/80 font-medium">
                  <li className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    كفالة كاملة شاملة (100%): <span className="font-bold text-primary mr-1">3,000 درهم مغربي شهرياً.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    كفالة جزئية / تعليمية وطبية: <span className="font-bold text-primary mr-1">تبدأ من 500 درهم مغربي شهرياً.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    تتبع فصلي منتظم للحالة الدراسية والصحية والنفسية للطفل.
                  </li>
                </ul>
                <div className="mt-auto pt-4 flex flex-wrap items-center gap-4">
                  <Link href="/sponsor" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary-hover active:scale-95 shadow-md shadow-primary/20">
                    صفحة الكفالة وحاسبة الأثر التفاعلية
                  </Link>
                  <Link href="/sponsor" className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 group">
                    تفعيل كفالة طفل الآن <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px] pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[60px] text-background fill-current rtl:-scale-x-100 transition-transform duration-300" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Guide: Volunteering steps */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
              <h2 className="font-heading text-4xl font-extrabold text-charcoal">خطوات التطوع بدارنا</h2>
              <p className="text-lg text-charcoal/70">
                التطوع بوقتك أو مهاراتك هو من أرقى أنواع الدعم التي تترك أثراً عميقاً في نفوس أطفالنا.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, idx) => {
              const IconComp = step.icon_name ? iconMap[step.icon_name] : BookOpen;
              return (
                <FadeIn key={step.id} delay={0.2 + idx * 0.1} direction="up">
                  <div className="flex flex-col gap-5 p-8 rounded-3xl border border-border-custom bg-white text-center items-center relative shadow-xl shadow-primary/5 hover-lift group h-full">
                    <div className="absolute top-6 right-6 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm border border-primary/20">
                      {idx + 1}
                    </div>
                    <div className="rounded-2xl bg-secondary/10 p-5 text-secondary group-hover:scale-110 transition-transform duration-300">
                      {IconComp && <IconComp className="h-8 w-8" />}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-charcoal/80">{step.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.5} direction="up">
            <div className="text-center mt-6">
              <Link href="/volunteer" className="inline-flex h-14 items-center justify-center rounded-xl bg-secondary px-10 text-lg font-bold text-charcoal transition-all hover:bg-secondary-hover active:scale-95 shadow-lg shadow-secondary/20">
                منصة التطوع واختيار المجال والتأطير
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Material Contributions */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <WatermarkText text="عطاء" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col gap-16 border-t border-border-custom/50 pt-20">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
              <h2 className="font-heading text-4xl font-extrabold text-charcoal">التبرعات العينية والمادية</h2>
              <p className="text-lg text-charcoal/70">
                يمكنك التبرع بمجموعة متنوعة من السلع والمستلزمات الضرورية لتسيير الحياة اليومية بدار الرعاية.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon_name ? iconMap[cat.icon_name] : Gift;
              return (
                <FadeIn key={cat.id} delay={0.2 + idx * 0.1} direction="up">
                  <div className="flex flex-col gap-5 p-8 rounded-3xl border border-border-custom bg-surface shadow-xl shadow-primary/5 hover-lift h-full">
                    <div className="rounded-xl bg-white p-4 text-primary w-fit border border-border-custom shadow-sm">
                      {IconComp && <IconComp className="h-6 w-6" />}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal">{cat.title}</h3>
                    <p className="text-sm leading-relaxed text-charcoal/80">{cat.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.5} direction="up">
            <div className="text-center mt-2">
              <Link href="/in-kind" className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-10 text-lg font-bold text-white transition-all hover:bg-primary-hover active:scale-95 shadow-lg shadow-primary/20 gap-2">
                <Gift className="w-5 h-5" />
                تصفّح قائمة المستلزمات الحية والتعهد بالتوفير
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Corporate Partnerships & Ideas Section */}
      <section className="bg-surface/80 py-20 border-t border-border-custom relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-purple-700/10 via-white to-primary/10 rounded-3xl border border-purple-700/20 p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-700/10 text-purple-700 text-xs font-bold w-fit">
                شراكات المؤسسات والحلول المبتكرة
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-charcoal">
                لديك فكرة مشروع أو ترغب في عقد شراكة مؤسساتية؟
              </h2>
              <p className="text-base text-charcoal/80 leading-relaxed font-medium">
                نرحب بشراكات الشركات (CSR)، مبادرات المدارس والأندية الطلابية، وصندوق تقديم الأفكار والمشاريع المبتكرة لخدمة أطفال الجمعية.
              </p>
            </div>

            <div className="shrink-0">
              <Link href="/partnerships" className="inline-flex h-14 items-center justify-center rounded-xl bg-purple-700 hover:bg-purple-800 px-8 text-base font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-700/20 gap-2">
                <Handshake className="w-5 h-5" />
                منصة المبادرات وصندوق الأفكار
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
