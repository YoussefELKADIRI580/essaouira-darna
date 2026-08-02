"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ChevronRight, Loader2, Plus, Trash2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export default function EditProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Project state
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [targetAmount, setTargetAmount] = useState(0);
  
  // Supplies state
  const [supplies, setSupplies] = useState<any[]>([]);
  const [newSupplyName, setNewSupplyName] = useState("");
  const [newSupplyCost, setNewSupplyCost] = useState("");
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", resolvedParams.projectId)
        .single();

      if (projectError) throw projectError;

      setTitle(projectData.title);
      setStatus(projectData.status);
      setTargetAmount(projectData.target_amount);

      const { data: suppliesData, error: suppliesError } = await supabase
        .from("project_supplies")
        .select("*")
        .eq("project_id", resolvedParams.projectId)
        .order("created_at", { ascending: true });

      if (suppliesError) throw suppliesError;
      
      setSupplies(suppliesData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    setSaving(true);
    try {
      const newStatus = status === "active" ? "completed" : "active";
      const { error } = await supabase
        .from("projects")
        .update({ status: newStatus })
        .eq("id", resolvedParams.projectId);

      if (error) throw error;
      setStatus(newStatus);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSupply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupplyName || !newSupplyCost) return;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("project_supplies")
        .insert({
          project_id: resolvedParams.projectId,
          name: newSupplyName,
          cost: Number(newSupplyCost),
          is_fulfilled: false
        })
        .select()
        .single();

      if (error) throw error;

      setSupplies([...supplies, data]);
      setNewSupplyName("");
      setNewSupplyCost("");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSupply = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الاحتياج؟")) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("project_supplies")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSupplies(supplies.filter(s => s.id !== id));
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const actualTarget = supplies.length > 0 
    ? supplies.reduce((acc, s) => acc + s.cost, 0) 
    : targetAmount;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/projects" 
          className="p-2 bg-white border border-border-custom hover:bg-surface rounded-xl transition-colors text-charcoal/60"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
        <h1 className="font-heading text-3xl font-bold text-charcoal">إدارة احتياجات المشروع</h1>
      </div>

      {error && (
        <div className="bg-cta/10 text-cta p-4 rounded-xl text-sm font-bold border border-cta/20">
          {error}
        </div>
      )}

      <FadeIn delay={0.1}>
        <div className="bg-white p-8 rounded-3xl border border-border-custom shadow-sm flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center border-b border-border-custom pb-6">
            <div>
              <h2 className="text-xl font-bold text-charcoal mb-2">{title}</h2>
              <p className="text-sm text-charcoal/60">الهدف المالي الحالي (بناءً على الاحتياجات المضافة): <strong className="text-primary">{actualTarget.toLocaleString()} د.م.</strong></p>
            </div>
            
            <button
              onClick={handleUpdateStatus}
              disabled={saving}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                status === "active" 
                  ? "bg-white border-charcoal/20 text-charcoal hover:bg-surface" 
                  : "bg-cta/10 border-cta/20 text-cta"
              }`}
            >
              {status === "active" ? "إغلاق المشروع (تحديد كمكتمل)" : "المشروع مغلق (تفعيل)"}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-charcoal/80 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              لائحة الاحتياجات / اللوازم المطلوبة
            </h3>
            
            {/* Supplies List */}
            <div className="flex flex-col gap-3">
              {supplies.map(supply => (
                <div key={supply.id} className="flex items-center justify-between p-4 rounded-xl border border-border-custom bg-surface/50">
                  <div className="flex items-center gap-3">
                    {supply.is_fulfilled ? (
                      <CheckCircle2 className="h-5 w-5 text-cta" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-border-custom"></div>
                    )}
                    <span className="font-bold text-charcoal">{supply.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-primary">{supply.cost} د.م.</span>
                    <button 
                      onClick={() => handleDeleteSupply(supply.id)}
                      className="p-2 text-charcoal/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {supplies.length === 0 && (
                <p className="text-center text-charcoal/50 text-sm py-4">لم يتم إضافة أي احتياجات بعد.</p>
              )}
            </div>

            {/* Add New Supply Form */}
            <form onSubmit={handleAddSupply} className="mt-4 p-5 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 flex flex-col gap-2 w-full">
                <label className="text-xs font-bold text-charcoal/70">اسم الاحتياج / المنتوج</label>
                <input
                  type="text"
                  value={newSupplyName}
                  onChange={(e) => setNewSupplyName(e.target.value)}
                  placeholder="مثال: محفظة مدرسية بجميع لوازمها"
                  className="w-full rounded-xl border border-border-custom bg-white px-4 py-2.5 outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div className="w-full md:w-48 flex flex-col gap-2">
                <label className="text-xs font-bold text-charcoal/70">التكلفة (درهم)</label>
                <input
                  type="number"
                  value={newSupplyCost}
                  onChange={(e) => setNewSupplyCost(e.target.value)}
                  placeholder="مثال: 350"
                  className="w-full rounded-xl border border-border-custom bg-white px-4 py-2.5 outline-none focus:border-primary"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto h-11 px-6 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                إضافة
              </button>
            </form>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

// Add Package Icon component missing from import
function Package(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
