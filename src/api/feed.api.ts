import axiosInstance from "@/lib/axios";
import { FeedResponse } from "@/types/feed.types";

export const getFeed = async (): Promise<FeedResponse> => {
  const response = await axiosInstance.get<FeedResponse>("/user/feed");
  return response.data;
};
