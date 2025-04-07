import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

import { ChevronDownIcon } from "@/components/icons/ChevronDown";

import { ChevronUpIcon } from "./icons/ChevronUp";
import { SmallPillButton } from "./SmallPillButton";
import { cn } from "@/utils/ui";
import { Checkbox } from "./Checkbox";
import { useQuery } from "@tanstack/react-query";
import { skipClient } from "@/utils/skipClient";

export const ChainAndAssetFilter = ({
  context,
}: {
  context: "source" | "destination";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState<("evm" | "cosmos" | "svm")[] | "all">("all");

  useEffect(() => {
    if(filter.includes("evm") && filter.includes("cosmos") && filter.includes("svm")) {
      setFilter("all");
    }
  }, [filter]);

  const { data } = useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      return await skipClient.chains();
    },
  })

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
            <SmallPillButton
              className={cn(filter === "all" && "pill-button-active")}
              onClick={() => {
                setFilter("all");
              }}
            >
              All
            </SmallPillButton>
            <SmallPillButton
              className={cn(
                filter.includes("evm") && "pill-button-active"
              )}
              onClick={() => {
                setFilter((prev) =>
                  prev !== "all" && prev.includes("evm")
                    ? prev.filter((f) => f !== "evm")
                    : [...(prev === "all" ? [] : prev), "evm"]
                );
              }}
            >
              EVM
            </SmallPillButton>
            <SmallPillButton
              className={cn(
                filter.includes("cosmos") && "pill-button-active"
              )}
              onClick={() => {
                setFilter((prev) =>
                  prev !== "all" && prev.includes("cosmos")
                    ? prev.filter((f) => f !== "cosmos")
                    : [...(prev === "all" ? [] : prev), "cosmos"]
                );
              }}
            >
              Cosmos
            </SmallPillButton>
            <SmallPillButton
              className={cn(
                filter.includes("svm") && "pill-button-active"
              )}
              onClick={() => {
                setFilter((prev) =>
                  prev !== "all" && prev.includes("svm")
                    ? prev.filter((f) => f !== "svm")
                    : [...(prev === "all" ? [] : prev), "svm"]
                );
              }}
            >
              Solana
            </SmallPillButton>
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
          <div className="h-96 overflow-y-auto flex flex-col gap-0">
            {
            data?.sort(
              (a, b) => a.chainName.localeCompare(b.chainName)
            ).map((chain) => (
              <ChainCheckbox key={chain.chainID} name={chain.chainName} id={chain.chainID} />
            ))
            }
          </div>
          <div className="flex flex-row items-center gap-2">
            <Checkbox onClick={() => {

           }} />
            <span className="text-[#A5A5A5]">Select all in view</span>
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
        <SmallPillButton className="text-[#A5A5A5]">{id}</SmallPillButton>
      </div>

    </button>
  );
};
