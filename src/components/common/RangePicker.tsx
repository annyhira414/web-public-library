import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DateRangePickerControl } from "../controls/form-controls/DateRangePicker";
import Cookies from "js-cookie";
interface RangePickerProps {
  setDateRange: any;
  className?: string;
  placeholder?: any;
  startDate?: any;
  endDate?: any;
  format?:any
}
export const RangePicker: FC<RangePickerProps> = ({
  setDateRange,
  className = "",
  startDate,
  endDate,
  format,
}) => {
  const { handleSubmit, control, reset, watch } = useForm();
  const language = Cookies.get("language");

  const dataRange = watch("dataRange");
  useEffect(() => {
    setDateRange(dataRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRange]);

  return (
    <>
      <DateRangePickerControl
        name="dataRange"
        startDate={startDate}
        endDate={endDate}
        className={className}
        control={control}
       format={format}
      />
    </>
  );
};
