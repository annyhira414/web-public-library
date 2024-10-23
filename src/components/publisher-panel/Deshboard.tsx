import React, {FC} from "react";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {CommonSidebar} from "@/components/user/common";

interface IDeshboard {
  language: string | undefined;
}
export const Deshboard: FC<IDeshboard> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  const sideMenuItems = [
    {
      value: "/publisher-panel/active-memorandum",
      label: `${localeString(language, "activeMemorandum")}`,
    },
    {
      value: "/publisher-panel/previous-memorandum",
      label: `${localeString(language, "previousMemorandum")}`,
    },

    {
      value: "/publisher-panel",
      label: `${localeString(language, "publisherInformation")}`,
    },
  ];
  return (
    <div>
      <div className="md:pt-10">
        <div className=" md:bg-white  md:border-gray-300 md:mt-4 md:mb-8 md:shadow-sm md:pb-5 ">
          <h1 className="pt-4 md:pl-4 pl-0 card-title">
            {localeString(language, "deshboard")}
          </h1>
          <div className="lg:pt-0 pt-4 md:pt-0">
            <CommonSidebar sideMenuItems={sideMenuItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
