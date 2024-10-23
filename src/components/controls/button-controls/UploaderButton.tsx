import { FC } from "react";
import { Upload, Button } from "antd";
import { Controller } from "react-hook-form";
import { CameraFilled, UploadOutlined } from "@ant-design/icons";

interface UploaderButtonProps {
  control: any;
  name: string;
  label: string;
  acceptFileFormat: any;
  afterFileUpload?: () => void;
}

export const UploaderButton: FC<UploaderButtonProps> = ({
  control,
  name,
  label,
  acceptFileFormat,
  afterFileUpload,
}) => {
  return (
    <div className="text-center">
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
              afterFileUpload && afterFileUpload();
            }}
            beforeUpload={() => false}
          >
            <div className="appBody">
              <div className="">
                <CameraFilled />
              </div>
            </div>

            {/* <Button
              htmlType="button"
              type="primary"
              size="middle"
              className="btn-cancel text-xs shadow-none"
              icon={<UploadOutlined className="relative -top-0.5" />}
            >
              {label}
            </Button> */}
          </Upload>
        )}
      />
    </div>
  );
};
