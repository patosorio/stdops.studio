import { BLOG_ACCENTS, type BlogAccent, type BlogBlock, type BlogLocaleCopy, type BlogPost } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${path} must be a non-empty string`);
  }
  return value;
}

function parseBlock(value: unknown, path: string): BlogBlock {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object`);
  }
  const type = asString(value.type, `${path}.type`);
  if (type === "p" || type === "h2") {
    return { type, text: asString(value.text, `${path}.text`) };
  }
  if (type === "ul") {
    if (!Array.isArray(value.items) || value.items.length === 0) {
      throw new Error(`${path}.items must be a non-empty array`);
    }
    return {
      type: "ul",
      items: value.items.map((item, index) => asString(item, `${path}.items[${index}]`)),
    };
  }
  throw new Error(`${path}.type must be "p", "h2", or "ul"`);
}

function parseLocaleCopy(value: unknown, path: string): BlogLocaleCopy {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object`);
  }
  if (!Array.isArray(value.body) || value.body.length === 0) {
    throw new Error(`${path}.body must be a non-empty array`);
  }
  return {
    title: asString(value.title, `${path}.title`),
    excerpt: asString(value.excerpt, `${path}.excerpt`),
    body: value.body.map((block, index) => parseBlock(block, `${path}.body[${index}]`)),
  };
}

function parseAccent(value: unknown, path: string): BlogAccent {
  const accent = asString(value, path);
  if ((BLOG_ACCENTS as readonly string[]).includes(accent)) {
    return accent as BlogAccent;
  }
  throw new Error(`${path} must be one of ${BLOG_ACCENTS.join(", ")}`);
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parsePost(value: unknown, source: string): BlogPost {
  if (!isRecord(value)) {
    throw new Error(`${source}: post must be an object`);
  }

  const slug = asString(value.slug, `${source}: slug`);
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`${source}: slug must be lowercase kebab-case`);
  }

  const publishedAt = asString(value.publishedAt, `${source}: publishedAt`);
  if (!DATE_PATTERN.test(publishedAt) || Number.isNaN(Date.parse(`${publishedAt}T00:00:00Z`))) {
    throw new Error(`${source}: publishedAt must be YYYY-MM-DD`);
  }

  if (value.draft !== undefined && typeof value.draft !== "boolean") {
    throw new Error(`${source}: draft must be a boolean when set`);
  }

  return {
    slug,
    publishedAt,
    accent: parseAccent(value.accent, `${source}: accent`),
    draft: value.draft,
    th: parseLocaleCopy(value.th, `${source}: th`),
    en: parseLocaleCopy(value.en, `${source}: en`),
  };
}
