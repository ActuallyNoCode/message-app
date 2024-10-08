"use client"; // This tells Next.js it's a client-side component

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TokenRefresher({
  authToken,
  refreshToken,
}: {
  authToken: string | undefined;
  refreshToken: string | undefined;
}) {
  const router = useRouter();

  useEffect(() => {
    const refreshAuthToken = async () => {
      if (!authToken && !refreshToken) {
        // No token, redirect to login
        router.push("/login?mode=login");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            headers: { cookie: `refreshToken=${refreshToken}` },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error refreshing token", error);
        // Clear the token from cookies
        document.cookie = "authToken=; Path=/; Max-Age=-1";
        // Redirect to login if refresh fails
        router.push("/login?mode=login");
      }
    };

    if (!authToken) {
      refreshAuthToken();
    }
  }, []);

  return null; // This component doesn't render any UI
}
