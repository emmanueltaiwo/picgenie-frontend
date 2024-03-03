"use client";

import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import SubmitButton from "../submit-button";
import { useRouter } from "next/navigation";
import { handleSignup } from "@/services/actions/auth";
import { SUCCESSFUL_SIGNUP_RESPONSE } from "@/constants";
import FormInput from "../form-input";

const initialState = {
  message: "",
};

const RegisterForm = () => {
  const router = useRouter();

  const registerUser = async (
    prevState: { message: string },
    formData: FormData
  ) => {
    try {
      const response = await handleSignup(prevState, formData);

      if (response.message !== SUCCESSFUL_SIGNUP_RESPONSE) {
        return response;
      }

      router.push("/login");

      return response;
    } catch (error) {
      return {
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  };

  const [state, formAction] = useFormState(registerUser, initialState);

  return (
    <form
      action={formAction}
      className="z-50 flex flex-col gap-5 mx-auto mt-20 lg:mt-28 h-full pt-5 pb-10 md:w-[500px] w-[90%] border-[1px] border-gray-900 dark:border-gray-500 rounded-lg p-5"
    >
      <h1 className="text-center font-[800] text-[25px]">
        Create an account <span className="text-[#9341fd]">PicGenie</span>
      </h1>

      <hr className="border-[0.5px] border-gray-900 dark:border-gray-500 w-[35%] mx-auto" />

      <div className="w-full flex flex-col gap-2 mt-5">
        <Label htmlFor="name">Enter your full name</Label>
        <FormInput
          type="text"
          id="name"
          name="fullName"
          placeholder="Full Name"
        />
      </div>

      <div className="w-full flex flex-col gap-2 mt-3">
        <Label htmlFor="email">Enter your email address</Label>
        <FormInput type="email" id="email" name="email" placeholder="Email" />
      </div>

      <div className="w-full flex flex-col mt-3 gap-2">
        <Label htmlFor="password">Enter your Password</Label>
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>

      <SubmitButton text="Sign Up" />

      {state.message !== "" && (
        <p className="text-[13px] font-[300] text-center">{state.message}</p>
      )}
    </form>
  );
};

export default RegisterForm;
