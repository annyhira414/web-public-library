import { FC } from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "antd";

interface CheckboxControlProps {
  name: string;
  control: any;
  label: string;
  errors?: any;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export const CheckboxControl: FC<CheckboxControlProps> = ({
  name,
  control,
  label = "",
  errors,
  disabled = false,
  className = "",
  labelClassName = "",
}) => {
  const errMsg = errors?.[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            onChange={onChange}
            checked={value}
            disabled={disabled}
            id={name}
            className={`rounded my-1 ${className}`}
          >
            <span className={`text-xs ${labelClassName}`}>{label}</span>
          </Checkbox>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </>
  );
};
