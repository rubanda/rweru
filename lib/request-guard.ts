// Per-process abuse protection. Use a shared rate-limit store for multi-instance deployments.
const buckets = new Map<string, { count: number; expires: number }>();

export function allowRequest(request: Request, scope: string, limit = 8) {
  const now = Date.now();
  for (const [key, bucket] of buckets)
    if (bucket.expires <= now) buckets.delete(key);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${scope}:${ip}`;
  const bucket = buckets.get(key) ?? { count: 0, expires: now + 60_000 };
  bucket.count += 1;
  buckets.set(key, bucket);
  return bucket.count <= limit;
}
