import { FC, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Rate } from "antd";
import { BsStar } from "react-icons/bs";

interface RateControlProps {
  name: string;
  control: any;
  errors?: any;
  msg?: string;
  disabled?: boolean;
  className?: string;
  allowHalf?: boolean;
  onChangeRate?: (value: number) => void;
}

export const RateControl: FC<RateControlProps> = ({
  name,
  control,
  errors,
  msg,
  disabled = false,
  className = "",
  onChangeRate,
  allowHalf = false,
}) => {
  const errMsg = msg ? msg : errors?.[name]?.message;
  const [rateHover, setRateHover] = useState(-1);

  // const handleRateChange = (value: number) => {
  //   onChangeRate && onChangeRate(value);
  // };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Rate
            {...field}
            allowHalf={allowHalf}
            disabled={disabled}
            className={`rate-control ${className}`}
            defaultValue={2}
            value={field.value}
            onChange={(e) => {
              onChangeRate && onChangeRate(e);
              field.onChange(e);
            }}
            onHoverChange={(hoverValue) => setRateHover(hoverValue)}
            // character={({ index }: { index: number }) => customIcons[index + 1]}
          />
        )}
      />
      <p className={`text-red-600 text-xs ${msg && "-bottom-3 left-1"} block`}>
        {errMsg}
      </p>
    </>
  );
};
