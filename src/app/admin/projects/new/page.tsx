"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ChevronRight, Loader2, UploadCloud } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Auto-generate slug from English characters or just use a random string if Arabic
    // For simplicity, we just clean up the string
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setSlug(generatedSlug || `project-${Date.now()}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";

      // 1. Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from("project-images")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error("حدث خطأ أثناء رفع الصورة. تأكد من إنشاء الباكيت 'project-images' في Supabase وجعله Public.");
        }

        const { data: publicUrlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // 2. Insert Project
      const { error: insertError } = await supabase.from("projects").insert({
        title,
        slug,
        short_description: shortDescription,
        long_description: longDescription,
        target_amount: targetAmount,
        image_url: imageUrl || "/images/projects/default.jpg",
        status: "active",
        raised_amount: 0,
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/projects" 
          className="p-2 bg-white border border-border-custom hover:bg-surface rounded-xl transition-colors text-charcoal/60"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
        <h1 className="font-heading text-3xl font-bold text-charcoal">إضافة مشروع جديد</h1>
      </div>

      {error && (
        <div className="bg-cta/10 text-cta p-4 rounded-xl text-sm font-bold border border-cta/20">
          {error}
        </div>
      )}

      <FadeIn delay={0.1}>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-border-custom shadow-sm flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-charcoal/80">اسم المشروع *</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
                className="w-full rounded-xl border border-border-custom bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="مثال: الدعم المدرسي للأيتام"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-charcoal/80">الرابط المخصص (Slug) *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                dir="ltr"
                className="w-full rounded-xl border border-border-custom bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-left"
                placeholder="school-support"
              />
              <p className="text-xs text-charcoal/50">هذا النص سيظهر في رابط المشروع، يفضل أن يكون بالإنجليزية وبدون مسافات.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-charcoal/80">الصورة الرئيسية للمشروع</label>
            <div className="relative border-2 border-dashed border-border-custom rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-surface/50 transition-colors">
              <UploadCloud className="h-8 w-8 text-primary/50" />
              <span className="text-sm font-bold text-charcoal/60">
                {imageFile ? imageFile.name : "اضغط هنا لاختيار صورة أو اسحبها إلى هنا"}
              </span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-charcoal/80">الهدف المالي (درهم) - اختياري</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full rounded-xl border border-border-custom bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="مثال: 50000"
            />
            <p className="text-xs text-charcoal/50">إذا قمت بإضافة "احتياجات" للمشروع لاحقاً، سيتم حساب الهدف التلقائي بناءً عليها وتجاهل هذا الرقم.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-charcoal/80">وصف قصير *</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              rows={2}
              className="w-full rounded-xl border border-border-custom bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              placeholder="وصف مختصر يظهر في بطاقة المشروع..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-charcoal/80">وصف كامل للمشروع *</label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              required
              rows={6}
              className="w-full rounded-xl border border-border-custom bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              placeholder="وصف شامل للمشروع، أهدافه، والفئة المستهدفة..."
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-border-custom">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "حفظ وإنشاء المشروع"}
            </button>
          </div>
        </form>
      </FadeIn>
    </div>
  );
}
