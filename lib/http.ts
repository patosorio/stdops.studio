export function isJsonContentType(request: Request): boolean {
  const raw = request.headers.get("content-type");
  if (!raw) return false;
  const media = raw.split(";")[0]?.trim().toLowerCase();
  return media === "application/json";
}

export function contentLengthAllowed(request: Request, maxBytes: number): boolean {
  const raw = request.headers.get("content-length");
  if (raw === null || raw === "") return true;
  if (!/^\d+$/.test(raw)) return false;
  return Number(raw) <= maxBytes;
}

export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<unknown | undefined> {
  const stream = request.body;
  if (!stream) return undefined;

  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return undefined;
      }
      chunks.push(value);
    }
  } catch {
    return undefined;
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}
