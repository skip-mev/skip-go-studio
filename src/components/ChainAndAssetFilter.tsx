import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

import { SmallPillButton } from "./SmallPillButton";
import { cn } from "@/utils/ui";
import { Checkbox } from "./Checkbox";
import { useQuery } from "@tanstack/react-query";
import { skipClient } from "@/utils/skipClient";
import { SelectionButton } from "./buttons/SelectionButton";
import { useStylingStore } from "@/store/styling";
import { useVirtualizer } from "@tanstack/react-virtual";

export const ChainAndAssetFilter = ({
  context,
}: {
  context: "source" | "destination";
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState<"evm" | "cosmos" | "svm" | "all">("all");

  const { data } = useQuery({
    queryKey: ["chains"],
    queryFn: async () => {
      return await skipClient.chains({
        includeEVM: true,
        includeSVM: true,
      });
    },
    //sort by chainName
    select: (data) => {
      return data
        .filter((chain) => {
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
        })
        .filter((chain) =>
          chain.chainName.toLowerCase().includes(searchInput.toLowerCase())
        )
        .sort((a, b) => a.chainName.localeCompare(b.chainName));
    },
  });
  const { borderRadius } = useStylingStore();

  const count = data?.length || 96;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44.22,
    enabled: true,
  });
  const items = virtualizer.getVirtualItems();

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
          {data && (
            <div
              className="h-96 overflow-y-auto contain-strict flex flex-col gap-0"
              ref={parentRef}
            >
              <div
                style={{
                  height: virtualizer.getTotalSize(),
                }}
                className="relative"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${items[0]?.start ?? 0}px)`,
                  }}
                >
                  {data.length ? (
                    items.map((virtualRow) => (
                      <ChainCheckbox
                        key={virtualRow.key}
                        name={data[virtualRow.index]?.chainName}
                        id={data[virtualRow.index]?.chainID}
                        ref={virtualizer.measureElement}
                        data-index={virtualRow.index}
                      />
                    ))
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-sm text-[#A5A5A5]">
                        No chains found
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ChainCheckbox = ({
  name,
  id,
  ref,
}: {
  name: string;
  id: string;
  ref: React.Ref<HTMLButtonElement>;
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className="flex flex-row gap-2 items-center justify-between py-2"
      ref={ref}
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
    </button>
  );
};
