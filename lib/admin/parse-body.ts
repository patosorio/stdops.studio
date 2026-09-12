import { parsePost } from "@/lib/blog/parse-post";
import type { BlogPost } from "@/lib/blog/types";

export const MAX_ADMIN_BLOG_BODY_BYTES = 256 * 1024;
export const MAX_ADMIN_SESSION_BODY_BYTES = 16 * 1024;

export type ParseAdminPostResult =
  | { ok: true; value: BlogPost }
  | { ok: false; reason: string };

export function parseAdminPost(body: unknown, source: string): ParseAdminPostResult {
  try {
    return { ok: true, value: parsePost(body, source) };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "invalid";
    return { ok: false, reason };
  }
}

export function firestoreErrorCode(error: unknown): number | string | undefined {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return undefined;
  }
  const { code } = error;
  if (typeof code === "number" || typeof code === "string") return code;
  return undefined;
}

export function isAlreadyExistsError(error: unknown): boolean {
  const code = firestoreErrorCode(error);
  return code === 6 || code === "already-exists" || code === "ALREADY_EXISTS";
}
