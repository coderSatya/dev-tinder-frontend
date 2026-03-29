import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { reviewRequest } from "@/api/request.api";
import { toast } from "react-toastify";

export const useRequest = () => {
  const { requests, setRequests, fetchConnections } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleReview = async (status: "accepted" | "rejected", requestId: string) => {
    setIsProcessing(requestId);
    try {
      await reviewRequest(status, requestId);
      toast.success(`Request ${status} successfully!`);
      
      // Update local state by removing the processed request
      const updatedRequests = requests.filter((req) => req._id !== requestId);
      setRequests(updatedRequests);

      // If accepted, refresh connections to update the count and list
      if (status === "accepted") {
        fetchConnections();
      }
    } catch (err) {
      console.error("Error reviewing request:", err);
      toast.error("Failed to process request.");
    } finally {
      setIsProcessing(null);
    }
  };

  return {
    requests,
    isProcessing,
    handleReview,
  };
};
