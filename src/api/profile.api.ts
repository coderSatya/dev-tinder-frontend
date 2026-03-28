import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "@/constants/api.constants";
import { LoginResponse } from "@/types/auth.types";

export const fetchProfileView = async (): Promise<LoginResponse> => {
  const response = await axiosInstance.get<LoginResponse>(ENDPOINTS.PROFILE_VIEW);
  return response.data;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>(ENDPOINTS.LOGOUT);
  return response.data;
};
