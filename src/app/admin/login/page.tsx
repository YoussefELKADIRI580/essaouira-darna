"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { FadeIn } from "@/components/animations/FadeIn";
import { ShieldAlert, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }

      if (data.user) {
        // Force refresh to trigger middleware and update UI state
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <FadeIn delay={0.1} direction="up" className="z-10 w-full max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-border-custom flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="bg-charcoal/5 p-4 rounded-full mb-2">
              <ShieldAlert className="h-8 w-8 text-charcoal" />
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-charcoal">الإدارة المركزية</h1>
            <p className="text-charcoal/60 text-sm">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
          </div>

          {error && (
            <div className="bg-cta/10 text-cta p-4 rounded-xl text-sm font-bold border border-cta/20 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-charcoal/80">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="w-full rounded-xl border border-border-custom bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="admin@essaouiradarna.ma"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-charcoal/80">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                className="w-full rounded-xl border border-border-custom bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full flex items-center justify-center rounded-xl bg-charcoal px-4 py-3.5 text-base font-bold text-white transition-all hover:bg-charcoal/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
