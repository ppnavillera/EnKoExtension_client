// src/api.ts

import axios from "axios";
import { Result } from "./interface";
import { supabase } from "./supabaseClient";
import { AuthError, Session, User } from "@supabase/supabase-js";

const url = "http://127.0.0.1:54321/functions/v1/";
// "https://nxogwwumniauclwarsbt.supabase.co/functions/v1/enkoextension";

export async function getDefinition(word: string) {
  const geminiUrl = url + "/gemini";
  try {
    // const response = await axios.post(
    //   geminiUrl,
    //   { word: word },
    //   {
    //     headers: {
    //       "Content-Type": "application/json", // JSON 형식 명시
    //     },
    //   }
    // );
    // console.log(response.data);
    const response = {
      data: {
        success: true,
        data: {
          word: "functions",
          definition1: "(n) 기능들, 함수들",
          definition2: "(v) 기능하다, 작동하다",
          example: "The functions of the brain are complex.",
          synonyms: ["roles", "purposes", "operations", "tasks", "activities"],
          antonyms: ["malfunctions"],
        },
      },
    };
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data || err.message);
    } else {
      console.error(err);
    }
  }
}

export async function saveToNotion(definition: Result) {
  const notionUrl = url + "/notion";
  try {
    const response = await axios.post(
      notionUrl,
      { data: definition }, // "word"로 수정
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식 명시
        },
      }
    );

    console.log(response.data.data.url);
    return response.data.data.url;
    // return;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data || err.message);
    } else {
      console.error(err);
    }
  }
}
// getDefinition, saveToNotion 함수는 그대로 둡니다.

// 로그아웃은 그대로 유지합니다.
export async function signOut() {
  await supabase.auth.signOut();
}
