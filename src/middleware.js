
import { NextResponse } from "next/server";


const matchRoute = (patterns, path) => patterns.some(pattern => {
  if (pattern.endsWith('(.*)')) {
    return path.startsWith(pattern.replace('(.*)', ''));
  }
  return path === pattern;
});

const isAdminRoute = path => matchRoute(["/admin", "/admin/"], path) || path.startsWith("/admin/");
const isAdminLoginRoute = path => path === "/admin/login";


export function middleware(req) {
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

  // You can add more custom auth logic here for courses/dashboard if needed
  return NextResponse.next();
}

export const config = {
  matcher: [
   
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  
    "/(api|trpc)(.*)",
  ],
};
