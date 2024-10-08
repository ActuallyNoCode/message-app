import { NextRequest, NextResponse } from "next/server";
import { refreshSession } from "./utils/sessionService"; // Example utility functions

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (!authToken && !refreshToken) {
    // If both tokens are missing, redirect to the login page
    return NextResponse.redirect(`${req.nextUrl.origin}/login?mode=login`);
  }

  if (!authToken && refreshToken) {
    // If authToken is missing but refreshToken is present, attempt to refresh the token
    const tokenResponse = await refreshSession(refreshToken.value);
    if (!tokenResponse) {
      // If the refresh fails, clear the authToken cookie and redirect to login
      const response = NextResponse.redirect(
        `${req.nextUrl.origin}/login?mode=login`
      );
      response.cookies.delete("authToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    // If the refresh is successful, set the new authToken cookie and the refreshToken cookie
    const response = NextResponse.redirect(req.nextUrl.href);
    response.cookies.set("authToken", tokenResponse.authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 15, // 15 minutes
    });

    response.cookies.set("refreshToken", tokenResponse.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 30 * 60 * 60, // 30 days
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
