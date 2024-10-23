import { FC, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { Select } from "@/components/controls";
import Image from "next/image";
import congratulations from "../../../../public/images/congratulations.svg";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

type ILibrary = {
  label: string;
  value: string;
};

type IData = {
  is_available?: boolean;
  library_name?: string;
  shelves?: string[];
};

interface ICongratulations {
  isDisabled: boolean;
  control: any;
  handleSubmit?: (value: any) => any;
  onSubmit?: (value: any) => void;
  allLibrary: ILibrary[];
  data?: Partial<IData>;
  congratulationMessage: string;
  isNormal?: boolean;
  buttonText: string;
}
const Congratulations: FC<ICongratulations> = ({
  control,
  handleSubmit,
  onSubmit,
  isDisabled = true,
  allLibrary = [],
  data,
  congratulationMessage = "",
  isNormal = false,
  buttonText,
}) => {
  const language = Cookies.get("language");
  const router = useRouter();
  return (
    <div>
      <div className="px-10 py-5 md:px-28 md:py-10 my-6">
        <form onSubmit={handleSubmit && handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center">
            <Image
              src={congratulations}
              alt="check image"
              height={200}
              width={200}
            />
          </div>

          <div className="mt-2">
            <div className="text-center">
              <h2 className="section-title font-normal">
                {localeString(language, "congratulations")}
              </h2>
              <p className="mt-3">
                {localeString(language, congratulationMessage)}{" "}
                {!isNormal && (
                  <span className="underline text-library-primary">
                    {data?.library_name}
                  </span>
                )}
              </p>
            </div>
            {!isNormal && (
              <div className=" mt-3 bg-[#E2F1FF] p-2 flex-center-gap rounded-md">
                <BsFillInfoCircleFill className="text-[#024F9C] text-lg" />
                <h3 className="font-normal">
                  {localeString(language, "shelfNumber")}
                </h3>
                <h3 className="text-[#024F9C] text-sm font-bold">
                  {data?.shelves?.join(",")}
                </h3>
              </div>
            )}
            <div className="w-full mt-4">
              <Button
                type="primary"
                className="button-primary"
                block
                size="large"
                onClick={() => {
                  router.replace("/");
                  // router.reload();
                }}
                // htmlType="submit"
              >
                {localeString(language, buttonText)}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Congratulations;
