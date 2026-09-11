import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // =========================
  // NOT LOGGED IN
  // =========================

  // User tries to access admin page
  if (pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // =========================
  // LOGGED-IN USER
  // =========================

  if (user) {
    // Get current user's profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, is_Active")
      .eq("auth_user_id", user.id)
      .single();

    // =========================
    // DEACTIVATED USER
    // =========================

    if (profile && !profile.is_Active) {
      await supabase.auth.signOut();

      return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAdmin = profile?.role === "admin";

    // Logged-in user visits login page
    if (pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(
        new URL(isAdmin ? "/admin/dashboard" : "/", request.url),
      );
    }

    // Normal user tries to access admin page
    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/community/:path*",
    "/feature/:path*",
    "/how-it-works/:path*",
    "/mentors/:path*",
    "/pricing/:path*",
    "/requests/:path*",
    "/skills/:path*",
    "/success-stories/:path*",
    "/swaps/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
    "/"
  ],
};
