import { create } from "zustand";
import { fetchProfileView } from "@/api/profile.api";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  photoUrl?: string;
  about?: string;
  skills?: string[];
  age:number,
  gender:string
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await fetchProfileView();
      if (response && response.data) {
        set({ user: response.data as any, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
