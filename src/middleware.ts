import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
 
export async function middleware(request: NextRequest) {
  console.time("middlware-timestamp")
  const allCookies = request.cookies.getAll();
  
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  console.log("✅ Acesso permitido");
  console.timeEnd("middlware-timestamp")
  return NextResponse.next();
}
export const config = {
	matcher: ["/category/:slug", "/authentication"], // Specify the routes the middleware applies to
};