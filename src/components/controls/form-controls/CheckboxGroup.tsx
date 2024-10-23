import { FC } from "react";
import { Controller } from "react-hook-form";
import { Checkbox, Space } from "antd";
interface CheckboxGroupProps {
  control: any;
  name: string;
  options: any[];
}
export const CheckboxGroup: FC<CheckboxGroupProps> = ({ control, name, options }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Checkbox.Group className="flex flex-col gap-2 " {...field} options={options} />}
    />
  );
};
