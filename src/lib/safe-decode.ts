export function safeDecodeURIComponent(value: string) {
  const v = String(value ?? "");
  if (!v) return "";

  // Some providers encode spaces as '+'
  const normalized = v.replaceAll("+", " ");

  try {
    const once = decodeURIComponent(normalized);

    // Best-effort for double-encoded values.
    if (/%[0-9A-Fa-f]{2}/.test(once)) {
      try {
        return decodeURIComponent(once);
      } catch {
        return once;
      }
    }

    return once;
  } catch {
    return v;
  }
}

export function normalizeHumanText(value: string) {
  return safeDecodeURIComponent(value).replace(/\s+/g, " ").trim();
}

