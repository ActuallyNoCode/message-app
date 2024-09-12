import { User } from "@/constants";
import { create } from "zustand";

const initialUser: User = {
  id: "723a6ab0-0206-4baf-a7b5-f9f122bed1a0",
  username: "Actualmente Pandatástico",
  phoneNumber: "123456789",
  phoneCode: "+57",
  profilePicture:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/674.jpg",
};

export const userStore = create((set) => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
  updateUser: (user: Partial<User>) =>
    set((state: any) => ({ user: { ...state.user, ...user } })),
  clearUser: () => set({ user: initialUser }),
}));
