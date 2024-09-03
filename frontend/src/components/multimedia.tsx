import React, { useState } from "react";
import Image from "next/image";
import ModalMedia from "../components/common/modalMedia";

interface StoryProfile {
  src: string;
  alt: string;
  time: string;
  new: boolean;
}

// Define the storyProfiles2 array within the component
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
  const [mediaProfile, setMediaProfile] = useState<StoryProfile | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  const openMediaModal = (profile: StoryProfile) => {
    setMediaProfile(profile);
    setMediaIndex(storyProfiles2.indexOf(profile)); // Set index based on the profile
    setIsMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setIsMediaModalOpen(false);
    setMediaProfile(null);
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
    <div className="bg-blue-600 h-44 w-full flex flex-wrap justify-center gap-4 p-4 rounded-b-xl">
      {storyProfiles2.map((profile, index) => (
        <div
          key={index}
          className="bg-white h-16 w-16 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => openMediaModal(profile)}
        >
          <Image
            src={profile.src}
            alt={profile.alt}
            width={60}
            height={60}
            className="rounded-lg"
          />
        </div>
      ))}

      {isMediaModalOpen && mediaProfile && (
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
