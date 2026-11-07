import { ui } from "@/lib/i18n/dictionary";
import type { Lang } from "@/lib/i18n";

export function SkipLink({ lang }: { lang: Lang }) {
  return (
    <a href="#main" className="skip-link">
      {ui.skipToContent[lang]}
    </a>
  );
}
