"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/app/(auth)/submit-button";
import { useFormState } from "react-dom";
import { generateImage } from "@/services/actions/generate-image";
import { useAppDispatch } from "@/lib/hooks";
import { addImage } from "@/lib/features/image-generated/image-slice";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  message: "",
};

const PromptForm = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const generate = async (
    prevState: { message: string },
    formData: FormData
  ) => {
    try {
      const response = await generateImage(prevState, formData);

      if ("message" in response) {
        return response;
      }

      dispatch(addImage(response));
      toast({
        title: "Image Has Been Generated Successfully",
        description: "Refresh Your Profile Page To View Your Image",
      });

      return { message: "Image generated successfully" };
    } catch (error) {
      return {
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  };

  const [state, formAction] = useFormState(generate, initialState);

  return (
    <form action={formAction} className="mt-14 grid w-full items-center gap-3">
      <Label htmlFor="prompt">Enter Prompt</Label>
      <Input
        type="text"
        id="prompt"
        name="prompt"
        placeholder="a happy programmer"
        className="border-gray-900 dark:border-gray-200 border-2"
      />

      <Label className="mt-5" htmlFor="number">
        How Many Images Do You Want (1 Credit Per Image)
      </Label>
      <Input
        type="number"
        id="number"
        name="number"
        placeholder="0"
        className="border-gray-900 dark:border-gray-200 border-2"
      />
      <SubmitButton text="Generate" />

      {state.message !== "" && (
        <p className="text-[13px] font-[300] text-left">{state.message}</p>
      )}
    </form>
  );
};

export default PromptForm;
