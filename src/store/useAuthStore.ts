import { create } from "zustand";
import { fetchProfileView } from "@/api/profile.api";
import { getConnections } from "@/api/connection.api";
import { Connection } from "@/types/connection.types";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  photoUrl?: string;
  about?: string;
  skills?: string[];
  age: number;
  gender: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  connections: Connection[];
  setUser: (user: User) => void;
  setConnections: (connections: Connection[]) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  fetchConnections: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  connections: [],
  setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  setConnections: (connections) => set({ connections }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false, connections: [] }),
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
  fetchConnections: async () => {
    try {
      const response = await getConnections();
      if (response && response.data) {
        set({ connections: response.data });
      }
    } catch (error) {
      console.error("Fetch connections error:", error);
    }
  },
}));
