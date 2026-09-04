"use client";

import { useEffect, useId, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { LineCta } from "./line-cta";
import { LocaleSwitch } from "./locale-switch";
import { Wordmark } from "./wordmark";

const barClassName =
  "flex items-center justify-between gap-4 px-5 py-5 md:px-12";

function NavLinks({
  dict,
  locale,
  pathname,
  stacked,
  onNavigate,
}: {
  dict: Dictionary["nav"];
  locale: Locale;
  pathname: string;
  stacked?: boolean;
  onNavigate?: () => void;
}) {
  return dict.items.map((item) => {
    const href = `/${locale}${item.href}`;
    const active = pathname === href || pathname.startsWith(`${href}/`);

    return (
      <Link
        key={item.href}
        href={href}
        onClick={onNavigate}
        className={
          stacked
            ? `flex items-center min-h-12 border-b border-ink text-sm uppercase tracking-[0.03em] no-underline ${
                active ? "font-bold" : ""
              }`
            : `text-xs uppercase tracking-[0.03em] no-underline border-b-2 pb-1 transition-colors ${
                active
                  ? "border-ink font-bold"
                  : "border-transparent hover:border-accent-blue"
              }`
        }
      >
        {item.label}
      </Link>
    );
  });
}

function MenuToggle({
  open,
  openLabel,
  closeLabel,
  controls,
  onClick,
}: {
  open: boolean;
  openLabel: string;
  closeLabel: string;
  controls: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="lg:hidden w-11 h-11 border border-ink flex items-center justify-center bg-paper"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? closeLabel : openLabel}
      onClick={onClick}
    >
      <span className="relative block w-4 h-3.5" aria-hidden>
        <span
          className={`absolute inset-x-0 top-0 h-px bg-ink transition-transform ${
            open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
          }`}
        />
        <span
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-ink ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`absolute inset-x-0 bottom-0 h-px bg-ink transition-transform ${
            open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

function NavBar({
  dict,
  locale,
  pathname,
  open,
  menuId,
  onToggle,
  onNavigate,
}: {
  dict: Dictionary["nav"];
  locale: Locale;
  pathname: string;
  open: boolean;
  menuId: string;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className={barClassName}>
      <Link href={`/${locale}`} className="no-underline shrink-0" onClick={onNavigate}>
        <Wordmark variant="compact" />
      </Link>

      <div className="hidden lg:flex gap-5 items-center">
        <NavLinks dict={dict} locale={locale} pathname={pathname} />
      </div>

      <div className="flex items-center gap-3.5 shrink-0">
        <LocaleSwitch current={locale} />
        <span className="hidden lg:inline-flex">
          <LineCta label={dict.lineLabel} />
        </span>
        <MenuToggle
          open={open}
          openLabel={dict.menuOpen}
          closeLabel={dict.menuClose}
          controls={menuId}
          onClick={onToggle}
        />
      </div>
    </div>
  );
}

export function Nav({ dict, locale }: { dict: Dictionary["nav"]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      document.getElementById(id)?.scrollIntoView();
    };

    scrollToHash();
    const frame = requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    window.addEventListener("keydown", onKey);
    return () => {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const closeIfDesktop = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", closeIfDesktop);
    return () => query.removeEventListener("change", closeIfDesktop);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 bg-paper border-b border-ink pt-safe-top ${
          open ? "bottom-0 flex flex-col lg:bottom-auto" : ""
        }`}
      >
        <NavBar
          dict={dict}
          locale={locale}
          pathname={pathname}
          open={open}
          menuId={menuId}
          onToggle={() => setOpen((value) => !value)}
          onNavigate={() => setOpen(false)}
        />

        {open ? (
          <div
            id={menuId}
            className="lg:hidden flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-5 border-t border-ink [-webkit-overflow-scrolling:touch]"
          >
            <div className="flex flex-col">
              <NavLinks
                dict={dict}
                locale={locale}
                pathname={pathname}
                stacked
                onNavigate={() => setOpen(false)}
              />
            </div>
            <div className="py-6 pb-[calc(var(--spacing-sticky-cta)+var(--spacing-safe-bottom))]">
              <LineCta label={dict.lineLabel} variant="full" />
            </div>
          </div>
        ) : null}
      </nav>
      <div className="invisible pointer-events-none border-b border-ink pt-safe-top" aria-hidden inert>
        <NavBar
          dict={dict}
          locale={locale}
          pathname={pathname}
          open={false}
          menuId={`${menuId}-spacer`}
          onToggle={() => undefined}
          onNavigate={() => undefined}
        />
      </div>
    </>
  );
}
