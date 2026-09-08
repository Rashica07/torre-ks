"use client";
import { createContext, useContext } from "react";
import { VARIANTS, type DesignVariant, type DesignVariantId } from "./design-variants";

const DesignContext = createContext<DesignVariant>(VARIANTS.minimal);

export function DesignProvider({
  variant,
  children,
}: {
  variant: DesignVariantId;
  children: React.ReactNode;
}) {
  return <DesignContext.Provider value={VARIANTS[variant]}>{children}</DesignContext.Provider>;
}

/** Read the active design variant from any section component. */
export function useDesign() {
  return useContext(DesignContext);
}

/** Section heading text with the variant's trailing-period convention applied. */
export function headingText(text: string, withPeriod: boolean) {
  const bare = text.replace(/\.$/, "");
  return withPeriod ? `${bare}.` : bare;
}
