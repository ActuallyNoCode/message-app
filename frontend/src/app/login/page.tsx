"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function LoginView() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Nota: He cambiado 'Phone' a 'phone' para seguir las convenciones de estilo

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data =
      mode === "register"
        ? {
            username,
            password,
            phoneNumber: phone,
            phoneCode: "+57",
          }
        : {
            password,
            phoneNumber: phone,
          };

    console.log("Submitting data:", data);

    try {
      const response = await fetch(`http://localhost:3100/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok && response.status === 201) {
        // Redirige a la nueva ruta si la respuesta es 201
        window.location.href = "http://localhost:3001/";
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error during", mode, ":", error);
    }
  };

  return (
    <>
      <div className="relative h-screen">
        <div className="min-[500px]:absolute min-[500px]:left-60 min-[500px]:top-60 w-60 h-60 bg-[#94a6ff] z-0 rounded-full max-[1200px]:hidden"></div>

        <div className="min-[990px]:hidden">
          <div className="rounded-lg mt-20 scale-150 w-full h-full flex flex-row justify-center items-center">
            <Image
              src="/profile/man.svg"
              alt="Profile Picture"
              width={350}
              height={300}
            />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 min-[1200px]:backdrop-blur-3xl z-10 flex items-center justify-center max-[500px]:scale-95 max-[500px]:w-screen max-[500px]:h-full max-[1200px]:mx-20 max-[500px]:mt-64 max-[990px]:mt-64">
          <div className="bg-opacity-80 p-8 rounded-lg flex flex-col gap-6 max-[1000px]:hidden">
            <div className="flex flex-col gap-2">
              <span className="text-5xl font-bold">The best world</span>
              <span className="text-5xl font-bold">Chat app</span>
            </div>
            <div>
              <span className="text-black max-w-[900px] block font-semibold">
                communicate with those
              </span>
              <div className="flex gap-2 font-semibold">
                <span>who are far away</span>
              </div>
            </div>
          </div>

          <div className="bg-opacity-80 p-8 rounded-lg">
            <Image
              src="/profile/man.svg"
              alt="Profile Picture"
              width={350}
              height={300}
            />
          </div>

          <div className="relative flex justify-start items-start max-[1200px]:flex max-[1200px]:justify-center max-[1200px]:items-center max-[1200px]:right-[70px]">
            <div className="top-0 left-0 bg-opacity-80 p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {mode === "register" && (
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                )}
                {mode === "login" && (
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                )}
                {mode === "register" && (
                  <input
                    type="text"
                    placeholder="username"
                    className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                    value={username}
                    onChange={handleUserNameChange}
                    required
                  />
                )}
                <input
                  type="password"
                  placeholder="Password"
                  className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-700 h-12 rounded-xl text-white font-semibold flex justify-center items-center"
                >
                  {mode === "login" ? "Login" : "Register"}
                </button>
                <div className="flex justify-center gap-10  mt-4 font-semibold">
                  {mode === "login" ? (
                    <span>
                      Don’t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("register")}
                        className="text-blue-500 underline hover:text-blue-700 font-semibold"
                      >
                        Register here
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        Login here
                      </button>
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
