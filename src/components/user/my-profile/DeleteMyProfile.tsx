import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { FC } from "react";

interface IDeleteMyProfile {}

export const DeleteMyProfile: FC<IDeleteMyProfile> = () => {
  const language = Cookies.get("language");
  return (
    <div>
      <div className="delete-success-area">
        <div className="delete-success-msg p-4  md:p-12 lg:p-12">
          <div className="flex justify-center">
            <Image
              src="/images/success.png"
              width={78}
              height={78}
              alt="success"
              className="border-8 border-[#CCFFE2] rounded-full"
            ></Image>
          </div>
          <h1 className="my-4 text-gray-700  font-bold text-3xl  text-center font-[playfairDisplay]">
            {localeString(language, "missedText")}
          </h1>
          <p className="text-center font-[playfairDisplay]">
            {localeString(language, "deleteConfirmText")}
          </p>
        </div>
      </div>
    </div>
  );
};
