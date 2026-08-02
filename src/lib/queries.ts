import { supabase } from "./supabase";
import type {
  AssociationInfo,
  NavLink,
  Stat,
  Project,
  ProjectSupply,
  AssociationValue,
  HistoryStep,
  AboutContent,
  Member,
  Partner,
  NewsItem,
  AnnualReport,
  TransparencyItem,
  VolunteeringStep,
  DonationCategory,
  PrivacyPolicy,
  PageMeta,
  ContactMessage,
  DonationInsert,
} from "./types";

// =====================================================
// FETCH FUNCTIONS (Read)
// =====================================================

import { getLocale } from "next-intl/server";

export async function localizeData<T>(data: T, explicitLocale?: string): Promise<T> {
  if (!data) return data;
  let locale = explicitLocale || "ar";
  if (!explicitLocale) {
    try {
      locale = await getLocale();
    } catch (e) {
      console.error("[localizeData] getLocale error:", e);
    }
  }

  if (locale === "ar") return data;

  const mapObject = (obj: any): any => {
    if (!obj || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(mapObject);

    const localizedObj = { ...obj };
    for (const key of Object.keys(obj)) {
      const locKey = `${key}_${locale}`;
      if (locKey in obj && obj[locKey] !== null && obj[locKey] !== "") {
        localizedObj[key] = obj[locKey];
      }
    }
    return localizedObj;
  };

  return mapObject(data);
}

export async function getAssociationInfo(): Promise<AssociationInfo | null> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("association_info")
      .select("*")
      .limit(1)
      .single();
    if (error) {
      console.error("[getAssociationInfo] Supabase error:", error);
      return null;
    }
    return (await localizeData(data, currentLocale)) || null;
  } catch (e) {
    console.error("[getAssociationInfo] Exception:", e);
    return null;
  }
}

export async function getNavLinks(): Promise<NavLink[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("nav_links")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error) {
      console.error("[getNavLinks] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getNavLinks] Exception:", e);
    return [];
  }
}

export async function getStats(page: string = "home"): Promise<Stat[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("page", page)
      .order("sort_order");
    if (error) {
      console.error("[getStats] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getStats] Exception:", e);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");
    if (error) {
      console.error("[getProjects] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getProjects] Exception:", e);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data: project, error: pError } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (pError || !project) return null;

    const { data: supplies } = await supabase
      .from("project_supplies")
      .select("*")
      .eq("project_id", project.id)
      .order("sort_order");

    return await localizeData({ ...project, supplies: supplies ?? [] }, currentLocale);
  } catch (e) {
    console.error("[getProjectBySlug] Exception:", e);
    return null;
  }
}

export async function getProjectsWithSupplies(): Promise<Project[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data: projects, error: pError } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");

    if (pError || !projects || !Array.isArray(projects)) return [];

    const projectIds = projects.map((p) => p.id);
    let supplies: any[] = [];
    if (projectIds.length > 0) {
      const { data: suppliesData } = await supabase
        .from("project_supplies")
        .select("*")
        .in("project_id", projectIds)
        .order("sort_order");
      supplies = suppliesData || [];
    }

    const merged = projects.map((project) => ({
      ...project,
      supplies: supplies.filter((s) => s.project_id === project.id),
    }));

    return (await localizeData(merged, currentLocale)) || [];
  } catch (e) {
    console.error("[getProjectsWithSupplies] Exception:", e);
    return [];
  }
}

export async function getProjectSupplies(projectId: string): Promise<ProjectSupply[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("project_supplies")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order");
    if (error) {
      console.error("[getProjectSupplies] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getProjectSupplies] Exception:", e);
    return [];
  }
}

export async function getValues(page: string = "home"): Promise<AssociationValue[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("association_values")
      .select("*")
      .eq("page", page)
      .order("sort_order");
    if (error) {
      console.error("[getValues] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getValues] Exception:", e);
    return [];
  }
}

export async function getHistoryTimeline(): Promise<HistoryStep[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("history_timeline")
      .select("*")
      .order("sort_order");
    if (error) {
      console.error("[getHistoryTimeline] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getHistoryTimeline] Exception:", e);
    return [];
  }
}

export async function getAboutContent(section?: string): Promise<AboutContent[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    let query = supabase.from("about_content").select("*");
    if (section) {
      query = query.eq("section", section);
    }
    const { data, error } = await query.order("sort_order");
    if (error) {
      console.error("[getAboutContent] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getAboutContent] Exception:", e);
    return [];
  }
}

export async function getMembers(memberType?: string): Promise<Member[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    let query = supabase.from("members").select("*");
    if (memberType) {
      query = query.eq("member_type", memberType);
    }
    const { data, error } = await query.order("sort_order");
    if (error) {
      console.error("[getMembers] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getMembers] Exception:", e);
    return [];
  }
}

export async function getPartners(partnerType?: string): Promise<Partner[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    let query = supabase.from("partners").select("*");
    if (partnerType) {
      query = query.eq("partner_type", partnerType);
    }
    const { data, error } = await query.order("sort_order");
    if (error) {
      console.error("[getPartners] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getPartners] Exception:", e);
    return [];
  }
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    if (error) {
      console.error("[getNews] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getNews] Exception:", e);
    return [];
  }
}

export async function getAnnualReports(): Promise<AnnualReport[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("annual_reports")
      .select("*")
      .order("sort_order");
    if (error) {
      console.error("[getAnnualReports] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getAnnualReports] Exception:", e);
    return [];
  }
}

export async function getTransparencyData(): Promise<TransparencyItem[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("transparency_data")
      .select("*")
      .order("sort_order");
    if (error) {
      console.error("[getTransparencyData] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getTransparencyData] Exception:", e);
    return [];
  }
}

export async function getVolunteeringSteps(): Promise<VolunteeringStep[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("volunteering_steps")
      .select("*")
      .order("sort_order");
    if (error) {
      console.error("[getVolunteeringSteps] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getVolunteeringSteps] Exception:", e);
    return [];
  }
}

export async function getDonationCategories(): Promise<DonationCategory[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("donation_categories")
      .select("*")
      .order("sort_order");
    if (error) {
      console.error("[getDonationCategories] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getDonationCategories] Exception:", e);
    return [];
  }
}

export async function getPrivacyPolicies(): Promise<PrivacyPolicy[]> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("privacy_policies")
      .select("*")
      .order("sort_order");
    if (error) {
      console.error("[getPrivacyPolicies] Supabase error:", error);
      return [];
    }
    return (await localizeData(data, currentLocale)) || [];
  } catch (e) {
    console.error("[getPrivacyPolicies] Exception:", e);
    return [];
  }
}

export async function getPageMeta(pageSlug: string): Promise<PageMeta | null> {
  try {
    let currentLocale = "ar";
    try { currentLocale = await getLocale(); } catch (e) {}

    const { data, error } = await supabase
      .from("page_meta")
      .select("*")
      .eq("page_slug", pageSlug)
      .single();
    if (error) {
      console.error("[getPageMeta] Supabase error:", error);
      return null;
    }
    return (await localizeData(data, currentLocale)) || null;
  } catch (e) {
    console.error("[getPageMeta] Exception:", e);
    return null;
  }
}

// =====================================================
// INSERT / UPDATE FUNCTIONS (Write)
// =====================================================

export async function submitContactMessage(message: ContactMessage) {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert(message)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function submitDonation(donation: DonationInsert) {
  const { data, error } = await supabase
    .from("donations")
    .insert(donation)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function markSupplyFulfilled(supplyId: string) {
  const { error } = await supabase
    .from("project_supplies")
    .update({ is_fulfilled: true })
    .eq("id", supplyId);
  if (error) throw error;
}

export async function updateProjectRaisedAmount(projectId: string, additionalAmount: number) {
  const { data: project } = await supabase
    .from("projects")
    .select("raised_amount")
    .eq("id", projectId)
    .single();

  if (project) {
    const newAmount = (project.raised_amount || 0) + additionalAmount;
    const { error } = await supabase
      .from("projects")
      .update({ raised_amount: newAmount })
      .eq("id", projectId);
    if (error) throw error;
  }
}