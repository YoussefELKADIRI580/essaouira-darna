import { supabase } from "@/lib/supabase";
import { FadeIn } from "@/components/animations/FadeIn";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDonations() {
  const { data: donations } = await supabase
    .from("donations")
    .select("*, projects(title)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-heading text-3xl font-bold text-charcoal">سجل التبرعات</h1>

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-3xl border border-border-custom shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-surface/50 border-b border-border-custom text-charcoal/60 text-sm">
                  <th className="p-5 font-bold">رقم المعاملة</th>
                  <th className="p-5 font-bold">اسم المتبرع</th>
                  <th className="p-5 font-bold">المشروع</th>
                  <th className="p-5 font-bold">المبلغ</th>
                  <th className="p-5 font-bold">حالة الدفع</th>
                  <th className="p-5 font-bold">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom">
                {donations?.map((donation) => {
                  const statusColors = {
                    completed: "bg-green-100 text-green-700",
                    pending: "bg-yellow-100 text-yellow-700",
                    failed: "bg-red-100 text-red-700",
                  };
                  const statusIcons = {
                    completed: <CheckCircle2 className="h-3.5 w-3.5" />,
                    pending: <Clock className="h-3.5 w-3.5" />,
                    failed: <XCircle className="h-3.5 w-3.5" />,
                  };
                  const statusText = {
                    completed: "ناجح",
                    pending: "قيد المعالجة",
                    failed: "فشل",
                  };

                  const s = donation.payment_status as keyof typeof statusColors;

                  return (
                    <tr key={donation.id} className="hover:bg-surface/30 transition-colors">
                      <td className="p-5 text-sm text-charcoal/60 font-mono">{donation.transaction_id || "---"}</td>
                      <td className="p-5 font-bold text-charcoal">{donation.donor_name}</td>
                      <td className="p-5 text-charcoal/80 text-sm">{donation.projects?.title || "تبرع عام"}</td>
                      <td className="p-5 font-bold text-primary">{donation.amount.toLocaleString()} د.م.</td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${statusColors[s] || "bg-gray-100 text-gray-700"}`}>
                          {statusIcons[s]} {statusText[s] || donation.payment_status}
                        </span>
                      </td>
                      <td className="p-5 text-charcoal/60 text-sm" dir="ltr">
                        {new Date(donation.created_at).toLocaleString('ar-MA')}
                      </td>
                    </tr>
                  );
                })}
                {(!donations || donations.length === 0) && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-charcoal/50 font-bold">
                      لا توجد تبرعات مسجلة حتى الآن.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
