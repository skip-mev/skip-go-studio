"use client";
import { Widget } from "@skip-go/widget";
import {
  destinationNetworkAndAssetsStoreDefaultValues,
  sourceNetworkAndAssetsStoreDefaultValues,
  studioStoreDefaultValues,
  useAssetSelectorModalStore,
  useDestinationNetworkAndAssetsStore,
  useSourceNetworkAndAssetsStore,
  useStudioStore,
} from "@/store/studio";
import { Card } from "@/components/Card";
import { NetworksAndAssets } from "@/components/sections/NetworkAndAssets/NetworksAndAssets";
import { DefaultRoute } from "@/components/sections/DefaultRoute/DefaultRoute";
import { Theming } from "@/components/sections/Theming/Theming";
import { AssetSelection } from "@/components/sections/NetworkAndAssets/AssetSelection";
import { useWidgetFilters } from "@/hooks/useWidgetFilters";
import { Bridges } from "@/components/sections/Bridges/Bridges";
import { SwapVenues } from "@/components/sections/SwapVenues/SwapVenues";
import { Affiliates } from "@/components/sections/AffiliateFees/AffiliateFees";
import { useChainIdsToAffiliates } from "@/hooks/useChainIdsToAffiliates";
import { Settings } from "@/components/sections/Settings/Settings";
import { Code } from "@/components/sections/Code/Code";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileNotSupportedPage } from "@/components/pages/MobileNotSupported";
import { BridgeType } from "@skip-go/client";
import { useMemo } from "react";
import { API_URL } from "@/const/api";

export default function Studio() {
  const {
    backgroundColor,
    theme,
    defaultRoute,
    swapVenues,
    bridges,
    erc20UnlimitedApproval,
    defaultMaxSlippage,
    allowMultiTx,
  } = useStudioStore();
  const { chainId } = useAssetSelectorModalStore();

  const filters = useWidgetFilters();
  const chainIdsToAffiliates = useChainIdsToAffiliates();
  const isMobile = useIsMobile();

  const buttonBorderRadius = useMemo(
    () => parseInt(String(theme.borderRadius?.main)) / 1.5,
    [theme.borderRadius?.main]
  );

  const routeConfig = useMemo(
    () => ({
      swapVenues,
      bridges: bridges?.filter(Boolean) as BridgeType[],
      allowMultiTx,
    }),
    [swapVenues, bridges, allowMultiTx]
  );

  const widgetSettings = useMemo(
    () => ({
      slippage: Number(defaultMaxSlippage) <= 0 ? 1 : Number(defaultMaxSlippage),
      useUnlimitedApproval: erc20UnlimitedApproval,
    }),
    [defaultMaxSlippage, erc20UnlimitedApproval]
  );

  if (isMobile) {
    return <MobileNotSupportedPage />;
  }

  return (
    <>
      <div className="relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/checkerboard.png')`,
            backgroundRepeat: "repeat",
          }}
        />
        <div
          className="relative flex h-screen overflow-y-auto"
          style={{
            backgroundColor: `${backgroundColor}E6`, // change to your desired color and alpha
          }}
        >
          <div className="flex flex-col justify-between text-white flex-shrink-0">
            <div className="flex flex-col gap-2.5 p-6">
              <Card className="py-9 px-10 gap-4">
                <h1 className="text-2xl">Get started with skip:go</h1>
                <p>
                  Onboard users from anywhere to your app with Skip:Go.
                  Configure the widget to suit your needs.
                </p>
              </Card>
              <DefaultRoute />
              <NetworksAndAssets />
              <Theming />
              <Bridges />
              <SwapVenues />
              <Affiliates />
              <Settings />
            </div>
          </div>
          {!!chainId && <AssetSelection />}
          {/* Right Content */}
          <div
            className={`flex flex-1 flex-col p-6 sticky top-0 h-screen overflow-hidden`}
          >
            <div className="mb-8 flex justify-end gap-2">
              <div>
                <a
                  href="https://www.npmjs.com/package/@skip-go/widget"
                  target="_blank"
                  className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  style={{
                    borderRadius: buttonBorderRadius,
                  }}
                >
                  Install Skip Go Widget
                </a>
              </div>
              <div>
                <a
                  href="https://discord.com/invite/interchain"
                  target="_blank"
                  className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  style={{
                    borderRadius: buttonBorderRadius,
                  }}
                >
                  Request for whitelist
                </a>
              </div>
              <button
                className="justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                style={{
                  borderRadius: buttonBorderRadius,
                }}
                onClick={() => {
                  useStudioStore.setState(studioStoreDefaultValues);
                  useSourceNetworkAndAssetsStore.setState(
                    sourceNetworkAndAssetsStoreDefaultValues
                  );
                  useDestinationNetworkAndAssetsStore.setState(
                    destinationNetworkAndAssetsStoreDefaultValues
                  );
                }}
              >
                Reset
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center relative overflow-hidden">
              <div className="w-full max-w-md mb-[160px]">
                <Widget
                  theme={theme}
                  apiUrl={API_URL}
                  defaultRoute={defaultRoute}
                  {...filters}
                  routeConfig={routeConfig}
                  settings={widgetSettings}
                  chainIdsToAffiliates={chainIdsToAffiliates}
                />
              </div>
              <Code />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
