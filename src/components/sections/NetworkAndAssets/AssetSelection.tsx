import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { ChevronDownIcon } from "@/components/icons/ChevronDown";
import { ColorIcon } from "@/components/icons/ColorIcon";
import { SmallPillButton, FilterButton } from "@/components/SmallPillButton";
import { useAssetsQuery } from "@/hooks/useAssetsQuery";
import { useChainsQuery } from "@/hooks/useChainsQuery";
import {
  useAssetSelectorModalStore,
  useDestinationNetworkAndAssetsStore,
  useSourceNetworkAndAssetsStore,
  useStudioStore,
} from "@/store/studio";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const AssetSelection = () => {
  const { borderRadius } = useStudioStore();
  const { chainId, context } = useAssetSelectorModalStore();
  const [input, setInput] = useState("");

  const { sourceSelectedAssets } = useSourceNetworkAndAssetsStore();
  const { destinationSelectedAssets } = useDestinationNetworkAndAssetsStore();

  const { data: chains } = useChainsQuery();
  const { data: assets, isLoading: isAssetsLoading } = useAssetsQuery();
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedAssets =
    context === "source" ? sourceSelectedAssets : destinationSelectedAssets;

  const setSelectedAssets = useCallback(
    (assets: string[]) => {
      if (!chainId) return;
      if (context === "source") {
        useSourceNetworkAndAssetsStore.setState((v) => ({
          sourceSelectedAssets: {
            ...v.sourceSelectedAssets,
            [chainId]: assets,
          },
        }));
      } else {
        useDestinationNetworkAndAssetsStore.setState((v) => ({
          destinationSelectedAssets: {
            ...v.destinationSelectedAssets,
            [chainId]: assets,
          },
        }));
      }
    },
    [context, chainId]
  );

  const chain = chains?.find((chain) => chain.chainID === chainId);
  const chainAssets = useMemo(() => {
    if (!assets || !chainId) return [];
    return assets[chainId]
      .filter((asset) => {
        if (!asset.recommendedSymbol) return false;
        if (input && !asset.recommendedSymbol.toLowerCase().includes(input)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if ((a.recommendedSymbol || a.denom) < (b.recommendedSymbol || b.denom))
          return -1;
        if ((a.recommendedSymbol || a.denom) > (b.recommendedSymbol || b.denom))
          return 0;
        return 1;
      });
  }, [assets, chainId, input]);

  // Set the selected assets in the store when the component mounts
  useEffect(() => {
    if (
      chain &&
      chainAssets &&
      chainId &&
      selectedAssets?.[chainId] === undefined
    ) {
      const selected = chainAssets.map((asset) => asset.denom);
      setSelectedAssets(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, chainAssets, chainId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        useAssetSelectorModalStore.setState({
          chainId: undefined,
        });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <Card
      className="absolute ml-[528px] mt-6 h-[calc(100vh-48px)] z-10 py-9 px-10 gap-2.5"
      ref={containerRef}
    >
      <button
        className="flex flex-row gap-6 items-center"
        onClick={() => {
          useAssetSelectorModalStore.setState({
            chainId: undefined,
          });
        }}
      >
        <ChevronDownIcon className="rotate-90" />
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-2xl">{chain?.prettyName}</h2>
          <SmallPillButton
            className="text-[#A5A5A5] font-abcdiatype-mono px-2.5 py-1 line-clamp-1"
            style={{
              borderRadius: "1000px",
            }}
          >
            {chain?.chainID}
          </SmallPillButton>
        </div>
      </button>
      {chainAssets && (
        <div className="flex flex-row gap-2">
          <FilterButton
            onClick={() => {
              if (!chainId) return;
              setSelectedAssets(chainAssets.map((asset) => asset.denom));
            }}
          >
            Select All
          </FilterButton>
          <FilterButton
            onClick={() => {
              if (!chainId) return;
              setSelectedAssets([]);
            }}
          >
            Deselect All
          </FilterButton>
          <div
            className="flex w-[136px] flex-row items-center gap-1 bg-[#1D1D1D] px-3 py-1.5 text-[13px]"
            style={{
              borderRadius: borderRadius / 1.5,
            }}
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
            <input
              type="text"
              placeholder="Filter"
              className="w-full bg-[#1D1D1D] focus-visible:border-none focus-visible:outline-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
        </div>
      )}
      {isAssetsLoading && (
        <div className="flex h-96 w-full items-center justify-center">
          <ColorIcon className="animate-spin" color="#A5A5A5" />
        </div>
      )}
      {assets && chainId && (
        <div className="flex flex-col gap-2 overflow-auto">
          {chainAssets?.map((asset) => (
            <button
              key={asset.denom}
              className="flex flex-row gap-2 items-center h-9 group"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!chainId) return;
                const selected = selectedAssets?.[chainId] || [];
                if (selected.includes(asset.denom)) {
                  setSelectedAssets(
                    selected.filter((denom) => denom !== asset.denom)
                  );
                } else {
                  setSelectedAssets([...selected, asset.denom]);
                }
              }}
            >
              <Checkbox
                checked={selectedAssets?.[chainId]?.includes(asset.denom)}
              />
              <span>{asset.recommendedSymbol}</span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};
