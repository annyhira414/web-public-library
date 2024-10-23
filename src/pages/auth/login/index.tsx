import {useState, useEffect, FC} from "react";
import {GetServerSideProps} from "next";
import {Row, Col} from "antd";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, message} from "antd";
import {LoginForm, ForgotPasswordModal, OTPModal} from "@/components/auth";
import Link from "next/link";
import * as y from "yup";
import {getData, signInData} from "@/lib/services";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import {useRouter} from "next/router";

interface ILogin {
  language?: string;
}

const Login: FC<ILogin> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const myLoginSchema = loginSchema(language);

  const {previous} = router?.query;
  console.log(previous);

  const methods = useForm({
    mode: "all",
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(myLoginSchema),
  });
  const {
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleOtpModal = () => {
    setIsOtpModalOpen(!isOtpModalOpen);
  };

  useEffect(() => {
    if (phone) {
      toggleOtpModal();
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
    let phone = "";
    if (data.phone.startsWith("+88")) {
      phone = data.phone.slice(2);
    } else {
      phone = data.phone;
    }

    const res = await signInData("public_library/users/login", {
      phone,
      password: data.password,
    });

    if ([200, 201].includes(res?.status)) {
      const token = res?.data?.token;
      Cookies.set("token", res?.data?.token);
      Cookies.set("libraryCode", res?.data?.library_code);
      Cookies.set("libraryId", res?.data?.library_id);
      if (token !== "") {
        uerProfile(token);
      }
    } else {
      errorMsg(res?.data?.error);
    }
  };

  const uerProfile = async (token: string) => {
    const res = await getData(`public_library/users/profile`, {}, "", token);
    if (token) {
      Cookies.set("id", res?.data?.id);
      Cookies.set("fullName", res?.data?.full_name);
      Cookies.set("phone", res?.data?.phone);
      Cookies.set("email", res?.data?.email);
      Cookies.set("gender", res?.data?.gender);
      Cookies.set("dob", res?.data?.dob);
      Cookies.set("isMember", res?.data?.is_member);
      Cookies.set("membershipStatus", res?.data?.membership_status);
      Cookies.set("member_activated_at", res?.data?.member_activated_at);
      Cookies.set("is_publisher", res?.data?.is_publisher);
    }

    if (previous === "register" || "reset-password") {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <div className="pl-content-container">
      {contextHolder}

      <Row>
        <Col
          xs={{offset: 1, span: 22}}
          sm={{offset: 1, span: 22}}
          md={{offset: 7, span: 10}}
          lg={{offset: 7, span: 10}}
          xl={{offset: 7, span: 10}}
        >
          <div className="log-in-area bg-white border-gray-300 rounded-2xl my-20 shadow-sm">
            <h3 className="py-8 font-[playfairDisplay] font-bold text-3xl text-library-light-black text-center ">
              {localeString(language, "welcome")}
            </h3>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-12 custom-placeholder"
              >
                <LoginForm language={language} />
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="cursor-pointer my-2 h-5 font-medium text-xs text-library-primary block"
                    onClick={toggleModal}
                  >
                    {localeString(language, "forgotPassword")}
                  </button>
                </div>
                <div className="borrowBookButton">
                  <Button
                    // type="primary"
                    htmlType="submit"
                    className="mt-2 button-secondary h-11"
                    loading={isSubmitting}
                    block
                  >
                    {localeString(language, "logged")}
                  </Button>
                </div>

                <div className="text-xs flex mt-6 justify-center ">
                  <p className=" text-gray-700 mb-6 ">
                    {localeString(language, "haveNoAccount")}
                  </p>
                  <Link
                    className="ml-[2px] text-[#006A4E] cursor-pointer"
                    href="/auth/register"
                  >
                    {localeString(language, "register")}
                  </Link>
                </div>
              </form>
            </FormProvider>
          </div>
        </Col>
      </Row>
      <ForgotPasswordModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        setPhone={setPhone}
        language={language as string}
      />
      {phone && (
        <OTPModal
          isModalOpen={isOtpModalOpen}
          toggleModal={toggleOtpModal}
          passwordType="RESET_PASSWORD"
          otp_type="reset_password"
          phone={phone}
          setPhone={setPhone}
          language={language}
        />
      )}
    </div>
  );
};

export default Login;

const loginSchema = (language: string | undefined) => {
  return y.object().shape({
    phone: y
      .string()
      .typeError(localeString(language, "phoneNumberRequired"))
      .required(localeString(language, "phoneNumberRequired"))
      .matches(
        /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
        localeString(language, "phoneNumberRequired")
      ),
    password: y
      .string()
      .typeError(localeString(language, "requiredPassword"))
      .required(localeString(language, "requiredPassword"))
      .trim(),
  });
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      language: context?.req?.cookies?.["language"] || "bn",
    },
  };
};
