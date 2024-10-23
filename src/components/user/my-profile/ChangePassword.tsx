import { Password } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";
import { EditOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "antd";
import Cookies from "js-cookie";
import * as y from "yup";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { updateData } from "@/lib/services";

interface ChangePasswordForm {}
const handleLogout = () => {
  localStorage.clear();
  Cookies.remove("token");
  window.location.href = "/auth/login";
};
export const ChangePassword: FC<ChangePasswordForm> = () => {
  const userToken = Cookies.get("token");

  const language = Cookies.get("language");

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
    resolver: yupResolver(chnagePasswordSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = {
      current_password: data.oldPassword,
      password: data.password,
      password_confirmation: data.confirmPassword,
    };
    const res = await updateData(
      `public_library/users/change_password`,
      formData,
      "",
      userToken
    );
    if ([200, 201].includes(res?.status)) {
      ("Password Change successfully");
      reset();
    } else {
      ("Something Error");
    }
  };
  return (
    <div>
      <h4 className="font-bold text-gray-700 text-xl font-playfairDisplay">
        {localeString(language, "changePassword")}
      </h4>
      <div className=" bg-white p-4 mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="password"
            className="text-sm text-gray-700 font-playfairDisplay font-semibold"
          >
            {localeString(language, "currentPassword")}
          </label>
          <Password
            className=" mb-2 border border-gray-700 rounded-md"
            name="oldPassword"
            control={control}
            placeholder={localeString(language, "currentPassword")}
            errors={errors}
          />
          <label
            htmlFor="newPassword"
            className="text-sm text-gray-700 font-playfairDisplay font-semibold"
          >
            {localeString(language, "newPassword")}
          </label>
          <Password
            className=" mb-2 border border-gray-700 rounded-md"
            name="password"
            control={control}
            placeholder={localeString(language, "newPassword")}
            errors={errors}
          />
          <label
            htmlFor="confirmNewPasswod"
            className="text-sm text-gray-700 font-playfairDisplay font-semibold"
          >
            {localeString(language, "confirmPassword")}
          </label>
          <Password
            name="confirmPassword"
            className=" mb-2 border border-gray-700rounded-md"
            control={control}
            errors={errors}
            placeholder={localeString(language, "confirmPassword")}
          />
          <div className="borrowBookButton">
            <Button
              onClick={handleLogout}
              htmlType="submit"
              className=" button-secondary mt-4 mb-12 h-11"
              disabled={!isDirty || !isValid || isSubmitting}
              loading={isSubmitting}
              block
            >
              {localeString(language, "change")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
const chnagePasswordSchema = y.object({
  oldPassword: y
    .string()
    .typeError("Old Password  is required")
    .required("Old Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character required"
    ),
  password: y
    .string()
    .typeError("New Password is required")
    .required("New Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character required"
    ),
  confirmPassword: y
    .string()
    .typeError("Confirm password is required")
    .required("Confirm password is required")
    .oneOf([y.ref("password")], "Password and Confirm Password do not match"),
});
