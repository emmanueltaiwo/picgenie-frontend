"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { Profile } from "@/typings";
import { API_BASE_URL } from "@/constants";

type InvalidResponseError = {
  message: string;
};

const getUserProfile = async (): Promise<InvalidResponseError | Profile> => {
  try {
    const token = cookies().get("token");

    if (!token) {
      return { message: "User not logged in" };
    }

    const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = response.data;

    if ("message" in data && typeof data.message === "string") {
      return data as InvalidResponseError;
    } else {
      return data as Profile;
    }
  } catch (error: any) {
    return handleAxiosError(error);
  }
};

const handleAxiosError = (error: any): InvalidResponseError => {
  if (error.response) {
    const statusCode = error.response.status;
    let errorMessage: string;

    switch (statusCode) {
      case 401:
        errorMessage = "Authentication failed";
        break;
      case 404:
        errorMessage = "User not found";
        break;

      default:
        errorMessage = "Internal server error";
        break;
    }

    return { message: errorMessage };
  } else if (error.request) {
    return { message: "No response received from server" };
  } else {
    return { message: "Error setting up request" };
  }
};

const getUserGeneratedImages = async () => {
  try {
    const user = await getUserProfile();

    if ("message" in user) return;

    const { id } = user;
    const token = cookies().get("token");

    if (!token) {
      return { message: "User not logged in" };
    }

    const response = await axios.get(`${API_BASE_URL}/api/image/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = response.data;

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateUserCredits = async (creditsBought: number) => {
  try {
    if (!creditsBought) {
      throw new Error("Credit is not available");
    }

    const token = cookies().get("token");

    if (!token) {
      return { message: "User not logged in" };
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/update-credit`,
      {
        creditsBought: creditsBought,
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
    throw new Error(error);
  }
};

export { getUserProfile, getUserGeneratedImages, updateUserCredits };
