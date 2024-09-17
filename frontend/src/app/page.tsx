import React from "react";
import MessageLogic from "@/views/home/components/messageLogic";

import {
  ConfigSidebar,
  Header,
  RightSidebar,
  Sidebar,
} from "@/views/home/homeView";
import { cookies } from "next/headers";
export default async function Home() {
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
