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
      return await bridges();
    },
    ...props,
  });
};
