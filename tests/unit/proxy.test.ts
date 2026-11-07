import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "@/proxy";

const run = (path: string) => proxy(new NextRequest(`https://torre-ks.com${path}`));
const rewrite = (path: string) => run(path).headers.get("x-middleware-rewrite");
const redirect = (path: string) => {
  const r = run(path);
  return { status: r.status, location: r.headers.get("location") };
};

describe("language proxy", () => {
  it("serves Albanian un-prefixed via an internal /sq rewrite", () => {
    expect(rewrite("/")).toBe("https://torre-ks.com/sq");
    expect(rewrite("/kompanite")).toBe("https://torre-ks.com/sq/kompanite");
    expect(rewrite("/magfa")).toBe("https://torre-ks.com/sq/magfa");
  });

  it("serves English slugs under /en by rewriting to the internal folder", () => {
    expect(rewrite("/en")).toBe("https://torre-ks.com/en");
    expect(rewrite("/en/companies")).toBe("https://torre-ks.com/en/kompanite");
    expect(rewrite("/en/contact")).toBe("https://torre-ks.com/en/kontakti");
  });

  it("never exposes internal paths (308 to the public URL)", () => {
    expect(redirect("/sq/kompanite")).toEqual({ status: 308, location: "https://torre-ks.com/kompanite" });
    expect(redirect("/sq")).toEqual({ status: 308, location: "https://torre-ks.com/" });
    expect(redirect("/en/kompanite")).toEqual({ status: 308, location: "https://torre-ks.com/en/companies" });
  });

  it("passes unknown paths through untouched so the real 404 renders", () => {
    for (const p of ["/nuk-ekziston", "/en/nope"]) {
      const r = run(p);
      expect(r.headers.get("x-middleware-rewrite")).toBeNull();
      expect(r.headers.get("location")).toBeNull();
      expect(r.status).toBe(200); // NextResponse.next(): downstream routing returns the 404
    }
  });
});
