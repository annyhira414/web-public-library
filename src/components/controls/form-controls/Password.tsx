import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";

interface PasswordControlProps {
  name: string;
  control: any;
  errors?: any;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  OffCopyPaste?: boolean;
  autoComplete?: string;
}
export const PasswordControl: FC<PasswordControlProps> = ({
  name,
  control,
  errors,
  disabled = false,
  placeholder = "",
  className = "",
  autoComplete = "",
}) => {
  const errMsg = errors?.[name]?.message;
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input.Password
            allowClear
            {...field}
            id={name}
            className={`rounded my-1  ${className}`}
            status={errMsg && "error"}
            size="large"
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        )}
      />
      <p className="text-red-700 text-xs">{errMsg}</p>
    </div>
  );
};
