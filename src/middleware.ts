import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
  let isLogin = request.cookies.get("token");
  if (!isLogin) {
    if (request.nextUrl.pathname.startsWith("/favourite-books")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/membership")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (
      request.nextUrl.pathname.startsWith("/membership/membership-status")
    ) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (
      request.nextUrl.pathname.startsWith("/membership/general-membership")
    ) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (
      request.nextUrl.pathname.startsWith("membership/student-membership")
    ) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (
      request.nextUrl.pathname.startsWith("membership/child-membership")
    ) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/my-request")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/track-order")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/enter-library")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/payment&fine")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/book-borrow")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/notification")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/publisher-panel")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    } else if (request.nextUrl.pathname.startsWith("/publisher")) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }
  }
}
