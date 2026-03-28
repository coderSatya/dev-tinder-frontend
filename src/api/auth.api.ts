import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "@/constants/api.constants";
import { LoginRequestData, LoginResponse, SignupRequestData, SignupResponse } from "@/types/auth.types";

export const login = async (data: LoginRequestData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(ENDPOINTS.LOGIN, data);
  return response.data;
};

export const signup = async (data: SignupRequestData): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(ENDPOINTS.SIGNUP, data);
  return response.data;
};
