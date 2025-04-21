"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { getAnswerData } from "@/actions/answer";
import type { Answer, Question } from "@/types/question";
import type { Result } from "@/types/result";

interface AnswerFormProps {
  url: string;
  handleSetResult: (result: Result) => void;
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

export function AnswerForm({ url, handleSetResult }: AnswerFormProps) {
  // 正解データ取得
  const { data: answerData, error, isLoading } = useSWR<Answer>(url, () => getAnswerData(url));

  const [input, setInput] = useState<Question[]>([]);

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
    console.log(result);
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
          <table className="w-full">
            <tbody>
              {input.map((item) => (
                <tr key={item.id} className="grid grid-cols-[1fr_10fr] w-full items-center my-2 ">
                  <td className="text-lg text-left w-8">{item.id}</td>
                  <td>
                    <div className={`grid grid-cols-${answerData.options.length} w-full`}>
                      {answerData?.options.map((option) => (
                        <button
                          key={option.id}
                          className={`btn rounded-none border-white
                            ${item.answer === option.id ? "btn-primary" : "btn-outline"}
                            ${option.id === 1 && "rounded-l-md"}
                            ${option.id === answerData.options.length && "rounded-r-md"}`}
                          onClick={() => updateInput(item.id, option.id)}
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
