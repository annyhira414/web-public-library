import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { CountdownProps } from "antd";
import { Modal, Button, Statistic, message } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/controls";
import { postData } from "@/lib/services";
import Cookies from "js-cookie";
import CreadentialHeading from "./CreadentialHeading";
import { localeString } from "@/lib/helpers/utils";
import OtpCreadentialHeading from "./OtpCreadentialHeading";

const { Countdown } = Statistic;

type OTP = z.infer<typeof otpSchema>;

interface OTPModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  phone: string;
  setPhone: (value: string) => void;
  passwordType: "SET_PASSWORD" | "RESET_PASSWORD";
  language?: string;
  otp_type: string;
}
export const OTPModal: FC<OTPModalProps> = ({
  //language,
  isModalOpen,
  toggleModal,
  phone,
  otp_type,
  setPhone,
  passwordType,
}) => {
  const router = useRouter();
  const language: string | undefined = Cookies.get("language");

  const [isCoundownComplete, setIsCoundownComplete] = useState(false);
  const [deadline, setDeadline] = useState<number>();
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<OTP>({
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    mode: "all",
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    const firstPart = phone.slice(0, 4);
    const lastPart = phone.slice(-2);
    const formattedPhone = `${firstPart}*****${lastPart}`;
    // setFormattedPhoneNumber(formattedPhone);
    setDeadline(Date.now() + 1000 * 60 * 2);
    setIsOTPSend(true);
  }, [phone]);

  const handleOk = () => {
    toggleModal();
  };

  const handleCancel = () => {
    toggleModal();
    setPhone("");
  };
  const onFinish: CountdownProps["onFinish"] = () => {
    setIsCoundownComplete(true);
    setIsOTPSend(false);
  };

  const successMsg = () => {
    messageApi.open({
      type: "success",
      content: `${localeString(language, "otpMessage")}`,
    });
  };

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const resendOTP = async () => {
    const res = await postData("public_library/otps/send", {
      phone,
    });

    if ([200, 201].includes(res.status)) {
      successMsg();
      setDeadline(Date.now() + 1000 * 60 * 2);
      setIsOTPSend(true);
    } else {
      errorMsg(res?.data?.error);
      setIsOTPSend(false);
    }
  };

  const onSubmit = async (data: any) => {
    const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
    const formData = {
      otp,
      phone,
      otp_type: otp_type,
    };

    const res = await postData("public_library/otps/verify", formData);
    if ([200, 201].includes(res.data.status)) {
      Cookies.set("otp", res.data.data.otp);
      Cookies.set("tempId", res.data.data.tmp_id);
      if (passwordType === "SET_PASSWORD") {
        router.push("/auth/set-password");
      } else {
        router.push("/auth/reset-password?previous=reset-password");
      }
    } else {
      errorMsg(res?.data?.error);
    }
  };

  return (
    <div className="otp-modal">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        maskClosable={false}
        closable={false}
      >
        {contextHolder}
        <OtpCreadentialHeading language={language} />

        <h3 className="py-8 font-[playfairDisplay] font-bold text-3xl text-library-light-black text-center ">
          {localeString(language, "otp")}
        </h3>
        <p className="text-[#2D2D2D] text-xs text-center">
          {localeString(language, "otpMessage")}
        </p>
        <div className="my-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex justify-around">
              <div className="mt-2 ">
                <button
                  className="text-library-primary disabled:text-gray-400 disabled:cursor-not-allowed font-semibold pl-1"
                  onClick={resendOTP}
                  disabled={isOTPSend}
                >
                  {localeString(language, "otpResend")}
                </button>
              </div>
              <div className="text-center my-2">
                {isOTPSend && (
                  <Countdown
                    value={deadline}
                    onFinish={onFinish}
                    format="mm:ss"
                    valueStyle={{
                      fontSize: "16px",
                      color: "red",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="mt-4 flex borrowBookButton justify-center">
              <Button
                htmlType="submit"
                className="mb-4 button-secondary w-40 h-12"
                loading={isSubmitting}
                disabled={!isDirty || !isValid || isSubmitting}
                block
              >
                {localeString(language, "submitOtp")}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

const otpSchema = z.object({
  otp1: z.string().trim().nonempty(""),
  otp2: z.string().trim().nonempty(""),
  otp3: z.string().trim().nonempty(""),
  otp4: z.string().trim().nonempty(""),
});
