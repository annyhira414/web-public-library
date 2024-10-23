import {localeString} from "../../helpers/utils";

export const bookTypeRadio = (language = "bn") => {
  return [
    {
      label: <>{localeString(language, "foreignBook")}</>,
      value: "foreignBook",
    },
    {
      label: <>{localeString(language, "deshiBook")}</>,
      value: "deshiBook",
    },
  ];
};
