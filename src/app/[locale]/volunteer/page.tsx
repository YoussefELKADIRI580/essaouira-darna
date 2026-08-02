import React from "react";
import { VolunteerPageClient } from "@/components/VolunteerPageClient";

export const metadata = {
  title: "التطوع بدارنا - جمعية دارنا بالصويرة",
  description: "انضم إلى برنامج التطوع بدارنا بالصويرة. تطوّع بمهاراتك في التدريس، الرعاية الصحية، الأنشطة الثقافية، أو الصيانة والتقنية.",
};

export default function VolunteerPage() {
  return <VolunteerPageClient />;
}
