import React, {FC, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import {Button, Modal, message} from "antd";
import Image from "next/image";
import Cookies from "js-cookie";
import {useForm} from "react-hook-form";
import {Input, FieldLabel} from "@/components/controls";
import {postData} from "@/lib/services";
import {yupResolver} from "@hookform/resolvers/yup";
import {Password} from "@/components/controls";
import * as y from "yup";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {
  IuserDetails617,
  IuserDetails200,
  IItemUserDetails,
  IData,
  IItem,
} from "@/lib/model/myRequest";

interface IApplyForSecurityMoney {
  userDetails: IuserDetails617[] | IuserDetails200[] | undefined;
  statusCode: number | undefined;
  requestValidate: () => void;
  user: () => void;
}

export const ApplyForSecurityMoney: FC<IApplyForSecurityMoney> = ({
  userDetails,
  statusCode,
  requestValidate,
  user,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm({
    defaultValues: {
      password: "",
      phone: "",
    },
    mode: "all",
    resolver: yupResolver(setPasswordSchema),
  });

  const language: string | undefined = Cookies.get("language");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const onSubmit = async (data: IData) => {
    let params;
    if (data?.phone) {
      params = {
        phone: data?.phone,
        password: data?.password,
      };
    } else {
      params = {
        password: data?.password,
      };
    }
    const res = await postData(
      `public_library/security_money_requests`,
      params,
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      successMsg(res?.data?.success);
      user();
      requestValidate();
      setIsModalOpen(false);
      reset();
    } else {
      errorMsg(res?.data?.error);
    }
  };

  const paymentOptions = [
    {
      label: <>{localeString(language, "nagadPayment")}</>,
      value: "nagad_payment",
    },
  ];
  const paymentMethods = userDetails?.map(
    (item: IItemUserDetails) => item?.payment_method
  );

  return (
    <>
      {contextHolder}
      <>
        <div className="w-full h-full pt-8">
          {statusCode === 617 ? (
            <div className="">
              <div className="py-4  pl-4 bg-bg-rejected rounded-md">
                <div className="min-section-title ">
                  {localeString(language, "reason")}
                </div>
                <div>
                  {userDetails?.map((item: IItem) => (
                    <div key={item?.id}>
                      <div className="pt-2">{item?.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="pt-4 bg-white p-4 rounded-md">
                <div className="sub-text">
                  {localeString(language, "eligibleText")}
                </div>
              </div>
              <div className="pt-6 w-full flex justify-end">
                <div className="w-44 borrowBookButton">
                  <Button
                    htmlType="submit"
                    className="mt-2 h-12 button-secondary"
                    block
                    onClick={showModal}
                  >
                    {localeString(language, "apply")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>

      <Modal
        bodyStyle={{padding: 16}}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        centered
      >
        <div className="flex justify-center py-4 ">
          <Image src={`/logo/Group.svg`} alt="logo" width={170} height={210} />
        </div>
        <ToastContainer autoClose={2000} />

        <form onSubmit={handleSubmit(onSubmit)} className="px-12 ">
          <>
            {paymentMethods?.includes("cash") ||
            paymentMethods?.includes("pickup_from_library") ? (
              <div>
                <FieldLabel
                  className="mb-3 sub-card-title"
                  name="password"
                  label={localeString(language, "enterYourPassword")}
                  required
                />
                <Password
                  className="mb-2 border border-gray-400 rounded-md"
                  name="password"
                  control={control}
                  placeholder={localeString(language, "password")}
                  errors={errors}
                />
              </div>
            ) : (
              <>
                <div>
                  <FieldLabel
                    className="mb-3 sub-card-title"
                    name="enterYourNagadAccountNumber"
                    label={localeString(
                      language,
                      "enterYourNagadAccountNumber"
                    )}
                    required
                  />

                  <Input
                    name="phone"
                    control={control}
                    errors={errors}
                    placeholder={localeString(
                      language,
                      "enterYourNagadAccountNumber"
                    )}
                    className="mb-2  border-book-input-color"
                  />
                </div>
                <div>
                  <FieldLabel
                    className="mb-3 sub-card-title"
                    name="password"
                    label={localeString(language, "enterYourPassword")}
                    required
                  />

                  <Password
                    className="mb-2 border border-gray-400 rounded-md"
                    name="password"
                    control={control}
                    placeholder={localeString(language, "password")}
                    errors={errors}
                  />
                </div>
              </>
            )}

            {/* <div>
              <FieldLabel
                className="mb-3 sub-card-title"
                name="phone"
                label={localeString(language, "paymentMethod")}
              />
              <div className="w-full onlineRadio">
                <CustomRadioGroup
                  name="payment"
                  className="w-full section border hover:border-library-primary broder-library-gray-300  rounded-lg "
                  errors={errors}
                  options={paymentOptions}
                  control={control}
                />
              </div>
            </div> */}
            <div className="pt-4 borrowBookButton">
              <Button
                htmlType="submit"
                className="mt-2 h-12 button-secondary"
                disabled={!isDirty || !isValid || isSubmitting}
                loading={isSubmitting}
                block
              >
                {localeString(language, "sendRequest")}
              </Button>
            </div>
          </>
        </form>
        <ToastContainer />
      </Modal>
    </>
  );
};

const setPasswordSchema = y.object({
  password: y
    .string()
    .typeError("Password is required")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character required"
    ),
});
