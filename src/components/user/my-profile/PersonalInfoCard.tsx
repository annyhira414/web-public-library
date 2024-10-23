import { localeString } from "@/lib/helpers/utils";
import { Button, DatePicker, DatePickerProps, message } from "antd";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { getData, postData, updateData } from "@/lib/services";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Password } from "@/components/controls";
import { ProfileImage } from "./ProfileImage";
import "react-toastify/dist/ReactToastify.css";
import { MemberPhone } from "./MemberPhone";
import { MemberEmail } from "./MemberEmail";
import { MemberDob } from "./MemberDob";

interface IPersonalInfo {}

type Inputs = {
  fullName?: string;
  email?: string;
  gender?: string;
  dob?: string;
  password?: string;
};

export const PersonalInfoCard: FC<IPersonalInfo> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [user, setUser] = useState<any>({});
  const uerProfile = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      "",
      userToken
    );

    setUser(res.data);
  };
  useEffect(() => {
    uerProfile();
  }, []);
  const isMember = user?.is_member;

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValue("password", "");
  };

  const [updateNameEdit, setUpdateNameEdit] = useState(false);
  const [updateGenderEdit, setUpdateGenderEdit] = useState(false);

  const [updateName, setUpdateName] = useState("");
  const [updateGender, setUpdateGender] = useState("");

  const handleEditName = () => {
    setUpdateNameEdit(true);
  };

  const handleEditGender = () => {
    setUpdateGenderEdit(true);
  };

  // Update Button
  const handleUpDateUserName = async (e: any) => {
    e.preventDefault();
    let params: any = {};
    params["full_name"] = updateName;
    params["gender"] = user.gender;
    params["dob"] = user.dob;
    const res = await updateData(
      `public_library/users/profile_update`,
      params,
      "",
      userToken
    );
    uerProfile();
    setUpdateNameEdit(false);
  };

  const handleUpDateUserGender = async (e: any) => {
    e.preventDefault();
    let params: any = {};
    params["full_name"] = user.full_name;
    params["email"] = user.email;
    params["gender"] = updateGender;
    params["dob"] = user.dob;
    const res = await updateData(
      `public_library/users/profile_update`,
      params,
      "",
      userToken
    );

    uerProfile();
    setUpdateGenderEdit(false);
  };

  // Change OnClick
  const handleNameChange = (e: any) => {
    const updateUserName = e.target.value;
    setUpdateName(updateUserName);
  };

  const handleGenderChange = (e: any) => {
    const updateUserGender = e.target.value;
    setUpdateGender(updateUserGender);
  };

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

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = async (data: any) => {
    const params = {
      password: data?.password,
    };
    const res = await postData(
      `public_library/users/delete_account`,
      { ...params },
      language,
      userToken
    );
    if (res.success) {
      if (isMember === "true") {
        infoMsg(`${localeString(language, "memberDeleteNotification")}`);
      } else {
        infoMsg(`${localeString(language, "deleteAlert")}`);
        Cookies.remove("token");
        Cookies.remove("id");
        Cookies.remove("fullName");
        Cookies.remove("email");
        Cookies.remove("phone");
        Cookies.remove("dob");
        Cookies.remove("gender");
        Cookies.remove("membershipStatus");
        Cookies.remove("isMember");
        router.push("/user/my-profile/delete-profile");
      }
    } else {
      errorMsg(res?.data?.error);
    }
  };
  //membership edit message
  const showMesseage = () => {
    infoMsg(`${localeString(language, "editMessage")}`);
  };
  return (
    <>
      {contextHolder}
      <div className="profile-header flex gap-3">
        <ProfileImage />
        <div className="user-profile flex items-center">
          <h5 className="text-gray-700 font-bold font-playfairDisplay text-base">
            {localeString(language, "hello")}, <br />{" "}
            <span>{user.full_name}</span>
          </h5>
        </div>
      </div>

      <div className="info-card mt-6">
        <div className="info-heading">
          <h4 className="font-playfairDisplay text-xl text-gray-700 font-bold">
            {localeString(language, "personalInfo")}
          </h4>
        </div>
      </div>

      <div className="info-body bg-white p-8 gap-4 border rounded-md mt-4">
        {updateNameEdit ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <form>
                  <fieldset className="border border-library-primary rounded">
                    <legend className="px-1">
                      {localeString(language, "fullName")} :{" "}
                    </legend>
                    <div className="update-name">
                      <input
                        defaultValue={user.full_name}
                        {...register("fullName")}
                        className="p-2"
                        onChange={handleNameChange}
                      />
                    </div>
                  </fieldset>
                  <div className="update-btn flex justify-end my-6">
                    <div className="bookButton">
                      <Button
                        onClick={() => setUpdateNameEdit(false)}
                        className="mr-2 button-primary h-9"
                      >
                        {localeString(language, "cancelBtn")}
                      </Button>
                    </div>
                    <div className="borrowBookButton">
                      <Button
                        onClick={handleUpDateUserName}
                        className="button-secondary h-9"
                      >
                        {localeString(language, "saveBtn")}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </form>
            <div className="border-b"></div>
          </>
        ) : (
          <div className="personal-info-name border-b ">
            <label htmlFor="" className="font-bold text-sm text-gray-700 ">
              {localeString(language, "fullName")}
            </label>
            <div className="flex justify-between mb-2">
              <div className="title">
                <h2>{user.full_name}</h2>
              </div>
              <div className="action">
                <a
                  className="text-library-primary underline"
                  onClick={isMember ? showMesseage : handleEditName}
                >
                  {localeString(language, "edit")}
                </a>
              </div>
            </div>
          </div>
        )}
        <MemberPhone />
        <MemberEmail />

        {updateGenderEdit ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <form>
                  <fieldset className="border border-library-primary rounded">
                    <legend className="px-1">Gender: </legend>
                    <div className="update-gender">
                      <select
                        {...register("gender")}
                        onChange={handleGenderChange}
                      >
                        <option value="male">
                          {localeString(language, "male")}
                        </option>
                        <option value="female">
                          {localeString(language, "female")}
                        </option>
                        <option value="other">
                          {localeString(language, "others")}
                        </option>
                      </select>
                    </div>
                  </fieldset>
                  <div className="update-btn flex justify-end my-6">
                    <div className="bookButton">
                      <Button
                        onClick={() => setUpdateGenderEdit(false)}
                        className="mr-2 button-primary h-9"
                      >
                        {localeString(language, "cancelBtn")}
                      </Button>
                    </div>
                    <div className="borrowBookButton">
                      <Button
                        onClick={handleUpDateUserGender}
                        className="button-secondary h-9"
                      >
                        {localeString(language, "saveBtn")}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </form>
            <div className="border-b"></div>
          </>
        ) : (
          <div className="personal-info-Gender border-b mt-6">
            <label htmlFor="" className="font-bold text-sm text-gray-700 ">
              {localeString(language, "gender")}
            </label>
            <div className="flex justify-between mb-2">
              <div className="title">
                <h2 className="capitalize">{user.gender}</h2>
              </div>
              <div className="action ">
                <a
                  className="text-library-primary underline"
                  onClick={isMember ? showMesseage : handleEditGender}
                >
                  {localeString(language, "edit")}
                </a>
              </div>
            </div>
          </div>
        )}
        <MemberDob />
      </div>

      <div className="delete-accoutn mt-6">
        {!isMember ? (
          <div>
            <Button
              className="w-full button-cancel h-12 flex justify-between items-center"
              onClick={showModal}
              type="ghost"
            >
              <h2 className="font-bold font-playfairDisplay text-sm text-red-600">
                {localeString(language, "deleteAccount")}
              </h2>
              <div className="icon text-red-600 cursor-pointer mt-1">
                <AiOutlineRight />
              </div>
            </Button>
          </div>
        ) : (
          <Button
            className="w-full button-cancel h-12 flex justify-between items-center"
            onClick={showModal}
            disabled
          >
            <h2 className="font-bold font-playfairDisplay text-sm ">
              {localeString(language, "deleteAccount")}
            </h2>
            <div className="icon  mt-1">
              <AiOutlineRight />
            </div>
          </Button>
        )}
      </div>
      <div className="custom-modal">
        <Modal footer={null} open={isModalOpen} onCancel={handleCancel}>
          <div className="delete-user-modal">
            <div className="modal-heading">
              <div className="delete-modal-icon flex justify-center">
                <DeleteOutlined />
              </div>
              <div className="modal-delete-title flex justify-center">
                <h3 className="font-bold text-gray-700 font-playfairDisplay text-3xl my-4">
                  {localeString(language, "deleteModalHeading")}
                </h3>
              </div>
            </div>
            <div className="modal-delete-content text-justify px-8">
              <p className="text-gray-600 text-sm">
                {localeString(language, "deleteModalText")}
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="password-field px-8 mt-4">
                <Password
                  className="mb-2 border border-gray-400 rounded-md"
                  name="password"
                  control={control}
                  placeholder={localeString(language, "password")}
                  errors={errors}
                />
              </div>
              <div className="flex justify-evenly mt-4 ">
                <div className="cancleButton">
                  <Button
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className="button-cancel px-6 md:px-16 lg:px-16 xl:px-16 xxl:px-16 h-10 py-1"
                  >
                    {localeString(language, "cancelBtn")}
                  </Button>
                </div>
                <div className="borrowBookButton">
                  <Button
                    htmlType="submit"
                    className="button-secondary px-6 md:px-16 lg:px-16 xl:px-16 xxl:px-16 h-10 py-1"
                  >
                    {localeString(language, "deleteBtn")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};
