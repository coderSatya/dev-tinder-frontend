import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth.api";
import { SignupRequestData, SignupResponse } from "@/types/auth.types";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation<SignupResponse, Error, SignupRequestData>({
    mutationFn: (data: SignupRequestData) => signup(data),
    onSuccess: (response) => {
      toast.success(response.message || "Signup successful!");
      if (response?.data) {
        setUser(response?.data);
      }
      router.push("/feed");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Signup failed";
      toast.error(errorMessage);
    },
  });
};
