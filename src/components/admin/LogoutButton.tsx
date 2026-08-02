"use client";

import { LogOut } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh(); // Important to refresh middleware state
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cta/20 text-cta transition-colors w-full text-right"
    >
      <LogOut className="h-5 w-5" />
      <span className="font-bold">تسجيل الخروج</span>
    </button>
  );
}
