import { useStudioStore } from "@/store/studio";
import { ChevronDownIcon } from "../icons/ChevronDown";
import { cn } from "@/utils/ui";

export const SelectionButton = ({
  isOpen,
  setIsOpen,
  text,
  children,
}: {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  text?: string;
  children?: React.ReactNode;
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
      {text && <span>{text}</span>}
      {children}
      <ChevronDownIcon className={cn(isOpen && "rotate-180")} />
    </button>
  );
};
