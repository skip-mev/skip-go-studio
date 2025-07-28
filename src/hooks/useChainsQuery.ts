import { chains } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useChainsQuery = (
  props?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof chains>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      for (let attempt = 1; attempt <= 3; attempt++) {
        const result = await chains({
          includeEvm: true,
          includeSvm: true,
          abortDuplicateRequests: false,
        });

        if (result !== undefined) {
          return result;
        }

        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      throw new Error("Failed to fetch chains after maximum retries.");
    },
    retry: 3,
    ...props,
  });
};
