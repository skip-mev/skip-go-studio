import { AccordionCard } from "@/components/AccordionCard";
import { Checkbox } from "@/components/Checkbox";
import { ColorIcon } from "@/components/icons/ColorIcon";
import { useBridgesQuery } from "@/hooks/useBridgesQuery";
import { useStudioStore } from "@/store/studio";

export const Bridges = () => {
  const { data: bridges, isLoading } = useBridgesQuery();
  const store = useStudioStore();

  return (
    <AccordionCard title="Bridges">
      <p className="text-start">
        Select the bridges you want to support in your widget.
      </p>
      {isLoading && (
        <div className="flex h-96 w-full items-center justify-center">
          <ColorIcon className="animate-spin" color="#A5A5A5" />
        </div>
      )}
      {bridges && (
        <div className="h-96 overflow-y-auto flex flex-col gap-2">
          {bridges
            ?.sort((a, b) =>
              (a.name?.toLowerCase() || "").localeCompare(
                b.name?.toLowerCase() || ""
              )
            )
            .map((bridge) => (
              <button
                key={bridge.id}
                className="flex flex-row gap-2 items-center h-9 group"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (
                    store.bridges &&
                    store.bridges.length === bridges.length
                  ) {
                    useStudioStore.setState({
                      bridges: undefined,
                    });
                  }
                  if (store.bridges) {
                    useStudioStore.setState({
                      bridges: store.bridges.includes(bridge.id)
                        ? store.bridges.filter((b) => b !== bridge.id)
                        : [...store.bridges, bridge.id],
                    });
                  } else {
                    useStudioStore.setState({
                      bridges: bridges
                        .map((b) => b.id)
                        .filter((b) => b !== bridge.id),
                    });
                  }
                }}
              >
                <Checkbox
                  checked={
                    store.bridges ? store.bridges.includes(bridge.id) : true
                  }
                />
                <span>{bridge.name}</span>
              </button>
            ))}
        </div>
      )}
    </AccordionCard>
  );
};
