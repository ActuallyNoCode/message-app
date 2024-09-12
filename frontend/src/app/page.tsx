import React from "react";
import MessageLogic from "@/views/home/components/messageLogic";

import {
  ConfigSidebar,
  Header,
  RightSidebar,
  Sidebar,
} from "@/views/home/homeView";
import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function Home() {
  /*   const allCookies = cookies();
  const authToken = allCookies.get("authToken");

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`, {
      headers: {
        Authorization: `Bearer ${authToken?.value}`,
      },
      withCredentials: true,
    });
    console.log("Token refreshed");
  } catch (error) {
    // Delete the cookie and redirect to login page
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
      withCredentials: true,
    });
    redirect("/login?mode=login");
  } */

  return (
    <div className="flex">
      <ConfigSidebar />
      <div className="flex flex-col md:flex-row h-screen w-[calc(100vw-64px)] 2xl:w-[calc(100vw-80px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col w-full">
          <Header />
          <MessageLogic />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
