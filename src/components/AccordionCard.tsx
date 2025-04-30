import { ReactNode, useState } from "react";
import { Card } from "./Card";
import { ChevronDownIcon } from "./icons/ChevronDown";
import { cn } from "@/utils/ui";
import { AnimatePresence, motion } from "motion/react";

export const AccordionCard = ({
  title,
  children,
  onClick,
}: {
  title: string;
  children: ReactNode;
  onClick?: (isOpen: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <div
        className="flex flex-row items-center justify-between py-9 px-10 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((v) => !v);
          onClick?.(isOpen);
        }}
      >
        <h2 className="text-2xl">{title}</h2>
        <ChevronDownIcon className={cn(!isOpen && "-rotate-90")} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="gap-6 px-10 flex flex-col select-none overflow-hidden"
          >
            {children}
            <div className="h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
