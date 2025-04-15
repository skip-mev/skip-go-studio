import { useStudioStore } from "@/store/studio";
import { ChevronDownIcon } from "../icons/ChevronDown";
import { cn } from "@/utils/ui";

export const SelectionButton = ({
  isOpen,
  setIsOpen,
  text,
}: {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  text?: string;
}) => {
  const { borderRadius } = useStudioStore();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen?.(!isOpen);
      }}
      className="flex flex-row items-center justify-between px-5 gap-2 bg-[#1D1D1D] h-10 w-44"
      style={{
        borderRadius: borderRadius / 1.5,
      }}
    >
      <span>{text}</span>

      <ChevronDownIcon className={cn(isOpen && "rotate-180")} />
    </button>
  );
};
