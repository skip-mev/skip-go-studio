import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { ChevronDownIcon } from "@/components/icons/ChevronDown";

import { ChevronUpIcon } from "./icons/ChevronUp";
import { SmallPillButton } from "./SmallPillButton";
import { cn } from "@/utils/ui";

export const ChainAndAssetFilter = ({
  context,
}: {
  context: "source" | "destination";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <span>Available {context}s</span>
        <div className="flex flex-row gap-4">
          <div className="flex h-10 w-32 items-center justify-center rounded-full bg-[#1D1D1D]">
            <span>All</span>
          </div>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <SmallPillButton>All</SmallPillButton>
            <SmallPillButton>EVM</SmallPillButton>
            <SmallPillButton>Cosmos</SmallPillButton>
            <SmallPillButton>Solana</SmallPillButton>
            <div className="flex w-full flex-row items-center gap-1 rounded-full bg-[#1D1D1D] px-3 py-1.5 text-[13px]">
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
          <ChainCheckbox name="Agoric" id="agoric-3" />
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
      className="flex flex-row gap-2 items-center justify-between"
    >
      <div className="flex flex-row gap-2 items-center">
        <button
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            checked ? "bg-[#FF66FF]" : "bg-[#3A3A3A]"
          )}
        >
          {checked && <div className="w-2 h-2 bg-black" />}
        </button>
        <span>{name}</span>
        <SmallPillButton className="text-[#A5A5A5]">{id}</SmallPillButton>
      </div>

      <span className="text-[#A5A5A5] text-sm">cosmos</span>
    </button>
  );
};
