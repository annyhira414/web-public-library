import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Button, Modal, message } from "antd";
import { ImageUploader } from "@/components/controls";
import { acceptFileFormat } from "@/lib/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { getData, updateData } from "@/lib/services";
import Cookies from "js-cookie";
import { localeString, objectToFormData } from "@/lib/helpers/utils";
import { AiFillCamera } from "react-icons/ai";

type Inputs = {};
export const ProfileImage = () => {
  const userToken = Cookies.get("token");
  const language = Cookies.get("language");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getProfileDetails();
  }, []);
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const getProfileDetails = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setUserDetails(res?.data);
    } else {
      errorMsg(res?.data?.error);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    let params: any = {
      image_file: data?.propic?.file,
    };
    const proPic = objectToFormData(params);
    const res: any = await updateData(
      `public_library/users/profile_image_update`,
      proPic,
      undefined,
      userToken
    );

    if (res?.success) {
      Cookies.remove("proPic");
      Cookies.get("proPic");
      getProfileDetails();
      setIsModalOpen(false);
    } else {
      errorMsg(res?.data?.data?.error);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="avatar relative">
        {userDetails?.profile_image_url ? (
          <div className="profilepic">
            <Image
              src={userDetails?.profile_image_url}
              alt="user profile"
              fill={true}
              className="rounded-full border border-gray-300 p-1 bg-library-white"
            />
          </div>
        ) : (
          <Avatar
            className="cursor-pointer"
            size={80}
            icon={
              <Image
                src="/icons/user.png"
                alt="App logo"
                width={28}
                height={28}
                className="p-2 bg-white"
              />
            }
          />
        )}

        <div className="update-pic-btn absolute top-10 left-14 ">
          <Button
            onClick={showModal}
            className="bg-white border-0 shadow-none rounded-full p-2"
          >
            <AiFillCamera />
          </Button>
        </div>
        <Modal
          footer={null}
          maskClosable={false}
          open={isModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <ImageUploader
                control={control}
                name="propic"
                isButtonFullScreen={false}
                errors={errors}
                acceptFileFormat={acceptFileFormat}
              />
              <div className="upload-msg flex items-center">
                <span>
                  <p className="text-red-700 text-xs">
                    {localeString(language, "updatePropicFormat")}
                  </p>
                  <p className="text-red-700 text-xs mt-2">
                    {localeString(language, "updatePropicError")}
                  </p>
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="borrowBookButton">
                <Button
                  loading={isSubmitting}
                  className="button-secondary h-8 mr-2"
                  htmlType="submit"
                  disabled={!isDirty}
                >
                  {localeString(language, "update")}
                </Button>
              </div>
              <div className="cancleButton">
                <Button className="button-cancel h-8" onClick={handleCancel}>
                  {localeString(language, "cancel")}
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};
