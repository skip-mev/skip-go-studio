import { AccordionCard } from "@/components/AccordionCard";
import { SelectionButton } from "@/components/buttons/SelectionButton";
import { useAssetsQuery } from "@/hooks/useAssetsQuery";
import { useChainsQuery } from "@/hooks/useChainsQuery";
import { useStudioStore } from "@/store/studio";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { openAssetAndChainSelectorModal } from "@skip-go/widget";

export const DefaultRoute = () => {
  const { defaultRoute } = useStudioStore();
  const { data: chains } = useChainsQuery();
  const { data: assets } = useAssetsQuery();
  console.log("chains", chains);
  console.log("assets", assets);
  console.log("defaultRoute", defaultRoute);
  const srcChain = chains?.find(
    (chain) => chain.chainID === defaultRoute?.srcChainId
  );
  console.log("srcChain", srcChain);
  const destChain = chains?.find(
    (chain) => chain.chainID === defaultRoute?.destChainId
  );
  const srcAsset = srcChain?.chainID
    ? assets?.[srcChain?.chainID].find(
        (asset) => asset.denom === defaultRoute?.srcAssetDenom
      )
    : undefined;
  console.log("srcAsset", srcAsset);
  const destAsset = destChain?.chainID
    ? assets?.[destChain?.chainID].find(
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
                    srcChainId: selected?.chainID,
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
                    destChainId: selected?.chainID,
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
            defaultRoute: undefined,
          });
        }}
        className="justify-self-end self-end text-[#8E8E8E] text-sm"
      >
        Clear
      </button>
    </AccordionCard>
  );
};
