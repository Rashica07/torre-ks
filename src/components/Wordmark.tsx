/**
 * INTERIM wordmark (docs/decisions.md D-005): set in the site typeface until the client supplies official
 * logo files. It is text, not an invented logo.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="text-[1.375rem] font-semibold leading-none tracking-[0.16em]">TORRE</span>{" "}
      <span className="font-mono text-[0.6875rem] font-medium leading-none tracking-[0.2em] text-muted">GROUP</span>
    </span>
  );
}
