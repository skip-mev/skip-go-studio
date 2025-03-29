import { cn } from "@/utils/ui";

export const Checkbox = ({ checked, onClick }: { checked?: boolean, onClick: () => void }) => {
  return (
    <button
      className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center",
        checked ? "bg-[#FF66FF]" : "bg-[#3A3A3A]"
      )}
      onClick={onClick}
    >
      {checked && <div className="w-2 h-2 bg-black" />}
    </button>
  );
};
