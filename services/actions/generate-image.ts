"use server";

import { Image } from "@/typings";
import axios from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/constants";

export const generateImage = async (
  prevState: { message: string },
  formData: FormData
): Promise<any> => {
  try {
    const prompt = formData.get("prompt");
    const number = formData.get("number");

    if (!prompt || !number) {
      return { message: "Prompt or Number is invalid" };
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
    console.log(response.data);

    return data;
  } catch (error: any) {
    console.log("error", error);
    if (error.response) {
      const { status, data } = error.response;
      console.log(status);
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
