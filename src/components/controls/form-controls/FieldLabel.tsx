import {FC} from "react";

interface FieldLabelProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
}
export const FieldLabel: FC<FieldLabelProps> = ({
  name,
  label,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={name}
      //whitespace-nowrap
      className={` font-bold relative block ${className}`}
    >
      {label} {required && <span className="text-red-600">*</span>}
    </label>
  );
};
