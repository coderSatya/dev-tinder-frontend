import { create } from "zustand";
import { FeedUser } from "@/types/feed.types";

interface FeedState {
  feed: FeedUser[] | null;
  setFeed: (feed: FeedUser[]) => void;
  removeUserFromFeed: (userId: string) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  feed: null,
  setFeed: (feed) => set({ feed }),
  removeUserFromFeed: (userId) =>
    set((state) => ({
      feed: state.feed ? state.feed.filter((user) => user._id !== userId) : null,
    })),
}));
