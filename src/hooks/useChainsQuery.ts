
import { chains } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useChainsQuery = (props?: Omit<UseQueryOptions<Awaited<ReturnType <typeof chains>>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      return await chains({
        includeEvm: true,
        includeSvm: true,
      });
    },
    ...props,
  });
}
