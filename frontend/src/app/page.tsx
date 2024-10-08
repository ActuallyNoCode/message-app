import React from "react";
import MessageLogic from "@/views/home/components/messageLogic";
import ConfigSidebar from "@/views/home/components/ConfigSidebar";
import Header from "@/views/home/components/Header";
import RightSidebar from "@/views/home/components/RightSidebar";
import Sidebar from "@/views/home/components/Sidebar";
import { cookies } from "next/headers";
import Provider from "@/store/context/Provider";
import settings from "@/config";
import axios from "axios";

export default async function Home() {
  const authToken = cookies().get("authToken")?.value;
  const user = {};

  try {
    const { data } = await axios.get(`${settings.API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <Provider user={user}>
      <div className="flex">
        <ConfigSidebar />
        <div className="flex flex-col md:flex-row h-screen w-[calc(100vw-64px)] 2xl:w-[calc(100vw-80px)]">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-col w-full">
            <Header />
            <MessageLogic authToken={authToken} />
          </div>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </Provider>
  );
}
