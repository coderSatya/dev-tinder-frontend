import { useQuery, useMutation } from "@tanstack/react-query";
import { getFeed, sendConnectionRequest } from "@/api/feed.api";
import { useFeedStore } from "@/store/useFeedStore";
import { toast } from "react-toastify";

export const useFeed = () => {
  const setFeed = useFeedStore((state) => state.setFeed);
  const removeUserFromFeed = useFeedStore((state) => state.removeUserFromFeed);

  const feedQuery = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      try {
        const response = await getFeed();
        if (response?.success && response?.data) {
          setFeed(response?.data);
          return response?.data;
        }
        return [];
      } catch (error) {
        return [];
      }
    },
  });

  const requestMutation = useMutation({
    mutationFn: ({ status, userId }: { status: string; userId: string }) =>
      sendConnectionRequest(status, userId),
    onSuccess: (data, variables) => {
      // Only toast if message exists, or generic success
      if (data.success) {
        toast.success(data.message || "Request sent!");
        removeUserFromFeed(variables.userId);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    feed: feedQuery.data,
    isLoading: feedQuery.isLoading,
    isError: feedQuery.isError,
    sendRequest: requestMutation.mutate,
    isRequestLoading: requestMutation.isPending,
    refetch: feedQuery.refetch,
  };
};
