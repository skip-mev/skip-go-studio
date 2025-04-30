import { AccordionCard } from "@/components/AccordionCard";
import { Checkbox } from "@/components/Checkbox";
import { ColorIcon } from "@/components/icons/ColorIcon";
import { SmallPillButton } from "@/components/SmallPillButton";
import { useSwapVenuesQuery } from "@/hooks/useSwapVenues";
import { useStudioStore } from "@/store/studio";

export const SwapVenues = () => {
  const { data: swapVenues, isLoading } = useSwapVenuesQuery();
  const store = useStudioStore();

  return (
    <AccordionCard title="Swap Venues">
      <p className="text-start">
        Select the Swap venues you want to support in your widget.
      </p>
      {isLoading && (
        <div className="flex h-96 w-full items-center justify-center">
          <ColorIcon className="animate-spin" color="#A5A5A5" />
        </div>
      )}
      {swapVenues && (
        <div className="h-96 overflow-y-auto contain-strict flex flex-col gap-0">
          {swapVenues
            ?.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            )
            .map((swapVenue) => (
              <button
                key={swapVenue.name}
                className="flex flex-row gap-2 items-center group py-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (
                    store.swapVenues &&
                    store.swapVenues.length === swapVenues.length
                  ) {
                    useStudioStore.setState({
                      swapVenues: undefined,
                    });
                  }
                  if (store.swapVenues) {
                    useStudioStore.setState({
                      swapVenues: store.swapVenues
                        .map((i) => i.name)
                        .includes(swapVenue.name)
                        ? store.swapVenues.filter(
                            (s) => s.name !== swapVenue.name
                          )
                        : [
                            ...store.swapVenues,
                            {
                              chainId: swapVenue.chainID,
                              name: swapVenue.name,
                            },
                          ],
                    });
                  } else {
                    useStudioStore.setState({
                      swapVenues: swapVenues
                        .filter((s) => s.name !== swapVenue.name)
                        .map((s) => ({ chainId: s.chainID, name: s.name })),
                    });
                  }
                }}
              >
                <Checkbox
                  checked={
                    store.swapVenues
                      ? store.swapVenues
                          .map((i) => i.name)
                          .includes(swapVenue.name)
                      : true
                  }
                />
                <span>{swapVenue.name}</span>
                <SmallPillButton
                  className="text-[#A5A5A5] font-abcdiatype-mono px-2.5 py-1 line-clamp-1 !cursor-pointer max-w-[150px]"
                  style={{
                    borderRadius: "1000px",
                  }}
                >
                  {swapVenue.chainID}
                </SmallPillButton>
              </button>
            ))}
        </div>
      )}
    </AccordionCard>
  );
};
