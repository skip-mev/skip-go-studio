import { useStudioStore } from "@/store/studio";
import { cn } from "@/utils/ui";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Card = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const { className, ...rest } = props;
  const { borderRadius } = useStudioStore();
  return (
    <div
      className={cn("flex flex-col bg-black w-[480px]", className)}
      style={{
        borderRadius: borderRadius,
      }}
      {...rest}
    />
  );
};
