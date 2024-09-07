import React from "react";
import Image from "next/image";

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white w-full max-w-xs flex flex-col items-center border rounded-lg shadow-lg p-4">
      <span className="text-black text-xl font-bold mb-4">Profile</span>
      <div className="bg-gray-50 w-full flex items-center justify-between p-4 rounded-lg">
        <div className="h-24 w-24 overflow-hidden rounded-full hover:scale-105 transition-transform duration-200">
          <Image
            src="/profile/27.svg"
            alt="Profile Picture"
            width={96}
            height={96}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col ml-4">
          <span className="text-black text-lg font-semibold">
            Brayan Suarez
          </span>
          <span className="text-gray-500">@Suarozky</span>
          <span className="text-gray-500">3239924230</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
