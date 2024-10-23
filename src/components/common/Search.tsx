import React, { FC, useEffect, useState } from "react";
import { Input } from "../controls";
import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useDebounce } from "usehooks-ts";
interface SearchProps {
  placeholder: string;
  setKeywords?: any;
  className?: string;
  border?: any;
  width?: any;
}
export const Search: FC<SearchProps> = ({
  placeholder,
  setKeywords,
  className = "text-black",
  border = "border-card-bg",
  width = "w-full",
}) => {
  const { handleSubmit, control, reset, watch } = useForm();
  const [value, setvalue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);

  const inputValue = watch("search");
  useEffect(() => {
    setvalue(inputValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    setKeywords(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  return (
    <>
      <Input
        name="search"
        control={control}
        className={className}
        allowClear={true}
        placeholder={placeholder}
        prefix={<BiSearch />}
      />
    </>
  );
};
