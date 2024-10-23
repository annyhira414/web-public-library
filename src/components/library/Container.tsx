import React, { FC } from "react";
import { ILibraryDetails, Iitem } from "@/lib/model/library/index";
//import moment from "moment";
//import * as dayjs from "dayjs";
import dayjs from "dayjs";
import Cookies from "js-cookie";

import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";

interface IContainerProps {
  language: any;
  LibraryDetails: ILibraryDetails;
}

export const Container: FC<IContainerProps> = ({
  LibraryDetails,
  language,
}) => {
  // let language: string | undefined = Cookies.get("language");
  const formatTimeTo12Hour = (time: string) => {
    if (time) {
      const formattedTime = dayjs(time, "HH:mm").format("hh:mm A");
      return formattedTime === "Invalid Date" ? "Invalid Time" : formattedTime;
    } else {
      return "N/A";
    }
  };
  const languageCharacter = language === "bn" ? "০" : "0";

  return (
    <>
      <div className="mt-12 bg-white rounded-lg">
        <div className="pt-5">
          <div className="card-title p-2 flex justify-center bg-library-container mx-6 rounded-lg ">
            {localeString(language, "openingHour")}
          </div>
        </div>
        <div className="mt-4 pl-6 ">
          <div className="">
            <>
              <p className="pt-2 pb-6 sub-container-text">
                {LibraryDetails?.working_days?.map((item: Iitem, i: number) => (
                  <div key={item?.id}>
                    {item?.is_holiday === true ? (
                      <div className="text-base text-library-royal-red font-bold">
                        {localeString(language, item?.week_days)}
                        <span className="pl-2">:</span>
                        <span className="pl-2">
                          {localeString(language, "offDay")}
                        </span>
                      </div>
                    ) : (
                      <div>
                        {localeString(language, item?.week_days)}
                        <span className="pl-2">-</span>
                        {item?.start_time ? (
                          <>
                            <span className="pl-2">
                              {localeString(language, "morning")}{" "}
                              {/* {formatTimeTo12Hour(item?.start_time)} */}
                              {currencyFormatter(
                                language,
                                parseInt(
                                  dayjs("1971-01-25" + item?.start_time).format(
                                    "hh"
                                  ),
                                  10
                                )
                              )}
                              :
                              {currencyFormatter(
                                language,
                                parseInt(
                                  dayjs("1971-01-25" + item?.start_time).format(
                                    "mm"
                                  ),
                                  10
                                )
                              )
                                .toString()
                                .padStart(2, languageCharacter)}
                              <> {localeString(language, "am")}</>
                            </span>

                            <span className="px-1">-</span>
                          </>
                        ) : (
                          ""
                        )}

                        {item?.end_time ? (
                          <span>
                            <>
                              {localeString(language, "evening")}
                              {/* {formatTimeTo12Hour(item?.end_time)} */}
                              {currencyFormatter(
                                language,
                                parseInt(
                                  dayjs("1971-01-25" + item?.end_time).format(
                                    "hh"
                                  ),
                                  10
                                )
                              )}
                              :
                              {currencyFormatter(
                                language,
                                parseInt(
                                  dayjs("1971-01-25" + item?.end_time).format(
                                    "mm"
                                  ),
                                  10
                                )
                              )
                                .toString()
                                .padStart(2, languageCharacter)}
                            </>
                            <> {localeString(language, "pm")}</>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    )}

                    <hr
                      className={`mr-6 my-3 ${
                        LibraryDetails?.working_days &&
                        i === LibraryDetails?.working_days?.length - 1 &&
                        "border-0 "
                      } `}
                    />
                  </div>
                ))}
              </p>
            </>
          </div>
        </div>
      </div>
      <div className="mt-12 bg-white rounded-lg">
        <div className="pt-6">
          <div className="card-title p-2 flex justify-center bg-library-container mx-6 rounded-lg">
            {localeString(language, "evntLibraryDetails")}
          </div>
        </div>
        <div className="mt-4 pl-6">
          <div className="">
            <>
              <p className="pt-3 sub-card-title">
                {localeString(language, "headLibrary")}
                {": "}
              </p>
              <p className="pt-2 sub-container-text">
                {" "}
                {LibraryDetails?.head_of_library?.name
                  ? LibraryDetails?.head_of_library?.name
                  : "_"}
              </p>
            </>
            <hr className="mr-6 mt-3" />
            <>
              <p className="pt-4 sub-card-title">
                {localeString(language, "mobileNumber")}
                {": "}
              </p>
              <p className="pt-2 sub-container-text">
                {LibraryDetails?.head_of_library?.phone
                  ? LibraryDetails?.head_of_library?.phone
                  : "_"}
              </p>
            </>
            <hr className="mr-6 mt-3" />
            <>
              <p className="pt-3 sub-card-title">
                {localeString(language, "designation")}
                {": "}
              </p>
              <p className="pt-2 sub-container-text">
                {LibraryDetails?.head_of_library?.designation
                  ? LibraryDetails?.head_of_library?.designation
                  : "_"}
              </p>
            </>
            <hr className="mr-6 mt-3" />
            <>
              <p className="pt-3 sub-card-title">
                {localeString(language, "telephone")}
                {": "}
              </p>
              <p className="pt-2 sub-container-text">
                {LibraryDetails?.phone ? LibraryDetails?.phone : "_"}
              </p>
            </>
            <hr className="mr-6 mt-3" />

            <>
              <p className="pt-3 sub-card-title">
                {localeString(language, "email")}
                {": "}
              </p>
              <p className="pt-2 sub-container-text">
                {LibraryDetails?.email ? LibraryDetails?.email : "_"}
              </p>
            </>
            <hr className="mr-6 mt-3" />
            <>
              <p className="pt-4 sub-card-title ">
                {localeString(language, "address")}
                {": "}
              </p>
              <p className="pt-2 pb-6 sub-container-text ">
                {LibraryDetails?.address}
              </p>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
