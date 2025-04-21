import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { ChevronDownIcon } from "@/components/icons/ChevronDown";
import { SmallPillButton, FilterButton } from "@/components/SmallPillButton";
import { useStudioStore } from "@/store/studio";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const AssetSelection = () => {
  const { borderRadius } = useStudioStore();
  return (
    <Card className="absolute ml-[528px] mt-6 h-[calc(100vh - 24px)]">
      <button className="flex flex-row gap-6 items-center">
        <ChevronDownIcon className="rotate-90" />
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-2xl">Agoric</h2>
          <SmallPillButton
            className="text-[#A5A5A5] font-abcdiatype-mono px-2.5 py-1 line-clamp-1"
            style={{
              borderRadius: "1000px",
            }}
          >
            agoric-3
          </SmallPillButton>
        </div>
      </button>
      <div className="flex flex-row gap-2">
        <FilterButton>Select All</FilterButton>
        <FilterButton>Deselect All</FilterButton>
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
          />
        </div>
      </div>
      <div className="flex flex-col">
        <button className="flex flex-row gap-2 items-center h-9">
          <Checkbox checked={true} />
          <span>USDC</span>
        </button>
        <button className="flex flex-row gap-2 items-center h-9">
          <Checkbox checked={true} />
          <span>USDC</span>
        </button>
        <button className="flex flex-row gap-2 items-center h-9">
          <Checkbox checked={true} />
          <span>USDC</span>
        </button>
      </div>
    </Card>
  );
};
