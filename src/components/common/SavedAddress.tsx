import {Button} from "antd";
import {CustomRadioGroup} from "../controls";
import {FC} from "react";
import {localeString} from "@/lib/helpers/utils";

interface ISavedAddress {
  control: any;
  errors: any;
  language: string | undefined;
  saveAdd: any[];
  setAddressLimit: (limit: number) => void;
  addresstype?: any[];
}

const SavedAddress: FC<ISavedAddress> = ({
  control,
  errors,
  language,
  saveAdd,
  setAddressLimit,
  addresstype,
}) => {
  return (
    <>
      <div>
        <CustomRadioGroup
          name="selectAddress"
          control={control}
          options={saveAdd}
          errors={errors}
          className="section border hover:border-library-primary broder-library-gray-300  rounded-lg "
        />
        <div
          className="bookButton"
          onClick={() => {
            setAddressLimit(addresstype?.length as number);
          }}
        >
          <Button className="button-primary w-full mt-5 h-10">
            {localeString(language, "seeMore")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SavedAddress;
