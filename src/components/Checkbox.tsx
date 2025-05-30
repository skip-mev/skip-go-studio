import { cn } from "@/utils/ui";

export const Checkbox = ({ checked }: { checked?: boolean }) => {
  return (
    <div className="inline-flex items-center">
      <div
        className={cn(
          "w-8 h-5 flex items-center rounded-full px-0.5 transition-colors duration-300",
          checked ? "bg-green-500" : "bg-red-500"
        )}
      >
        <div
          className={cn(
            "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300",
            checked ? "translate-x-[12px]" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
};