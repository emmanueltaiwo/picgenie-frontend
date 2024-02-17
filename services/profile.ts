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
    // The request was made and the server responded with a status code
    const statusCode = error.response.status;
    let errorMessage: string;

    // Customize error message based on status code
    switch (statusCode) {
      case 401:
        errorMessage = "Authentication failed";
        break;
      case 404:
        errorMessage = "User not found";
        break;
      // Add more cases as needed

      default:
        errorMessage = "Internal server error";
        break;
    }

    return { message: errorMessage };
  } else if (error.request) {
    // The request was made but no response was received
    return { message: "No response received from server" };
  } else {
    // Something happened in setting up the request that triggered an error
    return { message: "Error setting up request" };
  }
};

export { getUserProfile };
