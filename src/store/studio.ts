import { create } from "zustand";
import { defaultTheme, Theme, WidgetProps } from "@skip-go/widget"

export const useStudioStore = create<{
  backgroundColor: string;
  borderRadius: number;
  theme: Theme;
  defaultRoute?: WidgetProps["defaultRoute"]
}>(() => ({
  backgroundColor: "#3D3D3D",
  borderRadius: 15,
  theme: defaultTheme,
  defaultRoute: undefined,
}));
