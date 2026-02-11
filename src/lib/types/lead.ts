export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city_state: string;
  type_of_interest: string;
  approximate_budget: string | null;
  message: string | null;
  contacted: boolean;
  ip?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
  created_at: string;
}
