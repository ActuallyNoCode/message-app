import React, { useState } from "react";
import Image from "next/image";
import ModalMedia from "../components/common/modalMedia";

interface StoryProfile {
  src: string;
  alt: string;
  time: string;
  new: boolean;
}

const storyProfiles2: StoryProfile[] = [
  {
    src: "/profile/23.svg",
    alt: "Profile Picture 1",
    time: "9:30",
    new: false,
  },
  { src: "/profile/26.svg", alt: "Profile Picture 2", time: "9:31", new: true },
  {
    src: "/profile/23.svg",
    alt: "Profile Picture 3",
    time: "9:32",
    new: false,
  },
  { src: "/profile/25.svg", alt: "Profile Picture 4", time: "9:33", new: true },
  {
    src: "/profile/23.svg",
    alt: "Profile Picture 5",
    time: "9:34",
    new: false,
  },
  { src: "/profile/24.svg", alt: "Profile Picture 6", time: "9:35", new: true },
];

const Multimedia: React.FC = () => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  const openMediaModal = (index: number) => {
    setMediaIndex(index);
    setIsMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setIsMediaModalOpen(false);
  };

  const handleNextMedia = () => {
    setMediaIndex((prevIndex) => (prevIndex + 1) % storyProfiles2.length);
  };

  const handlePrevMedia = () => {
    setMediaIndex((prevIndex) =>
      prevIndex === 0 ? storyProfiles2.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white border flex flex-wrap justify-center gap-2 p-4 rounded-lg shadow-lg">
      {storyProfiles2.map((profile, index) => (
        <div
          key={index}
          className="bg-gray-100 h-20 w-20 rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => openMediaModal(index)}
        >
          <Image
            src={profile.src}
            alt={profile.alt}
            width={64}
            height={64}
            className="rounded-lg"
          />
        </div>
      ))}

      {isMediaModalOpen && (
        <ModalMedia
          isOpen={isMediaModalOpen}
          onClose={closeMediaModal}
          currentIndex={mediaIndex}
          onNext={handleNextMedia}
          onPrev={handlePrevMedia}
          profiles={storyProfiles2}
        />
      )}
    </div>
  );
};

export default Multimedia;
