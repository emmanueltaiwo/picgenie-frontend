"use client";

import { useFormStatus } from "react-dom";
import { FC, HTMLInputTypeAttribute, useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  type: HTMLInputTypeAttribute;
  id: string;
  name: string;
  placeholder: string;
};

const FormInput: FC<Props> = ({ type, id, name, placeholder }) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (type === "password") {
    return (
      <div className="w-full flex items-center gap-3">
        <Input
          disabled={pending}
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          placeholder={placeholder}
        />

        <Button
          disabled={pending}
          type="button"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </Button>
      </div>
    );
  }

  return (
    <Input
      disabled={pending}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default FormInput;
