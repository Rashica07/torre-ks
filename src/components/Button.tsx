import Link from "next/link";
import { IconArrowUR } from "./Icons";

/** Rectangular button: label + square arrow cell (docs/design.md §5.12). Colours come from the active surface. */
export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  srExtra,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "line";
  external?: boolean;
  srExtra?: string;
}) {
  const cls = `btn${variant === "line" ? " btn--line" : ""}`;
  const inner = (
    <>
      <span className="btn__label">
        {children}
        {srExtra ? <span className="sr-only"> ({srExtra})</span> : null}
      </span>
      <span className="btn__arrow">
        <IconArrowUR />
      </span>
    </>
  );
  if (external || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
