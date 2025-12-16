import { bridges } from "@skip-go/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useBridgesQuery = (
  props?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof bridges>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["bridges"],
    queryFn: async () => {
      for (let attempt = 1; attempt <= 3; attempt++) {
        const result = await bridges({
          abortDuplicateRequests: false,
        });

        if (result !== undefined) {
          return result;
        }

        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      throw new Error("Failed to fetch bridges after maximum retries.");
    },
    retry: 3,
    ...props,
  });
};
