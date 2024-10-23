import { localeString } from "@/lib/helpers/utils";
import { FC } from "react";
import { CommonSidebar } from "../common";
import Cookies from "js-cookie";

interface IOrderStatus {}

export const OrderStatus: FC<IOrderStatus> = () => {
  const language = Cookies.get("language");

  const responsiveNavLinks = [
    {
      value: "/user/my-orders",
      label: `${localeString(language, "myOrder")}`,
    },
    {
      value: "/user/my-orders/current-books",
      label: `${localeString(language, "currentBooks")}`,
    },
    {
      value: "/user/my-orders/return-books",
      label: `${localeString(language, "returnBooks")}`,
    },
    {
      value: "/user/my-orders/lost-books",
      label: `${localeString(language, "lostBook")}`,
    },
    {
      value: "/user/my-orders/damage-books",
      label: `${localeString(language, "damageBooks")}`,
    },
  ];

  return (
    <div>
      <CommonSidebar
        title={localeString(language, "myOrder")}
        sideMenuItems={responsiveNavLinks}
      />
    </div>
  );
};
