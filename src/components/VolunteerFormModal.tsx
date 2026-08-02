"use client";

import React, { useState } from "react";
import { X, Handshake, CheckCircle2, Send, Clock, Calendar, BookOpen, Stethoscope, Palette, Wrench, UserCheck } from "lucide-react";

interface VolunteerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export function VolunteerFormModal({
  isOpen,
  onClose,
  initialCategory = "الدعم التربوي والدراسي",
}: VolunteerFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    profession: "",
    category: initialCategory,
    availability: "weekly_2h",
    preferredDays: "",
    motivation: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border-custom overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary via-secondary-hover to-primary p-6 text-charcoal relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 left-5 text-charcoal/80 hover:text-charcoal bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-xl bg-white/30 text-charcoal font-bold">
              <Handshake className="w-6 h-6" />
            </span>
            <h3 className="font-heading text-2xl font-bold">استمارة طلب التطوع بدارنا</h3>
          </div>
          <p className="text-sm text-charcoal/90 font-medium">
            مرحباً بك في عائلة التطوع بالجمعية. يرجى ملء بياناتك ليتواصل معك مسؤول الأنشطة والتأطير.
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
                  تم تقديم طلب التطوع بنجاح!
                </h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-medium">
                  نشكرك أخي/أختي <span className="font-bold text-charcoal">{formData.fullName}</span> على هذه المبادرة النبيلة. سيتواصل معك منسق الأنشطة والتربية بالجمعية عبر الهاتف أو الواتساب لتنسيق المقابلة وتحديد جدول الأنشطة التطوعية.
                </p>
              </div>

              <div className="w-full bg-surface p-5 rounded-2xl border border-border-custom flex flex-col gap-2 text-right">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  المجال المختصر لطلبك:
                </span>
                <span className="text-sm font-bold text-charcoal">{formData.category}</span>
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
                    placeholder="مثال: مريم العلمي"
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
                {/* Profession */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">المهنة / التخصص الدراسي *</label>
                  <input
                    type="text"
                    required
                    placeholder="أستاذ(ة) / طبيب(ة) / مهندس(ة) / طالب(ة)..."
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">المدينة *</label>
                  <input
                    type="text"
                    required
                    placeholder="الصويرة / مراكش / الدار البيضاء..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary">المجال التطوعي الذي ترغب في المشاركة فيه *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-12 px-3 rounded-xl border border-primary/30 bg-primary/5 focus:outline-none text-sm font-bold text-charcoal"
                >
                  <option value="الدعم التربوي والدراسي">📚 الدعم التربوي والتدريس (مراجعة، لغات، علوم)</option>
                  <option value="الرعاية الصحية والنفسية">🏥 الرعاية الصحية والنفسية (فحوصات، استشارات، طب أسنان)</option>
                  <option value="الأنشطة الثقافية والفنية والرياضية">🎨 الأنشطة الثقافية، الفنية والرياضية (رسم، مسرح، رياضة)</option>
                  <option value="الدعم التقني والصيانة والتنظيم">🛠️ الدعم التقني، الصيانة والتنظيم (صيانة، تسويق، أحداث)</option>
                  <option value="مجال آخر">💡 مجال آخر (حدد في الملاحظات)</option>
                </select>
              </div>

              {/* Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">الوقت والوتيرة المتاحة للتطوع</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="h-12 px-3 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm font-medium text-charcoal"
                  >
                    <option value="weekly_2h">أسبوعياً (ساعتان إلى 4 ساعات أسبوعياً)</option>
                    <option value="biweekly">مرة كل أسبوعين</option>
                    <option value="monthly">شهرياً (يوم كامل أو ورشة شهرياً)</option>
                    <option value="events">في المناسبات والرحلات فقط</option>
                    <option value="remote">تطوع عن بُعد (دعم دراسي/تقني)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">الأيام المفضل المشاركة فيها</label>
                  <input
                    type="text"
                    placeholder="مثال: أيام السبت والأحد / الأمسيات"
                    value={formData.preferredDays}
                    onChange={(e) => setFormData({ ...formData, preferredDays: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Motivation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">نبذة عن خبرتك أو الدافع للتطوع معنا</label>
                <textarea
                  rows={3}
                  placeholder="اكتب باختصار كيف ترغب في مساعدة أطفال الدار..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
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
                  className="h-12 px-8 rounded-xl bg-secondary hover:bg-secondary-hover text-charcoal font-bold text-sm transition-all shadow-lg shadow-secondary/20 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  إرسال طلب التطوع
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
