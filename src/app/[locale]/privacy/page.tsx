import React from "react";
import { ShieldCheck, EyeOff, Lock, HeartHandshake } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { WatermarkText } from "@/components/WatermarkText";
import { getPrivacyPolicies } from "@/lib/queries";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  EyeOff, Lock, ShieldCheck, HeartHandshake,
};

export default async function PrivacyPolicy() {
  const policies = await getPrivacyPolicies();

  return (
    <div className="flex flex-col gap-12 py-12 md:py-24 overflow-hidden relative min-h-screen bg-background">
      <WatermarkText text="حماية" className="top-20 left-1/2 -translate-x-1/2 text-primary" />
      
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn delay={0.1} direction="up">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-4 border border-primary/20">
              وثيقة رسمية وإعلان مبادئ
            </span>
            <h1 className="font-heading text-4xl font-extrabold text-charcoal sm:text-5xl mb-6">
              سياسة حماية الطفولة والخصوصية
            </h1>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
              في &quot;جمعية الصويرة دارنا&quot;، نضع كرامة وحقوق وسلامة الأطفال فوق أي اعتبار مادي أو إعلامي.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-8">
          {policies.map((policy, idx) => {
            const IconComp = policy.icon_name ? iconMap[policy.icon_name] : ShieldCheck;
            return (
              <FadeIn key={policy.id} delay={0.2 + idx * 0.1} direction="up">
                <div className="p-8 rounded-3xl border border-border-custom bg-surface hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                      {IconComp && <IconComp className="w-8 h-8" />}
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-charcoal">{policy.title}</h2>
                  </div>
                  <p className="text-charcoal/80 leading-relaxed text-lg">
                    {policy.content}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </div>
  );
}
