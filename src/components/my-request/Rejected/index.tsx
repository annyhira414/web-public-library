import React, {FC} from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import Link from "next/link";
import {MdArrowForwardIos} from "react-icons/md";
import {Button} from "antd";
import {useRouter} from "next/router";

interface IRejected {
  setIsMoneyWithdraw: (item: boolean) => void;
  isReApply: boolean;
  rejectedReasons: string[] | undefined;
}

const Rejected: FC<IRejected> = ({
  setIsMoneyWithdraw,
  isReApply,
  rejectedReasons,
}) => {
  const language: string | undefined = Cookies.get("language");

  const reApplyFun = () => {
    setIsMoneyWithdraw(false);
  };

  const router = useRouter();
  const handleChange = () => {
    router.push("/my-request/security-money-request/request-history");
  };
  return (
    <div className="pt-8">
      <div className="w-full text-center bg-bg-rejected ">
        <div className="flex justify-center items-center">
          <Image
            src={"/images/Icon-Red.svg"}
            alt="rejected"
            width={24}
            height={24}
          />
          <div className="text-rejected-text pl-2 h-48 flex justify-center items-center section-sub-text ">
            {localeString(language, "rejected")}
          </div>
        </div>
      </div>
      <div className="pt-4">
        <div className="flex justify-start">
          <div className="rejected">
            <Image
              src={"/icons/information-circle.png"}
              alt=""
              width={24}
              height={24}
            />
          </div>
          <div className="pl-2">
            {localeString(language, "requestRejectedText")}
          </div>
        </div>
      </div>
      <div className="pt-6 ">
        <div className="bg-bg-rejected p-4 sub-text rounded-md">
          <div className="font-bold text-lg">
            {localeString(language, "reason")}
          </div>
          <div className="pt-2">
            {rejectedReasons?.map((reason: string, index: number) => (
              <p className="mb-2" key={index}>
                {index + 1} . {reason}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div>
        {isReApply ? (
          <div className="pt-4 borrowBookButton">
            <Button
              htmlType="submit"
              className="mt-2 h-12 button-secondary"
              block
            >
              {localeString(language, "reApply")}
            </Button>
          </div>
        ) : (
          <div className="pt-4 borrowBookButton">
            <Button
              onClick={reApplyFun}
              htmlType="submit"
              className="mt-2 h-12 button-secondary"
              disabled
              block
            >
              {localeString(language, "reApply")}
            </Button>
          </div>
        )}
      </div>

      <div
        className="cursor-pointer pt-6 hover:text-black"
        onClick={handleChange}
      >
        <div className="flex justify-between bg-white rounded-lg">
          <div className="w-full p-4  flex justify-start">
            <button>{localeString(language, "previousApplications")}</button>
          </div>
          <div className="p-4 pt-5">
            <MdArrowForwardIos />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rejected;
