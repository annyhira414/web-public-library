import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
export const reason = () => {
  const language = Cookies.get("language");
  return [
    {
      label: <>{localeString(language, "lost")}</>,
      value: "lost",
    },
    {
      label: <>{localeString(language, "destroyed")}</>,
      value: "damage",
    },
  ];
};
