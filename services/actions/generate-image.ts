"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/constants";
import { getUserProfile } from "../profile";
import { InvalidResponseError, NewImageGenerated, Profile } from "@/typings";

export const generateImage = async (
  prevState: { message: "" },
  formData: FormData
): Promise<NewImageGenerated[] | InvalidResponseError> => {
  try {
    const { prompt, number } = getFormDataValues(formData);
    if (!prompt || !number || number < 1) {
      return { message: "Prompt or Number is invalid" };
    }

    const user = await getUserProfileDetails();
    if (isError(user)) {
      throw new Error();
    }

    const userAvailableCredits = user.creditsLeft;
    if (number > userAvailableCredits) {
      return { message: "You don't have enough credits" };
    }

    const token = getToken();
    if (!token) {
      return { message: "User not logged in" };
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/image/generate-image`,
      { prompt, number },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = response.data as NewImageGenerated[];
    return data;
  } catch {
    return { message: "Network Error. Please check your internet connection." };
  }
};

const getFormDataValues = (
  formData: FormData
): { prompt: string | null; number: number | null } => {
  const prompt = formData.get("prompt") as string;
  const number = parseInt(formData.get("number") as string);
  return {
    prompt: prompt ? prompt.toString() : null,
    number: isNaN(number) ? null : number,
  };
};

const getUserProfileDetails = async (): Promise<Profile | Error> => {
  const user = await getUserProfile();
  if ("message" in user) {
    throw new Error(user.message);
  }
  return user;
};

const getToken = (): string | null => {
  return cookies().get("token")?.value ?? null;
};

const isError = (obj: any): obj is Error => {
  return obj instanceof Error;
};
