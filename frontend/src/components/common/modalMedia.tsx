import React from "react";
import Image from "next/image";

interface StoryProfile {
  src: string;
  alt: string;
  time: string;
  new: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  profiles: StoryProfile[];
}

const ModalMedia: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onPrev,
  onNext,
  profiles,
}) => {
  if (!isOpen) return null;

  const currentProfile = profiles[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 h-[500px] w-[500px] rounded-lg relative flex flex-col items-center justify-center">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <span className="text-black text-2xl font-bold mb-4">Multimedia</span>

        <div className="flex items-center w-full h-full">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            className="p-2 text-gray-500 hover:text-black focus:outline-none"
            aria-label="Previous"
          >
            &lt; {/* Left Arrow Icon */}
          </button>

          {/* Image and Details */}
          <div className="flex flex-col items-center mx-4 flex-grow">
            <div className="relative w-[300px] h-[300px]">
              <Image
                src={currentProfile.src}
                alt={currentProfile.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold mt-4">{currentProfile.alt}</h2>
            <p className="text-gray-500">{currentProfile.time}</p>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="p-2 text-gray-500 hover:text-black focus:outline-none"
            aria-label="Next"
          >
            &gt; {/* Right Arrow Icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMedia;
