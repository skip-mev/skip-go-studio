import { useStudioStore } from "@/store/studio";
import { debounce } from "lodash";
import { ColorIcon } from "../../icons/ColorIcon";
import Sketch from "@uiw/react-color-sketch";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

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
          <Popover className="relative">
            <PopoverButton
              style={{
                borderRadius: borderRadius / 1.5,
              }}
              className="flex flex-row items-center justify-between px-5 gap-2 bg-[#1D1D1D] h-10 w-40"
            >
              <span className="uppercase font-mono">{value}</span>
              <ColorIcon color={value} />
            </PopoverButton>
            <PopoverPanel anchor="top" className="flex flex-col" portal>
              <Sketch
                className="bg-black"
                style={{ marginLeft: 20 }}
                color={value}
                onChange={(color) => {
                  saveColor(color.hexa);
                }}
              />
            </PopoverPanel>
          </Popover>
        </div>
      </div>
    </div>
  );
};
