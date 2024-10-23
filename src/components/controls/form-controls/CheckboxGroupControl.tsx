import {FC} from "react";
import {Controller} from "react-hook-form";
import {Checkbox, Space} from "antd";

interface CheckboxGroupControlProps {
  control: any;
  name: string;
  options: any[];
}

export const CheckboxGroupControl: FC<CheckboxGroupControlProps> = ({
  name,
  control,
  options,
}) => {
  return (
    <div className="my-select-container">
      <Controller
        control={control}
        name={name}
        render={({field}) => <Checkbox.Group {...field} options={options} />}
      />
    </div>
  );
};
