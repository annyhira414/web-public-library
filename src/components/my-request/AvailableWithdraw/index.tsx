import React, {FC} from "react";
import {localeString} from "@/lib/helpers/utils";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import {MdArrowForwardIos} from "react-icons/md";
import {useRouter} from "next/router";

interface IAvailableWithdraw {}

const AvailableWithdraw: FC<IAvailableWithdraw> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const router = useRouter();

  const handleChange = () => {
    router.push("/my-request/security-money-request/request-history");
  };
  return (
    <div className="pt-8">
      <div className="w-full text-center bg-bg-accepted ">
        <div className="flex justify-center items-center">
          <Image src={"/icons/Icon.svg"} alt="" width={24} height={24} />
          <div className="pl-2 h-48 flex justify-center items-center section-sub-text ">
            {localeString(language, "availableWithdraw")}
          </div>
        </div>
      </div>

      <div
        className="pt-6 cursor-pointer hover:text-black"
        onClick={handleChange}
      >
        <div className="flex justify-between bg-white rounded-lg ">
          <div className="w-full pt-2 p-4 ">
            <button>{localeString(language, "previousApplications")}</button>
          </div>
          <div className="p-4">
            <MdArrowForwardIos />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvailableWithdraw;
