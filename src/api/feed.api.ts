import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "@/constants/api.constants";
import { FeedResponse } from "@/types/feed.types";

export const getFeed = async (): Promise<FeedResponse> => {
  const response = await axiosInstance.get<FeedResponse>(ENDPOINTS.FEED);
  return response.data;
};

export const sendConnectionRequest = async (status: string, userId: string): Promise<{ message: string; success: boolean }> => {
  const response = await axiosInstance.post<{ message: string; success: boolean }>(`${ENDPOINTS.REQUEST_SEND}/${status}/${userId}`);
  return response.data;
};
