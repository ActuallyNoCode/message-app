import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";

interface Chat {
  id: string;
  name: string;
  ownerId: string;
  adminIds: string[];
  profileImages: string[];
  messages: Message[];
}

type MediaType = "image" | "video" | "audio" | "document" | "other";
interface Message {
  id: string;
  content: string;
  status: string;
  media?: string;
  mediaType?: MediaType;
  createdAt: string;
}

enum ContactStatus {
  Online = "bg-green-500",
  Offline = "hidden",
  DonotDisturb = "bg-red-500",
  Inactive = "bg-yellow-400",
}

export default async function ContactList() {
  const allCookies = cookies();
  const authToken = allCookies.get("authToken")?.value;
  const refreshToken = allCookies.get("refreshToken")?.value;
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      cookie: `refreshToken=${refreshToken}`,
    },
    withCredentials: true,
  });
  const chats: Chat[] = response.data;

  console.log(chats[0].messages);

  return (
    <div className="flex flex-col items-start justify-start rounded-lg shadow-lg overflow-y-auto h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col w-full">
        {chats.map((contact, index) => (
          <div
            key={contact.id + index}
            className="odd:bg-white h-20 relative gap-1 w-full flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-75"
          >
            <div className="h-12 w-12 rounded-2xl shadow-lg relative">
              <img
                src={contact.profileImages[0]}
                alt={contact.name}
                width={48}
                height={48}
                className="object-cover rounded-2xl"
              />
              {/* Status circle */}
              <div
                className={`absolute bottom-0 right-0 h-4 w-4 ${ContactStatus.Online} border-2 border-white rounded-full`}
              ></div>
            </div>
            <div className="flex flex-col justify-center ml-2">
              <span className="text-black font-semibold">{contact.name}</span>
              <span className="text-gray-500 text-sm ">
                {contact.messages[0].content}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
