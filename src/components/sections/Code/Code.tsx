import { useState } from "react";
import { motion } from "motion/react";

export const Code = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className="w-full h-[600px] bg-red-500 absolute z-40 right-6"
      animate={{
        bottom: isOpen ? 24 : -500, // 6 * 4 = 24px for bottom-6
      }}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={() => setIsOpen(!isOpen)}
    />
  );
};
