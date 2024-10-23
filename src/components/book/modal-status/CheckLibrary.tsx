import { FC, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { Select } from "@/components/controls";
import Image from "next/image";
import checkImage from "../../../../public/images/check.svg";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";

type ILibrary = {
  label: string;
  value: string;
};

type IData = {
  is_available?: boolean;
  library_name?: string;
  shelves?: string[];
};

interface ICheckLibrary {
  isDisabled: boolean;
  control: any;
  handleSubmit?: (value: any) => any;
  onSubmit?: (value: any) => void;
  allLibrary: ILibrary[];
  data?: Partial<IData>;
}
const CheckLibrary: FC<ICheckLibrary> = ({
  control,
  handleSubmit,
  onSubmit,
  isDisabled = true,
  allLibrary = [],
  data,
}) => {
  const language = Cookies.get("language");
  return (
    <div className="px-10 py-5 md:px-28 md:py-10 my-6">
      <form onSubmit={handleSubmit && handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center">
          <Image src={checkImage} alt="check image" height={200} width={200} />
        </div>
        <div className="mb-2">
          <h2 className="font-bold text-xl text-center">
            {localeString(language, "CheckLibrary")}
          </h2>
        </div>
        <div className="overflow-auto">
          <div className="my-2">
            <Select
              control={control}
              name="libraryName"
              options={allLibrary}
              placeholder={localeString(language, "selectLibrary")}
            />
          </div>
        </div>
        <div>
          <div className="w-full mt-4">
            <Button
              type="primary"
              className="button-primary"
              block
              size="large"
              htmlType="submit"
              disabled={isDisabled}
            >
              {localeString(language, "search")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CheckLibrary;
