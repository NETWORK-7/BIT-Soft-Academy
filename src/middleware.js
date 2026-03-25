import { NextResponse } from "next/server";
import { verifyUserTokenSafe } from "@/lib/auth/token";

const matchRoute = (patterns, path) =>
  patterns.some((pattern) => {
    if (pattern.endsWith("(.*)")) {
      return path.startsWith(pattern.replace("(.*)", ""));
    }
    return path === pattern;
  });

const isAdminRoute = (path) => matchRoute(["/admin", "/admin/"], path) || path.startsWith("/admin/");
const isAdminLoginRoute = (path) => path === "/admin/login";

const isDashboardRoute = (path) => path.startsWith("/dashboard");
const isAuthPage = (path) => path.startsWith("/sign-in") || path.startsWith("/sign-up");

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (isAdminLoginRoute(pathname)) {
    return NextResponse.next();
  }

  if (isAdminRoute(pathname)) {
    const adminAuth = req.cookies.get("adminAuth")?.value;
    if (!adminAuth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  let user = null;
  if (isDashboardRoute(pathname) || isAuthPage(pathname)) {
    const sessionToken = req.cookies.get("session")?.value;
    user = sessionToken ? await verifyUserTokenSafe(sessionToken) : null;
  }

  if (isDashboardRoute(pathname) && !user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthPage(pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-in/:path*",
    "/sign-up",
    "/sign-up/:path*",
    "/admin/:path*",
  ],
};
