/** @format */

import React from "react";
import {FC, useState, useEffect} from "react";
import {Card, Typography} from "antd";
import Image from "next/image";
import NoImageFound from "../../../public/images/book-page/noImageFound.png";
import Link from "next/link";
import {IEvent} from "@/lib/model/events";
import moment from "moment";
import parse from "html-react-parser";
import Cookies from "js-cookie";
import {HiLanguage} from "react-icons/hi2";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";

const {Paragraph} = Typography;

interface ItemEvent {
  eventItem: IEvent;
}

export const EventCard: FC<ItemEvent> = ({eventItem}) => {
  const [desktop, setDesktop] = useState(false);
  const language = Cookies.get("language");
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth >= 1024) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
  return (
    <div>
      <Link href={`/activities/events/${eventItem?.slug}`}>
        <Card
          className=" h-[500px] cursor-pointer bg-library-white  common-card-hover"
          cover={
            <div className="event-card overflow-hidden ">
              <Image
                className="transition-all duration-500  hover:scale-105 "
                fill={true}
                alt="Book Image"
                src={
                  desktop
                    ? eventItem?.image_url?.desktop_image || NoImageFound
                    : eventItem?.image_url?.tab_image || NoImageFound
                }
              />
            </div>
            // <div className="h-[240px] eventsCard book-card">
            //   <Image
            //     alt="example"
            //     src={
            //       desktop
            //         ? eventItem?.image_url?.desktop_image || ""
            //         : eventItem?.image_url?.tab_image || ""
            //     }
            //     fill={true}
            //     className="transition-all duration-500  hover:scale-105"
            //   />
            // </div>
          }
        >
          <div>
            <span className="text-library-white uppercase text-xs cursor-default rounded-full bg-library-primary px-3 py-1">
              {eventItem?.is_local
                ? `${localeString(language, "eventLocal")}`
                : `${localeString(language, "eventGlobal")}`}
            </span>

            <div className="h-12 font-bold text-base mt-5 font-['']">
              <Paragraph
                ellipsis={{
                  rows: 2,
                }}
              >
                {eventItem?.title}
              </Paragraph>
            </div>
            <p className="text-library-gray-600 mt-2 font-semibold text-sm">
              {currencyFormatter(
                language,
                parseInt(moment(eventItem?.start_date)?.format("D"))
              )}{" "}
              {localeString(
                language,
                `${moment(eventItem?.start_date).format("MMMM")}`
              )}{" "}
              {commaRemover(
                currencyFormatter(
                  language,
                  parseInt(moment(eventItem?.start_date)?.format(`YYYY`))
                )
              )}
              {", "}
              {localeString(
                language,
                `${moment(eventItem?.start_date).format("dddd")}`
              )}
            </p>
            <div className="mt-2 text-sm text-library-gray-600 ">
              <Paragraph
                ellipsis={{
                  rows: 4,
                }}
              >
                {parse(eventItem?.details)}
              </Paragraph>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};
