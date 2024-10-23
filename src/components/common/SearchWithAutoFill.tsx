import { FC, ChangeEvent } from "react";
import { AutoComplete } from "antd";

type InputEvent = ChangeEvent<HTMLInputElement>;

interface SearchComponentProps {
  name: string;
  control: any;
  errors?: any;
  value?: string;
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
  onSelect?: (value: string, option: any) => void;
  handleSearch?: (value: string) => void;
  onEnterPress: () => void;
  suggestions: any;

  // optionSelectedBg:any
}
export const SearchWithAutoFill: FC<SearchComponentProps> = ({
  name,
  control,
  errors,
  msg,
  disabled = false,
  placeholder = "",
  autoComplete = "fdgdgdgf",
  className = "",
  size = "middle",
  value = "",
  toUpper = false,
  onChangeField,
  maxLength = 999999,
  isGoNextField = false,
  prefix = "",
  allowClear = true,
  number = false,
  suggestions,
  onSelect,
  handleSearch,
  onEnterPress,

  // optionSelectedBg,
}) => {
  const options = [{ value: "category", label: "category" }];
  const handleKeyPress = (event: any) => {
    // console.log("i am click with", event);
    // return;
    if (event.key === "Enter") {
      // Call your function here
      onEnterPress();
    }
  };
  return (
    <div className="global-search-field ">
      <AutoComplete
        popupMatchSelectWidth={252}
        style={{ width: "100%" }}
        allowClear={allowClear}
        options={suggestions}
        value={value}
        onSelect={onSelect}
        onSearch={handleSearch}
        onKeyUp={handleKeyPress}
        size="large"
      ></AutoComplete>
    </div>
  );
};
