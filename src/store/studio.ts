import { create } from "zustand";
import { defaultTheme, Theme } from "@skip-go/widget"

export const useStudioStore = create<{
  backgroundColor: string;
  borderRadius: number;
  theme: Theme;
}>(() => ({
  backgroundColor: "#3D3D3D",
  borderRadius: 15,
  theme: defaultTheme,
}));
