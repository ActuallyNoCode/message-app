import React from "react";
import UserProvider from "./userProvider";
import settings from "@/config";
import axios from "axios";
import { cookies } from "next/headers";
import { User } from "@/constants";

interface ProviderProps {
  children: React.ReactNode;
  user: Partial<User>;
}

export default async function Provider({ children, user }: ProviderProps) {
  return <UserProvider user={{}}>{children}</UserProvider>;
}
