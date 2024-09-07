"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isOpen) {
      let timeLeft = 30;
      intervalId = setInterval(() => {
        timeLeft -= 1;
        setProgress((timeLeft / 30) * 100);

        if (timeLeft <= 0) {
          clearInterval(intervalId);
          onClose(); // Close modal when time is up
        }
      }, 1000); // Update every second
    }

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  interface Contact {
    id: number;
    name: string;
    message: string;
    profileImage: string;
  }

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Brayan Suarez",
      message: "Hola, ¿cómo estás?",
      profileImage: "/profile/23.svg",
    },
    
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative flex flex-col w-72 h-[500px] max-w-lg bg-white p-6 rounded-2xl justify-center items-center shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500"
          style={{ width: `${progress}%`, transition: "width 1s linear" }}
        ></div>
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-800 text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Image */}
        <div className="w-56 h-72 bg-white rounded-lg overflow-hidden flex items-center justify-center mb-4">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={300}
            height={300}
            className="w-52 h-52 object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white h-16 w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              <div className="h-12 w-12 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={contact.profileImage}
                  alt={contact.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-black font-semibold">{contact.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
