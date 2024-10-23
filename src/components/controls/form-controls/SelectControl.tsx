import { FC, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Select } from "antd";
import { option } from "@/lib/model";

const { Option } = Select;

interface SelectControlProps {
  name: string;
  control: any;
  options: any;
  multiple?: boolean;
  errors?: any;
  msg?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  width?: any;
  showSearch?: boolean;
  allowClear?: boolean;
  onChangeOption?: (value: any) => void;
}

export const SelectControl: FC<SelectControlProps> = ({
  name,
  control,
  options,
  multiple = false,
  errors,
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  width = "w-full",
  onChangeOption,
  showSearch = true,
  allowClear = true,
}) => {
  const [optionList, setOptionList] = useState<any>([]);

  useEffect(() => {
    setOptionList(options);
  }, [options]);
  const errMsg = msg ? msg : errors?.[name]?.message;

  const filterOption = (input: string, option: any) => {
    return option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            mode={multiple ? "multiple" : undefined}
            disabled={disabled}
            className={`w-full h-11  ${width} placeholder:!text-xs ${className}`}
            status={errMsg && "error"}
            size="large"
            allowClear={allowClear}
            placeholder={placeholder || "this is placeholder message"}
            bordered
            onChange={(e) => {
              onChangeOption && onChangeOption(e);
              field.onChange(e);
            }}
            options={options}
            showSearch={showSearch} // Enable search functionality
            filterOption={filterOption} // Use custom filter function
          >
            {/* <Option value="">
              <span className="text-gray-400">{placeholder}</span>
            </Option>
            {optionList?.length > 0 &&
              optionList?.map((item: any, index: any) => (
                <Option key={index} value={item?.value}>
                  <span className="">{item?.label}</span>
                </Option>
              ))} */}
          </Select>
        )}
      />
      <p
        className={`text-red-600 text-xs ${
          msg && "-bottom-3 left-1"
        } text-xs block `}
      >
        {errMsg}
      </p>
    </>
  );
};
