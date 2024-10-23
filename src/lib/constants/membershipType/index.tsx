import { localeString } from "../../helpers/utils";

export const membershipType = (language = "bn") => {
  return [
    {
      label: (
        <>
          <div className="pt-2 ">
            <h5 className="text-gray-700 font-bold font-playfairDisplay text-base">
              {localeString(language, "general")}
            </h5>
            <p className="text-gray-700 text-xs">
              {localeString(language, "generalsecurityMoney")}
            </p>
          </div>
        </>
      ),
      value: "general",
    },
    {
      label: (
        <>
          <div className="pt-2 ">
            <h5 className="text-gray-700 font-bold font-playfairDisplay text-base">
              {localeString(language, "student")}
            </h5>
            <p className="text-gray-700 text-xs">
              {localeString(language, "studentsecurityMoney")}
            </p>
          </div>
        </>
      ),
      value: "student",
    },
    {
      label: (
        <>
          <div className="pt-2">
            <h5 className="text-gray-700 font-bold font-playfairDisplay text-base">
              {localeString(language, "child")}
            </h5>
            <p className="text-gray-700 text-xs">
              {localeString(language, "childsecurityMoney")}
            </p>
          </div>
        </>
      ),
      value: "child",
    },
  ];
};
export const studentMembershiUpgrade = (language = "bn") => {
  return [
    {
      label: (
        <>
          <div className="pt-2 ">
            <h5 className="text-gray-700 font-bold font-playfairDisplay text-base">
              {localeString(language, "general")}
            </h5>
            <p className="text-gray-700 text-xs">
              {localeString(language, "generalsecurityMoney")}
            </p>
          </div>
        </>
      ),
      value: "general",
    },
  ];
};
export const childMembershiUpgrade = (language = "bn") => {
  return [
    {
      label: (
        <>
          <div className="pt-2 ">
            <h5 className="text-gray-700 font-bold font-playfairDisplay text-base">
              {localeString(language, "student")}
            </h5>
            <p className="text-gray-700 text-xs">
              {localeString(language, "studentsecurityMoney")}
            </p>
          </div>
        </>
      ),
      value: "student",
    },
    {
      label: (
        <>
          <div className="pt-2 ">
            <h5 className="text-gray-700 font-bold font-playfairDisplay text-base">
              {localeString(language, "general")}
            </h5>
            <p className="text-gray-700 text-xs">
              {localeString(language, "generalsecurityMoney")}
            </p>
          </div>
        </>
      ),
      value: "general",
    },
  ];
};
