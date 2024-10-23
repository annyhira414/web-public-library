import React, {FC, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import {useForm} from "react-hook-form";
import {Input, FieldLabel} from "@/components/controls";
import {message} from "antd";
import {Button} from "antd";
import Cookies from "js-cookie";
import {getData} from "@/lib/services";
import {yupResolver} from "@hookform/resolvers/yup";

import {
  Ibarcode,
  IBookReview,
} from "../../../lib/model/physical-book-review/index";

import * as yup from "yup";

import {ToastContainer} from "react-toastify";
import BookDetails from "@/components/Physical-Book-Review/BookReview/BookDetails";
import {getAData} from "@/lib/services/baseServices";

const defaultValues = {
  barcode: "",
};
const schema = yup.object().shape({
  barcode: yup.string().required("Barcode is required"),
});

interface IWriteReview {
  getlist: () => void;
}

const WriteReview: FC<IWriteReview> = ({getlist}) => {
  const language: string | undefined = Cookies.get("language");
  const [barcodeData, setBarcodeData] = useState<IBookReview | null>();
  const [barcodeProps, setBarcodeProps] = useState<Ibarcode>();

  const [messageApi, contextHolder] = message.useMessage();
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<any>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const barcode = getValues("barcode");
    setBarcodeProps(barcode);
    if (barcode) {
      const res: any = await getAData(
        `public_library/biblio_items/${barcode}`,
        {},
        language,
        Cookies.get("token")
      );
      if (res?.success) {
        setBarcodeData(res?.data);
      } else {
        errorMsg(res?.data?.error);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <ToastContainer autoClose={2000} />
      <div className="pt-4 pb-8">
        <div className="bg-white w-full h-full p-8 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-4">
                <FieldLabel
                  className="pt-1 field-title"
                  name="barcodeNo"
                  label={localeString(language, "barcodeNo")}
                  required
                />
                <div className="pt-2 ">
                  <Input
                    className="h-12"
                    name="barcode"
                    placeholder={localeString(language, "barcodeNo")}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <div className="py-3 flex justify-end bookButton">
                  <Button
                    htmlType="submit"
                    className="sub-button button-primary"
                  >
                    {localeString(language, "search")}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {barcodeData && (
          <BookDetails
            barcode={barcodeProps}
            barcodeData={barcodeData}
            getlist={getlist}
            onCancel={() => {
              successMsg("Review added successfully");
              setBarcodeData(null);
              reset({});
            }}
          />
        )}
      </div>
    </>
  );
};

export default WriteReview;
