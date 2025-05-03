import { AccordionCard } from "@/components/AccordionCard";
import { useChainsQuery } from "@/hooks/useChainsQuery";
import { useSwapVenuesQuery } from "@/hooks/useSwapVenues";
import { Chain } from "@skip-go/client";
import { useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useStudioStore } from "@/store/studio";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/20/solid";

export const Affiliates = () => {
  const { data: chains } = useChainsQuery();
  const { data: swapVenues } = useSwapVenuesQuery();
  const { chainIdsToAddresses, borderRadius, basisPointsFee } =
    useStudioStore();
  const swapVenuesChains = useMemo(() => {
    const chainIds = [
      ...new Set(swapVenues?.map((swapVenue) => swapVenue.chainID)),
    ];
    return chainIds
      .map((c) => {
        const chain = chains?.find((chain) => chain.chainID === c);
        return chain;
      })
      .filter(Boolean) as Chain[];
  }, [chains, swapVenues]);

  // const [addresses, setAddresses] = useState<Record<string, string[]>>({});

  const handleAddressChange = (
    chainId: string,
    value: string,
    index: number
  ) => {
    useStudioStore.setState((prev) => {
      const data = prev.chainIdsToAddresses
        ? { ...prev.chainIdsToAddresses }
        : {};
      if (data[chainId]) {
        data[chainId][index] = value;
      } else {
        data[chainId] = [value];
      }
      return {
        chainIdsToAddresses: data,
      };
    });
  };

  return (
    <AccordionCard title="Affiliate Fees">
      <p className="text-start">Earn affiliate fees on swaps.</p>
      <ChainSelection
        chains={swapVenuesChains}
        onSelect={(c) => {
          useStudioStore.setState((prev) => {
            const data = prev.chainIdsToAddresses
              ? { ...prev.chainIdsToAddresses }
              : {};
            if (data[c]) {
              return {};
            }
            data[c] = [""];
            const bps = prev.basisPointsFee ? { ...prev.basisPointsFee } : {};
            if (bps[c]) {
              return {};
            }
            bps[c] = "";

            return {
              chainIdsToAddresses: data,
              basisPointsFee: bps,
            };
          });
        }}
      />
      {chainIdsToAddresses && (
        <div className="flex flex-col gap-4">
          {Object.entries(chainIdsToAddresses || {}).map(
            ([chainId, addresses]) => {
              const chain = chains?.find((chain) => chain.chainID === chainId);
              const placeholder = (() => {
                if (chain?.chainType === "cosmos") {
                  return `${chain?.bech32Prefix}...`;
                }
                if (chain?.chainType === "evm") {
                  return "0x...";
                }
                return "Input address";
              })();

              return (
                <div key={chain?.chainID} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 ">
                    <div className="flex flex-row gap-2 w-full items-center justify-between">
                      <span className="text-lg">{chain?.prettyName}</span>
                      <button
                        onClick={() => {
                          useStudioStore.setState((prev) => {
                            const data = prev.chainIdsToAddresses
                              ? { ...prev.chainIdsToAddresses }
                              : {};
                            delete data[chainId];
                            return {
                              chainIdsToAddresses: data,
                            };
                          });
                        }}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {swapVenues
                        ?.filter((s) => s.chainID === chainId)
                        .map((i) => (
                          <span
                            className="text-[#A5A5A5] font-abcdiatype-mono text-sm"
                            style={{
                              borderRadius: "1000px",
                            }}
                            key={i.name}
                          >
                            {i.name}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row justify-between items-center">
                        <span className="text-[#A5A5A5] text-sm">
                          Basis point fee
                        </span>
                        <a
                          href="https://docs.skip.build/go/widget/configuration#chainidstoaffiliates"
                          target="_blank"
                        >
                          <InformationCircleIcon className="h-4 w-4" />
                        </a>
                      </div>
                      <div
                        className="flex w-full flex-row items-center gap-1 bg-[#1D1D1D] px-3 py-1.5 text-[13px]"
                        style={{
                          borderRadius: borderRadius / 1.5,
                        }}
                      >
                        <input
                          type="number"
                          placeholder={"75"}
                          className="w-full bg-[#1D1D1D] focus-visible:border-none focus-visible:outline-none font-abcdiatype-mono"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          value={
                            basisPointsFee && basisPointsFee[chainId]
                              ? basisPointsFee[chainId]
                              : ""
                          }
                          onChange={(e) => {
                            useStudioStore.setState((prev) => {
                              const data = prev.basisPointsFee
                                ? { ...prev.basisPointsFee }
                                : {};
                              if (data[chainId]) {
                                data[chainId] = e.target.value;
                              } else {
                                data[chainId] = e.target.value;
                              }
                              return {
                                basisPointsFee: data,
                              };
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row justify-between items-center">
                        <span className="text-[#A5A5A5] text-sm">Address</span>
                        <button
                          onClick={() => {
                            useStudioStore.setState((prev) => {
                              const data = prev.chainIdsToAddresses
                                ? { ...prev.chainIdsToAddresses }
                                : {};
                              if (data[chainId]) {
                                data[chainId].push("");
                              } else {
                                data[chainId] = [""];
                              }
                              return {
                                chainIdsToAddresses: data,
                              };
                            });
                          }}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-2">
                        {addresses.map((item, index) => (
                          <div key={index} className="flex flex-row gap-2">
                            <div
                              className="flex w-full flex-row items-center gap-1 bg-[#1D1D1D] px-3 py-1.5 text-[13px]"
                              style={{
                                borderRadius: borderRadius / 1.5,
                              }}
                            >
                              <input
                                type="text"
                                placeholder={placeholder}
                                className="w-full bg-[#1D1D1D] focus-visible:border-none focus-visible:outline-none"
                                value={item}
                                onChange={(e) => {
                                  handleAddressChange(
                                    chainId,
                                    e.target.value,
                                    index
                                  );
                                }}
                              />
                            </div>
                            <button
                              onClick={() => {
                                if (
                                  chainIdsToAddresses &&
                                  chainIdsToAddresses[chainId]?.length > 1
                                ) {
                                  useStudioStore.setState((prev) => {
                                    const data = prev.chainIdsToAddresses
                                      ? { ...prev.chainIdsToAddresses }
                                      : {};
                                    data[chainId].splice(index, 1);
                                    return {
                                      chainIdsToAddresses: data,
                                    };
                                  });
                                } else {
                                  useStudioStore.setState((prev) => {
                                    const data = prev.chainIdsToAddresses
                                      ? { ...prev.chainIdsToAddresses }
                                      : {};
                                    delete data[chainId];
                                    return {
                                      chainIdsToAddresses: data,
                                    };
                                  });
                                }
                              }}
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </AccordionCard>
  );
};

const ChainSelection = ({
  chains,
  onSelect,
}: {
  chains?: Chain[];
  onSelect: (chainId: string) => void;
}) => {
  return (
    <Menu
      as="div"
      className="relative"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
        Add
      </MenuButton>

      <MenuItems
        anchor="right end"
        transition
        portal={true}
        className="absolute right-0 z-10 mt-2 ml-4 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {chains?.map((chain) => (
            <MenuItem key={chain.chainID}>
              <button
                onClick={() => onSelect(chain.chainID)}
                className="block w-full px-4 py-2 text-left text-sm data-focus:bg-gray-10 data-focus:font-semibold"
              >
                {chain.prettyName}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};
