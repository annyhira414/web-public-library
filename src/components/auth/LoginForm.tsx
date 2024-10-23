

import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Password } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";


interface ILoginFormProps {
  language?: string | undefined;
}

export const LoginForm: FC<ILoginFormProps> = ({ language }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Input
        name="phone"
        className="mb-2 border border-gray-400 rounded-md"
        control={control}
        placeholder={localeString(language, "regPhoneNumber")}
        errors={errors}
      />

      <Password
        className="mb-2 border border-gray-400 rounded-md"
        name="password"
        control={control}
        placeholder={localeString(language, "password")}
        errors={errors}
      />
    </>
  );
};
