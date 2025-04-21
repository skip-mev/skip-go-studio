import { skipClient } from "@/utils/skipClient";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useChainsQuery = (props?: Omit<UseQueryOptions<Awaited<ReturnType <typeof skipClient.chains>>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      return await skipClient.chains({
        includeEVM: true,
        includeSVM: true,
      });
    },
    ...props,
  });
}
