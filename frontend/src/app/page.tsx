"use client";

import React, { useState, useEffect, useRef } from "react";

import Image from "next/image";
import Modal from "../components/common/modal/modal";
import ModalMedia from "../components/common/modal/modalMedia";
import { SlOptionsVertical } from "react-icons/sl";
import { FiMic, FiMicOff } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { MdOutlinePermMedia } from "react-icons/md";
import Link from "next/link";

interface StoryProfile {
  src: string;
  alt: string;
  time: string;
  new: boolean;
}

interface Message {
  message?: string;
  imageUrl?: string;
  audioUrl?: string;
  sender: "me" | "other";
  time: string;
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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<StoryProfile | null>(
    null
  );
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaProfile, setMediaProfile] = useState<StoryProfile | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { message: "hola", sender: "me", time: "9:36" },
    { message: "¿Cómo estás?", sender: "other", time: "9:37" },
    { message: "Estoy bien, gracias.", sender: "me", time: "9:38" },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const openMediaModal = (profile: StoryProfile) => {
    setMediaProfile(profile);
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

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !selectedImage && !audioUrl) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessageObject: Message = {
      sender: "me",
      time: currentTime,
    };

    if (newMessage.trim() !== "") {
      newMessageObject.message = newMessage;
    }

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      newMessageObject.imageUrl = imageUrl;
    }
    if (audioUrl) {
      newMessageObject.audioUrl = audioUrl;
    }

    setMessages([...messages, newMessageObject]);
    setNewMessage("");
    setAudioUrl(null);
    setSelectedImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            setAudioChunks((prev) => [...prev, event.data]);
          };
          recorder.onstop = () => {
            if (audioChunks.length > 0) {
              const blob = new Blob(audioChunks, { type: "audio/wav" });
              const newAudioUrl = URL.createObjectURL(blob);
              setAudioUrl(newAudioUrl);
              setAudioChunks([]);
              // Aquí guardamos el mensaje después de detener la grabación
              handleSendMessage();
            } else {
              console.error("No audio chunks available");
            }
          };

          recorder.start();
          setMediaRecorder(recorder);
          setIsRecording(true);
        })
        .catch((error) => {
          console.error("Error al acceder al micrófono", error);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSendAudio = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const blob = new Blob(audioChunks, { type: "audio/wav" }); // Ajusta el tipo según sea necesario

  const handlePlayAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir el audio:", error);
      });
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex items-start">
      <div className="flex flex-col">
        <div className="relative bg-white h-10 w-[263px] flex items-center justify-between border-1 ">
          <span className="text-black">Recent messages</span>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <SlOptionsVertical size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    profile
                  </li>
                  <Link href="/login">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <span>Exit</span>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="bg-blue-600 flex flex-col items-start justify-start h-[560px] w-[263px] rounded-lg p-4 overflow-y-auto">
          <div className="flex flex-col gap-3 w-full">
            {/* Contacto 1 */}
            <div className="bg-white h-16 w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src="/profile/23.svg"
                  alt="Profile Picture"
                  width={48}
                  height={48}
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-black font-semibold">Brayan Suarez</span>
                <span className="text-gray-400 text-sm">
                  Hola, ¿cómo estás?
                </span>
              </div>
            </div>

            {/* Contacto 2 */}
            <div className="bg-white h-16 w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src="/profile/24.svg"
                  alt="Profile Picture"
                  width={48}
                  height={48}
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-black font-semibold">Maria López</span>
                <span className="text-gray-400 text-sm">¿Nos vemos hoy?</span>
              </div>
            </div>

            {/* Contacto 3 */}
            <div className="bg-white h-16 w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src="/profile/25.svg"
                  alt="Profile Picture"
                  width={48}
                  height={48}
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-black font-semibold">Juan Pérez</span>
                <span className="text-gray-400 text-sm">
                  Te mando la info...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="bg-white h-10 w-[730px] flex items-center gap-2 border-1 rounded-b-lg">
          <div className="bg-purple-400 h-8 w-8 rounded-full ml-4 hover:scale-110">
            <Image
              src="/profile/payaso.svg"
              alt="Profile Picture"
              width={70}
              height={70}
              className="rounded-full h-8 w-8"
            />
          </div>
          <span className="text-black">Brayan Suarez</span>
          <span className="text-gray-400">2 mins</span>
        </div>
        <div className="bg-white flex flex-col h-[560px] border-2 w-[730px] p-4 rounded-xl">
          <div className="flex-1 overflow-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`${
                    msg.sender === "me" ? "bg-blue-200" : "bg-gray-200"
                  } p-2 rounded-lg max-w-[70%]`}
                >
                  {msg.message && (
                    <>
                      <span className="text-black">{msg.message}</span>
                      <div className="text-xs text-gray-500">{msg.time}</div>
                    </>
                  )}
                  {msg.imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={msg.imageUrl}
                        alt="Imagen"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <div className="text-xs text-gray-500">{msg.time}</div>
                    </div>
                  )}
                  {msg.audioUrl && (
                    <div className="mt-2">
                      <audio
                        ref={audioRef}
                        controls
                        src={msg.audioUrl}
                        className="w-56"
                      >
                        Your browser does not support the audio element.
                      </audio>
                      <div className="text-xs text-gray-500">{msg.time}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border border-gray-300 rounded-lg text-black"
            />

            <label htmlFor="file-input">
              <div className=" bg-blue-600 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200">
                <MdOutlinePermMedia />
              </div>
            </label>

            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              onClick={handleSendAudio}
              className={`p-2 rounded-full ${
                isRecording ? "bg-red-500" : "bg-blue-600"
              } hover:bg-blue-700 text-white`}
            >
              {isRecording ? <FiMicOff size={20} /> : <FiMic size={20} />}
            </button>

            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              <BiSend />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="bg-white h-10 w-[317px] border-1"></div>
        <div className="bg-white flex flex-col h-[560px] w-[317px] overflow-x-auto">
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
          </div>
          <div className="bg-blue-600 h-72 w-18 flex flex-col  ">
            <span className="font-semibold text-white">Profile</span>
            <div className="h-60 w-[317px] bg-white flex  items-center justify-around rounded-xl">
              <div className="h-18 w-18 bg-black rounded-2xl hover:scale-110">
                <Image
                  src="/profile/22.svg"
                  alt="Profile Picture"
                  width={70}
                  height={70}
                  className="rounded-2xl h-28 w-28"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-black">Brayan Suarez</span>
                <span className="text-gray-400 ">@Suarozky</span>
                <span className="text-gray-400 ">3239924230</span>
              </div>
            </div>
          </div>
          <div>
            <Cuadrados profiles={storyProfiles2} onClick={openMediaModal} />
          </div>
        </div>
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
}

interface CuadradosProps {
  profiles: StoryProfile[];
  onClick: (profile: StoryProfile) => void;
}

function Cuadrados({ profiles, onClick }: CuadradosProps) {
  return (
    <div className="bg-blue-600 h-44 w-full flex flex-wrap justify-center gap-4 p-4 rounded-b-xl">
      {profiles.map((profile, index) => (
        <div
          key={index}
          className="bg-white h-16 w-16 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => onClick(profile)}
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
    </div>
  );
}
