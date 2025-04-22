import { create } from "zustand";
import { defaultTheme, Theme, WidgetProps } from "@skip-go/widget";

export const useStudioStore = create<{
  assetSelectorModalOpen: boolean;
  backgroundColor: string;
  borderRadius: number;
  theme: Theme;
  defaultRoute?: WidgetProps["defaultRoute"];
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

export const useSourceNetworkAndAssetsStore = create<{
  sourceSelectedChains?: string[];
  sourceSelectedAssets?: Record<string, string[]>;
}>(() => ({
  sourceSelectedChains: undefined,
  sourceSelectedAssets: undefined,
}));

export const useDestinationNetworkAndAssetsStore = create<{
  destinationSelectedChains?: string[];
  destinationSelectedAssets?: Record<string, string[]>;
}>(() => ({
  destinationSelectedChains: undefined,
  destinationSelectedAssets: undefined,
}));

export const useAssetSelectorModalStore = create<{
  chainId?: string;
  context?: "source" | "destination";
}>(() => ({
  chainId: undefined,
  context: undefined,
}))
