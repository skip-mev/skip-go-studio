import { create } from "zustand";
import { defaultTheme } from "@skip-go/widget"

export const useStylingStore = create<{
  backgroundColor: string;
  borderRadius: number;
  theme: typeof defaultTheme;
}>(() => ({
  backgroundColor: "#3D3D3D",
  borderRadius: 15,
  theme: defaultTheme,
}));
