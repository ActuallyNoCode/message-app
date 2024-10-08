"use client";

import { Chat } from "@/constants";
import { useRouter } from "next/navigation";

enum ContactStatus {
  Online = "bg-green-500",
  Offline = "hidden",
  DonotDisturb = "bg-red-500",
  Inactive = "bg-yellow-400",
}

export default function ContactItem({ contact }: { contact: Chat }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/?chatId=${contact.id}`); // Update URL with the chat ID
  };

  return (
    <div
      className="odd:bg-white h-20 relative gap-1 w-full flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-75"
      onClick={handleClick}
    >
      <div className="h-12 w-12 rounded-2xl shadow-lg relative">
        <img
          src={contact.profileImages[0]}
          alt={contact.name}
          width={48}
          height={48}
          className="object-cover rounded-2xl aspect-square"
          onError={(e) => {
            e.currentTarget.src = "profile/payaso.svg"; // Fallback image
          }}
        />
        {/* Status circle */}
        <div
          className={`absolute bottom-0 right-0 h-4 w-4 ${ContactStatus.Inactive} border-2 border-white rounded-full`}
        ></div>
      </div>
      <div className="flex flex-col justify-center ml-2">
        <span className="text-black font-semibold">{contact.name}</span>
        <span className="text-gray-500 text-sm truncate w-40">
          {contact.messages[0]?.content || "No messages"}
        </span>
      </div>
    </div>
  );
}
