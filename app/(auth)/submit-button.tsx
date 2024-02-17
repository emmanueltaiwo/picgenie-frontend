"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  text?: string;
};

const SubmitButton: FC<Props> = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button type="submit">{text}</Button>
      ) : (
        <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
