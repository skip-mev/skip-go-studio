import { useStudioStore } from "@/store/studio";
import { debounce } from "lodash";
import { ColorIcon } from "../../icons/ColorIcon";

export const ColorSelectionButton = ({
  title,
  onSave,
  value,
}: {
  title: string;
  onSave: (color: string) => void;
  value: string;
}) => {
  const { borderRadius } = useStudioStore();

  const saveColor = debounce((color: string) => {
    onSave(color);
  }, 200);

  return (
    <div className="flex flex-col gap-4 text-lg">
      <div className="flex flex-row items-center justify-between">
        <span className="text-start">{title}</span>
        <div className="flex flex-row gap-4">
          <button
            style={{
              borderRadius: borderRadius / 1.5,
            }}
            className="flex flex-row items-center justify-between px-5 gap-2 bg-[#1D1D1D] h-10 w-40"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const input = document.getElementById(title) as HTMLInputElement;
              if (input) {
                input.click();
              }
            }}
          >
            <span className="uppercase font-mono">{value}</span>
            <ColorIcon color={value} />
            <input
              id={title}
              className="invisible w-4 absolute"
              type="color"
              onChange={(e) => {
                saveColor(e.target.value);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={value}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
