"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

export function QrCode({ url }: { url: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const currentLocation = window.location.href.split("?")[0];
  const qrCodeUrl = `${currentLocation}?url=${encodedUrl}`;

  const toggleQrCode = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 w-full">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-white font-bold text-xl">QRコード</h2>
        <button
          onClick={toggleQrCode}
          className="text-white bg-gray-700 hover:bg-gray-600 focus:outline-none rounded-lg px-3 py-1 text-sm"
        >
          {isOpen ? "▼ 閉じる" : "▶ 開く"}
        </button>
      </div>

      {isOpen && (
        <>
          <p className="text-gray-300 text-sm text-left mt-4 w-full">
            このQRコードを読み込むと、同じ解答PDFのURLが自動で入力されます。
          </p>
          <div className="mt-4 w-full flex justify-center bg-gray-600 p-4 rounded-lg shadow-md">
            <QRCode value={qrCodeUrl} size={256} />
          </div>
        </>
      )}
    </div>
  );
}
