"use client";

import React, { useState } from "react";
import { X, Gift, CheckCircle2, Send, MapPin, Truck, Phone, Package, Heart } from "lucide-react";

interface InKindFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemName?: string;
  associationAddress?: string;
  associationPhone?: string;
}

export function InKindFormModal({
  isOpen,
  onClose,
  initialItemName = "مواد غذائية أساسية",
  associationAddress = "حي الغزوة، طريق سيدي كاوكي، الصويرة - المغرب",
  associationPhone = "0524471234 / 0661123456",
}: InKindFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    itemCategory: initialItemName,
    quantityDetails: "",
    deliveryMethod: "dropoff", // dropoff, shipping, pickup
    notes: "",
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
        <div className="bg-gradient-to-r from-primary via-primary-hover to-emerald-600 p-6 text-white relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 left-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-xl bg-white/10 text-white">
              <Gift className="w-6 h-6" />
            </span>
            <h3 className="font-heading text-2xl font-bold">تأكيد التبرع العيني والتعهد</h3>
          </div>
          <p className="text-sm text-white/90 font-medium">
            شكراً لكرِمك. يرجى توضيح المواد والمستلزمات التي ترغب في توفيرها لدارنا بالصويرة.
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
                  تم تسجيل تعهدك بالتبرع بنجاح!
                </h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-medium">
                  جزاك الله خيراً أخي/أختي <span className="font-bold text-charcoal">{formData.fullName}</span>. سيقوم مكلف باللوجستيك والاستلام بالتواصل معك قريباً لتنسيق استلام الشحنة أو الترحيب بك بالدار.
                </p>
              </div>

              {/* Delivery info box */}
              <div className="w-full bg-surface p-5 rounded-2xl border border-primary/20 flex flex-col gap-3 text-right">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  عنوان الاستلام والتسليم بمقر دارنا:
                </span>
                <p className="text-sm font-bold text-charcoal">{associationAddress}</p>
                <p className="text-xs text-charcoal/70 font-semibold">هاتف المنسق اللوجستي: {associationPhone}</p>
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
                    placeholder="مثال: عبد الرحيم السلاوي"
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
                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">المدينة *</label>
                  <input
                    type="text"
                    required
                    placeholder="الصويرة / مراكش / أكادير / الرباط..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">البريد الإلكتروني (اختياري)</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    dir="ltr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm text-right transition-colors"
                  />
                </div>
              </div>

              {/* Item Selected */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary">المادة / الفئة المختارة للتبرع العيني *</label>
                <input
                  type="text"
                  required
                  value={formData.itemCategory}
                  onChange={(e) => setFormData({ ...formData, itemCategory: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-primary/30 bg-primary/5 font-bold text-charcoal text-sm focus:outline-none"
                />
              </div>

              {/* Quantity / Details */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">تفاصيل المواد والكميات التقريبية *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="مثال: 50 كغم دقيق + 10 لتر زيت / أو 20 محفظة مدرسية / أو أغطية شتوية..."
                  value={formData.quantityDetails}
                  onChange={(e) => setFormData({ ...formData, quantityDetails: e.target.value })}
                  className="p-3 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors resize-none"
                />
              </div>

              {/* Delivery Method */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">طريقة التوصيل المعتمدة:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.deliveryMethod === 'dropoff' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      value="dropoff"
                      checked={formData.deliveryMethod === 'dropoff'}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      className="hidden"
                    />
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>تسليم مباشر بمقر الدار بالصويرة</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.deliveryMethod === 'shipping' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      value="shipping"
                      checked={formData.deliveryMethod === 'shipping'}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      className="hidden"
                    />
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>إرسال عبر شركة نقل / كولي</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.deliveryMethod === 'pickup' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      className="hidden"
                    />
                    <Package className="w-4 h-4 shrink-0" />
                    <span>طلب استلام من مقركم (بالصويرة ومحيطها)</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">ملاحظات إضافية</label>
                <input
                  type="text"
                  placeholder="أي توجيهات أو تاريخ محدد للتسليم..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
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
                  تأكيد وإرسال التعهد
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
