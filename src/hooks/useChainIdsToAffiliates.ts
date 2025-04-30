import { useStudioStore } from "@/store/studio";
import { WidgetProps } from "@skip-go/widget";
import { useMemo } from "react";

export const useChainIdsToAffiliates = () => {
  const { chainIdsToAddresses, basisPointsFee } = useStudioStore();

  return useMemo(() => {
    const chainIdsToAffiliates: WidgetProps["chainIdsToAffiliates"] = {};
    if (!basisPointsFee) return undefined;
    Object.entries(basisPointsFee).forEach(([chainId, val]) => {
      if (val === undefined || val === "") return;
      const affiliates = chainIdsToAddresses?.[chainId];
      if (!affiliates || affiliates.length === 0) return;
      const resAffiliates = affiliates.filter(Boolean).map((address) => ({
        address,
        basisPointsFee: basisPointsFee[chainId],
      }));
      if (resAffiliates.length === 0) return;
      chainIdsToAffiliates[chainId] = {
        affiliates: resAffiliates,
      };
    });
    return chainIdsToAffiliates;
  }, [chainIdsToAddresses, basisPointsFee]);
};
