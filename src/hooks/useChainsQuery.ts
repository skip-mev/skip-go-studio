
import { chains } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useChainsQuery = (props?: Omit<UseQueryOptions<Awaited<ReturnType <typeof chains>>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      // sleep 1s
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await chains({
        includeEvm: true,
        includeSvm: true,
        abortDuplicateRequests: false,
      });
    },
    ...props,
  });
}
