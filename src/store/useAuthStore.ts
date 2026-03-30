import { create } from "zustand";
import { fetchProfileView } from "@/api/profile.api";
import { getConnections } from "@/api/connection.api";
import { getReceivedRequests } from "@/api/request.api";
import { getFeed } from "@/api/feed.api";
import { Connection } from "@/types/connection.types";
import { ConnectionRequest } from "@/types/request.types";
import { FeedResponse } from "@/types/feed.types";

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
  requests: ConnectionRequest[];
  feed: FeedResponse | null;
  setUser: (user: User) => void;
  setConnections: (connections: Connection[]) => void;
  setRequests: (requests: ConnectionRequest[]) => void;
  setFeed: (feed: FeedResponse) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  fetchConnections: () => Promise<void>;
  fetchRequests: () => Promise<void>;
  fetchFeed: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  connections: [],
  requests: [],
  feed: null,
  setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  setConnections: (connections) => set({ connections }),
  setRequests: (requests) => set({ requests }),
  setFeed: (feed) => set({ feed }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      connections: [],
      requests: [],
      feed: null,
    }),
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
  fetchRequests: async () => {
    try {
      const response = await getReceivedRequests();
      if (response && response.data) {
        set({ requests: response.data });
      }
    } catch (error) {
      console.error("Fetch requests error:", error);
    }
  },
  fetchFeed: async () => {
    try {
      const data = await getFeed();
      set({ feed: data });
    } catch (error) {
      console.error("Fetch feed error:", error);
    }
  },
}));
