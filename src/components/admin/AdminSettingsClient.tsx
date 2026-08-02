"use client";

import React, { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Save, Loader2, Building, Phone, Mail, MapPin, CreditCard, Landmark } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import type { AssociationInfo } from "@/lib/types";

export function AdminSettingsClient() {
  const [info, setInfo] = useState<AssociationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"ar" | "fr" | "en">("ar");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchInfo = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("association_info")
      .select("*")
      .limit(1)
      .single();
      
    if (data) {
      setInfo(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSave = async () => {
    if (!info) return;
    setSaving(true);
    
    // Determine if we need to insert or update.
    // If it has an id, update it. Else insert.
    // However, our setup script ensures there is exactly 1 row.
    if (info.id) {
      const { error } = await supabase
        .from("association_info")
        .update({
          name: info.name,
          name_fr: info.name_fr,
          name_en: info.name_en,
          tagline: info.tagline,
          tagline_fr: info.tagline_fr,
          tagline_en: info.tagline_en,
          description: info.description,
          description_fr: info.description_fr,
          description_en: info.description_en,
          address: info.address,
          address_fr: info.address_fr,
          address_en: info.address_en,
          phone: info.phone,
          email: info.email,
          bank_account: info.bank_account,
          bank_name: info.bank_name,
          logo_url: info.logo_url,
          updated_at: new Date().toISOString()
        })
        .eq("id", info.id);

      if (error) {
        console.error(error);
        alert("حدث خطأ أثناء الحفظ. يرجى التأكد من صلاحياتك كمدير.");
      } else {
        alert("تم الحفظ بنجاح!");
      }
    } else {
      // In case the row doesn't exist yet for some reason
      const { error } = await supabase
        .from("association_info")
        .insert([info]);
        
      if (error) {
        console.error(error);
        alert("حدث خطأ أثناء الإنشاء.");
      } else {
        alert("تم الحفظ بنجاح!");
        fetchInfo();
      }
    }
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!info) {
    return <div>لم يتم العثور على معلومات الجمعية. الرجاء تشغيل سكربت الإعداد أولاً.</div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-charcoal">الإعدادات العامة للموقع</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          <span>حفظ التعديلات</span>
        </button>
      </div>

      <FadeIn>
        <div className="bg-white rounded-2xl shadow-sm border border-border-custom p-6 md:p-8 flex flex-col gap-8">
          
          {/* General Info */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border-custom pb-4">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <Building className="h-6 w-6" />
                المعلومات الأساسية
              </h2>
              <div className="flex gap-2 bg-surface p-1 rounded-xl">
                <button type="button" onClick={() => setLang("ar")} className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-colors ${lang === 'ar' ? 'bg-primary text-white shadow' : 'text-charcoal/60 hover:text-primary'}`}>عربي</button>
                <button type="button" onClick={() => setLang("fr")} className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-colors ${lang === 'fr' ? 'bg-primary text-white shadow' : 'text-charcoal/60 hover:text-primary'}`}>Français</button>
                <button type="button" onClick={() => setLang("en")} className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-colors ${lang === 'en' ? 'bg-primary text-white shadow' : 'text-charcoal/60 hover:text-primary'}`}>English</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80">اسم الجمعية ({lang})</label>
                <input 
                  type="text" 
                  value={lang === 'ar' ? (info.name || "") : lang === 'fr' ? (info.name_fr || "") : (info.name_en || "")}
                  onChange={(e) => {
                    if (lang === 'ar') setInfo({...info, name: e.target.value});
                    if (lang === 'fr') setInfo({...info, name_fr: e.target.value});
                    if (lang === 'en') setInfo({...info, name_en: e.target.value});
                  }}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  placeholder="مثال: جمعية الصويرة دارنا"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80">الشعار اللفظي ({lang})</label>
                <input 
                  type="text" 
                  value={lang === 'ar' ? (info.tagline || "") : lang === 'fr' ? (info.tagline_fr || "") : (info.tagline_en || "")}
                  onChange={(e) => {
                    if (lang === 'ar') setInfo({...info, tagline: e.target.value});
                    if (lang === 'fr') setInfo({...info, tagline_fr: e.target.value});
                    if (lang === 'en') setInfo({...info, tagline_en: e.target.value});
                  }}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  placeholder="مثال: رعاية وحماية الأطفال"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-charcoal/80">وصف قصير للجمعية ({lang})</label>
              <textarea 
                value={lang === 'ar' ? (info.description || "") : lang === 'fr' ? (info.description_fr || "") : (info.description_en || "")}
                onChange={(e) => {
                  if (lang === 'ar') setInfo({...info, description: e.target.value});
                  if (lang === 'fr') setInfo({...info, description_fr: e.target.value});
                  if (lang === 'en') setInfo({...info, description_en: e.target.value});
                }}
                className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary min-h-[100px]"
                placeholder="نبذة عن رسالة وأهداف الجمعية..."
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          </section>

          {/* Contact Info */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-secondary flex items-center gap-2 border-b border-border-custom pb-4">
              <Phone className="h-6 w-6" />
              معلومات التواصل
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-charcoal/80">العنوان ({lang})</label>
                <input 
                  type="text" 
                  value={lang === 'ar' ? (info.address || "") : lang === 'fr' ? (info.address_fr || "") : (info.address_en || "")}
                  onChange={(e) => {
                    if (lang === 'ar') setInfo({...info, address: e.target.value});
                    if (lang === 'fr') setInfo({...info, address_fr: e.target.value});
                    if (lang === 'en') setInfo({...info, address_en: e.target.value});
                  }}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  placeholder="مثال: شارع الحسن الثاني، الصويرة"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> رقم الهاتف
                </label>
                <input 
                  type="text" 
                  value={info.phone || ""}
                  onChange={(e) => setInfo({...info, phone: e.target.value})}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary text-left"
                  dir="ltr"
                  placeholder="+212 500 000 000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> البريد الإلكتروني
                </label>
                <input 
                  type="email" 
                  value={info.email || ""}
                  onChange={(e) => setInfo({...info, email: e.target.value})}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary text-left"
                  dir="ltr"
                  placeholder="contact@essaouira-darna.ma"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-charcoal/80 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> العنوان
              </label>
              <input 
                type="text" 
                value={info.address || ""}
                onChange={(e) => setInfo({...info, address: e.target.value})}
                className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                placeholder="العنوان الكامل لمقر الجمعية"
              />
            </div>
          </section>

          {/* Bank Info */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-secondary flex items-center gap-2 border-b border-border-custom pb-4 mt-4">
              <Landmark className="h-6 w-6" />
              المعلومات البنكية (للتبرع)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80 flex items-center gap-2">
                  <Landmark className="h-4 w-4" /> اسم البنك
                </label>
                <input 
                  type="text" 
                  value={info.bank_name || ""}
                  onChange={(e) => setInfo({...info, bank_name: e.target.value})}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  placeholder="مثال: البنك الشعبي"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> رقم الحساب (RIB)
                </label>
                <input 
                  type="text" 
                  value={info.bank_account || ""}
                  onChange={(e) => setInfo({...info, bank_account: e.target.value})}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary text-left"
                  dir="ltr"
                  placeholder="000 000 00000000000000 00"
                />
              </div>
            </div>
          </section>

        </div>
      </FadeIn>
    </div>
  );
}
