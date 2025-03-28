"use client";
import { Widget } from "@skip-go/widget";
import { debounce } from "lodash";
import { useState } from "react";

import { ChainAndAssetFilter } from "@/components/ChainAndAssetFilter";
import { SkipGoIcon } from "@/components/icons/SkipGo";

export default function Studio() {
  const [backgroundColor, setBackgroundColor] = useState("#242A30");

  const saveBackgroundColor = debounce((color: string) => {
    setBackgroundColor(color);
  }, 200);

  return (
    <div className="studio bg-background text-foreground flex h-screen">
      {/* Left Sidebar */}
      <div className="flex w-4/12 flex-col justify-between bg-black p-6 text-white">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">Get started with skip:go</h1>
            <p>
              Onboard users from anywhere to your app with Skip:Go. Choose a starting template, or configure the widget
              to suit your needs.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <ChainAndAssetFilter context="source" />
            <ChainAndAssetFilter context="destination" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <SkipGoIcon />
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline size-0.5 fill-current"
          >
            <circle
              r={1}
              cx={1}
              cy={1}
            />
          </svg>
          <div className="text-zinc-400">Docs • Github • Discord</div>
        </div>
      </div>

      {/* Right Content */}
      <div
        className={`flex flex-1 flex-col p-6`}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div className="mb-8 flex justify-between">
          <p>nav</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <Widget
              disableShadowDom
              filter={{
                source: {
                  "cosmoshub-4": ["uatom"],
                },
              }}
            />
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
