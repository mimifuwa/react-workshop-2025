"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from "pdf-parse";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export const getAnswerData = async (url: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptForCheckUrl = `
    以下のURLがPDFデータであるかどうかを教えてください。
    また、模範解答の表であるかも教えてください。

    その場合は true を
    そうでない場合は false を返してください。

    内容: ${url}
  `;

    const checkUrlResult = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: promptForCheckUrl }] }],
    });

    if (checkUrlResult.response.text().includes("false")) {
      return null;
    }

    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();

    // pdf-parseでPDFをテキストに変換
    const data = await pdf(Buffer.from(arrayBuffer));
    const text = data.text;

    const prompt = `
    以下はある試験の解答です。
    この中から「問題番号」と「解答」を読み取り、{id: 1, answer: 1}の形式でJSONリストにしてください。
    これを「解答データ」と呼びます。
    なお、アイウエオのような選択肢は数字に変換してください。

    次に、
    {id: 1, label: "ア"},
    のような形式のJSONリストを「選択肢データ」と呼びます。

    これら二つについて
    {
      data: 解答データ,
      options: 選択肢データ
    }
    となるように出力してください

    内容: ${text}
  `;

    const modelRes = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const answerText = modelRes.response.text().replaceAll("```json", "").replaceAll("```", "");

    const answerData = JSON.parse(answerText);

    return answerData;
  } catch (error) {
    console.error("Error fetching or processing PDF:", error);
    return null;
  }
};
