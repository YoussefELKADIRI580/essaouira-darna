import React from "react";
import { getAssociationInfo } from "@/lib/queries";
import { InKindPageClient } from "@/components/InKindPageClient";

export const metadata = {
  title: "التبرعات العينية وقائمة المستلزمات - جمعية دارنا بالصويرة",
  description: "قائمة الاحتياجات والمستلزمات الحية بدارنا بالصويرة. تبرع بالمواد الغذائية، الملابس والأغطية، الأدوات المدرسية والتجهيزات.",
};

export default async function InKindPage() {
  const info = await getAssociationInfo();

  return (
    <InKindPageClient
      associationBankRib={info?.bank_account ?? "011 810 0000 1234567890 123 45"}
      associationBankName={info?.bank_name ?? "البنك الشعبي - وكالة الصويرة الغزوة"}
      associationAddress={info?.address ?? "حي الغزوة، طريق سيدي كاوكي، الصويرة - المغرب"}
      associationPhone={info?.phone ?? "0524471234 / 0661123456"}
    />
  );
}
