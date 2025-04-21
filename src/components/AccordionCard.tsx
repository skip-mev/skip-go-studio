import { ReactNode, useState } from "react";
import { Card } from "./Card";
import { ChevronDownIcon } from "./icons/ChevronDown";
import { cn } from "@/utils/ui";
import { AnimatePresence, motion } from "motion/react";

export const AccordionCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((v) => !v);
      }}
      className="cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl">{title}</h2>
        <ChevronDownIcon className={cn(!isOpen && "-rotate-90")} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="gap-4 flex flex-col"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
