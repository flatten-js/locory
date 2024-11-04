import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { env } from "@/env";


const authPaths = [env.NEXT_PUBLIC_LOGIN_PATH]; 
const publicPaths = ['/', ...authPaths];
// All paths are protected except for publicPaths (and those excluded in matcher config)

export default withAuth(
  async function middleware(req) {
    const {
      nextUrl: { pathname },
      nextauth: { token },
    } = req;
    
    // If user is already logged in, redirect to the first protected path
    if (authPaths.includes(pathname) && token) {
      return NextResponse.redirect(new URL(env.NEXT_PUBLIC_PROTECTED_ROOT_PATH, req.url));
    }

    // If user is not logged in, redirect to the login page
    if (!publicPaths.includes(pathname) && !token) {
      return NextResponse.redirect(new URL(env.NEXT_PUBLIC_LOGIN_PATH, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const {
          nextUrl: { pathname },
        } = req;

        // Public paths are accessible without a token
        return (!token && publicPaths.includes(pathname)) || !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};