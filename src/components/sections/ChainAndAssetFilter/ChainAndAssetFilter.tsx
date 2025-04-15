import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { FilterButton, SmallPillButton } from "../../SmallPillButton";
import { cn } from "@/utils/ui";
import { Checkbox } from "../../Checkbox";
import { useQuery } from "@tanstack/react-query";
import { skipClient } from "@/utils/skipClient";
import { useStudioStore } from "@/store/studio";
import { ColorIcon } from "../../icons/ColorIcon";
import { matchSorter } from "match-sorter";

export const ChainAndAssetFilter = ({}: {
  context: "source" | "destination";
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState<"evm" | "cosmos" | "svm" | "all">("all");

  const { data: chains, isLoading } = useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      return await skipClient.chains({
        includeEVM: true,
        includeSVM: true,
      });
    },
    //sort by chainName
    select: (data) => {
      return matchSorter(
        data.filter((chain) => {
          if (filter === "all") {
            return true;
          } else if (filter === "evm") {
            return chain.chainType === "evm";
          } else if (filter === "cosmos") {
            return chain.chainType === "cosmos";
          } else if (filter === "svm") {
            return chain.chainType === "svm";
          }
          return false;
        }),
        searchInput,
        {
          keys: ["chainName", "chainID"],
          threshold: matchSorter.rankings.CONTAINS,
        }
      );
    },
  });

  const { borderRadius } = useStudioStore();

  return (
    <div className="flex flex-col gap-4 text-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <FilterButton>Select All</FilterButton>
          <FilterButton>Deselect All</FilterButton>
          <FilterButton
            className={cn(filter.includes("evm") && "pill-button-active")}
            onClick={() => {
              setFilter((v) => {
                if (v === "evm") {
                  return "all";
                }
                return "evm";
              });
            }}
          >
            EVM
          </FilterButton>
          <FilterButton
            className={cn(filter.includes("cosmos") && "pill-button-active")}
            onClick={() => {
              setFilter((v) => {
                if (v === "cosmos") {
                  return "all";
                }
                return "cosmos";
              });
            }}
          >
            IBC
          </FilterButton>
          <FilterButton
            className={cn(filter.includes("svm") && "pill-button-active")}
            onClick={() => {
              setFilter((v) => {
                if (v === "svm") {
                  return "all";
                }
                return "svm";
              });
            }}
          >
            Solana
          </FilterButton>
        </div>
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </div>
        {isLoading && (
          <div className="flex h-96 w-full items-center justify-center">
            {/* spinner */}
            <ColorIcon className="animate-spin" color="#A5A5A5" />
          </div>
        )}
        {chains && (
          <div className="h-96 overflow-y-auto contain-strict flex flex-col gap-0">
            {chains.length ? (
              chains.map((chain) => (
                <ChainCheckbox
                  key={chain.chainID}
                  name={chain.chainName}
                  id={chain.chainID}
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
    </div>
  );
};

const ChainCheckbox = ({ name, id }: { name: string; id: string }) => {
  const [checked, setChecked] = useState(false);

  // const { data: assets } = useQuery({
  //   queryKey: ["assets"],
  //   queryFn: async () => {
  //     return await skipClient.assets({
  //       includeCW20Assets: true,
  //       includeEvmAssets: true,
  //       includeSvmAssets: true,
  //     });
  //   },
  //   select: (data) => {
  //     return data[id];
  //   },
  // });

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setChecked(!checked);
        }}
        className="flex flex-row gap-2 items-center py-2 w-full justify-between"
      >
        <div className="flex flex-row gap-2 items-center">
          <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
          <span className="capitalize">{name}</span>
          <SmallPillButton
            className="text-[#A5A5A5] font-abcdiatype-mono px-2.5 py-1 line-clamp-1"
            style={{
              borderRadius: "1000px",
            }}
          >
            {id}
          </SmallPillButton>
        </div>
        <span>All assets</span>
      </button>
    </div>
  );
};
