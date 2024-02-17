"use server";

import { AuthResponse } from "@/typings";
import axios from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/constants";

const handleLogin = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) return { message: "Email or password is invalid" };

  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    const data = response.data as AuthResponse;

    if (!data.token) {
      return {
        message: "An Error Occurred, Refresh and try again.",
      };
    }

    cookies().set("token", data.token);
    return { message: data.message };
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        return { message: "Invalid username or password" };
      } else if (status === 404) {
        return { message: "User not found" };
      } else {
        return {
          message: "An unexpected error occurred. Please try again later.",
        };
      }
    } else {
      return {
        message: "Network error. Please check your internet connection.",
      };
    }
  }
};

const handleSignup = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!fullName || !email || !password)
      return { message: "Email or password is invalid" };

    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
      fullName,
      email,
      password,
    });

    if (response.status !== 201) {
      return { message: "An Error Occurred, Refresh and try again." };
    }

    const data = response.data as AuthResponse;
    return { message: data.message };
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        return {
          message: "Bad request. Please check your inputs and try again.",
        };
      } else if (status === 500) {
        return {
          message: `Internal server error. Make sure your E-mail is not taken and please try again later`,
        };
      } else {
        return { message: "An unexpected error occurred." };
      }
    } else {
      return {
        message: "Network error. Please check your internet connection.",
      };
    }
  }
};

const handleSignOut = () => {
  cookies().delete("token");
};

export { handleLogin, handleSignup, handleSignOut };
