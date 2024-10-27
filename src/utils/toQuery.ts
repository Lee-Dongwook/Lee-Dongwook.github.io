export function toQuery(raw: Record<string, unknown>) {
  const params = new URLSearchParams();

  Object.keys(raw).forEach((key) => {
    if (raw[key]) params.append(key, String(raw[key]));
  });

  return `?${params.toString()}`;
}
