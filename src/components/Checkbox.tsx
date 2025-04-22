import { cn } from "@/utils/ui";

export const Checkbox = ({ checked }: { checked?: boolean }) => {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full group-hover:border-[#FFFFFF] border-2 border-[#3A3A3A]",
        checked ? "bg-[#FFFFFF]" : "bg-[#3A3A3A]"
      )}
    />
  );
};
