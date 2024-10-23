import { Input } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";
import { getData, updateData } from "@/lib/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as y from "yup";

export const MemberEmail = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [updateEmail, setUpdateEmail] = useState(false);
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [user, setUser] = useState<any>({});
  const mySignUpSchema = updateEmailSchema(language);
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const infoMsg = (msg: string) => {
    messageApi.open({
      type: "warning",
      content: msg,
    });
  };

  const showMesseage = () => {
    infoMsg(`${localeString(language, "editMessage")}`);
  };
  const uerProfile = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      "",
      userToken
    );
    if (res?.success) {
      setUser(res.data);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  useEffect(() => {
    uerProfile();
  }, []);
  const isMember = user?.is_member;
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(mySignUpSchema),
  });

  const handleEditEmail = () => {
    setValue("email", user?.email);
    setUpdateEmail(true);
  };
  const onSubmit = async (data: any) => {
    console.log("Clicked");
    let params: any = {};
    params["full_name"] = user.full_name;
    params["email"] = data?.email;
    params["gender"] = user.gender;
    params["dob"] = user.dob;
    const res = await updateData(
      `public_library/users/profile_update`,
      params,
      "",
      userToken
    );
    if (res?.success) {
      uerProfile();
      setUpdateEmail(false);
    }
  };
  return (
    <>
      {contextHolder}
      {updateEmail ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="border border-library-primary rounded">
              <legend className="px-1">
                {localeString(language, "email")}
              </legend>
              <div className="update-email">
                <Input
                  name="email"
                  type="email"
                  control={control}
                  errors={errors}
                  placeholder={localeString(language, "regEmail")}
                  className="mb-2 border-none  focus:outline-none hover:border-none py-0"
                />
              </div>
            </fieldset>

            <div className="update-btn flex justify-end my-6">
              <div className="bookButton">
                <Button
                  onClick={() => setUpdateEmail(false)}
                  className="mr-2 button-primary h-9"
                >
                  {localeString(language, "cancelBtn")}
                </Button>
              </div>
              <div className="borrowBookButton">
                <Button htmlType="submit" className="button-secondary h-9">
                  {localeString(language, "saveBtn")}
                </Button>
              </div>
            </div>
          </form>
          <div className="border-b"></div>
        </>
      ) : (
        <div className="personal-info-email border-b mt-6">
          <label htmlFor="" className="font-bold text-sm text-gray-700 ">
            {localeString(language, "regEmail")}
          </label>
          <div className="flex justify-between mb-2">
            <div className="title">
              <h2>{user?.email}</h2>
            </div>
            <div className="action">
              <a
                className="text-library-primary underline"
                onClick={isMember ? showMesseage : handleEditEmail}
              >
                {localeString(language, "edit")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const updateEmailSchema = (language: string | undefined) => {
  return y.object().shape({
    email: y
      .string()
      .email()
      .typeError(localeString(language, "emailRequired"))
      .required(localeString(language, "emailRequired"))
      .max(100, "Email should contain at most 100 characters."),
  });
};
