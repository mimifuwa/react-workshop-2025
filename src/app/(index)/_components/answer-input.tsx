"use client";
import { useEffect, useState } from "react";

import { getAnswerData } from "@/actions/answer";
import type { Answer, Question } from "@/types/question";

interface AnswerInputProps {
  url: string;
}

export function AnswerInput({ url }: AnswerInputProps) {
  const [answerData, setAnswerData] = useState<Answer>();
  const [loading, setLoading] = useState<boolean>(true);

  const [input, setInput] = useState<Question[]>([]);
  const [correctCount, setCorrectCount] = useState<number>();

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

  const checkAnswer = () => {
    const correctCount = input.reduce((count, item) => {
      const answerItem = answerData?.data.find((ans) => ans.id === item.id);
      if (answerItem && answerItem.answer === item.answer) {
        return count + 1;
      }
      return count;
    }, 0);
    setCorrectCount(correctCount);
  };

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchAnswerData = async () => {
      const data = await getAnswerData(url);
      if (data) {
        setAnswerData(data);
        setInput(
          Array.from({ length: data.data.length }, (_, i) => ({
            id: i + 1,
            answer: undefined,
          }))
        );
        setInput(
          Array.from({ length: data.data.length ?? 0 }, (_, i) => ({
            id: i + 1,
            answer: undefined,
          }))
        );
      }
    };
    fetchAnswerData().then(() => {
      setLoading(false);
    });
  }, [url]);

  return (
    <>
      {loading ? (
        url && (
          <div className="flex flex-col justify-center items-center gap-4 py-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
            <div>取得中...</div>
          </div>
        )
      ) : (
        <>
          {input.map((item) => (
            <div
              key={item.id}
              className="grid w-full items-center my-2 grid-cols-[1fr_2fr_2fr_2fr_2fr]"
            >
              <span className="text-lg text-center">{item.id}</span>
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
          ))}

          {correctCount !== undefined && (
            <div className="text-center text-lg mt-4">
              正解数: {correctCount} / {input.length}
            </div>
          )}
          <button className="btn btn-primary w-full mt-4" onClick={checkAnswer}>
            答え合わせ
          </button>
        </>
      )}
    </>
  );
}
