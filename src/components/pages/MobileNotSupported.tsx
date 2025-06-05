// pages/MobileNotSupported.tsx
import React from "react";

export function MobileNotSupportedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="max-w-md text-center bg-black rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">Mobile Not Supported</h1>
        <p className="text-gray-600">
          This app is not yet available on mobile devices. <br />
          Please open it on a desktop browser.
        </p>
      </div>
    </div>
  );
}
