import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("user")?.value;
  const token = request.cookies.get("token")?.value;

  let newUser = currentUser ? JSON.parse(currentUser) : null;
  // console.log("newUser", newUser);
  // console.log("url name", request.nextUrl.n);

  if (!newUser && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/", request.url));
  }

  if (newUser && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/admin/investors", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
