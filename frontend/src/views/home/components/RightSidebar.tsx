import Multimedia from "./multimedia";
import ProfileCard from "./profile";

export default function RightSidebar() {
  return (
    <div className="flex flex-col w-[600px]">
      <div className="bg-white flex flex-col h-full overflow-x-auto">
        <ProfileCard />
        <div className="flex-1 overflow-y-auto">
          <Multimedia />
        </div>
      </div>
    </div>
  );
}
