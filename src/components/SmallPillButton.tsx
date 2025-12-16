import { useStudioStore } from "@/store/studio";
import { cn } from "@/utils/ui";
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, useMemo } from "react";

export const SmallPillButton = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const { className, onClick, ...rest } = props;
  const { theme } = useStudioStore();

  const borderRadius = useMemo(
    () => parseInt(String(theme.borderRadius?.main)) / 1.5,
    [theme.borderRadius?.main]
  );

  return (
    <div
      className={cn(
        "bg-[#1D1D1D] px-3 py-1.5 text-[13px]",
        !onClick && "!cursor-default",
        className
      )}
      style={{
        borderRadius,
      }}
      onClick={onClick}
      {...rest}
    />
  );
};

export const FilterButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, onClick, ...rest } = props;
  const { theme } = useStudioStore();

  const borderRadius = useMemo(
    () => parseInt(String(theme.borderRadius?.main)) / 1.5,
    [theme.borderRadius?.main]
  );

  return (
    <button
      className={cn("bg-[#1D1D1D] px-2.5 py-1.5 text-[13px]", className)}
      style={{
        borderRadius,
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
