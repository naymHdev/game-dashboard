import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export default async function middleware(request: NextRequest) {
    console.log("called middleware");
  const current_req = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (current_req === "/login") {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(
      new URL(`/login`, request.url)
    );
  }

  try {
    // Decode and validate the access token
    const { role } = jwtDecode<{ role: "ADMIN" | "SUPERADMIN" }>(accessToken);

    if (role !== "SUPERADMIN" && role !== "ADMIN") {
      return NextResponse.redirect(
        new URL(`/login`, request.url)
      );
    }
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/login`, request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)', // Apply middleware to all pages except static assets and API routes
  ],
};
