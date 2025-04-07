import { useStylingStore } from "@/store/styling";
import { ChevronDownIcon } from "../icons/ChevronDown";
import { ChevronUpIcon } from "../icons/ChevronUp";

export const SelectionButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { borderRadius } = useStylingStore();
  return (
    <button
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="flex flex-row items-center justify-between px-5 gap-2 bg-[#1D1D1D] h-10 w-44"
      style={{
        borderRadius: borderRadius / 1.5,
      }}
    >
      <span>All</span>

      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
  );
};
// 15 / 10 =
//
