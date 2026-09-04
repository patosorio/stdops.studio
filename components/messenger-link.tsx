import { getMessengerUrl } from "@/lib/env";

export function MessengerLink({ label, bodyFont }: { label: string; bodyFont: string }) {
  const href = getMessengerUrl();
  const isExternal = href.startsWith("https://");

  return (
    <a
      href={href}
      className={`${bodyFont} text-sm underline`}
      {...(isExternal ? { target: "_blank" as const, rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}
