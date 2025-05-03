"use client";
import { Widget } from "@skip-go/widget";
import { debounce } from "lodash";
import { useAssetSelectorModalStore, useStudioStore } from "@/store/studio";
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
    borderRadius,
  } = useStudioStore();
  const { chainId } = useAssetSelectorModalStore();
  const saveBackgroundColor = debounce((color: string) => {
    useStudioStore.setState({
      backgroundColor: color,
    });
  }, 200);

  const filters = useWidgetFilters();
  const chainIdsToAffiliates = useChainIdsToAffiliates();

  return (
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
                Onboard users from anywhere to your app with Skip:Go. Choose a
                starting template, or configure the widget to suit your needs.
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
          <div className="mb-8 flex justify-end">
            <div>
              <a
                href="https://www.npmjs.com/package/@skip-go/widget"
                target="_blank"
                className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                style={{
                  borderRadius: borderRadius / 1.5,
                }}
              >
                Install Skip Go Widget
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-md">
              <Widget
                theme={theme}
                defaultRoute={defaultRoute}
                {...filters}
                routeConfig={{
                  swapVenues,
                  bridges,
                  allowMultiTx,
                }}
                settings={{
                  slippage:
                    Number(defaultMaxSlippage) <= 0
                      ? 1
                      : Number(defaultMaxSlippage),
                  useUnlimitedApproval: erc20UnlimitedApproval,
                }}
                chainIdsToAffiliates={chainIdsToAffiliates}
              />
            </div>
            <Code />
          </div>

          <div className="mt-4 flex justify-end mr-6">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span>Background</span>
              <div className="h-6 w-6 cursor-pointer overflow-hidden rounded-full border border-zinc-600">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => saveBackgroundColor(e.target.value)}
                  className="cursor-pointer border-none opacity-0 outline-none"
                  style={{
                    backgroundColor: backgroundColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
