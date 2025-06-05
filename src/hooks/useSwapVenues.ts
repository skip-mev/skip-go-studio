
import { venues } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSwapVenuesQuery = (props?: Omit<UseQueryOptions<Awaited<ReturnType <typeof venues>>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: ["swapVenues"],
    queryFn: async () => {
      return await venues()
    },
    ...props,
  });
}
