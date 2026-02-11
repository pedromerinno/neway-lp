import { normalizeHumanText } from "@/lib/safe-decode";

export type VercelGeo = {
  country: string | null;
  region: string | null;
  city: string | null;
};

function firstHeaderValue(headers: Headers, name: string) {
  const v = headers.get(name);
  return v ? v.trim() : null;
}

export function getClientIp(headers: Headers) {
  // Vercel/Proxies usually set x-forwarded-for as a comma-separated list.
  const xff = firstHeaderValue(headers, "x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || null;

  const realIp = firstHeaderValue(headers, "x-real-ip");
  if (realIp) return realIp;

  const vercelFwd = firstHeaderValue(headers, "x-vercel-forwarded-for");
  if (vercelFwd) return vercelFwd.split(",")[0]?.trim() || null;

  return null;
}

export function getVercelGeo(headers: Headers): VercelGeo {
  const country = firstHeaderValue(headers, "x-vercel-ip-country");
  const region = firstHeaderValue(headers, "x-vercel-ip-country-region");
  const city = firstHeaderValue(headers, "x-vercel-ip-city");

  return {
    // Vercel geo headers can be URL-encoded (e.g. São Paulo -> S%C3%A3o%20Paulo).
    // Normalize to a human-readable string before we store/use it.
    country: country ? normalizeHumanText(country) : null,
    region: region ? normalizeHumanText(region) : null,
    city: city ? normalizeHumanText(city) : null,
  };
}

export function isProbablyPrivateIp(ip: string) {
  const v = ip.trim().toLowerCase();
  if (!v) return true;

  // IPv6 loopback / link-local / unique local
  if (v === "::1") return true;
  if (v.startsWith("fe80:")) return true;
  if (v.startsWith("fc") || v.startsWith("fd")) return true;

  // IPv4 loopback / private ranges
  if (v.startsWith("127.")) return true;
  if (v.startsWith("10.")) return true;
  if (v.startsWith("192.168.")) return true;
  if (v.startsWith("172.")) {
    const second = Number(v.split(".")[1]);
    if (second >= 16 && second <= 31) return true;
  }

  return false;
}

export async function getGeoWithFallback(
  headers: Headers,
  ip: string | null,
): Promise<VercelGeo> {
  const vercel = getVercelGeo(headers);
  if (vercel.country || vercel.region || vercel.city) return vercel;

  if (!ip || isProbablyPrivateIp(ip)) return vercel;

  // Fallback: IP geolocation (best-effort).
  // Note: in production on Vercel, the headers above usually suffice.
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      signal: controller.signal,
      headers: { "Accept": "application/json" },
      cache: "no-store",
    });
    clearTimeout(t);

    if (!res.ok) return vercel;
    const json = (await res.json().catch(() => null)) as
      | {
          city?: string;
          region?: string;
          country_code?: string;
          error?: boolean;
        }
      | null;

    if (!json || json.error) return vercel;

    return {
      country: (json.country_code ?? null) || null,
      region: (json.region ?? null) || null,
      city: (json.city ?? null) || null,
    };
  } catch {
    return vercel;
  }
}

export function getUserAgent(headers: Headers) {
  return firstHeaderValue(headers, "user-agent");
}

export function getReferrer(headers: Headers) {
  return firstHeaderValue(headers, "referer");
}

