import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { FilterButton, SmallPillButton } from "../../SmallPillButton";
import { cn } from "@/utils/ui";
import { Checkbox } from "../../Checkbox";
import { useStudioStore } from "@/store/studio";
import { ColorIcon } from "../../icons/ColorIcon";
import { matchSorter } from "match-sorter";
import { useChainsQuery } from "@/hooks/useChainsQuery";

export const ChainSelection = ({}: { context: "source" | "destination" }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState<"evm" | "cosmos" | "svm" | "all">("all");

  const { data: chains, isLoading } = useChainsQuery({
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

      {isLoading && (
        <div className="flex h-96 w-full items-center justify-center">
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
    <div
      className="flex flex-row justify-between cursor-default"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setChecked(!checked);
        }}
        className="flex flex-row gap-2 items-center py-2  "
      >
        <div className="flex flex-row gap-2 items-center">
          <Checkbox checked={checked} />
          <span className="capitalize">{name}</span>
          <SmallPillButton
            className="text-[#A5A5A5] font-abcdiatype-mono px-2.5 py-1 line-clamp-1 !cursor-pointer"
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
        }}
      >
        <span>All assets</span>
      </button>
    </div>
  );
};
