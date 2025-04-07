import { useStylingStore } from "@/store/styling";
import { cn } from "@/utils/ui";
import { ButtonHTMLAttributes } from "react";

export const SmallPillButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, ...rest } = props;
  const { borderRadius } = useStylingStore();
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
