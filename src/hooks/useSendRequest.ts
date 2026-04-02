import { useState } from "react";
import { sendRequest } from "@/api/request.api";
import { useFeedStore } from "@/store/useFeedStore";
import { toast } from "react-toastify";

export const useSendRequest = () => {
  const removeUserFromFeed = useFeedStore((state) => state.removeUserFromFeed);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleSendRequest = async (
    status: "interested" | "ignored",
    receiverId: string
  ) => {
    if (processingId === receiverId) return; // prevent double-click
    setProcessingId(receiverId);
    try {
      const response = await sendRequest(status, receiverId);
      if (response?.message) {
        if (status === "ignored") {
          toast.error(response.message, { autoClose: 1000 });
        } else {
          toast.success(response.message, { autoClose: 1000 });
        }
      }
      // Immediately remove from the feed store → UI updates instantly
      removeUserFromFeed(receiverId);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Failed to send request";
      toast.error(msg, { autoClose: 1000 });
    } finally {
      setProcessingId(null);
    }
  };

  return { handleSendRequest, processingId };
};
