"use client";

import React, { useState } from "react";

import Image from "next/image";
import Modal from "../components/common/modal";
import ModalMedia from "../components/common/modalMedia";
import { SlOptionsVertical } from "react-icons/sl";

import Link from "next/link";
import Storys from "@/components/storys";
import Multimedia from "@/components/multimedia";
import ProfileCard from "@/components/profile";
import ContactList from "@/components/contactos";
import MessageLogic from "@/components/messageLogic";

interface StoryProfile {
  src: string;
  alt: string;
  time: string;
  new: boolean;
}

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="flex flex-col w-full md:w-1/4 bg-white border-r border-gray-200">
        <div className="relative bg-white h-10 flex items-center justify-between border-b border-gray-200 px-4">
          <span className="text-black uppercase font-bold text-sm md:text-base">
            Messages
          </span>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <SlOptionsVertical size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
                  <Link href="/login">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <span>Exit</span>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
        <ContactList />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <div className="bg-white h-10 flex items-center gap-2 border-b border-gray-200 px-4">
          <div className="h-10 w-10 rounded-full ml-4 hover:scale-110">
            <Image
              src="/profile/27.svg"
              alt="Profile Picture"
              width={70}
              height={70}
              className="rounded-full h-10 w-10"
            />
          </div>
          <span className="text-black text-sm md:text-base">Brayan Suarez</span>
          <span className="text-gray-400 text-xs md:text-sm">2 mins</span>
        </div>
        <MessageLogic />
      </div>

      {/* Right Sidebar */}
      <div className="flex flex-col w-full md:w-1/4">
        <div className="bg-white h-10 border-b border-gray-200"></div>
        <div className="bg-white flex flex-col h-full overflow-y-auto">
          <div className="bg-blue-600 h-22 flex flex-col rounded-t-lg">
            <Storys />
          </div>
          <ProfileCard />
          <div className="flex-1 overflow-y-auto">
            <Multimedia />
          </div>
        </div>
      </div>
    </div>
  );
}
