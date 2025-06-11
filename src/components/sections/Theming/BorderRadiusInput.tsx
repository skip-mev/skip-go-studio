import { useStudioStore } from "@/store/studio";

export const BorderRadiusInput = ({
  title,
  onSave,
  value,
}: {
  title: string;
  onSave: (color: number) => void;
  value?: string | number;
}) => {
  const { borderRadius } = useStudioStore();
  return (
    <div className="flex flex-col gap-4 text-lg">
      <div className="flex flex-row items-center justify-between">
        <span className="text-start">{title}</span>
        <div className="flex flex-row gap-4">
          <div
            className="flex w-30 flex-row items-center gap-1 bg-[#1D1D1D] px-3 py-1.5 text-[13px]"
            style={{
              borderRadius: borderRadius / 1.5,
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
              value={parseInt(String(value))}
              onChange={(e) => {
                let value = e.target.value;
                if (Number(value) < 0) {
                  value = String(Number(e.target.value) * -1);
                }
                onSave(Number(value));
              }}
            />
            <span className="text-sm text-zinc-400">px</span>
          </div>
        </div>
      </div>
    </div>
  );
};
