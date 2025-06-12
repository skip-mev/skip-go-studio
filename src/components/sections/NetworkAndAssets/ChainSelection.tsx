import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useMemo, useState } from "react";

import { FilterButton, SmallPillButton } from "../../SmallPillButton";
import { Checkbox } from "../../Checkbox";
import {
  useAssetSelectorModalStore,
  useDestinationNetworkAndAssetsStore,
  useSourceNetworkAndAssetsStore,
  useStudioStore,
} from "@/store/studio";
import { ColorIcon } from "../../icons/ColorIcon";
import { matchSorter } from "match-sorter";
import { useChainsQuery } from "@/hooks/useChainsQuery";
import { useAssetsQuery } from "@/hooks/useAssetsQuery";
import { cn } from "@/utils/ui";

export const ChainSelection = ({
  context,
}: {
  context: "source" | "destination";
}) => {
  const [searchInput, setSearchInput] = useState("");
  const { sourceSelectedChains } = useSourceNetworkAndAssetsStore();
  const { destinationSelectedChains } = useDestinationNetworkAndAssetsStore();

  const selectedChains =
    context === "source" ? sourceSelectedChains : destinationSelectedChains;

  const {
    data: chains,
    isLoading: isChainsLoading,
    error,
  } = useChainsQuery({
    select: (data) => {
      if (!data) return [];
      return matchSorter(data, searchInput, {
        keys: ["chainName", "chainId"],
        threshold: matchSorter.rankings.CONTAINS,
      });
    },
  });
  console.log("chains", chains, error, isChainsLoading);
  const { isLoading: isAssetsLoading, data: assets } = useAssetsQuery();

  const setSelectedChains = useCallback(
    (chains: string[]) => {
      if (context === "source") {
        useSourceNetworkAndAssetsStore.setState({
          sourceSelectedChains: chains,
        });
      } else {
        useDestinationNetworkAndAssetsStore.setState({
          destinationSelectedChains: chains,
        });
      }
    },
    [context]
  );

  const clearAssets = useCallback(() => {
    if (context === "source") {
      useSourceNetworkAndAssetsStore.setState({
        sourceSelectedAssets: undefined,
      });
    } else {
      useDestinationNetworkAndAssetsStore.setState({
        destinationSelectedAssets: undefined,
      });
    }
  }, [context]);

  const clearChainAssets = useCallback(
    (chainId: string) => {
      if (context === "source") {
        useSourceNetworkAndAssetsStore.setState((v) => {
          const assets = v.sourceSelectedAssets;
          delete assets?.[chainId];
          return {
            sourceSelectedAssets: {
              ...assets,
            },
          };
        });
      } else {
        useDestinationNetworkAndAssetsStore.setState((v) => {
          const assets = v.destinationSelectedAssets;
          delete assets?.[chainId];
          return {
            destinationSelectedAssets: {
              ...assets,
            },
          };
        });
      }
    },
    [context]
  );

  // Set the selected chains in the store when the component mounts
  useEffect(() => {
    if (
      chains &&
      sourceSelectedChains === undefined &&
      destinationSelectedChains === undefined
    ) {
      useSourceNetworkAndAssetsStore.setState({
        sourceSelectedChains: chains.map((chain) => chain.chainId),
      });
      useDestinationNetworkAndAssetsStore.setState({
        destinationSelectedChains: chains.map((chain) => chain.chainId),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chains]);

  const { theme } = useStudioStore();

  return (
    <div className="flex flex-col gap-4 text-lg">
      <div
        className="flex w-full flex-row items-center gap-1 bg-[#1D1D1D] px-3 py-1.5 text-[13px]"
        style={{
          borderRadius: parseInt(String(theme.borderRadius?.main)) / 1.5,
        }}
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#1D1D1D] focus-visible:border-none focus-visible:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </div>
      {chains && (
        <div className="flex flex-row gap-2">
          <FilterButton
            onClick={() => {
              setSelectedChains(chains.map((chain) => chain.chainId));
              clearAssets();
            }}
          >
            Select All
          </FilterButton>
          <FilterButton
            onClick={() => {
              setSelectedChains([]);
              clearAssets();
            }}
          >
            Deselect All
          </FilterButton>
          <FilterButton
            onClick={() => {
              setSelectedChains(
                chains
                  .filter((chain) => chain.chainType === "evm")
                  .map((chain) => chain.chainId)
              );
              clearAssets();
            }}
          >
            EVM
          </FilterButton>
          <FilterButton
            onClick={() => {
              setSelectedChains(
                chains
                  .filter((chain) => chain.chainType === "cosmos")
                  .map((chain) => chain.chainId)
              );
              clearAssets();
            }}
          >
            IBC
          </FilterButton>
          <FilterButton
            onClick={() => {
              setSelectedChains(
                chains
                  .filter((chain) => chain.chainType === "svm")
                  .map((chain) => chain.chainId)
              );
              clearAssets();
            }}
          >
            Solana
          </FilterButton>
        </div>
      )}

      {(isChainsLoading || isAssetsLoading) && (
        <div className="flex h-96 w-full items-center justify-center">
          <ColorIcon className="animate-spin" color="#A5A5A5" />
        </div>
      )}
      {chains && assets && (
        <div className="h-96 overflow-y-auto contain-strict flex flex-col gap-0">
          {chains.length ? (
            chains.map((chain) => (
              <ChainCheckbox
                key={chain.chainId}
                name={chain.chainName}
                id={chain.chainId}
                checked={!!selectedChains?.includes(chain.chainId)}
                setChecked={() => {
                  if (selectedChains?.includes(chain.chainId)) {
                    setSelectedChains(
                      selectedChains.filter((id) => id !== chain.chainId)
                    );
                    clearChainAssets(chain.chainId);
                  } else {
                    setSelectedChains([
                      ...(selectedChains || []),
                      chain.chainId,
                    ]);
                  }
                }}
                context={context}
              />
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm text-[#A5A5A5]">No chains found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ChainCheckbox = ({
  name,
  id,
  checked,
  setChecked,
  context,
}: {
  name: string;
  id: string;
  checked: boolean;
  setChecked: () => void;
  context: "source" | "destination";
}) => {
  const { sourceSelectedAssets, sourceSelectedChains } =
    useSourceNetworkAndAssetsStore();
  const { destinationSelectedAssets, destinationSelectedChains } =
    useDestinationNetworkAndAssetsStore();

  const { data: assets } = useAssetsQuery();

  const selectedChains =
    context === "source" ? sourceSelectedChains : destinationSelectedChains;
  const selectedAssets =
    context === "source" ? sourceSelectedAssets : destinationSelectedAssets;
  const selectedChainAssets = selectedAssets?.[id];
  const fullAssets = assets?.[id];

  const setSelectedChains = useCallback(
    (chains: string[]) => {
      if (context === "source") {
        useSourceNetworkAndAssetsStore.setState({
          sourceSelectedChains: chains,
        });
      } else {
        useDestinationNetworkAndAssetsStore.setState({
          destinationSelectedChains: chains,
        });
      }
    },
    [context]
  );

  const assetsDisplayedText = useMemo(() => {
    if (selectedChainAssets?.length === 1) {
      return fullAssets?.find(
        (asset) => asset.denom === selectedChainAssets?.[0]
      )?.recommendedSymbol;
    }
    if (selectedChainAssets?.length === fullAssets?.length) {
      return "All assets";
    }
    if (selectedChainAssets === undefined) {
      return "All assets";
    }
    if (selectedChainAssets.length === 0) {
      return "All assets";
    }
    return `${selectedChainAssets.length} assets`;
  }, [selectedChainAssets, fullAssets]);

  // when 0 assets are selected, remove the chain from the selected chains
  useEffect(() => {
    if (selectedChainAssets?.length === 0 && selectedChains) {
      setSelectedChains(selectedChains.filter((chainId) => chainId !== id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, selectedChainAssets]);

  // when more than 0 assets are selected and the chain is unchecked, add the chain to the selected chains
  useEffect(() => {
    if (
      selectedChainAssets &&
      selectedChainAssets?.length > 0 &&
      !checked &&
      selectedChains
    ) {
      setSelectedChains([...selectedChains, id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, checked, selectedChainAssets]);

  return (
    <div
      className="flex flex-row justify-between cursor-default group"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setChecked();
        }}
        className="flex flex-row gap-2 items-center py-2  "
      >
        <div className="flex flex-row gap-2 items-center">
          <div>
            <Checkbox checked={checked} />
          </div>
          <span className="capitalize line-clamp-1">{name}</span>
          <SmallPillButton
            className="text-[#A5A5A5] font-abcdiatype-mono px-2.5 py-1 line-clamp-1 !cursor-pointer max-w-[150px]"
            style={{
              borderRadius: "1000px",
            }}
          >
            {id}
          </SmallPillButton>
        </div>
      </button>
      <button
        className="pl-2 py-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          useAssetSelectorModalStore.setState({
            chainId: id,
            context,
          });
        }}
      >
        <span className={cn(checked ? "text-[#FFFFFF]" : "text-[#3A3A3A]")}>
          {assetsDisplayedText}
        </span>
      </button>
    </div>
  );
};
