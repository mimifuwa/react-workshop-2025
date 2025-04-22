"use client";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import { getAnswerData } from "@/actions/answer";
import type { Answer, Question } from "@/types/question";
import type { Result } from "@/types/result";

interface AnswerFormProps {
  url: string;
  result?: Result;
  handleSetResult: (result: Result | undefined) => void;
}

const errorMessage = () => {
  return (
    <div role="alert" className="alert alert-error alert-soft w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>エラーが発生しました。再試行してください。</span>
    </div>
  );
};

const correctSign = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
      color="#605DFF"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="4" />
    </svg>
  );
};

const incorrectSign = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
      color="#FF627D"
    >
      <path strokeLinecap="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export function AnswerForm({ url, result, handleSetResult }: AnswerFormProps) {
  // 正解データ取得
  const { data: answerData, error, isLoading } = useSWR<Answer>(url, () => getAnswerData(url));

  const [input, setInput] = useState<Question[]>([]);

  // 答えは変更されないのでMemo
  const answerMap = useMemo(() => {
    if (!answerData) return new Map<number, number>();
    return new Map(answerData.data.map((item) => [item.id, item.answer]));
  }, [answerData]);

  // 入力時
  const updateInput = (id: number, value: number) => {
    setInput((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newInput = [...prev];
        newInput[index] = {
          ...newInput[index],
          answer: value === newInput[index].answer ? undefined : value,
        };
        return newInput;
      } else {
        return [...prev, { id, answer: value }];
      }
    });
  };

  // 採点
  const checkAnswer = () => {
    const result: Result = {
      correct: input.reduce((count, item) => {
        const answerItem = answerData?.data.find((ans) => ans.id === item.id);
        if (answerItem && answerItem.answer === item.answer) {
          return count + 1;
        }
        return count;
      }, 0),
      total: answerData?.data.length ?? 0,
    };
    handleSetResult(result);
  };

  // 入力データの初期化
  useEffect(() => {
    setInput(
      answerData?.data.map((item) => ({
        id: item.id,
        answer: undefined,
      })) ?? []
    );
  }, [answerData]);

  if (error) {
    return errorMessage();
  }

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center gap-4 py-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
          <div>取得中...</div>
        </div>
      ) : answerData ? (
        <>
          <div role="alert" className="alert alert-info alert-soft w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              {answerData.title || "名称不明の試験"} (全{answerData.data.length}問)
            </span>
          </div>
          <table className="w-full mt-4">
            <tbody>
              {input.map((item) => (
                <tr key={item.id} className="grid grid-cols-[1fr_10fr] w-full items-center my-2 ">
                  <td className="text-xl text-left w-8 font-bold">
                    <div className="relative flex items-center justify-center text-shadow-md">
                      <div className="z-20">{item.id} </div>
                      <div className="absolute text-4xl scale-150 z-10">
                        {result &&
                          (item.answer === answerMap.get(item.id)
                            ? correctSign()
                            : incorrectSign())}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`flex w-full justify-stretch`}>
                      {answerData?.options.map((option) => (
                        <button
                          key={option.id}
                          className={`btn rounded-none border-white
                            ${item.answer === option.id ? "btn-primary" : "btn-outline"}
                            ${option.id === 1 && "rounded-l-md"}
                            ${option.id === answerData.options.length && "rounded-r-md"}`}
                          onClick={() => {
                            updateInput(item.id, option.id);
                            handleSetResult(undefined);
                          }}
                          style={{
                            width: `calc(100% / ${answerData.options.length})`,
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-primary w-full mt-4" onClick={checkAnswer}>
            答え合わせ
          </button>
          <button
            className="btn btn-error btn-outline w-full mt-4"
            type="button"
            onClick={() => setInput((prev) => prev.map((item) => ({ ...item, answer: undefined })))}
          >
            解答をリセット
          </button>
        </>
      ) : (
        errorMessage()
      )}
    </>
  );
}
