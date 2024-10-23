import {FC, useEffect, useState} from "react";
import {Modal, Button, message} from "antd";
import Image from "next/image";
import sorryImage from "../../../public/images/sorry.svg";
import Cookies from "js-cookie";
import Link from "next/link";
import {localeString} from "@/lib/helpers/utils";
import {RateControl, TextareaControl} from "../controls";
import {Form, useForm} from "react-hook-form";
import {BsStar} from "react-icons/bs";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {postData} from "@/lib/services";
import {useRouter} from "next/router";

const formSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  rate: z
    .number({required_error: "Ratting is require"})
    .min(1, {message: "Ratting is require"}),
});

interface IData {
  rate: number;
  comment: string;
}

interface IWriteReview {
  isModalVisible?: boolean;
  toggleModal?: () => void;
  slug: string;
}
export const WriteReview: FC<IWriteReview> = ({
  isModalVisible,
  toggleModal,
  slug,
}) => {
  const language = Cookies.get("language");
  const router = useRouter();
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
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: {isValid, isDirty},
  } = useForm({
    defaultValues: {
      comment: "",
      rate: NaN,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: IData) => {
    const res = await postData(
      `public_library/biblios/${slug}/reviews`,
      {
        text: data?.comment,
        rating: data?.rate,
      },
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      successMsg(localeString(language, "waitForAdmin"));
      toggleModal!();
      reset();
    } else {
      if (res?.status?.status === 401) {
        router.push("/auth/login");
      } else {
        errorMsg(res?.data?.error);
      }
    }
  };

  return (
    <>
      {contextHolder}

      <Modal
        open={isModalVisible}
        onOk={toggleModal}
        onCancel={toggleModal}
        className="check-availability"
        width={630}
      >
        <div className="py-16 md:px-24">
          <h1 className="section-title text-center mb-8">
            {localeString(language, "writeReview")}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-base">
                {" "}
                {localeString(language, "rateThisBook")}
              </p>
              <div className="text-sm">
                <RateControl name="rate" control={control} />
              </div>
            </div>
            <div className="mb-6 ">
              <p className="text-base mb-2">
                {localeString(language, "writeReview")}
              </p>
              <div>
                <TextareaControl name="comment" control={control} />
              </div>
            </div>
            <div className="borrowBookButton">
              <Button
                disabled={!isDirty || !isValid}
                className="button-secondary w-full"
                htmlType="submit"
              >
                {localeString(language, "writeReview")}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
