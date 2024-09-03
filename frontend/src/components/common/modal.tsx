"use client";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg relative h-[570px] w-[500px] flex flex-col items-center justify-center">
        <div
          className="absolute top-0 left-0 h-1 bg-green-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
