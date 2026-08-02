// =====================================================
// TypeScript types matching the Supabase schema
// =====================================================

export interface AssociationInfo {
  id: string;
  name: string;
  name_fr?: string | null;
  name_en?: string | null;
  tagline: string | null;
  tagline_fr?: string | null;
  tagline_en?: string | null;
  description: string | null;
  description_fr?: string | null;
  description_en?: string | null;
  address: string | null;
  address_fr?: string | null;
  address_en?: string | null;
  phone: string | null;
  email: string | null;
  bank_account: string | null;
  bank_name: string | null;
  logo_url: string | null;
}

export interface NavLink {
  id: string;
  href: string;
  label: string;
  label_fr?: string | null;
  label_en?: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  label_fr?: string | null;
  label_en?: string | null;
  description: string | null;
  description_fr?: string | null;
  description_en?: string | null;
  sort_order: number;
  page: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  title_fr?: string | null;
  title_en?: string | null;
  short_description: string | null;
  short_description_fr?: string | null;
  short_description_en?: string | null;
  long_description: string | null;
  long_description_fr?: string | null;
  long_description_en?: string | null;
  image_url: string | null;
  target_amount: number | null;
  raised_amount: number | null;
  status?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  supplies?: ProjectSupply[] | any[];
}

export interface ProjectSupply {
  id: string;
  project_id: string;
  name: string;
  name_fr?: string | null;
  name_en?: string | null;
  cost: number | null;
  is_fulfilled: boolean;
  category: string | null;
  sort_order: number;
}

export interface AssociationValue {
  id: string;
  title: string;
  title_fr?: string | null;
  title_en?: string | null;
  description: string;
  description_fr?: string | null;
  description_en?: string | null;
  icon_name: string;
  section: string;
  sort_order: number;
}

export interface HistoryStep {
  id: string;
  year: string;
  date?: string;
  description: string;
  description_fr?: string | null;
  description_en?: string | null;
  sort_order: number;
}

export interface AboutContent {
  id: string;
  title: string;
  title_fr?: string | null;
  title_en?: string | null;
  content: string;
  content_fr?: string | null;
  content_en?: string | null;
  section: string;
  sort_order: number;
}

export interface Member {
  id: string;
  name: string;
  name_fr?: string | null;
  name_en?: string | null;
  role: string;
  role_fr?: string | null;
  role_en?: string | null;
  bio: string | null;
  bio_fr?: string | null;
  bio_en?: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface Partner {
  id: string;
  name: string;
  name_fr?: string | null;
  name_en?: string | null;
  partner_type: "institutional" | "civil" | "donor" | "donor_member" | "official";
  logo_url: string | null;
  icon_name?: string | null;
  website_url: string | null;
  sort_order: number;
}

export interface NewsItem {
  id: string;
  title: string;
  title_fr?: string | null;
  title_en?: string | null;
  excerpt: string | null;
  excerpt_fr?: string | null;
  excerpt_en?: string | null;
  content: string | null;
  content_fr?: string | null;
  content_en?: string | null;
  image_url: string | null;
  published_date: string;
  day_text: string | null;
  month_text: string | null;
  is_published: boolean;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface AnnualReport {
  id: string;
  year: string;
  file_size: string | null;
  description: string | null;
  file_url: string | null;
  sort_order: number;
}

export interface TransparencyItem {
  id: string;
  label: string;
  percentage: number;
  color: string | null;
  sort_order: number;
}

export interface VolunteeringStep {
  id: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number;
}

export interface DonationCategory {
  id: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number;
}

export interface PrivacyPolicy {
  id: string;
  title: string;
  content: string;
  icon_name: string | null;
  sort_order: number;
}

export interface PageMeta {
  id: string;
  page_slug: string;
  title: string;
  description: string | null;
  og_image_url: string | null;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DonationInsert {
  project_id: string;
  supply_id?: string;
  donor_name?: string;
  donor_email?: string;
  amount: number;
  payment_method?: string;
  payment_status?: string;
}
