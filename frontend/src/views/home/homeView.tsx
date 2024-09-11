import ContactList from "@/views/home/components/contactos";
import Dropdown from "./components/Dropdown";
import Image from "next/image";
import Storys from "@/views/home/components/storys";
import ProfileCard from "@/views/home/components/profile";
import Multimedia from "@/views/home/components/multimedia";
import { LuMessagesSquare } from "react-icons/lu";
import { BiMessageAdd } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { HiBellAlert } from "react-icons/hi2";
import { FaGear, FaUser } from "react-icons/fa6";

export function ConfigSidebar() {
  const selectedClassname = "bg-gray-100 outline-orange-300 outline scale-125";
  const iconClassname =
    " transition-all duration-300 hover:scale-125 rounded-lg p-1";
  const iconSize = 35;
  return (
    <aside className="flex flex-col h-screen w-16 py-3 justify-between scale-90 2xl:scale-100 2xl:w-20">
      <div className="flex flex-col rounded-xl items-center gap-8 mt-10 ">
        <LuMessagesSquare
          size={iconSize}
          className={`${iconClassname} ${selectedClassname}`}
        />
        <BsGridFill size={iconSize} className={`${iconClassname} `} />
        <BiMessageAdd size={iconSize} className={`${iconClassname} `} />
      </div>
      <div className="flex flex-col py-3 rounded-xl items-center gap-4 mt-10">
        <HiBellAlert size={iconSize} className={`${iconClassname} `} />
        <FaGear size={iconSize} className={`${iconClassname}`} />
        <FaUser size={iconSize} className={`${iconClassname}`} />
      </div>
    </aside>
  );
}

export function Sidebar() {
  return (
    <div className="flex flex-col w-[800px] border-r border-gray-200">
      <div className="relative bg-white h-14 flex items-center justify-between border-b border-gray-200 px-4">
        <span className="text-black font-semibold text-sm md:text-base">
          Recent Messages
        </span>
        <Dropdown />
      </div>
      <ContactList />
    </div>
  );
}

export function Header() {
  return (
    <div className="bg-white h-14 flex items-center justify-between border-b border-gray-200 px-4">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full hover:scale-110">
          <Image
            src="/profile/27.svg"
            alt="Profile Picture"
            width={70}
            height={70}
            className="rounded-full h-10 w-10"
          />
        </div>
        <div className="ml-4">
          <span className="text-black text-sm md:text-base">Brayan Suarez</span>
          <span className="block text-gray-400 text-xs md:text-sm">2 min</span>
        </div>
      </div>
    </div>
  );
}

export function RightSidebar() {
  return (
    <div className="flex flex-col w-[600px]">
      <div className="bg-white flex flex-col h-full overflow-x-auto">
        <div className=" flex items-center rounded-t-lg">
          <Storys />
        </div>
        <ProfileCard />
        <div className="flex-1 overflow-y-auto">
          <Multimedia />
        </div>
      </div>
    </div>
  );
}
