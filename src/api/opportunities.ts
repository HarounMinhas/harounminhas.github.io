/**
 * API helpers for ArtConnect opportunities.
 * List endpoint: GET https://api.artconnect.com/v1/opportunities/
 * Detail endpoint: GET https://api.artconnect.com/v1/opportunities/:id/
 * Supports query params: sortBy, page (1-based).
 */

export type Contact = { email?: string; url?: string; instagram?: string };
export type Profile = {
  id: string;
  organizationName: string;
  organizationType: string;
  verified?: string | null;
  role?: string;
  profileImageUrl?: string;
  contact?: Contact;
  country?: string | null;
  city?: string | null;
};

export type ApplicationFee = { price: number; currency: string; description?: string };
export type RequiredBlock = { items?: string[]; other?: string | null };
export type Boost = { topPost?: string; isHighlighted?: boolean; socialMedia?: string; newsletter?: boolean; createdAt?: string };

export type Opportunity = {
  id: string;
  profile: Profile;
  title: string;
  description?: { content: string }[];
  artisticFields?: string[];
  type?: string;
  attributes?: Record<string, any>;
  feeDescription?: string | null;
  applicationFees?: ApplicationFee[];
  required?: RequiredBlock;
  apply?: { onlineForm?: string };
  contact?: { email?: string; url?: string };
  jury?: any[];
  previousWinners?: any[];
  deadline?: string;
  lastModifiedDate?: string;
  createdAt?: string;
  winnerDate?: string | null;
  postLifetime?: string | null;
  isOnline?: boolean;
  participant?: any[];
  hidden?: boolean;
  boost?: Boost;
  rewards?: { cashPrize?: any[]; funding?: any[]; rewardTypes?: string[]; rewardDescription?: string | null };
  restrictions?: { age?: any; location?: any; locations?: any[]; language?: any; nationality?: any; other?: any };
  fee?: "FREE" | "FEES" | "No" | string;
};

export type OpportunityListResponse = {
  data: Opportunity[];
  pages?: number;
  entries?: number;
};

const API = "https://api.artconnect.com/v1";

export async function fetchOpportunities(
  params: {
    sortBy?: string;
    page?: number;
    type?: string;
    country?: string;
    city?: string;
    pageLength?: number;
  } = {}
): Promise<OpportunityListResponse> {
  const url = new URL(API + "/opportunities/");
  if (params.sortBy) url.searchParams.set("sortBy", params.sortBy);
  if (params.page) url.searchParams.set("page", String(params.page));
  if (params.type) url.searchParams.set("type", params.type);
  if (params.country) url.searchParams.set("country", params.country);
  if (params.city) url.searchParams.set("city", params.city);
  if (params.pageLength) url.searchParams.set("pageLength", String(params.pageLength));
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`List fetch failed: ${res.status}`);
  return (await res.json()) as OpportunityListResponse;
}

export async function fetchOpportunity(id: string): Promise<Opportunity> {
  const res = await fetch(`${API}/opportunities/${encodeURIComponent(id)}/`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Detail fetch failed: ${res.status}`);
  return (await res.json()) as Opportunity;
}
