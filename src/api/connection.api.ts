import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "@/constants/api.constants";
import { ConnectionResponse } from "@/types/connection.types";

export const getConnections = async (): Promise<ConnectionResponse> => {
  const response = await axiosInstance.get<ConnectionResponse>(ENDPOINTS.CONNECTION);
  return response.data;
};
