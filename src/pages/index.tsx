"use client";
import { Widget } from "@skip-go/widget";
import { debounce } from "lodash";

import { useStudioStore } from "@/store/studio";
import { Card } from "@/components/Card";
import { NetworksAndAssets } from "@/components/sections/ChainAndAssetFilter/NetworksAndAssets";
import { DefaultRoute } from "@/components/sections/DefaultRoute/DefaultRoute";
import { Theming } from "@/components/sections/Theming/Theming";

export default function Studio() {
  const { backgroundColor, theme } = useStudioStore();

  const saveBackgroundColor = debounce((color: string) => {
    useStudioStore.setState({
      backgroundColor: color,
    });
  }, 200);

  return (
    <div
      className="bg-background text-foreground flex h-screen"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div className="flex w-[480px] flex-col justify-between text-white relative">
        <div className="flex flex-col gap-2.5 overflow-y-scroll p-6">
          <Card>
            <h1 className="text-2xl">Get started with skip:go</h1>
            <p>
              Onboard users from anywhere to your app with Skip:Go. Choose a
              starting template, or configure the widget to suit your needs.
            </p>
          </Card>
          <DefaultRoute />
          <NetworksAndAssets />
          <Theming />
        </div>
      </div>

      {/* Right Content */}
      <div className={`flex flex-1 flex-col p-6`}>
        <div className="mb-8 flex justify-between">
          <p>nav</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <Widget disableShadowDom theme={theme} />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
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
  );
}
