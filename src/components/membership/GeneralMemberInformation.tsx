import { localeString } from "@/lib/helpers/utils";
import { Input, Select } from "@/components/controls";
import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Col, Image, Row, message } from "antd";
import { getData } from "@/lib/services";
import { ImageUploader } from "../controls";
import { acceptFileFormat } from "@/lib/constants";
import { useRouter } from "next/router";
interface IAddress {
  proPic?: File;
  nidFrontImage?: File;
  nidBackImage?: File;
}

export const GeneralMemberInformation: FC<IAddress> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const language = Cookies.get("language");
  const [baseLibraries, setBaseLibraries] = useState([]);
  const [toggleProPic, setToggleProPic] = useState(false);
  const [toggleNidFront, setToggleNidFront] = useState(false);
  const [toggleNidBack, setToggleNidBack] = useState(false);
  const [toggleBirthCertificate, setToggleBirthCertificate] = useState(false);
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const documentType = watch("documentType");
  const proPicFetch = watch("proPicFetch");
  const birthCertificateFetch = watch("birthCertificateFetch");
  const nidFrontEndFetch = watch("nidFrontImageFetch");
  const nidBackEndFetch = watch("nidBackImageFetch");
  const existPropic = watch("proPic");
  const existFrontImage = watch("nidFrontImage");
  const existBacktImage = watch("birthCertificateImage");
  const existBirthCertificate = watch("birthCertificateImage");
  const router = useRouter();
  const { mode } = router?.query;

  const getBaseLibrary = async () => {
    const res = await getData(
      `public_library/libraries/dropdown`,
      {},
      language
    );
    if (res.success) {
      setBaseLibraries(
        res?.data?.map((library: any) => {
          return { label: library?.name, value: library?.id };
        })
      );
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      };
      errorMsg("No data Found");
    }
  };
  useEffect(() => {
    getBaseLibrary();
  }, []);
  const DocumentType = [
    { id: 1, value: "nid", label: `${localeString(language, "nid")}` },
    {
      id: 2,
      value: "birth_certificate",
      label: `${localeString(language, "birthCertificate")}`,
    },
  ];

  return (
    <div>
      {contextHolder}
      <Row className="bg-white py-6 px-16 border-t-4 border-library-primary rounded-b-lg mt-5">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="baseLibrary-heading">
            <h4 className="font-bold font-playfairDisplay text-gray-700 text-xl">
              {localeString(language, "baseLibraryAndDocument")}
            </h4>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="baseLibrary-details border border-gray-200 shadow-sm shadow-pl-box-shadow p-6">
            <div className="select-diviosion">
              <label htmlFor="baseLibrary" className="text-sm text-gray-700">
                {localeString(language, "baseLibrary")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="baseLibrary"
                control={control}
                errors={errors}
                options={baseLibraries}
                placeholder={localeString(language, "selectbaseLibrary")}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="documentType">
              <label htmlFor="documentType" className="text-sm text-gray-700">
                {localeString(language, "documentType")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="documentType"
                control={control}
                errors={errors}
                options={DocumentType}
                placeholder={localeString(language, "selectDocumentType")}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="identityNumber">
              <label htmlFor="identitynumber" className="text-sm text-gray-700">
                {localeString(language, "identityNumber")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="identityNumber"
                control={control}
                errors={errors}
                placeholder={localeString(language, "identityNumber")}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="bg-white py-6 px-16 border-t-4 border-library-primary rounded-b-lg mt-5">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="uploadDocument-heading">
            <h4 className="font-bold font-playfairDisplay text-gray-700 text-xl">
              {localeString(language, "uploadDocument")}
            </h4>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          {router?.pathname === "/user/change-membership/upgrade-general" ? (
            ""
          ) : (
            <div className="profilepic-upload">
              <label
                htmlFor="profilepicUpload"
                className="text-sm text-gray-700"
              >
                {localeString(language, "profilePicture")}
              </label>
              <div className="pic-uploader mt-3">
                {mode == "edit" ? (
                  <>
                    {!existPropic?.fileList && (
                      <>
                        <Image src={proPicFetch || ""} width={80} alt="" />
                        <Button
                          className="mb-4 flex"
                          onClick={() => setToggleProPic(!toggleProPic)}
                        >
                          {localeString(language, "change")}
                        </Button>
                      </>
                    )}

                    {toggleProPic && (
                      <ImageUploader
                        name="proPic"
                        istext={"Upload Profile Picture"}
                        buttonText={"Upload Profile Picture"}
                        isButtonFullScreen
                        control={control}
                        errors={errors}
                        acceptFileFormat={acceptFileFormat}
                      />
                    )}
                  </>
                ) : (
                  <ImageUploader
                    name="proPic"
                    istext={"Upload Profile Picture"}
                    buttonText={"Upload Profile Picture"}
                    isButtonFullScreen
                    control={control}
                    errors={errors}
                    acceptFileFormat={acceptFileFormat}
                  />
                )}
              </div>
            </div>
          )}

          {documentType === "nid" ? (
            <>
              <div className="nid-uploader mt-4">
                <label
                  htmlFor="nidFrontpicUpload"
                  className="text-sm text-gray-700"
                >
                  {localeString(language, "nidFrontImage")}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-3">
                  {mode == "edit" ? (
                    <>
                      {!existFrontImage?.fileList && (
                        <>
                          <Image
                            src={nidFrontEndFetch || ""}
                            width={80}
                            alt=""
                          />
                          <Button
                            className="mb-4 flex"
                            onClick={() => setToggleNidFront(!toggleNidFront)}
                          >
                            {localeString(language, "change")}
                          </Button>
                        </>
                      )}

                      {toggleNidFront && (
                        <ImageUploader
                          name="nidFrontImage"
                          istext={"Upload NID Front Image"}
                          buttonText={"Upload NID Front Image"}
                          isButtonFullScreen
                          control={control}
                          errors={errors}
                          acceptFileFormat={acceptFileFormat}
                        />
                      )}
                    </>
                  ) : (
                    <ImageUploader
                      name="nidFrontImage"
                      istext={"Upload NID Front Image"}
                      buttonText={"Upload NID Front Image"}
                      isButtonFullScreen
                      control={control}
                      errors={errors}
                      acceptFileFormat={acceptFileFormat}
                    />
                  )}
                </div>
              </div>
              <div className="identityNumber-uploader mt-4">
                <label
                  htmlFor="nidbackImageUpload"
                  className="text-sm text-gray-700 "
                >
                  {localeString(language, "nidBackImage")}
                  <span className="text-red-700">*</span>
                </label>

                <div className="mt-3">
                  {mode == "edit" ? (
                    <>
                      {!existBacktImage?.fileList && (
                        <>
                          <Image
                            src={nidBackEndFetch || ""}
                            width={80}
                            alt=""
                          />
                          <Button
                            className="mb-4 flex"
                            onClick={() => setToggleNidBack(!toggleNidBack)}
                          >
                            {localeString(language, "change")}
                          </Button>
                        </>
                      )}

                      {toggleNidBack && (
                        <ImageUploader
                          name="nidBackImage"
                          istext={"Upload Nid BackImage"}
                          buttonText={"Upload Nid BackImage"}
                          isButtonFullScreen
                          control={control}
                          errors={errors}
                          acceptFileFormat={acceptFileFormat}
                        />
                      )}
                    </>
                  ) : (
                    <ImageUploader
                      name="nidBackImage"
                      istext={"Upload Nid BackImage"}
                      buttonText={"Upload Nid BackImage"}
                      isButtonFullScreen
                      control={control}
                      errors={errors}
                      acceptFileFormat={acceptFileFormat}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="identityNumber-uploader mt-4">
              <label
                htmlFor="profilepicUpload"
                className="text-sm text-gray-700"
              >
                {localeString(language, "birthCertificate")}
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-3">
                {mode == "edit" ? (
                  <>
                    {!existBirthCertificate?.fileList && (
                      <>
                        <Image
                          src={birthCertificateFetch || ""}
                          width={80}
                          alt=""
                        />
                        <Button
                          className="mb-4 flex"
                          onClick={() =>
                            setToggleBirthCertificate(!toggleBirthCertificate)
                          }
                        >
                          {localeString(language, "change")}
                        </Button>
                      </>
                    )}

                    {toggleBirthCertificate && (
                      <ImageUploader
                        name="birthCertificateImage"
                        istext={"Upload Birth Certificate Image"}
                        buttonText={"Upload Birth Certificate Image"}
                        isButtonFullScreen
                        control={control}
                        errors={errors}
                        acceptFileFormat={acceptFileFormat}
                      />
                    )}
                  </>
                ) : (
                  <ImageUploader
                    name="birthCertificateImage"
                    istext={"Upload Birth Certificate Image"}
                    buttonText={"Upload Birth Certificate Image"}
                    isButtonFullScreen
                    control={control}
                    errors={errors}
                    acceptFileFormat={acceptFileFormat}
                  />
                )}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
