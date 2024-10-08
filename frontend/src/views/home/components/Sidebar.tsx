import ContactItem from "./contactos";
import Dropdown from "./Dropdown";
import { fetchChats } from "../api/fetchChats";

// Component that fetches and renders chats
export default async function Sidebar() {
  const chats = await fetchChats();

  // If there are no chats or fetch failed
  if (!chats || chats.length === 0) {
    return (
      <div className="flex flex-col w-[800px] border-r border-gray-200">
        <div className="relative bg-white h-14 flex items-center justify-between border-b border-gray-200 px-4">
          <span className="text-black font-semibold text-sm md:text-base">
            Recent Messages
          </span>
          <Dropdown />
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)]">
          <span className="text-gray-600 text-2xl font-bold">
            No recent messages.
          </span>
        </div>
      </div>
    );
  }

  // Render the chat list if chats are available
  return (
    <div className="flex flex-col w-[800px] border-r border-gray-200">
      <div className="relative bg-white h-14 flex items-center justify-between border-b border-gray-200 px-4">
        <span className="text-black font-semibold text-sm md:text-base">
          Recent Messages
        </span>
        <Dropdown />
      </div>
      <div className="flex flex-col items-start justify-start rounded-lg shadow-lg overflow-y-auto h-[calc(100vh-3.5rem)]">
        <div className="flex flex-col w-full">
          {chats.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </div>
  );
}
