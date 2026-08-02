"use client";

import React, { useState, useEffect } from "react";
import { Check, Heart, ShieldCheck, ShoppingBag, CreditCard, Sparkles, X } from "lucide-react";
import type { ProjectSupply } from "@/lib/types";
import { submitDonation, markSupplyFulfilled, updateProjectRaisedAmount } from "@/lib/queries";
import { supabase } from "@/lib/supabase";
import { Counter } from "@/components/animations/Counter";

import { useLocale } from "next-intl";

interface DonationCardProps {
  readonly projectId: string;
  readonly projectTitle: string;
  readonly initialSupplies: ProjectSupply[];
  readonly initialRaised: number;
  readonly target: number;
}

export default function DonationCard({
  projectId,
  projectTitle,
  initialSupplies,
  initialRaised,
  target,
}: DonationCardProps) {
  const locale = useLocale();
  const [supplies, setSupplies] = useState<ProjectSupply[]>(initialSupplies);
  const [raised, setRaised] = useState<number>(initialRaised);

  // Sync props when they change
  useEffect(() => {
    setSupplies(initialSupplies);
    setRaised(initialRaised);
  }, [initialSupplies, initialRaised]);

  // Real-time synchronization using Supabase Realtime
  useEffect(() => {
    // 1. Subscribe to updates for this project (raised_amount)
    const projectChannel = supabase
      .channel(`project-realtime-${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "projects",
          filter: `id=eq.${projectId}`,
        },
        (payload) => {
          const updatedProject = payload.new as any;
          if (updatedProject && updatedProject.raised_amount !== undefined) {
            setRaised(Number(updatedProject.raised_amount));
          }
        }
      )
      .subscribe();

    // 2. Subscribe to updates for project supplies (is_fulfilled status)
    const suppliesChannel = supabase
      .channel(`supplies-realtime-${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "project_supplies",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          const updatedSupply = payload.new as ProjectSupply;
          if (updatedSupply) {
            setSupplies((prev) =>
              prev.map((item) => (item.id === updatedSupply.id ? updatedSupply : item))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectChannel);
      supabase.removeChannel(suppliesChannel);
    };
  }, [projectId]);
  
  // Checkout Modal State
  const [selectedSupply, setSelectedSupply] = useState<ProjectSupply | null>(null);
  const [isGeneralDonation, setIsGeneralDonation] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>("100");
  const [paymentData, setPaymentData] = useState({ name: "", card: "", expiry: "", cvv: "" });
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleOpenCheckout = (supply: ProjectSupply) => {
    setSelectedSupply(supply);
    setIsGeneralDonation(false);
    setPaymentSuccess(false);
    setPaymentError(null);
    setPaymentData({ name: "", card: "", expiry: "", cvv: "" });
  };

  const handleOpenGeneralCheckout = () => {
    setSelectedSupply(null);
    setIsGeneralDonation(true);
    setCustomAmount("100");
    setPaymentSuccess(false);
    setPaymentError(null);
    setPaymentData({ name: "", card: "", expiry: "", cvv: "" });
  };

  const handleCloseCheckout = () => {
    if (!isPaying) {
      setSelectedSupply(null);
      setIsGeneralDonation(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);

    try {
      if (selectedSupply || isGeneralDonation) {
        const donationAmount = isGeneralDonation ? Number(customAmount) : selectedSupply!.cost;

        // Call the backend API to initiate CMI payment
        const response = await fetch('/api/cmi/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            supplyId: isGeneralDonation ? undefined : selectedSupply!.id,
            amount: donationAmount,
            donorName: paymentData.name,
            email: "donor@example.com", // You can add an email field to the form later
            userId: undefined
          }),
        });

        const data = await response.json();

        if (data.error || !data.gatewayUrl) {
          throw new Error(data.error || "فشل في إنشاء معاملة الدفع");
        }

        // Create a hidden form and submit it to redirect to CMI
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.gatewayUrl;
        
        Object.keys(data.params).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data.params[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        
        // Note: we don't clear state or set success here because the user is redirected away.
        // The callback URL will handle success/failure upon return.
      }
    } catch (err: any) {
      console.error(err);
      setPaymentError("حدث خطأ أثناء معالجة الدفع. يرجى التأكد من أن قاعدة البيانات معدة بشكل صحيح وأنك تستخدم الصلاحيات المناسبة.");
    } finally {
      setIsPaying(false);
    }
  };

  // If there's any donation, show at least 1% so the bar is visibly moving.
  const rawPercentage = (raised / target) * 100;
  const progressPercentage = Math.min(100, raised > 0 && rawPercentage < 1 ? 1 : Math.round(rawPercentage));

  return (
    <div className="flex flex-col gap-8">
      {/* Live Impact Card */}
      <div className="rounded-2xl border border-border-custom bg-white p-8 shadow-xl shadow-primary/5">
        <h3 className="font-heading text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
          <span className="bg-primary/10 p-2 rounded-xl text-primary">
            <Heart className="h-6 w-6" />
          </span>
          حصيلة التبرعات الحالية للمشروع
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-base">
            <span className="text-charcoal/80 font-bold">المبلغ المجموع:</span>
            <span className="font-extrabold text-cta text-2xl"><Counter to={raised} duration={1.5} /> د.م.</span>
          </div>
          
          <div className="h-4 w-full rounded-full bg-surface overflow-hidden border border-border-custom/50 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm font-bold text-charcoal/60 mt-1">
            <span>الهدف الكلي: {target.toLocaleString()} د.م.</span>
            <span className="text-primary bg-primary/10 px-3 py-1 rounded-full"><Counter to={progressPercentage} duration={1.5} suffix="%" /> مكتمل</span>
          </div>
        </div>
      </div>

      {/* General Donation Box */}
      <div className="flex flex-col gap-4 p-8 rounded-2xl border border-primary/20 bg-primary/5 shadow-sm hover-lift">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-xl font-bold text-charcoal">تبرع بمبلغ حر لدعم المشروع</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed">ساهم بأي مبلغ تجود به نفسك وسيوجه مباشرة لتلبية الاحتياجات الطارئة لهذا المشروع.</p>
        </div>
        <button
          onClick={handleOpenGeneralCheckout}
          className="inline-flex h-12 w-full sm:w-fit items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white transition-all hover:bg-primary-hover active:scale-95 shadow-md mt-2"
        >
          <Heart className="h-4 w-4" /> تبرع بمبلغ من اختيارك
        </button>
      </div>

      {/* Supplies Checklist */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-heading text-2xl font-bold text-charcoal">احتياجات ومستلزمات المشروع</h3>
          <span className="text-sm text-cta bg-cta/10 px-3 py-1 rounded-full font-bold">اضغط على أي بند للتبرع به</span>
        </div>

        <div className="flex flex-col gap-4">
          {supplies.map((item) => {
            const isFulfilled = item.is_fulfilled;

            return (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border transition-all duration-300 ${
                  isFulfilled
                    ? "bg-surface opacity-70 border-border-custom"
                    : "bg-white border-border-custom hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover-lift"
                }`}
              >
                {/* Item Info */}
                <div className="flex items-start gap-4">
                  {isFulfilled ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm border border-emerald-200">
                      <Check className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={`text-base font-bold text-charcoal ${
                        isFulfilled ? "line-through text-charcoal/60" : ""
                      }`}
                    >
                      {locale === 'fr' ? item.name_fr || item.name : locale === 'en' ? item.name_en || item.name : item.name}
                    </span>
                    <span className="text-xs text-charcoal/60 font-bold bg-surface w-fit px-2 py-0.5 rounded-md">الفئة: {item.category}</span>
                  </div>
                </div>

                {/* Pricing & Call-to-action */}
                <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-t-0 border-border-custom/50 pt-4 sm:pt-0 mt-2 sm:mt-0">
                  <div className="flex flex-col sm:text-left gap-1">
                    <span className="text-xs text-charcoal/60 font-bold">تكلفة البند</span>
                    <span className={`text-lg font-extrabold text-charcoal ${isFulfilled ? "line-through text-charcoal/50" : ""}`}>
                      {item.cost} د.م.
                    </span>
                  </div>

                  {isFulfilled ? (
                    <button
                      disabled
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-surface px-6 text-sm font-bold text-charcoal/50 cursor-not-allowed border border-border-custom"
                    >
                      تم التوفير بنجاح
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenCheckout(item)}
                      type="button"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-sm font-bold text-white transition-all hover:bg-cta-hover hover:scale-105 shadow-md hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer active:scale-95"
                    >
                      <Heart className="h-4 w-4" />
                      توفير البند
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout Modal */}
      {(selectedSupply || isGeneralDonation) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-white p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={handleCloseCheckout}
              disabled={isPaying}
              className="absolute top-6 left-6 p-2 rounded-full text-charcoal/50 hover:bg-surface hover:text-primary transition-colors disabled:opacity-50"
            >
              <X className="h-6 w-6" />
            </button>

            {paymentSuccess ? (
              <div className="flex flex-col items-center justify-center text-center gap-6 py-10">
                <div className="rounded-full bg-gradient-to-tr from-secondary to-primary p-6 text-white shadow-lg animate-bounce">
                  <Sparkles className="h-12 w-12 fill-current" />
                </div>
                <div>
                  <h3 className="font-heading text-3xl font-extrabold text-charcoal mb-2">شكراً جزيلاً لك!</h3>
                  <p className="text-base text-charcoal/80 leading-relaxed font-medium">
                    لقد ساهمت بنجاح بمبلغ <span className="font-bold text-cta bg-cta/10 px-2 py-0.5 rounded-md">{isGeneralDonation ? customAmount : selectedSupply?.cost} د.م.</span>
                    {!isGeneralDonation && selectedSupply && <span> لتوفير <span className="font-bold text-primary">{selectedSupply.name}</span>.</span>}
                  </p>
                </div>
                <p className="text-sm font-bold text-primary bg-primary/5 px-4 py-2 rounded-xl mt-2">سيتم تحديث حالة المشروع فوراً.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 tracking-wider">نموذج الدفع الآمن</span>
                  <h3 className="font-heading text-2xl font-extrabold text-charcoal">
                    {isGeneralDonation ? "تبرع عام للمشروع" : "توفير مستلزمات المشروع"}
                  </h3>
                </div>

                <div className="rounded-2xl bg-surface p-5 border border-border-custom flex flex-col gap-3 text-sm text-charcoal/80 font-medium">
                  <div className="flex justify-between items-center border-b border-border-custom/50 pb-2">
                    <span>المشروع:</span>
                    <span className="font-bold text-charcoal">{projectTitle}</span>
                  </div>
                  
                  {isGeneralDonation ? (
                    <div className="flex justify-between items-center pt-1">
                      <span className="font-bold">المبلغ المراد التبرع به:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          required
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-24 h-10 text-center font-extrabold text-lg text-cta rounded-xl border border-border-custom focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <span className="font-extrabold text-lg text-cta">درهم</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center border-b border-border-custom/50 pb-2">
                        <span>البند المختار:</span>
                        <span className="font-bold text-primary bg-primary/5 px-2 rounded">{selectedSupply?.name}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-bold">المبلغ الكلي المطلوب:</span>
                        <span className="font-extrabold text-lg text-cta">{selectedSupply?.cost} درهم</span>
                      </div>
                    </>
                  )}
                </div>

                {paymentError && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-medium text-red-700 animate-in fade-in duration-300">
                    {paymentError}
                  </div>
                )}

                <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5 mt-2">
                  {/* Card Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="card-name" className="text-xs font-bold text-charcoal/80">الاسم على البطاقة</label>
                    <input
                      required
                      type="text"
                      id="card-name"
                      placeholder="أحمد علي"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                      className="h-12 rounded-xl border border-border-custom bg-white px-4 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="card-num" className="text-xs font-bold text-charcoal/80">رقم البطاقة البنكية</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        id="card-num"
                        placeholder="4000 1234 5678 9010"
                        maxLength={19}
                        value={paymentData.card}
                        onChange={(e) => setPaymentData({ ...paymentData, card: e.target.value })}
                        className="h-12 w-full rounded-xl border border-border-custom bg-white pl-12 pr-4 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                      />
                      <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-primary/50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    {/* Expiry */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="card-expiry" className="text-xs font-bold text-charcoal/80">تاريخ الانتهاء</label>
                      <input
                        required
                        type="text"
                        id="card-expiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                        className="h-12 rounded-xl border border-border-custom bg-white px-4 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* CVV */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="card-cvv" className="text-xs font-bold text-charcoal/80">رمز التحقق (CVV)</label>
                      <input
                        required
                        type="password"
                        id="card-cvv"
                        placeholder="***"
                        maxLength={3}
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        className="h-12 rounded-xl border border-border-custom bg-white px-4 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isPaying || (isGeneralDonation && (!customAmount || Number(customAmount) <= 0))}
                    type="submit"
                    className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-cta text-base font-bold text-white transition-all hover:bg-cta-hover active:scale-95 shadow-lg shadow-cta/20 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed mt-4 group"
                  >
                    <ShieldCheck className={`h-5 w-5 ${isPaying ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                    {isPaying ? "جاري معالجة الدفع الآمن..." : `دفع مبلغ ${isGeneralDonation ? customAmount || 0 : selectedSupply?.cost} د.م.`}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
