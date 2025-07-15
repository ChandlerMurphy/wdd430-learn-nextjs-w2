// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
 
// export default NextAuth(authConfig).auth;
 
// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

// ------------

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths that require authentication
  const protectedPaths = ["/dashboard", "/dashboard/"];

  // Check if the current path is under /dashboard
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Read the session cookie set by NextAuth
  const sessionToken = req.cookies.get("next-auth.session-token");

  if (isProtected && !sessionToken) {
    // Redirect to /login if no session token
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continue normally if authenticated or not on protected path
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
