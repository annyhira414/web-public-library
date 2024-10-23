import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Password } from "@/components/controls";
import { Button, message } from "antd";
import { postData } from "@/lib/services";
import * as y from "yup";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";

interface PasswordFormProps {
  formType: "SET_PASSWORD" | "RESET_PASSWORD";
  language: any;
}

export const PasswordForm: FC<PasswordFormProps> = ({ formType, language }) => {
  const router = useRouter();
  const otp = Cookies.get("otp");
  const tempId = Cookies.get("tempId");
  const currentPhone = Cookies.get("currentPhone");
  const [messageApi, contextHolder] = message.useMessage();
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const passwordSchema = setPasswordSchema(language);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      password: "",
      confirm: "",
    },
    mode: "all",
    resolver: yupResolver(passwordSchema),
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (phone) {
      toggleModal();
    }
  }, [phone]);

  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const onSubmit = async (data: any) => {
    if (formType === "SET_PASSWORD") {
      const formData = {
        password: data.password,
        password_confirmation: data.confirmPassword,
        tmp_id: tempId,
        otp,
      };
      const res = await postData("public_library/users/set_password", formData);
      if ([200, 201].includes(res.data.status)) {
        setPhone(res?.data?.data?.phone);
        router.push("/auth/success");
        reset();
      } else {
        errorMsg(res?.data?.error);
      }
    } else if (formType === "RESET_PASSWORD") {
      const formData = {
        password: data.password,
        password_confirmation: data.confirmPassword,
        phone: currentPhone,
        otp,
      };
      const res = await postData(
        `public_library/users/reset_password`,
        formData
      );
      if ([200, 201].includes(res.data.status)) {
        setPhone(res?.data.data?.phone);
        successMsg("Password reset successfully");
        router.push("/auth/login");
        reset();
      } else {
        errorMsg(res?.data?.error);
      }
    }
  };
  return (
    <>
      {contextHolder}

      <form onSubmit={handleSubmit(onSubmit)} className="px-12 ">
        <Password
          className="mb-2 border border-gray-400 rounded-md"
          name="password"
          control={control}
          placeholder={localeString(language, "password")}
          errors={errors}
        />

        <Password
          name="confirmPassword"
          control={control}
          errors={errors}
          placeholder={localeString(language, "confirmPassword")}
        />

        <Button
          htmlType="submit"
          className="mt-4 mb-12 shadow-none h-11 !rounded text-library-white text-base bg-library-primary hover:!text-green-200 disabled:hover:!text-gray-400"
          disabled={!isDirty || !isValid || isSubmitting}
          loading={isSubmitting}
          block
        >
          {localeString(language, "submit")}
        </Button>
      </form>
    </>
  );
};

const setPasswordSchema = (language: string | undefined) => {
  return y.object({
    password: y
      .string()
      .typeError(localeString(language, "requiredPassword"))
      .required(localeString(language, "requiredPassword"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        localeString(language, "passwordLength")
      ),
    confirmPassword: y
      .string()
      .typeError(localeString(language, "confirmPasswordRequired"))
      .required(localeString(language, "confirmPasswordRequired"))
      .oneOf(
        [y.ref("password")],
        localeString(language, "passwordAndConfirmPassword")
      ),
  });
};
