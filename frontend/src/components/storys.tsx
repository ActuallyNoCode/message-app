import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "../components/common/modal";

interface StoryProfile {
  src: string;
  alt: string;
  time: string;
  new: boolean;
}

// Define the storyProfiles array within the component
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
  const [selectedProfile, setSelectedProfile] = useState<StoryProfile | null>(
    null
  );

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
    <div className="bg-blue-600 h-22 flex flex-col rounded-t-lg">
      <span className="text-white font-semibold">Storys</span>
      <div className="flex gap-4 overflow-x-auto py-2 px-4">
        {storyProfiles.map((profile, index) => (
          <button
            key={index}
            className={`h-12 w-12 rounded-full flex flex-col items-center justify-center mr-2 ${
              profile.new
                ? "border-4 border-cyan-300"
                : "border-4 border-gray-500"
            } border-solid hover:scale-125 cursor-pointer`}
            onClick={() => openModal(profile)}
          >
            <Image
              src={profile.src}
              alt={profile.alt}
              width={60}
              height={50}
              className="rounded-full"
            />
          </button>
        ))}
      </div>

      {isModalOpen && selectedProfile && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-4">
            <Image
              src={selectedProfile.src}
              alt={selectedProfile.alt}
              width={100}
              height={100}
              className="rounded-full"
            />
            <h2 className="text-lg font-semibold">{selectedProfile.alt}</h2>
            <p className="text-gray-500">{selectedProfile.time}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Storys;
