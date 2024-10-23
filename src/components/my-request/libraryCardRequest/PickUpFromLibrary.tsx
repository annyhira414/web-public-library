import React, {FC, useState, useEffect, useRef} from "react";
import {Button, message} from "antd";
import {localeString} from "@/lib/helpers/utils";
import ImageUploader from "@/components/controls/button-controls/ImageUploader";
import Cookies from "js-cookie";
import {getData, postData} from "@/lib/services";
import * as z from "zod";
import {Ioption, ILibrary} from "@/lib/model/myRequest";
import {objectToFormData} from "@/lib/helpers/utils";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {ToastContainer} from "react-toastify";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select} from "@/components/controls";

interface IApplyForCard {
  language: string | undefined;
  reason: string;
}

export const PickUpFromLibrary: FC<IApplyForCard> = ({reason}) => {
  const picupSchema =
    reason === "lost"
      ? z.object({
          reason: z.string().nonempty("Select a reason"),
          delivery: z.string().nonempty("Select delivery method"),
          issued_library_id: z.number({
            required_error: "Library required",
            invalid_type_error: "Library required",
          }),
          gd_image_file: z.any().refine((data) => data?.fileList?.length >= 1, {
            message: "GD image is required ",
            path: ["gd_image_file"],
          }),
        })
      : z.object({
          reason: z.string().nonempty("Select a reason"),
          delivery: z.string().nonempty("Select delivery method"),
          issued_library_id: z.number({
            required_error: "Library required",
            invalid_type_error: "Library required",
          }),
          gd_image_file: z.any(),
        });

  const language: string | undefined = Cookies.get("language");
  const [allLibrary, setAllLibrary] = useState<ILibrary[]>([]);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [option, setOption] = useState<Ioption[]>([]);
  const [imageUploaderKey, setImageUploaderKey] = useState(0);
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: {errors, isValid},
  } = useForm<any>({
    defaultValues: {
      reason: "lost",
      delivery: "pickup",
      issued_library_id: parseInt(Cookies.get("libraryId") as string),
      gd_image_file: "",
    },

    mode: "all",
    resolver: zodResolver(picupSchema),
  });

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  useEffect(() => {
    getLibrary();
  }, []);

  const getLibrary = async () => {
    const response = await getData(
      `/public_library/libraries/dropdown`,
      {},
      language,
      Cookies.get("token")
    );
    if (response?.success) {
      setAllLibrary(response?.data);
      const options = response?.data?.map((item: any) => {
        return {
          value: item?.id,
          label: item?.name,
        };
      });
      setOption(options);
    }
  };

  useEffect(() => {
    router.replace({
      pathname: "/my-request/library-card-request",
      query: {
        reason: reason,
        delivery: "pickup",
      },
    });
  }, [reason]);

  const onSubmit = async (data: any) => {
    let libraryCardRequestData = {
      apply_reason: reason,
      delivery_type: "pickup",
      issued_library_id: data?.issued_library_id,
      gd_image_file: data?.gd_image_file?.file,
    };
    const res = await postData(
      `public_library/library_cards/apply`,
      objectToFormData({...libraryCardRequestData}),
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      router.push("");
      reset();
      setImageUploaderKey((prevKey) => prevKey + 1);
    } else {
      errorMsg(res?.data?.data?.error);
    }
  };
  return (
    <div className="">
      {contextHolder}
      <ToastContainer autoClose={2000} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <div className="bg-white h-full w-full mt-8 rounded-lg ">
            <h2 className="card-title pt-4 pl-4">
              {localeString(language, "selectLibrary")}
            </h2>
            <div className="pr-4 pl-4 rounded-lg pt-4 ">
              <Select
                name="issued_library_id"
                control={control}
                allowClear={false}
                errors={errors}
                options={option}
                placeholder={localeString(language, "EnterLibrarySelect")}
                className="h-10 mb-5"
              />
            </div>
          </div>
        </>
        <>
          <div key={imageUploaderKey} className="pt-6">
            <div className="border-gray-300 rounded-2xl">
              {
                <ImageUploader
                  placeholder={
                    reason === "lost"
                      ? localeString(language, "uploadGeneralDiary")
                      : localeString(language, "uploadDamagePhoto")
                  }
                  isButtonFullScreen
                  control={control}
                  name="gd_image_file"
                  errors={errors}
                />
              }
            </div>
          </div>
        </>
        <div className="pt-6 w-full md:flex md:justify-end">
          <div className="lg:w-72 borrowBookButton">
            <Button
              htmlType="submit"
              className="button-secondary"
              disabled={!isValid}
              block
            >
              {localeString(language, "submit")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
