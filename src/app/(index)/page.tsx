"use client";
import Image from "next/image";
import { useState } from "react";

import { Result } from "@/types/result";

import { AnswerForm } from "./_components/answer-form";
import { ResultModal } from "./_components/result-modal";
import { UrlForm } from "./_components/url-form";

export default function Page() {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<Result>();

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto px-6 md:px-0 py-8">
      <Image
        src="/image.png"
        width={256}
        height={256}
        alt="Kaitou"
        className="w-32 h-32 rounded-2xl shadow-md"
      />
      <h1 className="text-white font-bold text-2xl mt-4">Kaiotou - 答え合わせアプリ</h1>
      <p className="text-gray-300 text-sm mt-4 w-full">
        PDFの解答例から、選択問題の答え合わせができます。LLM（Genimi-1.5-flash）で解答例を生成しているため精度が良くない場合があります。
      </p>
      <p className="text-gray-300 text-sm mt-4 w-full">
        応用情報技術者試験の解答例では正常に動くことを確認済みです。
      </p>
      <div className="mt-4 w-full">
        <UrlForm url={url} setUrl={setUrl} />
      </div>
      <div className="mt-8 w-full">
        {url && <AnswerForm url={url} handleSetResult={setResult} />}
      </div>
      <ResultModal isOpen={!!result} result={result} handleClose={() => setResult(undefined)} />
    </div>
  );
}
