import { AccordionCard } from "@/components/AccordionCard";
import { SelectionButton } from "@/components/buttons/SelectionButton";
import { useAssetsQuery } from "@/hooks/useAssetsQuery";
import { useChainsQuery } from "@/hooks/useChainsQuery";
import { useStudioStore } from "@/store/studio";
import { openAssetAndChainSelectorModal } from "@skip-go/widget";

export const DefaultRoute = () => {
  const { defaultRoute } = useStudioStore();
  const { data: chains } = useChainsQuery();
  const { data: assets } = useAssetsQuery();

  const srcChain = chains?.find(
    (chain) => chain.chainId === defaultRoute?.srcChainId
  );
  const destChain = chains?.find(
    (chain) => chain.chainId === defaultRoute?.destChainId
  );
  const srcAsset = srcChain?.chainId
    ? assets?.[srcChain?.chainId].find(
        (asset) => asset.denom === defaultRoute?.srcAssetDenom
      )
    : undefined;
  const destAsset = destChain?.chainId
    ? assets?.[destChain?.chainId].find(
        (asset) => asset.denom === defaultRoute?.destAssetDenom
      )
    : undefined;
  return (
    <AccordionCard title="Default Route">
      <p className="text-start">
        This route will be selected by default for users.
      </p>
      <div className="flex flex-row justify-between items-center gap-2">
        <SelectionButton
          setIsOpen={() => {
            openAssetAndChainSelectorModal({
              context: "source",
              onSelect: (selected) => {
                useStudioStore.setState((v) => ({
                  defaultRoute: {
                    ...v.defaultRoute,
                    srcChainId: selected?.chainId,
                    srcAssetDenom: selected?.denom,
                  },
                }));
              },
            });
          }}
        >
          {srcChain && srcAsset ? (
            <div className="flex flex-row gap-1 line-clamp-1 items-center">
              <span className="line-clamp-1">{srcAsset.recommendedSymbol}</span>
              <span className="text-[#8E8E8E] line-clamp-1">
                {srcChain.prettyName}
              </span>
            </div>
          ) : (
            <span>Any</span>
          )}
        </SelectionButton>
        <span>to</span>
        <SelectionButton
          setIsOpen={() => {
            openAssetAndChainSelectorModal({
              context: "destination",
              onSelect: (selected) => {
                useStudioStore.setState((v) => ({
                  defaultRoute: {
                    ...v.defaultRoute,
                    destChainId: selected?.chainId,
                    destAssetDenom: selected?.denom,
                  },
                }));
              },
            });
          }}
        >
          {destChain && destAsset ? (
            <div className="flex flex-row gap-1 line-clamp-1 items-center">
              <span className="line-clamp-1">
                {destAsset.recommendedSymbol}
              </span>
              <span className="text-[#8E8E8E] line-clamp-1">
                {destChain.prettyName}
              </span>
            </div>
          ) : (
            <span>Any</span>
          )}
        </SelectionButton>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          useStudioStore.setState({
            defaultRoute: {
              destChainId: undefined,
              destAssetDenom: undefined,
              srcChainId: undefined,
              srcAssetDenom: undefined,
            },
          });
        }}
        className="justify-self-end self-end text-[#8E8E8E] text-sm"
      >
        Clear
      </button>
    </AccordionCard>
  );
};
