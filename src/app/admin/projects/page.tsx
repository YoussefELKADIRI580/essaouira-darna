import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*, project_supplies(*)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-charcoal">إدارة المشاريع</h1>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:shadow-primary/20"
        >
          <Plus className="h-5 w-5" />
          مشروع جديد
        </Link>
      </div>

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-3xl border border-border-custom shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-surface/50 border-b border-border-custom text-charcoal/60 text-sm">
                  <th className="p-5 font-bold">اسم المشروع</th>
                  <th className="p-5 font-bold">الحالة</th>
                  <th className="p-5 font-bold">المبلغ المجموع</th>
                  <th className="p-5 font-bold">الهدف</th>
                  <th className="p-5 font-bold">عدد الاحتياجات</th>
                  <th className="p-5 font-bold text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom">
                {projects?.map((project) => {
                  const actualTargetAmount = project.project_supplies && project.project_supplies.length > 0 
                    ? project.project_supplies.reduce((acc: any, item: any) => acc + (item.estimated_cost || 0), 0) 
                    : (project.target_amount || 0);
                    
                  const raised = project.raised_amount || 0;
                  const isActive = raised < actualTargetAmount;

                  return (
                    <tr key={project.id} className="hover:bg-surface/30 transition-colors">
                      <td className="p-5 font-bold text-charcoal">{project.title}</td>
                      <td className="p-5">
                        <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold ${isActive ? 'bg-cta/10 text-cta' : 'bg-charcoal/10 text-charcoal'}`}>
                          {isActive ? "مستمر" : "مكتمل"}
                        </span>
                      </td>
                      <td className="p-5 font-bold text-primary">{raised.toLocaleString()} د.م.</td>
                      <td className="p-5 font-bold text-charcoal/60">{actualTargetAmount.toLocaleString()} د.م.</td>
                      <td className="p-5 font-bold text-charcoal/60">{project.project_supplies?.length || 0}</td>
                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/admin/projects/${project.id}/edit`} className="p-2 bg-surface hover:bg-primary/10 hover:text-primary text-charcoal/60 rounded-xl transition-colors">
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button className="p-2 bg-surface hover:bg-red-500/10 hover:text-red-500 text-charcoal/60 rounded-xl transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {(!projects || projects.length === 0) && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-charcoal/50 font-bold">
                      لا توجد مشاريع حالياً.
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
