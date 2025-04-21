"use client";
import { useState } from "react";

import { AnswerInput } from "./_components/answer-input";
import { SourceInput } from "./_components/source-input";

export default function Page() {
  const [url, setUrl] = useState<string>("");
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto">
      <SourceInput url={url} setUrl={setUrl} />
      <AnswerInput url={url} />
    </div>
  );
}
