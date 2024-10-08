"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiMic, FiMicOff } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { MdOutlinePermMedia } from "react-icons/md";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import settings from "@/config";
import { Message } from "@/constants";
import { userStore } from "@/store/user";
import { useUser } from "@/store/context/userProvider";

const MessageLogic = ({ authToken }: { authToken: string | undefined }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const chatId = useSearchParams().get("chatId");
  const user = useUser();
  // Connect to the WebSocket server
  const socketRef = useRef<any>(null);
  useEffect(() => {
    if (!chatId || !authToken) return;
    // Fetch messages from the server
    async function fetchMessages() {
      const { data } = await axios.get(`${settings.API_URL}/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(data);
      setMessages(data.messages);
    }

    fetchMessages();

    // Connect to the WebSocket server
    socketRef.current = io("ws://localhost:3100", {
      auth: {
        authorization: "Bearer " + "my token",
      },
    });
    socketRef.current.on("connection", (data: string) => {});

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId]);

  const socketSendMessage = (message: string) => {
    socketRef.current.emit("message", { chatId: "myChatId", message });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !selectedImage && !audioUrl) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessageObject: Message = {
      id: `${messages.length + 1}`,
      user: {
        id: user.id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
      content: newMessage,
      createdAt: currentTime,
      status: "sent",
    };

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      newMessageObject.media = imageUrl;
      newMessageObject.mediaType = "image/jpeg";
    }
    if (audioUrl) {
      newMessageObject.media = audioUrl;
      newMessageObject.mediaType = "audio/mp3";
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
    <div className="bg-white flex flex-col h-[calc(100vh-3.5rem)] border-2 w-full p-4 rounded-xl">
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.user.id === user.id ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`${
                msg.user.id === user.id ? "bg-blue-200" : "bg-gray-200"
              } p-2 rounded-lg max-w-[70%] overflow-hidden break-words`}
            >
              {msg.content && (
                <>
                  <span className="text-black">{msg.content}</span>
                  <div className="text-xs text-gray-500">{msg.createdAt}</div>
                </>
              )}
              {msg.media && msg.mediaType === "image/jpeg" && (
                <div className="mt-2">
                  <Image
                    src={msg.media}
                    alt="Image"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                  <div className="text-xs text-gray-500">{msg.createdAt}</div>
                </div>
              )}
              {msg.media && msg.mediaType === "audio/mp3" && (
                <div className="mt-2">
                  <audio
                    ref={audioRef}
                    controls
                    src={msg.media}
                    className="w-56"
                  >
                    Your browser does not support the audio element.
                  </audio>
                  <div className="text-xs text-gray-500">{msg.createdAt}</div>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
              socketSendMessage(newMessage);
            }
          }}
          placeholder="Escribe un mensaje..."
          className={`flex-1 p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-600 transition duration-200 ${
            newMessage !== "" ? "focus:ring-2 focus:ring-blue-600" : ""
          }`}
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
          onClick={() => {
            handleSendMessage();
            socketSendMessage(newMessage);
          }}
          className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          <BiSend />
        </button>
      </div>
    </div>
  );
};

export default MessageLogic;
