import { localeString } from "../../helpers/utils";
import Cookies from "js-cookie";

export const MyRequestSelect = (language = "bn") => {
  return [
    { id: 1, value: "bookDemands", label: `${localeString(language, "bookDemands")}` },
    { id: 2, value: "bookTransferRequests", label: `${localeString(language, "bookTransferRequests")}` },
    { id: 3, value: "libraryCardRequest", label: `${localeString(language, "libraryCardRequest")}` },
    { id: 4, value: "SecurityMoneyRequest", label: `${localeString(language, "SecurityMoneyRequest")}` },
  ];
};

export const reasonOptions = () => {
  const language = Cookies.get("language");

  return [
    { id: 1, value: "lost", label: <p>{localeString(language, "lost")}</p> },
    { id: 2, value: "damage", label: <div>{localeString(language, "destroyed")}</div> },
  ];
};


