"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Plus, Trash2, Loader2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });

export function AdminNewsClient() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formLang, setFormLang] = useState<"ar"|"fr"|"en">("ar");

  const [formData, setFormData] = useState({
    title: "",
    title_fr: "",
    title_en: "",
    excerpt: "",
    excerpt_fr: "",
    excerpt_en: "",
    content: "",
    content_fr: "",
    content_en: "",
    day_text: "",
    month_text: "",
    image_url: "",
    is_published: true,
    sort_order: 0,
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    setNews(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSave = async () => {
    if (!formData.title || !formData.day_text || !formData.month_text) {
      alert("الرجاء إدخال العنوان، اليوم والشهر.");
      return;
    }
    setIsSaving(true);
    
    // Generate a simple slug
    const slug = formData.title.replace(/\s+/g, '-').substring(0, 50) + '-' + Date.now();

    const { error } = await supabase.from("news").insert([{
      ...formData,
      slug
    }]);

    setIsSaving(false);
    if (!error) {
      setIsAdding(false);
      setFormData({
        title: "", title_fr: "", title_en: "",
        excerpt: "", excerpt_fr: "", excerpt_en: "",
        content: "", content_fr: "", content_en: "",
        day_text: "", month_text: "", image_url: "",
        is_published: true, sort_order: 0
      });
      fetchNews();
    } else {
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm("هل أنت متأكد من حذف هذا الخبر؟")) {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (!error) fetchNews();
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("news").update({ is_published: !currentStatus }).eq("id", id);
    if (!error) fetchNews();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-charcoal">إدارة الإخبارية</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md"
        >
          <Plus className="h-5 w-5" />
          خبر جديد
        </button>
      </div>

      {isAdding && (
        <FadeIn>
          <div className="bg-white rounded-3xl border border-border-custom shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border-custom pb-4">
              <h2 className="font-bold text-xl text-charcoal">إضافة خبر جديد</h2>
              <div className="flex gap-2 bg-surface p-1 rounded-xl">
                <button type="button" onClick={() => setFormLang("ar")} className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-colors ${formLang === 'ar' ? 'bg-primary text-white shadow' : 'text-charcoal/60 hover:text-primary'}`}>عربي</button>
                <button type="button" onClick={() => setFormLang("fr")} className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-colors ${formLang === 'fr' ? 'bg-primary text-white shadow' : 'text-charcoal/60 hover:text-primary'}`}>Français</button>
                <button type="button" onClick={() => setFormLang("en")} className={`px-4 py-1.5 rounded-lg font-bold text-sm transition-colors ${formLang === 'en' ? 'bg-primary text-white shadow' : 'text-charcoal/60 hover:text-primary'}`}>English</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80">عنوان الخبر ({formLang})</label>
                <input 
                  type="text" 
                  value={formLang === 'ar' ? formData.title : formLang === 'fr' ? formData.title_fr : formData.title_en}
                  onChange={(e) => {
                    if (formLang === 'ar') setFormData({...formData, title: e.target.value});
                    if (formLang === 'fr') setFormData({...formData, title_fr: e.target.value});
                    if (formLang === 'en') setFormData({...formData, title_en: e.target.value});
                  }}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80">رابط الصورة (اختياري)</label>
                <input 
                  type="text" 
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  placeholder="https://..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80">تاريخ اليوم (يظهر في المربع)</label>
                <input 
                  type="text" 
                  value={formData.day_text}
                  onChange={(e) => setFormData({...formData, day_text: e.target.value})}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  placeholder="مثال: 10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal/80">الشهر (يظهر في المربع)</label>
                <input 
                  type="text" 
                  value={formData.month_text}
                  onChange={(e) => setFormData({...formData, month_text: e.target.value})}
                  className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary"
                  placeholder="مثال: أبريل"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-charcoal/80">نبذة مختصرة ({formLang})</label>
              <textarea 
                value={formLang === 'ar' ? formData.excerpt : formLang === 'fr' ? formData.excerpt_fr : formData.excerpt_en}
                onChange={(e) => {
                  if (formLang === 'ar') setFormData({...formData, excerpt: e.target.value});
                  if (formLang === 'fr') setFormData({...formData, excerpt_fr: e.target.value});
                  if (formLang === 'en') setFormData({...formData, excerpt_en: e.target.value});
                }}
                className="bg-surface border border-border-custom rounded-xl px-4 py-3 outline-none focus:border-primary min-h-[80px]"
                dir={formLang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            <div className="flex flex-col gap-2 mb-12">
              <label className="text-sm font-bold text-charcoal/80">تفاصيل الخبر ({formLang})</label>
              <div className="bg-white rounded-xl overflow-hidden min-h-[300px] border border-border-custom" dir={formLang === 'ar' ? 'rtl' : 'ltr'}>
                <QuillEditor 
                  value={formLang === 'ar' ? formData.content : formLang === 'fr' ? formData.content_fr : formData.content_en}
                  onChange={(val) => {
                    if (formLang === 'ar') setFormData({...formData, content: val});
                    if (formLang === 'fr') setFormData({...formData, content_fr: val});
                    if (formLang === 'en') setFormData({...formData, content_en: val});
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border-custom">
              <button 
                onClick={() => setIsAdding(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-charcoal/60 hover:bg-surface transition-colors"
              >
                إلغاء
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                حفظ الخبر
              </button>
            </div>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-3xl border border-border-custom shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-surface/50 border-b border-border-custom text-charcoal/60 text-sm">
                    <th className="p-5 font-bold w-16">صورة</th>
                    <th className="p-5 font-bold">عنوان الخبر</th>
                    <th className="p-5 font-bold">التاريخ الجانبي</th>
                    <th className="p-5 font-bold">الحالة</th>
                    <th className="p-5 font-bold text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-custom">
                  {news.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-charcoal/50">
                        لا توجد أخبار مضافة بعد.
                      </td>
                    </tr>
                  ) : news.map((item) => (
                    <tr key={item.id} className="hover:bg-surface/30 transition-colors">
                      <td className="p-5">
                        <div className="h-10 w-10 rounded-lg bg-surface border border-border-custom flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-4 w-4 text-charcoal/30" />
                          )}
                        </div>
                      </td>
                      <td className="p-5 font-bold text-charcoal">{item.title}</td>
                      <td className="p-5 font-bold text-secondary text-sm">
                        {item.day_text} {item.month_text}
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${item.is_published ? 'bg-primary/10 text-primary' : 'bg-charcoal/10 text-charcoal/60'}`}>
                          {item.is_published ? "منشور" : "مخفي"}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => togglePublish(item.id, item.is_published)}
                            className="p-2 rounded-lg hover:bg-surface text-charcoal/60 transition-colors"
                            title={item.is_published ? "إخفاء" : "نشر"}
                          >
                            {item.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
