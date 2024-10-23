import {FC, useState, useEffect} from "react";
import {Controller} from "react-hook-form";
import {Input} from "antd";

interface TextareaControlProps {
  name: string;
  control: any;
  errors?: any;
  msg?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  width?: any;
  onChangeValue?: (value: any) => void;
  defaultValue?: string;
}

export const TextareaControl: FC<TextareaControlProps> = ({
  name,
  control,
  errors,
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  width = "w-full",
  onChangeValue,
  defaultValue = "",
}) => {
  const errMsg = msg ? msg : errors?.[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field}) => (
          <Input.TextArea
            {...field}
            disabled={disabled}
            className={`${width} ${className}`}
            autoSize={{minRows: 3, maxRows: 6}}
            placeholder={placeholder || "Enter text here..."}
            onChange={(e) => {
              onChangeValue && onChangeValue(e.target.value);
              field.onChange(e);
            }}
            defaultValue={defaultValue}
          />
        )}
      />
      <p className={`text-red-600 text-xs ${msg && "-bottom-3 left-1"} block`}>
        {errMsg}
      </p>
    </>
  );
};
