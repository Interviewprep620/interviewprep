import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = [
  "/dashboard",
  "/interview",
  "/practice",
  "/progress",
  "/topics",
  "/notes",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isRoot = pathname === "/";
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isProtectedPage = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (isRoot) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isProtectedPage) {
      return NextResponse.redirect(
        new URL("/login?configuration=missing", request.url)
      );
    }

    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && (isRoot || isProtectedPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && (isRoot || isAuthPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/interview/:path*",
    "/practice/:path*",
    "/progress/:path*",
    "/topics/:path*",
    "/notes/:path*",
    "/login",
    "/signup",
  ],
};
