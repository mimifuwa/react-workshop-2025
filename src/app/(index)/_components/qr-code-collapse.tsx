"use client";
import QRCode from "react-qr-code";

export function QrCodeCollapse({ url }: { url: string }) {
  const qrCodeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}?url=${encodeURIComponent(url)}`;

  return (
    <>
      <details className="collapse border mt-8">
        <summary className="collapse-title font-semibold">QRコードで問題を共有</summary>
        <div className="collapse-content text-sm ">
          <div className="mx-auto pb-4">
            <QRCode value={qrCodeUrl} size={256} className="mx-auto p-4 bg-white rounded-lg" />
          </div>
        </div>
      </details>
    </>
  );
}
