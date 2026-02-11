function escapeCsvValue(value: unknown) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Use double quotes escaping per RFC 4180.
  const escaped = str.replaceAll('"', '""');
  return `"${escaped}"`;
}

export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: Array<{ key: keyof T; header: string }>,
  opts?: { delimiter?: string; includeBom?: boolean },
) {
  const delimiter = opts?.delimiter ?? ";";
  const includeBom = opts?.includeBom ?? true;

  const headerLine = columns.map((c) => escapeCsvValue(c.header)).join(delimiter);
  const lines = rows.map((row) =>
    columns.map((c) => escapeCsvValue(row[c.key])).join(delimiter),
  );

  const body = [headerLine, ...lines].join("\r\n");
  return includeBom ? `\ufeff${body}` : body;
}

