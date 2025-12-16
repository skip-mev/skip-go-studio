import {
  useDestinationNetworkAndAssetsStore,
  useSourceNetworkAndAssetsStore,
} from "@/store/studio";
import { useChainsQuery } from "./useChainsQuery";
import { useAssetsQuery } from "./useAssetsQuery";
import { useMemo } from "react";
import { WidgetProps } from "@skip-go/widget";

export const useWidgetFilters = () => {
  const { sourceSelectedChains, sourceSelectedAssets } =
    useSourceNetworkAndAssetsStore();
  const { destinationSelectedAssets, destinationSelectedChains } =
    useDestinationNetworkAndAssetsStore();
  const { data: chains } = useChainsQuery();
  const { data: assets } = useAssetsQuery();

  const getFilters = useMemo(() => {
    return (selectedChains?: string[], selectedAssets?: Record<string, string[]>) => {
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
        filter: Object.keys(filter).length > 0 ? filter : undefined,
        filterOut: Object.keys(filterOut).length > 0 ? filterOut : undefined,
      };
    };
  }, [assets, chains]);

  const sourceFilters = useMemo(
    () => getFilters(sourceSelectedChains, sourceSelectedAssets),
    [getFilters, sourceSelectedChains, sourceSelectedAssets]
  );

  const destinationFilters = useMemo(
    () => getFilters(destinationSelectedChains, destinationSelectedAssets),
    [getFilters, destinationSelectedChains, destinationSelectedAssets]
  );

  const filter: WidgetProps["filter"] = useMemo(
    () => ({
      source: sourceFilters?.filter,
      destination: destinationFilters?.filter,
    }),
    [sourceFilters, destinationFilters]
  );

  const filterOut: WidgetProps["filterOut"] = useMemo(
    () => ({
      source: sourceFilters?.filterOut,
      destination: destinationFilters?.filterOut,
    }),
    [sourceFilters, destinationFilters]
  );

  return {
    filter,
    filterOut,
  };
};
