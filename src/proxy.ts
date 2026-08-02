import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith('/admin');

  // 1. Run the i18n routing middleware first, but ONLY for public site routes
  let supabaseResponse = NextResponse.next({ request });
  if (!isProtectedRoute) {
    const i18nResponse = handleI18nRouting(request);
    if (i18nResponse) {
      if (i18nResponse.headers.get('location') || (i18nResponse.status >= 300 && i18nResponse.status < 400)) {
        return i18nResponse;
      }
      supabaseResponse = i18nResponse;
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname === "/admin/login";

  // Role from metadata
  const role = user?.user_metadata?.role;

  // 1. Protect Admin Routes (Only 'admin' can access, except login page)
  if (isAdminRoute && !isAdminLoginRoute) {
    if (!user || role !== 'admin') {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. Redirect logged-in admin away from login page
  if (isAdminLoginRoute && user && role === 'admin') {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
