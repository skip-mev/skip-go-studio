import { skipClient } from "@/utils/skipClient";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSwapVenuesQuery = (props?: Omit<UseQueryOptions<Awaited<ReturnType <typeof skipClient.venues>>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: ["swapVenues"],
    queryFn: async () => {
      return await skipClient.venues()
    },
    ...props,
  });
}
