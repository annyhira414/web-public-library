import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface InputSearchProps {
  setKeywords?: any;
  name: string;
  type?: string;
  control: any;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  size?: "small" | "middle" | "large";
  allowClear?: boolean;
}
export const InputSearch: FC<InputSearchProps> = ({
  setKeywords,
  name,
  type = "text",
  control,
  disabled = false,
  placeholder = "",
  className = "",
  size = "small",
  defaultValue = "",
  allowClear = false,
}) => {
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            allowClear={allowClear}
            {...field}
            type={type}
            id={name}
            className={`rounded my-1 py-2 !h-10 ${className}`}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            prefix={<SearchOutlined className="text-gray-400 !text-base" />}
          />
        )}
      />
    </div>
  );
};
