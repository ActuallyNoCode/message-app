"use client";

import React, { useState, useEffect } from "react";

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
    <div className="flex items-start">
      <div className="flex flex-col">
        <div className="relative bg-white h-10 w-[263px] flex items-center justify-between border-1 ">
          <span className="text-black">Recent messages</span>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <SlOptionsVertical size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    profile
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

      <div className="flex flex-col">
        <div className="bg-white h-10 w-[730px] flex items-center gap-2 border-1 rounded-b-lg">
          <div className="bg-purple-400 h-8 w-8 rounded-full ml-4 hover:scale-110">
            <Image
              src="/profile/payaso.svg"
              alt="Profile Picture"
              width={70}
              height={70}
              className="rounded-full h-8 w-8"
            />
          </div>
          <span className="text-black">Brayan Suarez</span>
          <span className="text-gray-400">2 mins</span>
        </div>
        <MessageLogic />
      </div>

      <div className="flex flex-col">
        <div className="bg-white h-10 w-[317px] border-1"></div>
        <div className="bg-white flex flex-col h-[560px] w-[317px] overflow-x-auto">
          <div className="bg-blue-600 h-22 flex flex-col rounded-t-lg">
            <Storys  />
          </div>
          <ProfileCard />
          <div>
            <Multimedia />
          </div>
        </div>
      </div>
    </div>
  );
}
