import { Chat } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export async function fetchChats(): Promise<Chat[]> {
  const allCookies = cookies();
  const authToken = allCookies.get("authToken")?.value;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chats`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return [];
  }
}
