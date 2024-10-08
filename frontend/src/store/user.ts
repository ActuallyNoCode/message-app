import { User } from "@/constants";
import { create } from "zustand";

// Define the shape of your store state
interface UserState {
  user: User;
  setUser: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  clearUser: () => void;
}

// Initial user data
const initialUser: User = {
  id: "723a6ab0-0206-4baf-a7b5-f9f122bed1a0",
  username: "Actualmente Pandatástico",
  phoneNumber: "123456789",
  phoneCode: "+57",
  profilePicture:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/674.jpg",
};

// Create the store with the correct type
export const userStore = create<UserState>((set) => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
  updateUser: (user: Partial<User>) =>
    set((state) => ({ user: { ...state.user, ...user } })),
  clearUser: () => set({ user: initialUser }),
}));

// Correctly typed useStore usage
const userId = userStore((state) => state.user.id);
