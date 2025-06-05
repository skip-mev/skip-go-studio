import {
  useDestinationNetworkAndAssetsStore,
  useSourceNetworkAndAssetsStore,
} from "@/store/studio";
import { useChainsQuery } from "./useChainsQuery";
import { useAssetsQuery } from "./useAssetsQuery";
import { useCallback } from "react";
import { WidgetProps } from "@skip-go/widget";

export const useWidgetFilters = () => {
  const { sourceSelectedChains, sourceSelectedAssets } =
    useSourceNetworkAndAssetsStore();
  const { destinationSelectedAssets, destinationSelectedChains } =
    useDestinationNetworkAndAssetsStore();
  const { data: chains } = useChainsQuery();
  const { data: assets } = useAssetsQuery();

  const getFilters = useCallback(
    (selectedChains?: string[], selectedAssets?: Record<string, string[]>) => {
      if (!chains || !assets) return undefined;
      let filter: Record<string, string[] | undefined> = {};
      const filterOut: Record<string, string[] | undefined> = {};
      if (!selectedChains) return undefined;

      const notSelectedChains = chains
        .filter((chain) => !selectedChains?.includes(chain.chainId))
        .map((chain) => chain.chainId);
      if (selectedChains.length > notSelectedChains.length) {
        notSelectedChains.forEach((chainId) => {
          filterOut[chainId] = undefined;
        });
      } else {
        selectedChains.forEach((chainId) => {
          filter[chainId] = undefined;
        });
      }
      selectedChains.forEach((chainId) => {
        const selectedChainAsset = selectedAssets?.[chainId];
        const notSelectedChainAsset = assets[chainId]
          ?.filter((asset) => !selectedChainAsset?.includes(asset.denom))
          .map((i) => i.denom);
        if (
          selectedChainAsset?.length === assets?.[chainId]?.length ||
          selectedChainAsset === undefined
        ) {
          return;
        } else {
          filterOut[chainId] = notSelectedChainAsset;
        }
      });
      if (
        Object.keys(filter).length === chains.length &&
        Object.values(filter).every((i) => i === undefined)
      ) {
        filter = {};
      }

      return {
        filter: Object.values(filter).length > 0 ? filter : undefined,
        filterOut: Object.values(filterOut).length > 0 ? filterOut : undefined,
      };
    },
    [assets, chains]
  );

  const filter: WidgetProps["filter"] = {
    source: getFilters(sourceSelectedChains, sourceSelectedAssets)?.filter,
    destination: getFilters(
      destinationSelectedChains,
      destinationSelectedAssets
    )?.filter,
  };

  const filterOut: WidgetProps["filterOut"] = {
    source: getFilters(sourceSelectedChains, sourceSelectedAssets)?.filterOut,
    destination: getFilters(
      destinationSelectedChains,
      destinationSelectedAssets
    )?.filterOut,
  };

  return {
    filter,
    filterOut,
  };
};
