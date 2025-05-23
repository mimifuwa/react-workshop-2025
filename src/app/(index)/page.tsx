"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Result } from "@/types/result";

import { AnswerForm } from "./_components/answer-form";
import { ResultModal } from "./_components/result-modal";
import { ReturnTopButton } from "./_components/return-top-button";
import { UrlForm } from "./_components/url-form";

export default function Page() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState<string>(searchParams.get("url") ?? "");
  const [result, setResult] = useState<Result>();

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto px-6 py-8 h-full overflow-y-scroll pb-36">
      <Image
        src="/icon.png"
        width={256}
        height={256}
        alt="Saiten"
        className="w-32 h-32 rounded-2xl shadow-md"
      />
      <h1 className="text-white font-bold text-4xl mt-8 mb-6">採点を、しよう。</h1>
      <p className="text-gray-300 text-sm text-left mt-4 w-full">
        PDFの解答例から、選択問題の答え合わせができます。LLM（Gemini-1.5-flash）で解答例を生成しているため精度が良くない場合があります。
      </p>
      <div className="mt-4 w-full">
        <UrlForm url={url} setUrl={setUrl} />
      </div>
      <div className="mt-4 w-full">
        {url && <AnswerForm url={url} result={result} handleSetResult={setResult} />}
      </div>
      <ResultModal
        isOpen={!!result}
        result={result}
        url={url}
        handleClose={() => setResult(undefined)}
      />
      <ReturnTopButton />
    </div>
  );
}
