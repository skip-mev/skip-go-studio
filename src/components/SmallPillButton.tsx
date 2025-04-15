import { useStudioStore } from "@/store/studio";
import { cn } from "@/utils/ui";
import { ButtonHTMLAttributes } from "react";

export const SmallPillButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, ...rest } = props;
  const { borderRadius } = useStudioStore();
  return (
    <button
      className={cn("bg-[#1D1D1D] px-3 py-1.5 text-[13px]", className)}
      style={{
        borderRadius: borderRadius / 1.5,
      }}
      {...rest}
    />
  );
};

export const FilterButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, onClick, ...rest } = props;
  const { borderRadius } = useStudioStore();
  return (
    <button
      className={cn("bg-[#1D1D1D] px-2.5 py-1.5 text-[13px]", className)}
      style={{
        borderRadius: borderRadius / 1.5,
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    />
  );
};
