import { useState, useEffect, FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, DatePickerControl } from "@/components/controls";
import { Button, message } from "antd";
import { genderFunc } from "@/lib/constants";
import { postData } from "@/lib/services";
import { OTPModal } from "@/components/auth";
import * as y from "yup";
import dayjs from "dayjs";
import Link from "next/link";
import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";

interface IRegisterFormProps {
  language?: string;
}

export const RegisterForm: FC<IRegisterFormProps> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  const [messageApi, contextHolder] = message.useMessage();
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const options = genderFunc(language);
  const mySignUpSchema = signUpSchema(language);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      gender: null,
      dob: "",
    },
    mode: "all",
    resolver: yupResolver(mySignUpSchema),
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (phone) {
      toggleModal();
    }
  }, [phone]);

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
      full_name: data.name,
      phone,
      email: data.email,
      gender: data.gender,
      dob: dayjs(data.dob).format("YYYY-MM-DD"),
    };
    const res = await postData("public_library/users", formData);
    if ([200, 201].includes(res?.data?.status)) {
      setPhone(res.data.data?.phone);
      reset();
    } else {
      errorMsg(res?.data?.error);
    }
  };

  return (
    <>
      {contextHolder}

      <div className="bg-white border-gray-300 rounded-2xl my-20 shadow-sm ">
        <h3 className="py-8 font-[playfairDisplay] font-bold text-3xl text-library-light-black text-center ">
          {localeString(language, "register")}
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-12 custom-placeholder"
        >
          <div className="register-field">
            <Input
              name="name"
              control={control}
              errors={errors}
              placeholder={localeString(language, "fullName")}
              className="mb-2 border border-gray-400 rounded-md"
            />
            <Input
              name="phone"
              control={control}
              errors={errors}
              placeholder={localeString(language, "regPhoneNumber")}
              className="mb-2 border border-gray-400 rounded-md"
            />
            <Input
              name="email"
              type="email"
              control={control}
              errors={errors}
              placeholder={localeString(language, "regEmail")}
              className="mb-2 border border-gray-400 "
            />

            <Select
              name="gender"
              control={control}
              errors={errors}
              options={options}
              placeholder={localeString(language, "gender")}
              className="pb-1"
            />

            <DatePickerControl
              name="dob"
              control={control}
              errors={errors}
              placeholder={localeString(language, "dateOfBirth")}
              className=" border border-gray-400 "
            />

            <div className="borrowBookButton">
              <Button
                htmlType="submit"
                className="mt-2 button-secondary h-11"
                loading={isSubmitting}
                block
              >
                {localeString(language, "register")}
              </Button>
            </div>
          </div>

          <div className=" flex text-xs mt-6 justify-center ">
            <p className="text-sm text-gray-700 mb-6">
              {localeString(language, "haveAcount")}
            </p>
            <Link
              className="ml-2 text-[#006A4E] cursor-pointer font-semibold sm:mt-[1px]"
              href="/auth/login?previous=register"
            >
              {localeString(language, "logged")}
            </Link>
          </div>
        </form>
      </div>

      {phone && (
        <OTPModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          phone={phone}
          setPhone={setPhone}
          otp_type="temporary_user"
          passwordType="SET_PASSWORD"
        />
      )}
    </>
  );
};

const signUpSchema = (language: string | undefined) => {
  return y.object().shape({
    name: y
      .string()
      .typeError(localeString(language, "fullNameRequired"))
      .required(localeString(language, "fullNameRequired"))
      .max(100, "Full Name should contain at most 100 characters.")
      .trim(),
    phone: y
      .string()
      .typeError(localeString(language, "phoneNoRequired"))
      .required(localeString(language, "phoneNoRequired"))
      .matches(
        /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
        localeString(language, "phoneNoRequired")
      )
      .max(100, "Phone number should contain at most 100 characters."),
    email: y
      .string()
      .email()
      .typeError(localeString(language, "emailRequired"))
      .required(localeString(language, "emailRequired"))
      .max(100, "Email should contain at most 100 characters."),
    gender: y
      .string()
      .typeError(localeString(language, "genderRequired"))
      .required(localeString(language, "genderRequired")),
    dob: y
      .string()
      .typeError(localeString(language, "dobRequired"))
      .required(localeString(language, "dobRequired")),
  });
};
