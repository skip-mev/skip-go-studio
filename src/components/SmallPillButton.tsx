
import { cn } from "@/utils/ui";
import { ButtonHTMLAttributes } from "react";

export const SmallPillButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {className, ...rest} = props;
  return (
    <button
      className={cn("rounded-full bg-[#1D1D1D] px-3 py-1.5 text-[13px]", className)}
      {...rest}
    />
  );
};
