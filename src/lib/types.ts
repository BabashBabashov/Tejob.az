export interface Company {
  id: string;
  slug: string;
  name: string;
  logo: string;
  sector: string;
  description: string;
  email?: string;
  phone?: string;
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

export interface Job {
  id: string;
  slug: string;
  title: string;
  companyId: string;
  regionId: string;
  categoryIds: string[];
  description: string;
  requirements: string[];
  salary?: string;
  workType?: string;
  deadline?: string;
  contactPhone?: string;
  contactEmail?: string;
  isPremium: boolean;
  views: number;
  createdAt: string;
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
