import { create } from "zustand";
import { defaultTheme, Theme, WidgetProps } from "@skip-go/widget";
import {
  persist,
  subscribeWithSelector,
  type PersistOptions,
} from "zustand/middleware";
import { BridgeType } from "@skip-go/client";

interface StudioStore {
  assetSelectorModalOpen: boolean;
  backgroundColor: string;
  theme: Theme;
  defaultRoute?: WidgetProps["defaultRoute"];
  bridges?: (BridgeType | undefined)[];
  swapVenues?: { chainId: string; name: string }[];
  chainIdsToAddresses?: Record<string, string[]>;
  basisPointsFee?: Record<string, string>;
  allowMultiTx?: boolean;
  erc20UnlimitedApproval?: boolean;
  defaultMaxSlippage?: number;
}

interface SourceNetworkAndAssetsStore {
  sourceSelectedChains?: string[];
  sourceSelectedAssets?: Record<string, string[]>;
}

interface DestinationNetworkAndAssetsStore {
  destinationSelectedChains?: string[];
  destinationSelectedAssets?: Record<string, string[]>;
}

export const studioStoreDefaultValues: StudioStore = {
  assetSelectorModalOpen: false,
  backgroundColor: "#1d1d1d",
  theme: defaultTheme,
  defaultRoute: undefined,
  bridges: undefined,
  swapVenues: undefined,
  chainIdsToAddresses: undefined,
  basisPointsFee: undefined,
  allowMultiTx: true,
  erc20UnlimitedApproval: true,
  defaultMaxSlippage: 1,
};

const studioStorePersistOptions: PersistOptions<StudioStore, StudioStore> = {
  name: "studio-store",
  partialize: (x) => x,
  version: 1,
};

export const useStudioStore = create(
  subscribeWithSelector(
    persist(() => studioStoreDefaultValues, studioStorePersistOptions)
  )
);

export const sourceNetworkAndAssetsStoreDefaultValues = {
  sourceSelectedChains: undefined,
  sourceSelectedAssets: undefined,
};
const sourceNetworkAndAssetsStorePersistOptions: PersistOptions<
  SourceNetworkAndAssetsStore,
  SourceNetworkAndAssetsStore
> = {
  name: "studio-source-store",
  partialize: (x) => x,
  version: 2,
};

export const useSourceNetworkAndAssetsStore = create(
  subscribeWithSelector(
    persist(
      () => sourceNetworkAndAssetsStoreDefaultValues,
      sourceNetworkAndAssetsStorePersistOptions
    )
  )
);

export const destinationNetworkAndAssetsStoreDefaultValues = {
  destinationSelectedChains: undefined,
  destinationSelectedAssets: undefined,
};

const destinationNetworkAndAssetsStorePersistOptions: PersistOptions<
  DestinationNetworkAndAssetsStore,
  DestinationNetworkAndAssetsStore
> = {
  name: "studio-destination-store",
  partialize: (x) => x,
  version: 1,
};

export const useDestinationNetworkAndAssetsStore = create(
  subscribeWithSelector(
    persist(
      () => destinationNetworkAndAssetsStoreDefaultValues,
      destinationNetworkAndAssetsStorePersistOptions
    )
  )
);

export const useAssetSelectorModalStore = create<{
  chainId?: string;
  context?: "source" | "destination";
}>(() => ({
  chainId: undefined,
  context: undefined,
}));
