/** @format */

import { Button, Divider, Modal, Row, Col, message } from "antd";
import { Input, Select } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { getData, postData } from "@/lib/services";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import QRCode from "react-qr-code";
import { humanize } from "@/lib/helpers/utils";

import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

interface IEnterLibrary {
  language: string | undefined;
}
const QrGenerateForm: FC<IEnterLibrary> = ({ language }) => {
  const router = useRouter();
  const [selectSection, setSelectSection] = useState([
    {
      id: 1,
      name: `${localeString(language, "libraryJournal")}`,
      value: "journal",
      selected: false,
    },
    {
      id: 2,
      name: `${localeString(language, "libraryBook")}`,
      value: "book",
      selected: false,
    },
    {
      id: 3,
      name: `${localeString(language, "libraryNewspaper")}`,
      value: "newspaper",
      selected: false,
    },
    {
      id: 4,
      name: `${localeString(language, "libraryOthers")}`,
      value: "others",
      selected: false,
    },
  ]);
  const [qrvalue, setQrValue] = useState<string>("hello");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [option, setOption] = useState<any>([]);
  const [event, setEvent] = useState<any>({});
  const [messageApi, contextHolder] = message.useMessage();
  const [url, setUrl] = useState<any>("");
  const [qrData, setQrData] = useState<any>("");
  const lang = Cookies.get("language");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const response = await getData(
      `/public_library/libraries/dropdown`,
      {},
      lang,
      Cookies.get("token")
    );
    if (response?.success) {
      setEvent(response?.data);
      const options = response?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.code,
          label: item?.name,
        };
      });
      setOption(options);
    } else {
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      library_code: "",
    },
    mode: "all",
    // resolver: yupResolver(signUpSchema),
  });
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const onSubmit = async (data: any) => {
    const params = {
      library_code: data?.code,
      services: selectSection
        ?.filter((item: any) => item?.selected == true)
        ?.map((st: any) => {
          return st?.value;
        }),
    };
    const res = await postData(
      `/public_library/user_qr_codes`,
      { ...params },
      language,
      Cookies.get("token")
    );

    const successMsg = (msg: string) => {
      messageApi.open({
        type: "success",
        content: msg,
      });
    };
    if (res.status?.status === 400) {
      errorMsg(res.data?.error);
    }
    if (res?.success) {
      setQrValue(res?.data?.data?.qr_code);
      setQrData(res?.data?.data);
      res?.data?.data?.qr_code && showModal();
    } else {
      errorMsg(res.data?.error);
    }
  };
  const handleSelected = (id: number) => {
    const updatedSelect = selectSection.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item?.selected };
      }
      return item;
    });
    setSelectSection(updatedSelect);
  };

  const download = () => {
    const svg: any = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${imageUrl}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  return (
    <>
      {contextHolder}
      <div>
        <ToastContainer autoClose={2000} />
        <h1 className="section-title text-xl">
          {localeString(language, "EnterLibraryGenerate")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-library-white h-96 p-7 mt-5">
            <h2 className="section-title text-base font-semibold">
              {localeString(language, "EnterLibrarySelect")}
            </h2>
            <Select
              name="code"
              control={control}
              errors={errors}
              options={option}
              placeholder={localeString(language, "EnterLibrarySelect")}
              className="mt-4 h-10 "
            />
            <Divider />
            <h2 className="section-title text-base font-semibold">
              {localeString(language, "EnterLibraryService")}
            </h2>
            <p className="mt-3">
              {selectSection.map((item: any, i: number) => (
                <button
                  key={item.id}
                  onClick={() => handleSelected(item?.id)}
                  type="button"
                  className={
                    item?.selected
                      ? `border rounded-md mt-2 lg:mr-5 xs:mr-5 lg:w-32 w-full  h-12 border-library-primary bg-[#E6F0ED]`
                      : `border rounded-md mt-2 lg:mr-5 xs:mr-5 lg:w-32 w-full h-12 bg-gray-100`
                  }
                >
                  {item?.name}
                </button>
              ))}
            </p>
            <div className="lg:flex lg:justify-center borrowBookButton">
              <Button
                disabled={
                  !isDirty ||
                  !isValid ||
                  isSubmitting ||
                  !selectSection?.filter((item: any) => item?.selected === true)
                    ?.length
                }
                htmlType="submit"
                className="mt-10 button-secondary w-full lg:w-60 h-12"
                // type="primary"
              >
                {localeString(language, "enterTheLibraryButton")}
              </Button>
            </div>
          </div>
        </form>
        <div>
          <Modal
            centered
            className="-mt-10"
            footer={null}
            open={isModalOpen}
            onCancel={handleCancel}
          >
            <Row>
              <Col
                className="w-40 h-40"
                lg={{ span: 8, offset: 8 }}
                xs={{ span: 12, offset: 6 }}
              >
                <QRCode
                  className="border rounded p-2"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrvalue}
                  viewBox={`0 0 256 256`}
                  id="QRCode"
                />
              </Col>
              <Col lg={{ span: 8, offset: 8 }} xs={{ span: 9, offset: 5 }}>
                <h3 className="w-[150px] lg:w-[158px] ml-3 lg:ml-0 mt-1 p-1 text-center rounded-md text-[#024F9C] font-semibold bg-library-light-secondary-green text-[10px]">
                  {localeString(language, "qrCodeExpire")} -
                  {moment(qrData?.expired_at).format(" D MMMM YYYY")}
                </h3>
              </Col>
              <Col lg={{ span: 12, offset: 6 }} xs={{ span: 24 }}>
                <div className="xs:text-center lg:text-start">
                  <h2 className="font-semibold text-sm mt-11">
                    {localeString(language, "qrCodeID")}
                  </h2>
                  <h3 className="mt-2 text-library-light-black text-sm border-b pb-1">
                    {qrData?.user_uniq_id}
                  </h3>
                  <h2 className="font-semibold text-sm mt-7">
                    {localeString(language, "qrCodeLibrary")}
                  </h2>
                  <h3 className="mt-2 text-library-light-black text-sm border-b pb-1">
                    {qrData?.library?.name}
                  </h3>
                  <h2 className="font-semibold text-sm mt-7">
                    {localeString(language, "qrCodeServices")}
                  </h2>
                  <h3 className="mt-2 text-library-light-black text-sm border-b pb-1">
                    {(qrData?.services || [])
                      .map((service: string) => humanize(service))
                      ?.join(", ")}
                  </h3>
                </div>
              </Col>
            </Row>
            <div className="flex justify-center borrowBookButton">
              <Button
                onClick={() => {
                  download();
                  handleCancel();
                  location.reload();
                }}
                className="w-64 button-secondary mt-12 h-12"
              >
                {localeString(language, "qrCodeButton")}
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default QrGenerateForm;
