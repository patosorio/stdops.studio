import { parseSiteOrigin, safeHttpsUrl } from "@/lib/safe-url";

export function getSiteUrl(): string {
  return parseSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getGoogleSiteVerification(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (!value || !/^[\w-]{10,100}$/.test(value)) return undefined;
  return value;
}

const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/;

export function getGaMeasurementId(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!value || !GA_MEASUREMENT_ID.test(value)) return undefined;
  return value;
}

export function getLineAddFriendUrl(): string {
  return safeHttpsUrl(process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL, "#line");
}

export function getMessengerUrl(): string {
  return safeHttpsUrl(process.env.NEXT_PUBLIC_MESSENGER_URL, "#messenger");
}
