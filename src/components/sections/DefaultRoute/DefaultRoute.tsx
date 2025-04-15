import { AccordionCard } from "@/components/AccordionCard";
import { SelectionButton } from "@/components/buttons/SelectionButton";
import { openAssetAndChainSelectorModal } from "@skip-go/widget";

export const DefaultRoute = () => {
  return (
    <AccordionCard title="Default Route">
      <p className="text-start">
        This route will be selected by default for users.
      </p>
      <div className="flex flex-row justify-between items-center gap-2">
        <SelectionButton
          setIsOpen={() => {
            openAssetAndChainSelectorModal({
              context: "source",
              onSelect: (selected) => {
                console.log("Selected source:", selected);
              },
            });
          }}
          text="Any"
        />
        <span>to</span>
        <SelectionButton
          setIsOpen={() => {
            openAssetAndChainSelectorModal({
              context: "destination",
              onSelect: (selected) => {
                console.log("Selected destination:", selected);
              },
            });
          }}
          text="Any"
        />
      </div>
    </AccordionCard>
  );
};
