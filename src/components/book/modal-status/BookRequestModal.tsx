import { FC, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { Select } from "@/components/controls";
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

interface IBookRequestModal {
  isDisabled: boolean;
  control: any;
  handleSubmit?: (value: any) => any;
  onSubmit?: (value: any) => void;
  allLibrary: ILibrary[];
  data?: Partial<IData>;
}
const BookRequestModal: FC<IBookRequestModal> = ({
  control,
  handleSubmit,
  onSubmit,
  isDisabled = true,
  allLibrary = [],
}) => {
  const language = Cookies.get("language");
  return (
    <div className="px-10 py-5 md:px-28 md:py-10 my-6">
      <form onSubmit={handleSubmit && handleSubmit(onSubmit)}>
        <div className="mb-2">
          <h2 className="font-bold text-xl text-center">
            {localeString(language, "whichLibrary")}
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
              {localeString(language, "request")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default BookRequestModal;
