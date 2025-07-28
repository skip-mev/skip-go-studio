import { assets } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useAssetsQuery = (
  props?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof assets>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
        for (let attempt = 1; attempt <= 3; attempt++) {
          const result = await assets({
            includeCw20Assets: true,
            includeEvmAssets: true,
            includeSvmAssets: true,
            abortDuplicateRequests: false,
          });
          if (result !== undefined) {
            return result;
          }

          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }
        throw new Error("Failed to fetch assets after maximum retries.");
    },
    retry: 3,
    // select: (data) => {
    //   return data[id];
    // },
    ...props,
  });
};
