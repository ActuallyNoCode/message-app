import { BiMessageAdd } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { FaGear, FaUser } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";

export default function ConfigSidebar() {
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
