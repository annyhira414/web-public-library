import { DatePickerControl } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";
import { getData, updateData } from "@/lib/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as y from "yup";

export const MemberDob = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [updateDob, setUpdateDob] = useState(false);
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [user, setUser] = useState<any>({});
  const mySignUpSchema = updateDobSchema(language);
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
    setValue("dob", user?.dob);
    setUpdateDob(true);
  };
  const onSubmit = async (data: any) => {
    let params: any = {};
    params["full_name"] = user.full_name;
    params["email"] = user.email;
    params["gender"] = user.gender;
    params["dob"] = data?.dob;
    const res = await updateData(
      `public_library/users/profile_update`,
      params,
      "",
      userToken
    );
    if (res?.success) {
      uerProfile();
      setUpdateDob(false);
    }
  };
  return (
    <>
      {contextHolder}
      {updateDob ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="border border-library-primary rounded">
              <legend className="px-1">
                {localeString(language, "dateOfBirth")}
              </legend>
              <div className="update-dob">
                <DatePickerControl
                  name="dob"
                  control={control}
                  errors={errors}
                  placeholder={localeString(language, "dateOfBirth")}
                  className="mb-2 border-none  focus:outline-none hover:border-none py-0"
                />
              </div>
            </fieldset>

            <div className="update-btn flex justify-end my-6">
              <div className="bookButton">
                <Button
                  onClick={() => setUpdateDob(false)}
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
            {localeString(language, "dateOfBirth")}
          </label>
          <div className="flex justify-between mb-2">
            <div className="title">
              <h2>{moment(user.dob).format("DD-MM-YYYY")}</h2>
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
const updateDobSchema = (language: string | undefined) => {
  return y.object().shape({
    dob: y
      .string()
      .typeError(localeString(language, "dobRequired"))
      .required(localeString(language, "dobRequired")),
  });
};
