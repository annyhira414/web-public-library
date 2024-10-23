/** @format */

import {FC} from "react";
import {Controller} from "react-hook-form";
import {Radio, Space} from "antd";
import {Ioption} from "@/lib/model/myRequest";

interface CustomRadioGroupProps {
  name: string;
  control: any;
  options: Ioption[];
  errors?: any;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  className: string;
  onChangeRate?: (value: number) => void;
  onClick?: () => void;
  onChange?: (value: string | number, label: string | number) => void;
  customsClass?: string;
  isIconcenter?: boolean;
}

export const CustomRadioGroup: FC<CustomRadioGroupProps> = ({
  name,
  control,
  onChangeRate,
  options,
  errors,
  disabled = false,
  direction = "horizontal",
  className,
  onClick,
  customsClass = "grid grid-cols-1 md:grid-cols-2",
  isIconcenter = false,
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field}) => (
          <div
            className={
              isIconcenter
                ? "radio-group-section-with-center"
                : "radio-group-section"
            }
          >
            <Radio.Group
              {...field}
              // disabled={disabled}
              // size="large"
              className={`${customsClass}  radioSection gap-4 my-radio-group`}
            >
              {options?.length > 0 &&
                options?.map((option) => (
                  <div className={`${className}`} key={option?.value}>
                    <Radio value={option?.value}>
                      <div>{option?.label}</div>
                      <span>{option?.deiscription}</span>
                    </Radio>
                  </div>
                ))}
            </Radio.Group>
          </div>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </>
  );
};
