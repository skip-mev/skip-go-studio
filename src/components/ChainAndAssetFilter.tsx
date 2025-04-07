import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { SmallPillButton } from "./SmallPillButton";
import { cn } from "@/utils/ui";
import { Checkbox } from "./Checkbox";
import { useQuery } from "@tanstack/react-query";
import { skipClient } from "@/utils/skipClient";
import { SelectionButton } from "./buttons/SelectionButton";
import { useStylingStore } from "@/store/styling";

export const ChainAndAssetFilter = ({
  context,
}: {
  context: "source" | "destination";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState<"evm" | "cosmos" | "svm" | "all">("all");

  const { data } = useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      return await skipClient.chains();
    },
  });

  const { borderRadius } = useStylingStore();

  return (
    <div className="flex flex-col gap-4 text-lg">
      <div className="flex flex-row items-center justify-between">
        <span>Filter {context}s</span>
        <div className="flex flex-row gap-4">
          <SelectionButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <SmallPillButton
              className={cn(filter === "all" && "pill-button-active")}
              onClick={() => {
                setFilter("all");
              }}
            >
              All
            </SmallPillButton>
            <SmallPillButton
              className={cn(filter.includes("evm") && "pill-button-active")}
              onClick={() => {
                setFilter("evm");
              }}
            >
              EVM
            </SmallPillButton>
            <SmallPillButton
              className={cn(filter.includes("cosmos") && "pill-button-active")}
              onClick={() => {
                setFilter("cosmos");
              }}
            >
              Cosmos
            </SmallPillButton>
            <SmallPillButton
              className={cn(filter.includes("svm") && "pill-button-active")}
              onClick={() => {
                setFilter("svm");
              }}
            >
              Solana
            </SmallPillButton>
            <div
              className="flex w-full flex-row items-center gap-1 bg-[#1D1D1D] px-3 py-1.5 text-[13px]"
              style={{
                borderRadius: borderRadius / 1.5,
              }}
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#1D1D1D] focus-visible:border-none focus-visible:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="h-96 overflow-y-auto flex flex-col gap-0 relative">
            {data
              ?.sort((a, b) => a.chainName.localeCompare(b.chainName))
              .map((chain) => (
                <ChainCheckbox
                  key={chain.chainID}
                  name={chain.chainName}
                  id={chain.chainID}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ChainCheckbox = ({ name, id }: { name: string; id: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className="flex flex-row gap-2 items-center justify-between py-2"
    >
      <div className="flex flex-row gap-2 items-center">
        <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
        <span>{name}</span>
        <SmallPillButton
          className="text-[#A5A5A5] font-abcdiatype-mono px-2.5 py-1 line-clamp-1"
          style={{
            borderRadius: "1000px",
          }}
        >
          {id}
        </SmallPillButton>
      </div>
    </button>
  );
};
