"use client";

import React, { useState } from "react";
import { X, Heart, CheckCircle2, Copy, Check, Send, Building2, CreditCard, ShieldCheck } from "lucide-react";

interface KafalaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  initialPlanTitle?: string;
  associationBankRib?: string;
  associationBankName?: string;
}

export function KafalaFormModal({
  isOpen,
  onClose,
  initialAmount = 3000,
  initialPlanTitle = "كفالة شاملة 100%",
  associationBankRib = "011 810 0000 1234567890 123 45",
  associationBankName = "البنك الشعبي - وكالة الصويرة الغزوة",
}: KafalaFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    planType: initialPlanTitle,
    monthlyAmount: initialAmount.toString(),
    paymentMethod: "bank_transfer",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopyRib = () => {
    navigator.clipboard.writeText(associationBankRib);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border-custom overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-hover p-6 text-white relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 left-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-xl bg-white/10 text-white">
              <Heart className="w-6 h-6 fill-current" />
            </span>
            <h3 className="font-heading text-2xl font-bold">تفعيل طلب كفالة طفل</h3>
          </div>
          <p className="text-sm text-white/90 font-medium">
            شكراً لمبادرتك النبيلة. يرجى ملء بياناتك ليتواصل معك فريق الجمعية وتأكيد الكفالة.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            /* Success View */
            <div className="flex flex-col items-center text-center gap-6 py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="flex flex-col gap-2 max-w-md">
                <h4 className="font-heading text-2xl font-bold text-charcoal">
                  تم استلام طلب الكفالة بنجاح!
                </h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-medium">
                  جزاكم الله خيراً أخي/أختي <span className="font-bold text-charcoal">{formData.fullName}</span>. سيقوم مكلف بالرعاية والتتبع بالاتصال بكم قريباً عبر الهاتف أو الواتساب لتنسيق الكفالة وتزويدكم بالتقرير الدوري.
                </p>
              </div>

              {/* Official Bank Account Box */}
              <div className="w-full bg-surface p-6 rounded-2xl border border-primary/20 flex flex-col gap-4 text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    الحساب البنكي الرسمي لتفعيل التحويل الشهري:
                  </span>
                  <span className="text-xs text-charcoal/60 font-semibold">{associationBankName}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-border-custom flex items-center justify-between gap-3">
                  <span className="font-mono text-base sm:text-lg font-extrabold text-charcoal tracking-wider" dir="ltr">
                    {associationBankRib}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRib}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        تم النسخ!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        نسخ الـ RIB
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-charcoal/60">
                  * يُنصح بإجراء اقتطاع بنكي شهري دوري (Ordre التوفير أو اقتطاع دائم) لضمان انتظام الكفالة.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-charcoal px-8 font-bold text-white transition-all hover:bg-charcoal/90 text-sm shadow-md"
              >
                إغلاق النافذة
              </button>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: محمد العلوي"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">رقم الهاتف / الواتساب *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0612345678"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm text-right transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    dir="ltr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm text-right transition-colors"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">المدينة / البلد *</label>
                  <input
                    type="text"
                    required
                    placeholder="الparams / الصويرة / الدار البيضاء / خارج المغرب"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Plan Selection & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/15">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-primary">نوع الكفالة المختارة</label>
                  <select
                    value={formData.planType}
                    onChange={(e) => setFormData({ ...formData, planType: e.target.value })}
                    className="h-12 px-3 rounded-xl border border-primary/20 bg-white focus:outline-none text-sm font-bold text-charcoal"
                  >
                    <option value="كفالة شاملة 100%">كفالة شاملة كاملة (3,000 د.م/شهر)</option>
                    <option value="كفالة جزئية">كفالة جزئية (1,000 د.م/شهر)</option>
                    <option value="كفالة تعليمية">كفالة تعليمية وطبية (500 د.م/شهر)</option>
                    <option value="كفالة بمبلغ مخصص">مبلغ مخصص بحسب الاستطاعة</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-primary">المبلغ الشهري المقترح (بالدرهم)</label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={formData.monthlyAmount}
                    onChange={(e) => setFormData({ ...formData, monthlyAmount: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-primary/20 bg-white focus:outline-none text-sm font-extrabold text-primary font-mono text-center"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">طريقة السداد المفضل استخدامها:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.paymentMethod === 'bank_transfer' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="hidden"
                    />
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span>تحويل بنكي / اقتطاع شهري</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.paymentMethod === 'association' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="association"
                      checked={formData.paymentMethod === 'association'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="hidden"
                    />
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>تسليم مباشر بمقر الجمعية</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.paymentMethod === 'online' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="hidden"
                    />
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>بطاقة بنكية إلكترونية</span>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">ملاحظات أو توصيات إضافية</label>
                <textarea
                  rows={2}
                  placeholder="أي معلومات ترغب في إضافتها لتأكيد الكفالة..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="p-3 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-12 px-6 rounded-xl border border-border-custom text-charcoal font-bold text-sm hover:bg-surface transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="h-12 px-8 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  تأكيد وتفعيل طلب الكفالة
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
