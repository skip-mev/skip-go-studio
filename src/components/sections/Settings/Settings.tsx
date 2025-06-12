import { AccordionCard } from "@/components/AccordionCard";
import { Checkbox } from "@/components/Checkbox";
import { useStudioStore } from "@/store/studio";

export const Settings = () => {
  const { theme, allowMultiTx, erc20UnlimitedApproval, defaultMaxSlippage } =
    useStudioStore();
  return (
    <AccordionCard title="Settings">
      <p className="text-start">
        Configure the widget settings to suit your needs.
      </p>
      <button
        onClick={() => {
          useStudioStore.setState({
            allowMultiTx: !allowMultiTx,
          });
        }}
        className="flex flex-row justify-between"
      >
        <span>Allow multi tx</span>
        <Checkbox checked={allowMultiTx} />
      </button>
      <button
        onClick={() => {
          useStudioStore.setState({
            erc20UnlimitedApproval: !erc20UnlimitedApproval,
          });
        }}
        className="flex flex-row justify-between"
      >
        <span>ERC 20 unlimited approval</span>
        <Checkbox checked={erc20UnlimitedApproval} />
      </button>
      <div className="flex flex-row justify-between">
        <span>Default max slippage</span>
        <div
          className="flex w-30 flex-row items-center gap-1 bg-[#1D1D1D] px-3 py-1.5 text-[13px]"
          style={{
            borderRadius: parseInt(String(theme.borderRadius?.main)) / 1.5,
          }}
        >
          <input
            type="number"
            placeholder="1"
            className="w-full font-abcdiatype-mono bg-[#1D1D1D] focus-visible:border-none focus-visible:outline-none"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            value={defaultMaxSlippage}
            onChange={(e) => {
              let value = e.target.value;
              if (Number(value) < 0) {
                value = String(Number(e.target.value) * -1);
              }
              useStudioStore.setState({
                defaultMaxSlippage: Number(value),
              });
            }}
          />
          <span className="text-sm text-zinc-400">%</span>
        </div>
      </div>
    </AccordionCard>
  );
};
