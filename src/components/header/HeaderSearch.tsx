import { FC } from "react";
import { useForm } from "react-hook-form";
import { InputSearch } from "@/components/controls";
import { CgArrowLongLeft } from "react-icons/cg";
import { localeString } from "@/lib/helpers/utils";
import { Select } from "antd";

interface HeaderSearchProps {
  isExpandSearch: boolean;
  setIsExpandSearch: (value: boolean) => void;
  setIsShowSearch: (value: boolean) => void;
  language: string | undefined;
}

export const HeaderSearch: FC<HeaderSearchProps> = ({
  isExpandSearch,
  setIsExpandSearch,
  setIsShowSearch,
  language,
}) => {
  const { control } = useForm();

  const closeExpandSearch = () => {
    setIsExpandSearch(false);
    setIsShowSearch(true);
  };
  return (
    <div
      className={`${
        isExpandSearch ? "w-18 flex gap-4 items-center mr-4 " : "w-1/3 "
      }`}
    >
      {isExpandSearch && (
        <CgArrowLongLeft
          className="text-gray-600 cursor-pointer"
          size={30}
          onClick={closeExpandSearch}
        />
      )}
      <div className="w-full flex header-search ">
        <div className="pt-1 hidden md:block lg:block header-select">
          <Select
            className="border-0"
            defaultValue="all"
            size="large"
            options={[
              { value: "all", label: <>{localeString(language, "all")}</> },
              { value: "war", label: <>{localeString(language, "war")}</> },
              { value: "art", label: <>{localeString(language, "art")}</> },
            ]}
          />
        </div>
        {/* <InputSearch
          control={control}
          name="search"
          className="border-0 md:rounded-s-none lg:rounded-s-none md:w-64 lg:w-80 flex-row-reverse"
          placeholder={localeString(language, "searchPlaceHolder")}
          size="large"
          allowClear={false}
        /> */}
      </div>
    </div>
  );
};
