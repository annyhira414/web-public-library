import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { FC } from "react";
import { CommonSidebar } from "../common";

interface IProFileSideBar {}

export const ProfileSidebar: FC<IProFileSideBar> = () => {
  const language = Cookies.get("language");
  const responsiveNavLinks = [
    {
      value: "/user/my-profile",
      label: `${localeString(language, "personalInfo")}`,
    },

    {
      value: "/user/my-profile/my-address",
      label: `${localeString(language, "address")}`,
    },
    {
      value: "/user/my-profile/document-details",
      label: `${localeString(language, "documetDetails")}`,
    },
    {
      value: "/user/my-profile/change-password",
      label: `${localeString(language, "changePassword")}`,
    },
  ];
  return (
    <div>
      <CommonSidebar
        title={localeString(language, "myProfile")}
        sideMenuItems={responsiveNavLinks}
      />
    </div>
  );
};
