import { Password } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";
import { getData, postData } from "@/lib/services";
import { Button, Modal, message } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/controls";
import * as y from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

type Inputs = {
  phone?: string;
  password?: string;
  otp1: "";
  otp2: "";
  otp3: "";
  otp4: "";
};

export const MemberPhone = () => {
  const router = useRouter();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [user, setUser] = useState<any>({});
  const [messageApi, contextHolder] = message.useMessage();
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
  const uerProfile = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      "",
      userToken
    );

    if (res?.success) {
      Cookies.set("phone", res?.data?.phone);
      setUser(res?.data);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  useEffect(() => {
    uerProfile();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const memberPhoneSchema = changePhoneSchema(language);
  const verifyOtpSchema = otpSchema(language);
  const {
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      phone: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(otpModal ? verifyOtpSchema : memberPhoneSchema),
  });
  const otp1 = watch("otp1");
  const otp2 = watch("otp2");
  const otp3 = watch("otp3");
  const otp4 = watch("otp4");
  const otpVerify = async () => {
    const otp = otp1 + otp2 + otp3 + otp4;
    const res = await postData(
      `public_library/otps/verify`,
      { otp: otp, otp_type: "phone_change" },
      language,
      userToken
    );

    if (res?.success) {
      Cookies.remove("token");
      Cookies.remove("id");
      Cookies.remove("fullName");
      Cookies.remove("email");
      Cookies.remove("phone");
      Cookies.remove("dob");
      Cookies.remove("gender");
      Cookies.remove("isMember");
      Cookies.remove("membershipStatus");
      Cookies.remove("member_activated_at");
      Cookies.remove("libraryCode");
      Cookies.remove("libraryId");
      Cookies.remove("is_publisher");
      successMsg(localeString(language, "phoneChangedMsg"));
      router.push("/auth/login");
    } else {
      errorMsg(res?.data?.error);
    }
  };

  const onSubmit = async (data: any) => {
    let phone = "";
    if (data.phone.startsWith("+88")) {
      phone = data.phone.slice(2);
    } else {
      phone = data.phone;
    }
    const formData = {
      current_password: data?.password,
      phone,
    };
    const res = await postData(
      `public_library/users/change_phone`,
      formData,
      language,
      userToken
    );
    if (res?.success) {
      setOtpModal(true);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="personal-info-mobile border-b mt-6">
        <label htmlFor="" className="font-bold text-sm text-gray-700 ">
          {localeString(language, "mobileNumber")}
        </label>
        <div className="mb-2 flex justify-between">
          <div className="title">
            <h2>{user?.phone}</h2>
          </div>
          <div className="action">
            <a className="text-library-primary underline" onClick={showModal}>
              {localeString(language, "changePhone")}
            </a>
          </div>
        </div>
      </div>

      <div className="phoneNumber-change-modal">
        <Modal
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          closable={false}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {!otpModal ? (
              <div className="delete-user-modal">
                <div className="modal-heading">
                  <div className="modal-delete-title flex justify-center">
                    <h3 className="font-bold text-gray-700 font-playfairDisplay text-3xl my-4">
                      {localeString(language, "changePhoneNumber")}
                    </h3>
                  </div>
                </div>
                <div className="modal-delete-content text-justify px-8">
                  <p className="text-gray-600 text-sm">
                    <Input
                      name="phone"
                      control={control}
                      errors={errors}
                      placeholder={localeString(language, "newPhoneNo")}
                      className="mb-2 border border-gray-400 rounded-md"
                    />
                    <Password
                      className="mb-2 border border-gray-400 rounded-md"
                      name="password"
                      control={control}
                      placeholder={localeString(language, "password")}
                      errors={errors}
                    />
                    <div className="borrowBookButton">
                      <Button
                        htmlType="submit"
                        className="mt-4 mb-12 button-secondary h-11"
                        disabled={!isDirty || !isValid || isSubmitting}
                        loading={isSubmitting}
                        block
                      >
                        {localeString(language, "nextbtn")}
                      </Button>
                    </div>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h2 className=" h-11 font-serif font-bold text-3xl text-library-light-black text-center"></h2>
                <h3 className="pb-4 font-[playfairDisplay] font-bold text-3xl text-library-light-black text-center ">
                  {localeString(language, "otp")}
                </h3>
                <p className="text-[#2D2D2D] text-xs text-center">
                  {localeString(language, "otpMessage")}
                </p>
                <div className="my-4"></div>
                <div className="flex justify-center gap-6 px-8">
                  <Input
                    number
                    name="otp1"
                    control={control}
                    maxLength={1}
                    placeholder="-"
                    className="w-16 text-center"
                    autoComplete="one-time-code"
                    isGoNextField
                  />
                  <Input
                    number
                    name="otp2"
                    control={control}
                    maxLength={1}
                    placeholder="-"
                    className="w-16 text-center"
                    autoComplete="one-time-code"
                    isGoNextField
                  />
                  <Input
                    number
                    name="otp3"
                    control={control}
                    maxLength={1}
                    placeholder="-"
                    className="w-16 text-center"
                    autoComplete="one-time-code"
                    isGoNextField
                  />
                  <Input
                    number
                    name="otp4"
                    control={control}
                    maxLength={1}
                    placeholder="-"
                    className="w-16 text-center"
                    autoComplete="one-time-code"
                    isGoNextField
                  />
                </div>
                <div className="mt-4 flex justify-center mx-8">
                  <Button
                    onClick={otpVerify}
                    htmlType="button"
                    className="mt-4 mb-12 shadow-none h-11 !rounded text-library-white text-base bg-library-primary hover:!text-green-200 disabled:hover:!text-gray-400"
                    disabled={!isDirty || !isValid || isSubmitting}
                    loading={isSubmitting}
                    block
                  >
                    {localeString(language, "change")}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Modal>
      </div>
    </>
  );
};
const changePhoneSchema = (language: string | undefined) => {
  return y.object().shape({
    phone: y
      .string()
      .typeError(localeString(language, "phoneNoRequired"))
      .required(localeString(language, "phoneNoRequired"))
      .matches(
        /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
        localeString(language, "phoneNoRequired")
      )
      .max(100, localeString(language, "phoneNumberLength")),
    password: y
      .string()
      .typeError(localeString(language, "currentPassword"))
      .required(localeString(language, "currentPassword"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        localeString(language, "passwordLength")
      ),
  });
};

const otpSchema = (language: string | undefined) => {
  return y.object().shape({
    otp1: y.string().trim().required(localeString(language, "provideOtp")),
    otp2: y.string().trim().required(localeString(language, "provideOtp")),
    otp3: y.string().trim().required(localeString(language, "provideOtp")),
    otp4: y.string().trim().required(localeString(language, "provideOtp")),
  });
};
