import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";

export const memberAddresOptions = () => {
  const language = Cookies.get("language");
  return [
    {
      label: (
        <>
          {localeString(language, "permenantAddress")}
          <hr className="w-full mt-2" />
          <div className="pt-2">
            <span>{localeString(language, "memberAddress")}:</span>
            <span className="pl-1">
              32, Stadium market, Arambag, Sylhet, 3100.
            </span>
          </div>
        </>
      ),
      value: "permanent",
    },
    {
      label: (
        <>
          {localeString(language, "presentAddress")}{" "}
          <hr className="w-full mt-2" />
          <div className="pt-2">
            <span>
              <span>{localeString(language, "memberAddress")}:</span>
            </span>
            <span className="pl-1">
              32, Stadium market, Arambag, Sylhet, 3100.
            </span>
          </div>
        </>
      ),
      value: "present",
    },
  ];
};


