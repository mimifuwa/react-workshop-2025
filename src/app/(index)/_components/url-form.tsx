"use client";
import { useState } from "react";

interface UrlFormProps {
  url: string;
  setUrl: (url: string) => void;
}

export function UrlForm({ url, setUrl }: UrlFormProps) {
  const [tmpUrl, setTmpUrl] = useState<string>(url);
  return (
    <>
      <form
        className="w-full py-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (tmpUrl) {
            setUrl(tmpUrl);
          }
        }}
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend">解答例PDFのURLを入力</legend>
          <label className="input validator w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </g>
            </svg>
            <input
              type="search"
              placeholder="https://"
              value={tmpUrl}
              onChange={(e) => setTmpUrl(e.target.value)}
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
              required
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("正しい形式でURLを入力してください。")
              }
            />
          </label>
        </fieldset>
        <button className="btn btn-primary w-full mt-4" type="submit">
          取得
        </button>
      </form>
    </>
  );
}
