import { skipClient } from "@/utils/skipClient";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useBridgesQuery = (props?: Omit<UseQueryOptions<Awaited<ReturnType <typeof skipClient.bridges>>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: ["bridges"],
    queryFn: async () => {
      return await skipClient.bridges()
    },
    ...props,
  });
}
