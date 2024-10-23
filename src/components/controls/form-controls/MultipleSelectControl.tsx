import { FC, useState, useEffect } from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import { Ioption } from "@/lib/model";
interface MultipleSelectControlProps {
  name: string;
  control: any;
  label?: string;
  options: Ioption[];
  errors?: any;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  size?: "small" | "middle" | "large";
  width?: any;
  placeholder: string;
  multiple?: boolean;
  showSearch?: boolean;
  onChange?: (value: string | number, label: string | number) => void;
  onChangeField?: (value: any) => void;
  setValue?: any;
}

export const MultipleSelectControl: FC<MultipleSelectControlProps> = ({
  name,
  control,
  label = "",
  errors,
  disabled = false,
  multiple = true,
  placeholder,
  className = "",
  width = "w-full ",
  options,
  setValue,
  showSearch = true,
}) => {
  const errMsg = errors?.[name]?.message;

  const handleChange: any = (value: string) => {
    setValue(value);
  };

  // Custom filter function to search based on label
  const filterOption = (input: string, option: any) => {
    return option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            className={`md:-mt-3 py-1 w-full h-11 top-2 container-2 ${width} placeholder:!text-xs ${className} `}
            {...field}
            size="large"
            mode={multiple ? "multiple" : undefined}
            onChange={handleChange}
            tokenSeparators={[","]}
            options={options}
            showSearch={showSearch} // Enable search functionality
            filterOption={filterOption} // Use custom filter function
            bordered
            placeholder={placeholder}
          />
        )}
      />
      {errMsg && <p className="text-red-600 text-xs">{errMsg}</p>}
    </>
  );
};

export default MultipleSelectControl;
