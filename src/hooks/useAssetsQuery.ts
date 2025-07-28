import { assets } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useAssetsQuery = (props?: Omit<UseQueryOptions<Awaited<ReturnType <typeof assets>>>, "queryKey" | "queryFn">) => {

  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
       await new Promise((resolve) => setTimeout(resolve, 1500));
      return await assets({
        includeCw20Assets: true,
        includeEvmAssets: true,
        includeSvmAssets: true,
        abortDuplicateRequests: false,
      });
    },
    // select: (data) => {
    //   return data[id];
    // },
    ...props,
  });
}
