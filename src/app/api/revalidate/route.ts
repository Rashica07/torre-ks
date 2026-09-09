import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation, called by Novus Pulse whenever published content
 * changes:  POST /api/revalidate?path=/&secret=<REVALIDATE_SECRET>
 *
 * The secret is shared with this tenant — find it in the CMS under
 * Settings → Site Connection (admin only).
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path, now: Date.now() });
}
