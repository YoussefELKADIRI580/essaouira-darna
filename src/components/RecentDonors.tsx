"use client";

import React, { useEffect, useState } from "react";
import { Users, Heart, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DonorInfo {
  id: string;
  donor_name: string | null;
  amount: number;
  created_at: string;
  supply_name?: string;
}

interface RecentDonorsProps {
  readonly projectId: string;
}

export default function RecentDonors({ projectId }: RecentDonorsProps) {
  const [donors, setDonors] = useState<DonorInfo[]>([]);

  useEffect(() => {
    // 1. Fetch initial recent donations
    async function fetchRecentDonations() {
      const { data, error } = await supabase
        .from("donations")
        .select(`
          id,
          donor_name,
          amount,
          created_at,
          supply_id
        `)
        .eq("project_id", projectId)
        .eq("payment_status", "completed")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching donations:", error);
        return;
      }

      // If we have supply_ids, fetch their names to show what they donated for
      if (data && data.length > 0) {
        const formattedDonors = await Promise.all(
          data.map(async (d: any) => {
            let supplyName = "";
            if (d.supply_id) {
              const { data: supplyData } = await supabase
                .from("project_supplies")
                .select("name")
                .eq("id", d.supply_id)
                .single();
              if (supplyData) {
                supplyName = supplyData.name;
              }
            }
            return {
              id: d.id,
              donor_name: d.donor_name || "فاعل خير",
              amount: Number(d.amount),
              created_at: d.created_at,
              supply_name: supplyName,
            };
          })
        );
        setDonors(formattedDonors);
      }
    }

    fetchRecentDonations();

    // 2. Subscribe to realtime insert events on donations table
    const donationsChannel = supabase
      .channel(`recent-donors-${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "donations",
          filter: `project_id=eq.${projectId}`,
        },
        async (payload) => {
          const newDonation = payload.new as any;
          if (newDonation.payment_status === "completed") {
            let supplyName = "";
            if (newDonation.supply_id) {
              const { data: supplyData } = await supabase
                .from("project_supplies")
                .select("name")
                .eq("id", newDonation.supply_id)
                .single();
              if (supplyData) {
                supplyName = supplyData.name;
              }
            }

            const formattedNewDonor: DonorInfo = {
              id: newDonation.id,
              donor_name: newDonation.donor_name || "فاعل خير",
              amount: Number(newDonation.amount),
              created_at: newDonation.created_at,
              supply_name: supplyName,
            };

            setDonors((prev) => [formattedNewDonor, ...prev.slice(0, 4)]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(donationsChannel);
    };
  }, [projectId]);

  // Format date to readable time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.max(1, Math.floor(diffMs / 60000));
    
    if (diffMins < 60) {
      return `منذ ${diffMins} دقيقة`;
    }
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `منذ ${diffHours} ساعة`;
    }
    return date.toLocaleDateString("ar-MA", { day: "numeric", month: "long" });
  };

  return (
    <div className="rounded-3xl border border-border-custom bg-white p-6 shadow-xl shadow-primary/5">
      <h3 className="font-heading text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
        <span className="bg-primary/10 p-2.5 rounded-xl text-primary">
          <Users className="h-5 w-5" />
        </span>
        آخر التبرعات المباشرة للمشروع
      </h3>

      {donors.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-border-custom rounded-2xl bg-surface/30">
          <Heart className="h-8 w-8 text-charcoal/30 mb-2 animate-pulse" />
          <p className="text-sm font-bold text-charcoal/60">لم يتم تسجيل أي تبرعات للمشروع بعد.</p>
          <p className="text-xs text-charcoal/40 mt-1">كن أول من يساهم في دعم هذا المشروع!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-surface/40 border border-border-custom/50 hover:border-primary/20 transition-all duration-300 animate-in fade-in slide-in-from-top-4 duration-500"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                  <Heart className="h-4.5 w-4.5 fill-current" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-charcoal text-sm sm:text-base">
                    {donor.donor_name}
                  </span>
                  <span className="text-xs text-charcoal/60">
                    {donor.supply_name ? (
                      <>
                        ساهم بـ <span className="text-primary font-bold">{donor.amount} د.م.</span> لتوفير <span className="font-bold">{donor.supply_name}</span>
                      </>
                    ) : (
                      <>
                        ساهم بمبلغ تبرع قدره <span className="text-primary font-bold">{donor.amount} د.م.</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-charcoal/50 font-medium font-mono shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimeAgo(donor.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
