import { AccordionCard } from "@/components/AccordionCard";
import { ColorSelection } from "@/components/sections/Theming/ColorSelection";

export const Theming = () => {
  return (
    <AccordionCard title="Theming">
      <p className="text-start">
        Customize the look and feel of your widget to match your brand.
      </p>
      <ColorSelection />
    </AccordionCard>
  );
};
