/** @format */

import { FC } from "react";
import { Controller } from "react-hook-form";
import { Radio, Space } from "antd";
import { Ioption } from "@/lib/model/myRequest";

interface CustomRadioGroupProps {
  name: string;
  control: any;
  options: Ioption[];
  errors?: any;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  className?: string;
  LayoutclassName?: string;
}

export const MembershipTypeButton: FC<CustomRadioGroupProps> = ({
  name,
  control,
  options,
  errors,
  disabled = false,
  direction = "horizontal",
  className,
  LayoutclassName = "grid grid-cols-1 md:grid-cols-2",
}) => {
  const errMsg = errors?.[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="radioGroupSection">
            <Radio.Group
              {...field}
              className={`${LayoutclassName}radioSection `}
            >
              {options?.length > 0 &&
                options?.map((option) => (
                  <div className={className} key={option?.value}>
                    <Radio value={option?.value}>
                      <div>{option?.label}</div>
                      <span>{option?.deiscription}</span>
                    </Radio>
                  </div>
                ))}
            </Radio.Group>
          </div>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </>
  );
};
