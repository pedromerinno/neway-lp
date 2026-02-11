export interface Pageview {
  id: string;
  created_at: string;
  path: string;
  query: string | null;
  referrer: string | null;
  user_agent: string | null;
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  session_id: string | null;
  is_admin: boolean;
}

