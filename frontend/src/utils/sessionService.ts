import axios from "axios";

// Define the interface for the token response
interface TokenResponse {
  authToken: string;
  refreshToken: string;
}

export async function refreshSession(
  refreshTokenOld: string
): Promise<TokenResponse | null> {
  try {
    // Replace with your actual API endpoint
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshTokenOld}`,
        },
        withCredentials: true,
      }
    );

    const { authToken, refreshToken } = response.data;

    // Extract the new authToken from the response
    return { authToken, refreshToken };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
