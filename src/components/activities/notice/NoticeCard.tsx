import { INotice } from "@/lib/model/activities/notice";
import moment from "moment";
import Link from "next/link";
import React, { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
interface INoticeCard {
  notice: INotice;
  startIndex: number;
  index: number;
  language: string;
}

const NoticeCard: FC<INoticeCard> = ({
  notice,
  startIndex,
  index,
  language,
}) => {
  return (
    <>
      <Link href={`/activities/notice/${notice?.id}`}>
        <div className="bg-white p-4 justify-between items-center rounded-md border-2 border-white hover:text-library-primary flex mb-4 shadow-sm common-card-hover group">
          <div className=" bg-library-order-sidebar-background text-white rounded-full h-8 w-8 flex items-center justify-center ">
            <div className=" text-library-primary">
              {currencyFormatter(language, startIndex + index + 1)}
            </div>
          </div>
          <div className="w-full pl-4">
            <p className="text-xs mb-2">
              {currencyFormatter(
                language,
                parseInt(moment(notice?.published_date)?.format("D"))
              )}{" "}
              {localeString(
                language,
                `${moment(notice?.published_date).format("MMMM")}`
              )}{" "}
              {commaRemover(
                currencyFormatter(
                  language,
                  parseInt(moment(notice?.published_date)?.format(`YYYY`))
                )
              )}
            </p>
            <h1 className="hover:text-library-primary max-line-limit">
              <span className="text-sm font-normal">{notice?.title}</span>
            </h1>
          </div>
          <div>
            <IoIosArrowForward className="ml-2" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default NoticeCard;
