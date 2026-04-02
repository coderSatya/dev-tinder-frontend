import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReceivedRequests, reviewRequest } from "@/api/request.api";
import { toast } from "react-toastify";

export const useRequests = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await getReceivedRequests();
      return response?.data ?? [];
    },
  });

  const reviewMutation = useMutation({
    mutationFn: ({
      status,
      requestId,
    }: {
      status: "accepted" | "rejected";
      requestId: string;
    }) => reviewRequest(status, requestId),
    onSuccess: (_, variables) => {
      toast.success(`Request ${variables.status} successfully!`);
      // Remove the reviewed request from cache
      queryClient.setQueryData(
        ["requests"],
        (old: any[] | undefined) =>
          (old ?? []).filter((req) => req._id !== variables.requestId)
      );
      // If accepted, invalidate connections so they refresh
      if (variables.status === "accepted") {
        queryClient.invalidateQueries({ queryKey: ["connections"] });
      }
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Failed to process request.";
      toast.error(msg);
    },
  });

  const handleReview = (
    status: "accepted" | "rejected",
    requestId: string
  ) => {
    reviewMutation.mutate({ status, requestId });
  };

  return {
    requests: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    isProcessing: reviewMutation.isPending
      ? (reviewMutation.variables as any)?.requestId
      : null,
    handleReview,
  };
};
