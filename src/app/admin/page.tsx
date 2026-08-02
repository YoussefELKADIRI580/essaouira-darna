import { supabase } from "@/lib/supabase";
import { Package, HeartHandshake, Users, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch some basic stats
  const { count: projectsCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
  const { data: donations } = await supabase.from("donations").select("amount, payment_status, donor_name");
  
  const totalDonations = donations?.filter(d => d.payment_status === "completed").reduce((sum, d) => sum + d.amount, 0) || 0;
  const totalDonors = new Set(donations?.filter(d => d.payment_status === "completed").map(d => d.donor_name)).size || 0;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-heading text-3xl font-bold text-charcoal">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeIn delay={0.1}>
          <div className="bg-white p-6 rounded-3xl border border-border-custom shadow-sm flex flex-col gap-4">
            <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-charcoal/60 text-sm font-bold mb-1">إجمالي التبرعات المحصلة</p>
              <h3 className="font-heading text-3xl font-extrabold text-charcoal">{totalDonations.toLocaleString()} <span className="text-base text-charcoal/60">د.م.</span></h3>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-white p-6 rounded-3xl border border-border-custom shadow-sm flex flex-col gap-4">
            <div className="bg-secondary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-secondary">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-charcoal/60 text-sm font-bold mb-1">المشاريع المسجلة</p>
              <h3 className="font-heading text-3xl font-extrabold text-charcoal">{projectsCount || 0}</h3>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-white p-6 rounded-3xl border border-border-custom shadow-sm flex flex-col gap-4">
            <div className="bg-cta/10 w-12 h-12 rounded-2xl flex items-center justify-center text-cta">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-charcoal/60 text-sm font-bold mb-1">عدد المتبرعين (الفريدين)</p>
              <h3 className="font-heading text-3xl font-extrabold text-charcoal">{totalDonors}</h3>
            </div>
          </div>
        </FadeIn>
      </div>
      
      <FadeIn delay={0.4}>
        <div className="bg-white p-8 rounded-3xl border border-border-custom shadow-sm">
          <h2 className="font-heading text-xl font-bold text-charcoal mb-4">مرحباً بك في لوحة الإدارة</h2>
          <p className="text-charcoal/70 leading-relaxed">
            من خلال هذه اللوحة، يمكنك التحكم الكامل في موقع الجمعية. يمكنك إضافة مشاريع جديدة، تعديل الاحتياجات (المحفظة، الكتب...)، متابعة التبرعات الواردة، وتحديث إعدادات الموقع بكل سهولة.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
