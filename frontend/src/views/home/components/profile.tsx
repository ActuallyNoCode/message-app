import React from "react";
import Image from "next/image";

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white w-full border rounded-lg shadow-lg p-4">
      <h2 className="text-black text-xl font-bold mb-4">Profile</h2>
      <div className="bg-gray-50 w-full flex items-center p-4 rounded-lg space-x-4">
        <div className="h-24 w-24 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
          <Image
            src="/profile/27.svg"
            alt="Profile Picture"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
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
