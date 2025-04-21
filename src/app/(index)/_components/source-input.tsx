"use client";
import { useState } from "react";

interface SourceInputProps {
  url: string;
  setUrl: (url: string) => void;
}

export function SourceInput({ url, setUrl }: SourceInputProps) {
  const [tmpUrl, setTmpUrl] = useState<string>(url);
  return (
    <>
      <div className="w-full py-4">
        <input
          type="text"
          placeholder="URLを入力"
          className="input w-full"
          value={tmpUrl}
          onChange={(e) => setTmpUrl(e.target.value)}
        />
        <button
          className="btn btn-primary w-full mt-4"
          onClick={() => {
            if (tmpUrl) {
              setUrl(tmpUrl);
            }
          }}
        >
          取得
        </button>
      </div>
    </>
  );
}
