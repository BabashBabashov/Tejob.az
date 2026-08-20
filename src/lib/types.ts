export interface Company {
  id: string;
  slug: string;
  name: string;
  logo: string;
  banner?: string | null;
  sector: string;
  description: string;
  email?: string | null;
  phone?: string | null;
}

export interface Region {
  id: string;
  slug: string;
  name: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  type: "position" | "sector" | "women" | "internship";
  icon?: string;
}

export interface SeedJob {
  id: string;
  slug: string;
  title: string;
  companyId: string;
  regionId: string;
  categoryIds: string[];
  description: string;
  salary?: string;
  workType?: string;
  deadline?: string;
  contactPhone?: string;
  contactEmail?: string;
  isPremium: boolean;
  showViews?: boolean;
  views: number;
  createdAt: string;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  description: string;
  salary?: string | null;
  workType?: string | null;
  deadline?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  isPremium: boolean;
  showViews: boolean;
  isInternship: boolean;
  isWomenOnly: boolean;
  views: number;
  createdAt: string;
  company: Company;
  region: Region;
  position?: Position;
  sector?: Sector;
  categories?: Category[];
}

export interface Position {
  id: string;
  slug: string;
  name: string;
  jobCount?: number;
}

export interface Sector {
  id: string;
  slug: string;
  name: string;
  jobCount?: number;
}

export interface SocialLink {
  name: string;
  url: string;
  color: string;
}

export interface PageContent {
  title: string;
  content: string;
}
