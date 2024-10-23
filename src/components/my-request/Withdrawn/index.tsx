import React, {FC} from "react";
import {localeString} from "@/lib/helpers/utils";
import Image from "next/image";
import Cookies from "js-cookie";
import {MdArrowForwardIos} from "react-icons/md";
import {useRouter} from "next/router";

interface IWithdrawn {}

const Withdrawn: FC<IWithdrawn> = ({}) => {
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
            {localeString(language, "withdrawn")}
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex justify-start">
          <div className="">
            <Image
              src={"/icons/information-circle.png"}
              alt="accept"
              width={24}
              height={24}
            />
          </div>
          <div className="pl-2">{localeString(language, "withdrawText")}</div>
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
export default Withdrawn;
