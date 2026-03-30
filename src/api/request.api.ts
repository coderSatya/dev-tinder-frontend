import axiosInstance from "@/lib/axios";
import { ConnectionRequestResponse } from "@/types/request.types";

export const getReceivedRequests = async (): Promise<ConnectionRequestResponse> => {
  const response = await axiosInstance.get<ConnectionRequestResponse>("/user/requests/received");
  return response.data;
};

export const reviewRequest = async (status: "accepted" | "rejected", requestId: string): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>(`/request/review/${status}/${requestId}`);
  return response.data;
};
