import { ChainAndAssetFilter } from "./ChainAndAssetFilter";
import { AccordionCard } from "../../AccordionCard";
import { useState } from "react";
import { cn } from "@/utils/ui";
import { useStudioStore } from "@/store/studio";

export const NetworksAndAssets = () => {
  const [context, setContext] = useState<"source" | "destination">("source");
  const { borderRadius } = useStudioStore();
  return (
    <AccordionCard title="Network and Assets">
      <p className="text-start">
        Select the chains and assets you want to support in the widget
      </p>
      <div className="flex flex-row gap-2">
        <button
          className={cn(
            "bg-[#1D1D1D] text-white px-4 py-2 rounded-lg flex-1",
            context === "source" && "bg-white text-black"
          )}
          style={{
            borderRadius: borderRadius / 1.5,
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setContext("source");
          }}
        >
          Sources
        </button>
        <button
          className={cn(
            "bg-[#1D1D1D] text-white px-4 py-2 rounded-lg flex-1",
            context === "destination" && "bg-white text-black"
          )}
          style={{
            borderRadius: borderRadius / 1.5,
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setContext("destination");
          }}
        >
          Destinations
        </button>
      </div>
      <ChainAndAssetFilter context="source" />
    </AccordionCard>
  );
};
