/* eslint-disable react/no-unescaped-entities */
import React, {
  useState,
  FC,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CameraFilled, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { Controller } from "react-hook-form";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { getBase64 } from "@/lib/helpers";
import Image from "next/image";
import { Col, Divider, Row } from "antd";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";
import { ref } from "yup";

interface ImageUploaderProps {
  control: any;
  name: string;
  errors?: any;
  msg?: string;
  disabled?: boolean;
  acceptFileFormat?: any;
  imagelink?: Array<any>;
  afterFileUpload?: () => void;
  isButtonFullScreen: boolean;
  istext?: string;
  placeholder?: string;
  required?: boolean;
  buttonText?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  control,
  name,
  errors,
  msg,
  disabled = false,
  acceptFileFormat,
  afterFileUpload,
  imagelink = [],
  isButtonFullScreen = true,
  istext,
  placeholder,
  required,
  buttonText = "",
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(imagelink);
  const language = Cookies.get("language");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  let errMsg = msg ? msg : errors?.[name]?.message;

  const uploadButton = (
    <div className="icon text-library-primary text-3xl w-full">
      <CameraFilled className="items-center" />
      <p className="text-center sub-text pb-4 w-full ">
        {placeholder} {required && <span className="text-red-700">*</span>}
        {buttonText}
        {/* {localeString(language, "uploadBookCoverPhoto")} */}
        {/* {`${
          !istext
            ? name 
            // localeString(language, "uploadBookCoverPhoto")
            : "Upload  Picture of Library Card* "
        }  `} */}
      </p>
      <p className="error-msg">{errMsg}</p>
    </div>
  );

  return (
    <div className={`${isButtonFullScreen ? "image-full-screen" : ""}`}>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          xxl={{ span: 24 }}
        >
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Upload
                {...field}
                multiple={false}
                accept={acceptFileFormat}
                maxCount={1}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                  afterFileUpload && afterFileUpload();
                }}
                onRemove={(file) => {
                  setFileList([]);
                  field.onChange(file);
                }}
                onPreview={handlePreview}
                fileList={fileList}
                listType="picture-card"
                beforeUpload={() => false}
                disabled={disabled}
                defaultFileList={[...fileList]}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            )}
          />
          <Modal
            open={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <Image
              alt="profile image"
              src={previewImage}
              width={400}
              height={500}
            />
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default ImageUploader;
