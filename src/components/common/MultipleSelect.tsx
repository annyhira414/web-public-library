import { FC, useState, useEffect } from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import type { SelectProps } from "antd";

import { useForm } from "react-hook-form";
import { useDebounce } from "usehooks-ts";

const { Option } = Select;

interface option {
  value: string | number;
  label: any;
}
interface MultipleSelectProps {
  name: string;
  control: any;
  label?: string;
  options: option[];
  errors?: any;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  size?: "small" | "middle" | "large";
  width?: any;
  placeholder: string;
  multiple?: boolean;
  onChange?: (value: string | number, label: string | number) => void;
  onChangeField?: (value: any) => void;
  setValue?: any;
}

export const MultipleSelect: FC<MultipleSelectProps> = ({
  name,
  control,
  label = "",
  errors,
  disabled = false,
  multiple = true,
  placeholder,
  className = "",
  labelClassName = "",
  width = "w-full ",
  onChangeField,
  options,
  setValue,
}) => {
  const errMsg = errors?.[name]?.message;

  const { handleSubmit, reset, watch } = useForm();
  const [value, setvalue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);

  const [keywords, setKeywords] = useState("");
  const inputValue = watch("search");
  useEffect(() => {
    setvalue(inputValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    setKeywords(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleChange: any = (value: string) => {
    setValue(value);
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
            bordered
            placeholder={placeholder}
          />
        )}
      />
      {errMsg && <p className="text-red-600 text-xs">{errMsg}</p>}
    </>
  );
};

export default MultipleSelect;