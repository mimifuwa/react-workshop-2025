"use client";
import { useState } from "react";

import { answer } from "@/lib/answer";
import type { Question } from "@/types/question";

export function AnswerInput() {
  const [input, setInput] = useState<Question[]>(
    Array.from({ length: answer.length }, (_, i) => ({
      no: i + 1,
      answer: undefined,
    }))
  );
  const [correctCount, setCorrectCount] = useState<number>();

  const options = [
    {
      no: 1,
      text: "ア",
    },
    {
      no: 2,
      text: "イ",
    },
    {
      no: 3,
      text: "ウ",
    },
    {
      no: 4,
      text: "エ",
    },
  ];

  const updateInput = (no: number, value: number) => {
    setInput((prev) => {
      const index = prev.findIndex((item) => item.no === no);
      if (index !== -1) {
        const newInput = [...prev];
        newInput[index] = {
          ...newInput[index],
          answer: value === newInput[index].answer ? undefined : value,
        };
        return newInput;
      } else {
        return [...prev, { no, answer: value }];
      }
    });
  };

  const checkAnswer = () => {
    const correctCount = input.reduce((count, item) => {
      const answerItem = answer.find((ans) => ans.no === item.no);
      if (answerItem && answerItem.answer === item.answer) {
        return count + 1;
      }
      return count;
    }, 0);
    setCorrectCount(correctCount);
  };

  return (
    <>
      {input.map((item) => (
        <div
          key={item.no}
          className="grid w-full items-center my-2 grid-cols-[1fr_2fr_2fr_2fr_2fr]"
        >
          <span className="text-lg text-center">{item.no}</span>
          {options.map((option) => (
            <button
              key={option.no}
              className={`btn rounded-none border-white
              ${item.answer === option.no ? "btn-primary" : "btn-outline"}
              ${option.no === 1 && "rounded-l-md"}
              ${option.no === options.length && "rounded-r-md"}`}
              onClick={() => updateInput(item.no, option.no)}
            >
              {option.text}
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
  );
}
