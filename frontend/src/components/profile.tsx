import React from "react";
import Image from "next/image";

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-blue-600 h-72 w-18 flex flex-col">
      <span className="font-semibold text-white">Profile</span>
      <div className="h-60 w-[317px] bg-white flex items-center justify-around rounded-xl">
        <div className="h-18 w-18 bg-black rounded-2xl hover:scale-110">
          <Image
            src="/profile/22.svg"
            alt="Profile Picture"
            width={70}
            height={70}
            className="rounded-2xl h-28 w-28"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-black">Brayan Suarez</span>
          <span className="text-gray-400">@Suarozky</span>
          <span className="text-gray-400">3239924230</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
