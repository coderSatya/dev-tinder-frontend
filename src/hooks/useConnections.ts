import { useQuery } from "@tanstack/react-query";
import { getConnections } from "@/api/connection.api";

export const useConnections = () => {
  const query = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const response = await getConnections();
      return response?.data ?? [];
    },
  });

  return {
    connections: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
