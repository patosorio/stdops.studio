const RELOAD_KEY = "stdops:error-reload";

/** Full reload once per URL. Client-nav errors recover; a real page error still shows. */
export function reloadOnceForPath(): boolean {
  if (typeof window === "undefined") return false;
  const here = `${window.location.pathname}${window.location.search}`;
  try {
    if (sessionStorage.getItem(RELOAD_KEY) === here) {
      sessionStorage.removeItem(RELOAD_KEY);
      return false;
    }
    sessionStorage.setItem(RELOAD_KEY, here);
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

export function hardReload(): void {
  window.location.reload();
}
