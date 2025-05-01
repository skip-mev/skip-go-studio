import { create } from "zustand";
import { defaultTheme, Theme, WidgetProps } from "@skip-go/widget";
import { skipClient } from "@/utils/skipClient";

type Unpacked<T> = T extends (infer U)[] ? U : T;

export const useStudioStore = create<{
  assetSelectorModalOpen: boolean;
  backgroundColor: string;
  borderRadius: number;
  theme: Theme;
  defaultRoute?: WidgetProps["defaultRoute"];
  bridges?: Unpacked<Awaited<ReturnType<typeof skipClient.bridges>>>['id'][];
  swapVenues?: { chainId: string, name: string }[];
  chainIdsToAddresses?: Record<string, string[]>;
  basisPointsFee?: Record<string, string>;
  allowMultiTx?: boolean;
  erc20UnlimitedApproval?: boolean;
  defaultMaxSlippage?: number;
}>(() => ({
  assetSelectorModalOpen: false,
  backgroundColor: "#3D3D3D",
  borderRadius: 15,
  theme: defaultTheme,
  defaultRoute: undefined,
  bridges: undefined,
  swapVenues: undefined,
  chainIdsToAddresses: undefined,
  basisPointsFee: undefined,
  allowMultiTx: true,
  erc20UnlimitedApproval: true,
  defaultMaxSlippage: 1,
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
