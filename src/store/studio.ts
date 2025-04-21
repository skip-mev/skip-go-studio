import { create } from "zustand";
import { defaultTheme, Theme, WidgetProps } from "@skip-go/widget"

export const useStudioStore = create<{
  assetSelectorModalOpen: boolean;
  backgroundColor: string;
  borderRadius: number;
  theme: Theme;
  defaultRoute?: WidgetProps["defaultRoute"]
  filter?: WidgetProps["filter"];
  filterOut?: WidgetProps["filterOut"];
}>(() => ({
  assetSelectorModalOpen: false,
  backgroundColor: "#3D3D3D",
  borderRadius: 15,
  theme: defaultTheme,
  defaultRoute: undefined,
  filter: undefined,
  filterOut: undefined,
}));
