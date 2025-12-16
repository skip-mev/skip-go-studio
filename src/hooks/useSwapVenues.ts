import { venues } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSwapVenuesQuery = (
  props?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof venues>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["swapVenues"],
    queryFn: async () => {
      for (let attempt = 1; attempt <= 3; attempt++) {
        const result = await venues({
          abortDuplicateRequests: false,
        });

        if (result !== undefined) {
          return result;
        }

        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      throw new Error("Failed to fetch swap venues after maximum retries.");
    },
    retry: 3,
    ...props,
  });
};
