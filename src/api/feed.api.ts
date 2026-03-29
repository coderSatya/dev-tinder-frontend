import axiosInstance from "@/lib/axios";
import { Connection } from "@/types/connection.types";

export const getFeed = async (): Promise<Connection[]> => {
  const response = await axiosInstance.get<Connection[]>("/user/feed");
  return response.data;
};
