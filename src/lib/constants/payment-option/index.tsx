import Cookies from "js-cookie";
import { localeString } from "../../helpers/utils";

export const makePaymentOption = () => {
  const language = Cookies.get("language");
  return [
    {
      label: (
        <>
          <div className="pt-2 ">
            <h5 className="text-gray-700 font-playfairDisplay text-base">
              {localeString(language, "payandRececieveFromLibrary")}
            </h5>
          </div>
        </>
      ),
      value: "securityMoney",
    },
    {
      label: (
        <>
          <div className="pt-2 ">
            <h5 className="text-gray-700 font-playfairDisplay text-base">
              {localeString(language, "receiveHome")}
            </h5>
          </div>
        </>
      ),
      value: "nagadHome",
    },
    {
      label: (
        <>
          <div className="pt-2">
            <h5 className="text-gray-700 font-playfairDisplay text-base">
              {localeString(language, "payThroughNagadAndReceiveFromLibrary")}
            </h5>
          </div>
        </>
      ),
      value: "nagadLibrary",
    },
  ];
};
