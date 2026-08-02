"use client";

import React, { useState } from "react";
import { CheckCircle2, Heart, Sparkles, BookOpen, ShieldCheck, Shirt, Utensils, Home, GraduationCap, ArrowRight } from "lucide-react";

interface KafalaCalculatorProps {
  onSelectPlan?: (amount: number, title: string) => void;
}

export function KafalaCalculator({ onSelectPlan }: KafalaCalculatorProps) {
  const [amount, setAmount] = useState<number>(3000);

  const presets = [
    { value: 500, label: "500 د.م/شهر", type: "كفالة تعليمية" },
    { value: 1000, label: "1,000 د.م/شهر", type: "كفالة جزئية" },
    { value: 1500, label: "1,500 د.م/شهر", type: "كفالة متقدمة" },
    { value: 3000, label: "3,000 د.م/شهر", type: "كفالة شاملة 100%" },
  ];

  // Calculate coverage aspects based on selected amount
  const getCoverageDetails = (val: number) => {
    if (val >= 3000) {
      return {
        title: "كفالة شاملة وكاملة لطفل بالدار (100%)",
        badge: "رعاية كاملة ومستدامة",
        badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        description: "يغطي هذا المبلغ التكفل الكامل والأنسب بالطفل داخل دارنا بالصويرة من الألف إلى الياء.",
        items: [
          { icon: Home, text: "السكن الآمن والرعاية الإقامية المستمرة بالدار", active: true },
          { icon: Utensils, text: "التغذية الصحية المتوازنة (3 وجبات رئيسية + لمجة يومياً)", active: true },
          { icon: GraduationCap, text: "التمدرس بالتعليم الخاص/العام، المستلزمات والدروس الإضافية", active: true },
          { icon: ShieldCheck, text: "التطبيب، الأدوية والتتبع النفسي والتربوي الدائم", active: true },
          { icon: Shirt, text: "الملابس الموسمية الكاملة (المدرسية والأعياد والشتاء)", active: true },
          { icon: Sparkles, text: "الأنشطة الترفيهية، الرحلات والأندية الرياضية والتعليمية", active: true },
        ],
        percentage: 100,
      };
    } else if (val >= 1500) {
      return {
        title: "كفالة متقدمة (نصف شاملة)",
        badge: "تغطية ممتازة",
        badgeBg: "bg-primary/10 text-primary border-primary/20",
        description: "يساهم بشكل كلي في التغذية اليومية والسكن مع جزء كبير من التكاليف المدرسية والصحية.",
        items: [
          { icon: Home, text: "السكن الآمن والإقامة بالدار", active: true },
          { icon: Utensils, text: "التغذية اليومية المتوازنة الكاملة", active: true },
          { icon: GraduationCap, text: "التمدرس والمستلزمات والكتب المدرسية", active: true },
          { icon: ShieldCheck, text: "التطبيب والرعاية الصحية والتربوية", active: true },
          { icon: Shirt, text: "الملابس الموسمية والضروريات", active: true },
          { icon: Sparkles, text: "الأنشطة الترفيهية والرحلات (تغطية جزئية)", active: false },
        ],
        percentage: 75,
      };
    } else if (val >= 1000) {
      return {
        title: "كفالة جزئية رعاية وتغذية",
        badge: "دعم محوري",
        badgeBg: "bg-secondary/20 text-charcoal border-secondary/30",
        description: "يغطي مصاريف التغذية والتعليم والملابس الأساسية للطفل بشكل مباشر.",
        items: [
          { icon: Home, text: "السكن والإقامة بالدار", active: true },
          { icon: Utensils, text: "التغذية اليومية بالدار", active: true },
          { icon: GraduationCap, text: "التمدرس والدعم المدرسي والكتب", active: true },
          { icon: ShieldCheck, text: "التطبيب والرعاية الصحية الضرورية", active: true },
          { icon: Shirt, text: "الملابس والأنشطة (تغطية جزئية عبر صندوق الدار)", active: false },
          { icon: Sparkles, text: "الأنشطة الترفيهية الموسعة", active: false },
        ],
        percentage: 50,
      };
    } else {
      return {
        title: "كفالة تعليمية وطبية",
        badge: "دعم تعليمي وصحي",
        badgeBg: "bg-sky-500/10 text-sky-600 border-sky-500/20",
        description: "يغطي مستلزمات دراسة الطفل، أدواته المدرسية، دروس الدعم والتتبع الطبي.",
        items: [
          { icon: GraduationCap, text: "شراء الحقيبة والكتب واللوازم المدرسية كاملة", active: true },
          { icon: BookOpen, text: "دروس الدعم والتقوية في اللغات والعلوم", active: true },
          { icon: ShieldCheck, text: "الفحوصات الطبية والأدوية والعلاجات الوقائية", active: true },
          { icon: Shirt, text: "الملابس المدرسية والرياضية", active: true },
          { icon: Utensils, text: "التغذية والسكن (يتطلب مساهمة كافلين إضافيين)", active: false },
          { icon: Sparkles, text: "الأنشطة الموازية والترفيهية", active: false },
        ],
        percentage: 30,
      };
    }
  };

  const details = getCoverageDetails(amount);

  return (
    <div className="w-full bg-white rounded-3xl border border-border-custom shadow-xl shadow-primary/5 p-6 sm:p-10 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border-custom/60 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              حاسبة الأثر والتغطية
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-charcoal">
              ماذا يغطي مبلغ الكفالة الذي تختاره؟
            </h3>
          </div>
          <div className="text-left rtl:text-right md:rtl:text-left">
            <span className="text-sm text-charcoal/60 font-medium block">المبلغ المختار:</span>
            <span className="text-3xl font-extrabold text-primary font-mono" dir="ltr">
              {amount.toLocaleString("fr-FR")} <span className="text-lg font-bold">د.م / شهرياً</span>
            </span>
          </div>
        </div>

        {/* Quick Amount Selectors */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {presets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setAmount(preset.value)}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border flex flex-col items-center justify-center gap-1 ${
                amount === preset.value
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "bg-surface hover:bg-primary/5 text-charcoal border-border-custom hover:border-primary/30"
              }`}
            >
              <span>{preset.label}</span>
              <span className={`text-xs font-normal ${amount === preset.value ? "text-white/80" : "text-charcoal/60"}`}>
                ({preset.type})
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Slider */}
        <div className="flex flex-col gap-3 bg-surface p-5 sm:p-6 rounded-2xl border border-border-custom">
          <div className="flex justify-between items-center text-sm font-bold text-charcoal">
            <span>حدد المبلغ بسحب المؤشر:</span>
            <span className="text-primary font-mono" dir="ltr">{amount} DH</span>
          </div>
          <input
            type="range"
            min="200"
            max="4000"
            step="100"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-charcoal/50 font-medium">
            <span>200 د.م (مساهمة كفالة)</span>
            <span>1,000 د.م (كفالة جزئية)</span>
            <span>3,000 د.م (كفالة شاملة 100%)</span>
          </div>
        </div>

        {/* Dynamic Result Box */}
        <div className="bg-gradient-to-br from-primary/5 via-white to-surface p-6 sm:p-8 rounded-2xl border border-primary/20 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 pb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${details.badgeBg}`}>
                {details.badge}
              </span>
              <h4 className="font-heading text-lg sm:text-xl font-bold text-charcoal">
                {details.title}
              </h4>
            </div>
            {/* Progress percentage */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-charcoal/60">نسبة التغطية المقدرة:</span>
              <div className="w-24 bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${details.percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-primary font-mono">{details.percentage}%</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-medium">
            {details.description}
          </p>

          {/* Covered Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {details.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    item.active
                      ? "bg-white border-primary/20 shadow-sm text-charcoal font-semibold"
                      : "bg-gray-50 border-gray-200 text-charcoal/40 line-through"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      item.active ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm leading-snug">{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* Select button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => onSelectPlan && onSelectPlan(amount, details.title)}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition-all hover:bg-primary-hover active:scale-95 text-base shadow-lg shadow-primary/20 gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              تفعيل كفالة بمبلغ {amount} درهم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
