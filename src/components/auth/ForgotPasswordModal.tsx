import { FC, useState } from "react";
import { Modal, Button, message } from "antd";
import { Input, FieldLabel } from "@/components/controls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postData } from "@/lib/services";
import * as y from "yup";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";

interface ForgotPasswordModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;

  setPhone: (phone: string) => void;
  language: string;
}

export const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
  isModalOpen,
  toggleModal,
  setPhone,
  language,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleOk = () => {
    toggleModal();
  };
  const handleCancel = () => {
    toggleModal();
  };
  const successMsg = () => {
    messageApi.open({
      type: "success",
      content: "OTP sent successsfully.",
    });
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const onSubmit = async (data: any) => {
    let phone = "";
    if (data.phone.startsWith("+88")) {
      phone = data.phone.slice(2);
    } else {
      phone = data.phone;
    }
    const formData = {
      phone,
    };
    const res = await postData(
      `public_library/otps/reset_password_otp`,
      formData
    );
    if ([200, 201].includes(res.data?.status)) {
      setPhone(phone);
      Cookies.set("currentPhone", phone);
      successMsg();
      toggleModal();
    } else {
      errorMsg(res?.data?.error);
    }
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      {contextHolder}
      <div className="p-4">
        <h2 className="text-3xl font-semibold text-center">
          {localeString(language, "forgotPassword")}
        </h2>
        <p className="mt-2 mb-4">
          {localeString(language, "forgetPasswordMsg")}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <FieldLabel
              className="mb-[10px] text-library-gray font-normal text-base leading-6"
              name="phone"
              label={localeString(language, "regPhoneNumber")}
              required
            />
            <Input
              name="phone"
              control={control}
              placeholder={localeString(language, "phoneNumber")}
              errors={errors}
            />
          </div>
          <div className="flex justify-end borrowBookButton">
            <Button
              // type="primary"
              htmlType="submit"
              className="button-secondary w-52 h-12"
              disabled={!isDirty || !isValid || isSubmitting}
              loading={isSubmitting}
            >
              {localeString(language, "otpBtn")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const forgotPasswordSchema = y.object().shape({
  phone: y
    .string()
    .typeError("Phone number is required")
    .required("Phone number is required")
    .matches(
      /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
      "Provide valid BD phone number in English"
    ),
});
