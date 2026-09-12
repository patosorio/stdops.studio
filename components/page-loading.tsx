import { PageShell } from "./page-shell";

export function PageLoading() {
  return (
    <PageShell width="copy">
      <div role="status" aria-live="polite" className="relative grid gap-4 max-w-[640px]">
        <div className="h-10 w-3/5 border border-ink bg-paper" />
        <div className="h-4 w-full border border-ink bg-paper" />
        <div className="h-4 w-4/5 border border-ink bg-paper" />
      </div>
    </PageShell>
  );
}
