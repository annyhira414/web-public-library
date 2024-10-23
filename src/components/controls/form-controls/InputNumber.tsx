import {FC} from "react";
import {Controller} from "react-hook-form";
import {InputNumber} from "antd";

interface InputNumberControlProps {
  name: string;
  control: any;
  errors?: any;
  disabled?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  className?: string;
  step?: number;
  OffCopyPaste?: boolean;
  defaultValue?: number;
}
export const InputNumberControl: FC<InputNumberControlProps> = ({
  name,
  control,
  errors,
  disabled = false,
  placeholder = "",
  max = 999999999,
  min = 0,
  className = "",
  step = 1,
  defaultValue = "",
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field}) => (
          <InputNumber
            {...field}
            id={name}
            className={`rounded my-1 overflow-hidden  ${className}`}
            status={errMsg && "error"}
            size="large"
            max={max}
            min={min}
            step={step}
            disabled={disabled}
            placeholder={placeholder}
            style={{width: "100%"}}
            defaultValue={defaultValue}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </>
  );
};
