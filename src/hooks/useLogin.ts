import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth.api";
import { LoginRequestData, LoginResponse } from "@/types/auth.types";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequestData>({
    mutationFn: (data: LoginRequestData) => login(data),
    onSuccess: (response) => {
      toast.success(response.message || "Login successful!");
      if (response?.data) {
        setUser(response?.data);
      }
      router.push("/feed");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(errorMessage);
    },
  });
};
