import { useStudioStore } from "@/store/studio";
import { cn } from "@/utils/ui";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Card = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const { className, ...rest } = props;
  const { theme } = useStudioStore();
  return (
    <div
      className={cn("flex flex-col bg-black w-[480px]", className)}
      style={{
        borderRadius: theme.borderRadius?.main,
      }}
      {...rest}
    />
  );
};
