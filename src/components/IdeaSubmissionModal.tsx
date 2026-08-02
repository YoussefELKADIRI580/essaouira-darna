"use client";

import React, { useState } from "react";
import { X, Lightbulb, Building2, GraduationCap, Send, CheckCircle2, FileText, Sparkles, Handshake } from "lucide-react";

interface IdeaSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: string;
}

export function IdeaSubmissionModal({
  isOpen,
  onClose,
  initialTrack = "corporate",
}: IdeaSubmissionModalProps) {
  const [formData, setFormData] = useState({
    orgName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    trackType: initialTrack, // corporate, school, idea
    title: "",
    description: "",
    expectedDate: "",
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
        <div className="bg-gradient-to-r from-purple-700 via-primary to-primary-hover p-6 text-white relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 left-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-xl bg-white/10 text-white">
              <Lightbulb className="w-6 h-6" />
            </span>
            <h3 className="font-heading text-2xl font-bold">تقديم مبادرة / مقترح شراكة أو فكرة مبتكرة</h3>
          </div>
          <p className="text-sm text-white/90 font-medium">
            نرحب بأفكاركم ومبادراتكم المؤسساتية والشبابية لخدمة أطفال الدار بالصويرة.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            /* Success View */
            <div className="flex flex-col items-center text-center gap-6 py-6">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center border border-purple-500/20 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="flex flex-col gap-2 max-w-md">
                <h4 className="font-heading text-2xl font-bold text-charcoal">
                  تم استلام مبادرتك / اقتراحك بنجاح!
                </h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-medium">
                  نشكركم في <span className="font-bold text-charcoal">{formData.orgName || formData.contactPerson}</span> على هذه المبادرة المتميزة. سيقوم مكتب العلاقات والشراكات بجمعية دارنا بدراسة المقترح والتواصل معكم خلال 48 ساعة.
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
              
              {/* Track Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-primary">نوع المبادرة أو الشراكة *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.trackType === 'corporate' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="track"
                      value="corporate"
                      checked={formData.trackType === 'corporate'}
                      onChange={(e) => setFormData({ ...formData, trackType: e.target.value })}
                      className="hidden"
                    />
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>شراكة مؤسساتية / شركة</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.trackType === 'school' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="track"
                      value="school"
                      checked={formData.trackType === 'school'}
                      onChange={(e) => setFormData({ ...formData, trackType: e.target.value })}
                      className="hidden"
                    />
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>مبادرة مدرسية / نادي شبابي</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${formData.trackType === 'idea' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border-custom text-charcoal/70'}`}>
                    <input
                      type="radio"
                      name="track"
                      value="idea"
                      checked={formData.trackType === 'idea'}
                      onChange={(e) => setFormData({ ...formData, trackType: e.target.value })}
                      className="hidden"
                    />
                    <Lightbulb className="w-4 h-4 shrink-0" />
                    <span>فكرة مشروع مبتكر للمساهمة</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Org / Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">اسم الشركة / النادي / صاحب الفكرة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: شركة X / نادي الشباب / أحمد المنصوري"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>

                {/* Contact Person */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">الشخص المنسق والصفة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سارة التازي - مسؤولة المسؤولية المجتمعية"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    dir="ltr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm text-right transition-colors"
                  />
                </div>
              </div>

              {/* Title of Initiative */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">عنوان المبادرة أو الفكرة المبتكرة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: رعاية تجهيز قاعة الحواسيب / تنظيم دوري رياضي خيري..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-border-custom bg-surface focus:bg-white focus:border-primary focus:outline-none text-sm font-bold transition-colors"
                />
              </div>

              {/* Detailed Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-charcoal">تفاصيل المبادرة وكيف يمكن تنفيذها وما تقدمه لأطفال الدار *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="اشرح الفكرة، الأهداف، الشركاء، والموارد المطلوبة أو المقدمة من طرفكم..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  className="h-12 px-8 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm transition-all shadow-lg shadow-purple-700/20 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  تقديم المبادرة للمراجعة
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
