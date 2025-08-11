/**
 * API helpers for ArtConnect opportunities.
 * List endpoint: GET https://api.artconnect.com/v1/opportunities/
 * Detail endpoint: GET https://api.artconnect.com/v1/opportunities/:id/
 * Only the `page` query parameter is supported.
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

export async function fetchOpportunities(page = 1): Promise<OpportunityListResponse> {
  const url = new URL(API + "/opportunities/");
  url.searchParams.set("page", String(page));
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`List fetch failed: ${res.status}`);
  return (await res.json()) as OpportunityListResponse;
}

export async function fetchOpportunity(id: string): Promise<Opportunity> {
  const res = await fetch(`${API}/opportunities/${encodeURIComponent(id)}/`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Detail fetch failed: ${res.status}`);
  return (await res.json()) as Opportunity;
}

export async function fetchAllOpportunities(
  onPage?: (partial: Opportunity[], page: number, pages?: number) => void,
  delayMs = 100,
): Promise<Opportunity[]> {
  let page = 1;
  const all: Opportunity[] = [];
  while (true) {
    const res = await fetchOpportunities(page);
    all.push(...res.data);
    if (onPage) {
      onPage(all.slice(), page, res.pages);
    }
    if (!res.pages || page >= res.pages) break;
    page++;
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  return all;
}

