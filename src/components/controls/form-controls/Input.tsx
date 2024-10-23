import {FC, ChangeEvent} from "react";
import {Controller} from "react-hook-form";
import {Input} from "antd";
import {BiSearch} from "react-icons/bi";
import {boolean} from "yup";

type InputEvent = ChangeEvent<HTMLInputElement>;

interface InputControlProps {
  name: string;
  type?: string;
  control: any;
  errors?: any;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  toUpper?: boolean;
  maxLength?: number;
  number?: boolean;
  isGoNextField?: boolean;
  prefix?: any;
  allowClear?: boolean;
  onChangeField?: () => void;
  readOnly?: any;
}
export const InputControl: FC<InputControlProps> = ({
  name,
  type = "text",
  control,
  errors,
  msg,
  disabled = false,
  placeholder = "",
  autoComplete = "",
  className = "",
  size = "large",
  defaultValue = "",
  toUpper = false,
  onChangeField,
  maxLength = 999999,
  isGoNextField = false,
  prefix = "",
  allowClear = false,
  number = false,
  readOnly = "",
}) => {
  const onInputChange = (e: InputEvent) => {
    if (isGoNextField) {
      const nextElementSibling = e.target
        .nextElementSibling as HTMLInputElement | null;
      if (
        (parseInt(e.target.value) || parseInt(e.target.value) === 0) &&
        nextElementSibling
      ) {
        nextElementSibling.focus();
      }
    }
    if (number) {
      e.target.value =
        parseInt(e.target.value) || parseInt(e.target.value) === 0
          ? e.target.value
          : "";
    } else {
      e.target.value = toUpper ? e.target.value.toUpperCase() : e.target.value;
    }
    onChangeField && onChangeField();
  };

  const errMsg = msg ? msg : errors?.[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field}) => (
          <Input
            allowClear={allowClear}
            {...field}
            type={type}
            id={name}
            className={`rounded  py-2    ${className} `}
            status={errMsg && "error"}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onInput={onInputChange}
            autoComplete={autoComplete}
            maxLength={maxLength}
            prefix={prefix ? prefix : ""}
            readOnly={readOnly}
          />
        )}
      />
      {errMsg && <p className="text-red-600 text-xs">{errMsg}</p>}
    </>
  );
};
