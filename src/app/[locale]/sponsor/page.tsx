import React from "react";
import { getAssociationInfo } from "@/lib/queries";
import { KafalaPageClient } from "@/components/KafalaPageClient";

export const metadata = {
  title: "كفالة طفل - جمعية دارنا بالصويرة",
  description: "برنامج كفالة الأيتام والأطفال بالدار - كفالة شاملة وجزئية برعاية متكاملة وشفافية تامة.",
};

export default async function SponsorPage() {
  const info = await getAssociationInfo();

  return (
    <KafalaPageClient
      associationBankRib={info?.bank_account ?? "011 810 0000 1234567890 123 45"}
      associationBankName={info?.bank_name ?? "البنك الشعبي - وكالة الصويرة الغزوة"}
    />
  );
}
