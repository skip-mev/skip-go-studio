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
      className={cn(
        "flex flex-col gap-6 bg-black py-9 px-10 w-[480px]",
        className
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...rest}
    />
  );
};

export const ButtonCard = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  const { className, ...rest } = props;
  const { borderRadius } = useStudioStore();
  return (
    <button
      className={cn(
        "flex flex-col gap-6 bg-black py-9 px-10 w-[480px]",
        className
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...rest}
    />
  );
};
