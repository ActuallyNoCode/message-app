"use client";

import { User } from "@/constants";
import React, { createContext, useContext } from "react";

const defaultUser: User = {
  id: "",
  username: "",
  phoneNumber: "",
  phoneCode: "",
  profilePicture: "",
};

const userContext = createContext<User>(defaultUser);

export default function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: Partial<User>;
}) {
  return (
    <userContext.Provider value={{ ...defaultUser, ...user }}>
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
