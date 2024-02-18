"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/constants";
import { getUserProfile } from "../profile";

export const generateImage = async (
  prevState: { message: string },
  formData: FormData
): Promise<any> => {
  try {
    const prompt = formData.get("prompt");
    const n = formData.get("number");

    if (!prompt || !n || parseInt(n.toString()) < 1) {
      return { message: "Prompt or Number is invalid" };
    }

    const user = await getUserProfile();
    const number = parseInt(n.toString()) || 1;

    if ("message" in user) {
      return null;
    }

    const userAvailableCredits = user.creditsLeft;

    if (number > userAvailableCredits) {
      return { message: "You dont have enough credits" };
    }

    const token = cookies().get("token");

    if (!token) {
      return { message: "User not logged in" };
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/image/generate-image`,

      {
        prompt,
        number,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    const data = response.data;

    return data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        return {
          message: data.message || "Bad Request. Please check your input.",
        };
      } else if (status === 500) {
        return {
          message:
            data.message || "Internal Server Error. Please try again later.",
        };
      } else {
        return {
          message: data.message || "An Error Occurred. Please try again later.",
        };
      }
    } else {
      return {
        message: "Network Error. Please check your internet connection.",
      };
    }
  }
};
