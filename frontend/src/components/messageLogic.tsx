import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiMic, FiMicOff } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { MdOutlinePermMedia } from "react-icons/md";

interface Message {
  message?: string;
  imageUrl?: string;
  audioUrl?: string;
  sender: "me" | "other";
  time: string;
}

const MessageLogic = () => {
  const [messages, setMessages] = useState<Message[]>([
    { message: "hola", sender: "me", time: "9:36" },
    { message: "¿Cómo estás?", sender: "other", time: "9:37" },
    { message: "Estoy bien, gracias.", sender: "me", time: "9:38" },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
  );
};

export default MessageLogic;
