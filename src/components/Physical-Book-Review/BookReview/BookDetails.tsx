import React, {FC, useEffect, useState} from "react";
import {localeString, objectToFormData} from "@/lib/helpers/utils";
import {useForm} from "react-hook-form";
import {Button} from "antd";
import ImageUploader from "@/components/controls/button-controls/ImageUploader";
import Cookies from "js-cookie";
import {postData} from "@/lib/services";
import {TextareaControl} from "@/components/controls/form-controls/TextAreaController";
import Image from "next/image";
import {yupResolver} from "@hookform/resolvers/yup";
import {IBookReview} from "../../../lib/model/physical-book-review/index";
import * as yup from "yup";
import {FieldLabel} from "@/components/controls";
import {ToastContainer} from "react-toastify";
import NoImageFound from "../../../../public/noImageFound.png";
import {useMediaQuery} from "usehooks-ts";

import {
  Ibarcode,
  IBookAuthor,
} from "../../../lib/model/physical-book-review/index";
import {scrollToTop} from "@/lib/helpers/utils";

interface IBookDetails {
  barcode: Ibarcode | undefined;
  barcodeData: IBookReview;
  onCancel: () => void;
  getlist: () => void;
}

const BookDetails: FC<IBookDetails> = ({
  barcode,
  barcodeData,
  getlist,
  onCancel,
}) => {
  const language: string | undefined = Cookies.get("language");

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<any>({
    defaultValues: {
      review_body: "",
      book_image_file: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    const res = await postData(
      `public_library/physical_reviews`,
      objectToFormData({
        review_body: data?.review_body || null,
        barcode: barcode || null,
        book_image_file: data?.book_image_file?.file,
      }),
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      scrollToTop();
      reset({});
      getlist();
      onCancel();
    }
  };
  const width = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <ToastContainer />
      <div className="pt-4">
        <div className="bg-white w-full h-full p-8">
          <div>
            <div>
              <div className="py-4 field-title">
                {localeString(language, "bookDetails")}
              </div>
              <div className="shadow shadow-shadow-color">
                <div className="p-4 flex justify-start">
                  <div className="w-24">
                    <Image
                      src={
                        width
                          ? barcodeData?.image_url?.desktop_image ||
                            NoImageFound
                          : barcodeData?.image_url?.tab_image || NoImageFound
                      }
                      alt="book Image"
                      width={80}
                      height={100}
                    />
                  </div>
                  <div className="">
                    <div className="title-sub pl-2">{barcodeData?.title}</div>

                    <div className="text-xs font-normal pt-2 pl-2">
                      {barcodeData?.authors?.map((item: IBookAuthor) =>
                        item?.full_name ? item?.full_name : "..."
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2 pt-6">
                  <FieldLabel
                    className="field-title pt-1 "
                    name="writeReview"
                    label={localeString(language, "writeReview")}
                    required
                  />
                  <div className="pt-2">
                    <TextareaControl
                      placeholder={localeString(language, "writeReview")}
                      name="review_body"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>
                <div>
                  <div className="py-2 field-title pt-6 ">
                    {localeString(language, "uploadImage")}
                  </div>
                  <ImageUploader
                    placeholder={localeString(language, "uploadImageTextBook")}
                    isButtonFullScreen
                    control={control}
                    name={"book_image_file"}
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <div className="py-3 pr-4 flex justify-end">
                    <Button
                      htmlType="submit"
                      disabled={!isDirty || isSubmitting}
                      className="sub-button w-full md:w-40 "
                    >
                      {localeString(language, "submit")}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
const schema = yup.object().shape({
  review_body: yup.string().required("Review is required"),
});
