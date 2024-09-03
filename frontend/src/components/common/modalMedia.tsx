import React from 'react';
import Image from 'next/image';


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

const ModalMedia: React.FC<ModalProps> = ({ isOpen, onClose, currentIndex, onPrev, onNext, profiles }) => {
  if (!isOpen) return null;

  const currentProfile = profiles[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 h-[500px] w-[500px] rounded-lg relative flex flex-col items-center justify-center">
        <span className='text-black text-4xl '>multimedia</span>
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex items-center">
          {/* Botón de "Atrás" */}
          <button
            onClick={onPrev}
            className="p-2 text-gray-500 hover:text-black focus:outline-none"
          >
            &lt; {/* Icono de flecha hacia la izquierda */}
          </button>

          {/* Imagen y detalles actuales */}
          <div className="flex flex-col items-center mx-4">
            <Image
              src={currentProfile.src}
              alt={currentProfile.alt}
              width={100}
              height={100}
              className="rounded-full h-[300px] w-[300px]"
            />
            <h2 className="text-lg font-semibold">{currentProfile.alt}</h2>
            <p className="text-gray-500">{currentProfile.time}</p>
          </div>

          {/* Botón de "Adelante" */}
          <button
            onClick={onNext}
            className="p-2 text-gray-500 hover:text-black focus:outline-none"
          >
            &gt; {/* Icono de flecha hacia la derecha */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMedia;
