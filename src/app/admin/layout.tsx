import React from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Package, HeartHandshake, Settings, UserCircle, BookOpen } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";
import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen bg-surface">
          {/* Sidebar */}
          <aside className="w-64 bg-charcoal text-white flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl">
            <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-heading font-extrabold text-xl">لوحة الإدارة</h2>
        </div>
        
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <LayoutDashboard className="h-5 w-5 opacity-70" />
            <span className="font-bold">نظرة عامة</span>
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Package className="h-5 w-5 opacity-70" />
            <span className="font-bold">إدارة المشاريع</span>
          </Link>
          <Link href="/admin/donations" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <HeartHandshake className="h-5 w-5 opacity-70" />
            <span className="font-bold">سجل التبرعات</span>
          </Link>
          <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <BookOpen className="h-5 w-5 opacity-70" />
            <span className="font-bold">الإخبارية</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Settings className="h-5 w-5 opacity-70" />
            <span className="font-bold">إعدادات الموقع</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:mr-64 transition-all pb-12">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-border-custom flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="font-bold text-charcoal/60">
            أهلاً بك في لوحة تحكم جمعية الصويرة دارنا
          </div>
          <div className="flex items-center gap-3 bg-surface border border-border-custom px-4 py-2 rounded-full">
            <UserCircle className="h-5 w-5 text-charcoal/50" />
            <span className="text-sm font-bold text-charcoal">المدير العام</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
      </body>
    </html>
  );
}
