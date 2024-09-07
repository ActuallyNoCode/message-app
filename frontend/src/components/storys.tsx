import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "../components/common/modal";

interface StoryProfile {
  src: string;
  alt: string;
  time: string;
  new: boolean;
}

const storyProfiles: StoryProfile[] = [
  {
    src: "/profile/23.svg",
    alt: "Profile Picture 1",
    time: "9:30",
    new: false,
  },
  { src: "/profile/24.svg", alt: "Profile Picture 2", time: "9:31", new: true },
  { src: "/profile/23.svg", alt: "Profile Picture 3", time: "9:32", new: true },
  {
    src: "/profile/25.svg",
    alt: "Profile Picture 4",
    time: "9:33",
    new: false,
  },
];

const Storys: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<StoryProfile | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isModalOpen) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
        setSelectedProfile(null);
      }, 30000);
    }

    return () => clearTimeout(timeoutId);
  }, [isModalOpen]);

  const openModal = (profile: StoryProfile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  return (
    <div className="bg-white rounded-t-lg border shadow-lg">
      <div className="p-4 border-b">
        <span className="text-black text-xl font-bold">Storys</span>
      </div>
      <div className="flex gap-4 overflow-x-auto py-4 px-6 bg-gray-50 rounded-b-lg">
        {storyProfiles.map((profile, index) => (
          <button
            key={index}
            className={`h-14 w-14 rounded-full flex items-center justify-center transition-transform duration-200 ${
              profile.new
                ? "border-4 border-cyan-300"
                : "border-4 border-gray-400"
            } hover:scale-110 focus:outline-none`}
            onClick={() => openModal(profile)}
          >
            <Image
              src={profile.src}
              alt={profile.alt}
              width={64}
              height={64}
              className="rounded-full"
            />
          </button>
        ))}
      </div>

      {isModalOpen && selectedProfile && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedProfile.src}
          imageAlt={selectedProfile.alt}
        />
      )}
    </div>
  );
};

export default Storys;
