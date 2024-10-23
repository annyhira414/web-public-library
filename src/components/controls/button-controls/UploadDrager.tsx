import { FC } from "react";
import { Upload } from "antd";
import { Controller } from "react-hook-form";
import { BsFillCloudUploadFill } from "react-icons/bs";

interface UploaderDragerButtonProps {
  control: any;
  name: string;
  label?: string;
  errors?: any;
  msg?: string;
  acceptFileFormat: any;
  afterFileUpload?: () => void;
}

export const UploaderDragerButton: FC<UploaderDragerButtonProps> = ({
  control,
  name,
  errors,
  msg,
  acceptFileFormat,
  afterFileUpload,
}) => {
  const errMsg = msg ? msg : errors?.[name]?.message;
  return (
    <div className="text-center">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Upload.Dragger
            {...field}
            multiple={true}
            accept={acceptFileFormat}
            maxCount={1}
            onChange={(e) => {
              field.onChange(e);
              afterFileUpload && afterFileUpload();
            }}
            beforeUpload={() => false}
          >
            <div className="appBody">
              <div className="identityPicture flex p-4">
                <div className="ant-upload-drag-icon ">
                  <BsFillCloudUploadFill className="text-grey-700 text-3xl" />
                </div>
                <div className="ant-upload-hint">
                  Drag and drop or chose a file to upload your document. All
                  PNG, JPG file types are supported
                </div>
              </div>
            </div>
          </Upload.Dragger>
        )}
      />
      {errMsg && <p className="text-red-600 text-xs">{errMsg}</p>}
    </div>
  );
};
