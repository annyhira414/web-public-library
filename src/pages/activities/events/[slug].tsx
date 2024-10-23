import React, {FC, useEffect, useState} from "react";
import {IEventDetails} from "@/lib/model/activities/eventDetails";
import {getDetails} from "@/lib/services";
import {GetServerSideProps} from "next";
import {Row, Col, Divider, Typography, Button} from "antd";
import Link from "next/link";
import moment from "moment";
import parse from "html-react-parser";
import {
  localeString,
  currencyFormatter,
  commaRemover,
} from "@/lib/helpers/utils";
import {GalleryCard, VideoGalleryCard} from "@/components/gallery";
import {IGallery} from "@/lib/model/gallery";
import Image from "next/image";

const {Paragraph} = Typography;

interface IEventDetailsProps {
  galleryData: IGallery[];
  eventDetails: IEventDetails;
  language: string;
  slug: string;
  isAlreadyPast?: boolean;
  registration_fields: string[];
}
const EventDetails: FC<IEventDetailsProps> = ({
  language,
  eventDetails,
  galleryData,
  slug,
}) => {
  const [desktop, setDesktop] = useState(false);

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

  const filterPhotos = () => {
    return galleryData.filter((album) => album.album_type === "photo");
  };
  const filterVideos = () => {
    return galleryData.filter((album) => album.album_type === "video");
  };
  const photos = filterPhotos();
  const videos = filterVideos();
  return (
    <div className="pl-content-container">
      <Row>
        <Col lg={{span: 24}}>
          <div className="mt-10">
            <span className="text-library-white  uppercase text-xs cursor-default rounded-full bg-library-primary px-3 py-1">
              {eventDetails?.is_local
                ? `${localeString(language, "eventLocal")}`
                : `${localeString(language, "eventGlobal")}`}
            </span>
          </div>
          <h1 className="section-title text-3xl mt-3">{eventDetails?.title}</h1>
          <h5 className="font-semibold mt-3 text-sm text-library-gray-600">
            {currencyFormatter(
              language,
              parseInt(moment(eventDetails?.start_date)?.format("D"))
            )}{" "}
            {localeString(
              language,
              `${moment(eventDetails?.start_date).format("MMMM")}`
            )}{" "}
            {commaRemover(
              currencyFormatter(
                language,
                parseInt(moment(eventDetails?.start_date)?.format(`YYYY`))
              )
            )}
            {", "}
            {localeString(
              language,
              `${moment(eventDetails?.start_date).format("dddd")}`
            )}
            {" - "}
            {currencyFormatter(
              language,
              parseInt(moment(eventDetails?.end_date)?.format("D"))
            )}{" "}
            {localeString(
              language,
              `${moment(eventDetails?.end_date).format("MMMM")}`
            )}{" "}
            {commaRemover(
              currencyFormatter(
                language,
                parseInt(moment(eventDetails?.end_date)?.format(`YYYY`))
              )
            )}
            {", "}
            {localeString(
              language,
              `${moment(eventDetails?.end_date).format("dddd")}`
            )}
          </h5>
        </Col>
        <Col className="mt-5" xs={{span: 24}} lg={{span: 24}}>
          <div className="Detailsimage">
            <Image
              // className="transition-all duration-500  hover:scale-105"
              fill={true}
              alt="Event Image"
              src={
                desktop
                  ? eventDetails?.image_url?.desktop_image || ""
                  : eventDetails?.image_url?.tab_image || ""
              }
            />
          </div>
          {/* {eventDetails?.image_url?.desktop_image.length > 0 ? (
          <>
            <div
              className="mt-5  Detailsimage"
              style={{
                backgroundImage: `url(${
                  // eventDetails?.image_url?.desktop_image || ""
                  desktop
                    ? eventDetails?.image_url?.desktop_image || ""
                    : eventDetails?.image_url?.tab_image || ""
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </>
          ) : (
            <></>
          )}  */}
        </Col>
      </Row>
      <Row className="mt-10 rounded-lg mb-16">
        <Col xs={{span: 24}} lg={{span: 10, offset: 1}}>
          <h1 className="section-title text-xl">
            {localeString(language, "eventDetails2")}
          </h1>
          <div className="mt-2 text-library-gray-600 break-al text-sm mb-10">
            {parse((eventDetails?.details && eventDetails?.details) || "")}
          </div>
        </Col>
        <Col
          className="border bg-library-white rounded-lg mb-10"
          xs={{span: 24}}
          lg={{span: 10, offset: 2}}
        >
          <div className="mt-8 mx-8">
            <h1 className="section-title text-base">
              {localeString(language, "eventDetails")}
              <Divider style={{marginTop: 5, borderColor: "#006A4E"}} />
            </h1>
            <div className="px-4">
              <h1 className="section-title text-sm">
                {localeString(language, "eventDetailsDate")}
              </h1>
              <p className="text-sm mt-2 text-library-gray">
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.start_date)?.format("D"))
                )}{" "}
                {localeString(
                  language,
                  `${moment(eventDetails?.start_date).format("MMMM")}`
                )}
                {" ,"}
                {commaRemover(
                  currencyFormatter(
                    language,
                    parseInt(moment(eventDetails?.start_date)?.format(`YY`))
                  )
                )}
                {" - "}
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.end_date)?.format("D"))
                )}{" "}
                {localeString(
                  language,
                  `${moment(eventDetails?.end_date).format("MMMM")}`
                )}
                {" ,"}
                {commaRemover(
                  currencyFormatter(
                    language,
                    parseInt(moment(eventDetails?.end_date)?.format(`YY`))
                  )
                )}
              </p>
              <h1 className="mt-4 section-title text-sm">
                {localeString(language, "eventDetailsTime")}
              </h1>
              <p className="text-sm mt-2 text-library-gray">
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.start_date)?.format("h"))
                )}
                {"."}
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.start_date)?.format("mm"))
                )}{" "}
                {"  "}
                {/* {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.start_date)?.format("A"))
                )} */}
                {moment(eventDetails?.start_date).format("A")} {" - "}
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.end_date)?.format("h"))
                )}
                {"."}
                {currencyFormatter(
                  language,
                  parseInt(moment(eventDetails?.end_date)?.format("mm"))
                )}{" "}
                {"  "}
                {moment(eventDetails?.end_date).format("A")}
              </p>
              <h1 className="mt-4 section-title text-sm">
                {localeString(language, "eventDetailsOrg")}
              </h1>
              <p className="text-sm text-library-light-black mt-2">
                {eventDetails?.organizer}
              </p>
              <h1 className="mt-4 section-title text-sm">
                {localeString(language, "eventDetailsPhone")}
              </h1>
              <p className="text-sm mt-2 text-library-gray">
                {eventDetails?.phone}
              </p>
              <h1 className="mt-4 section-title text-sm">
                {localeString(language, "eventDetailsEmail")}
              </h1>
              <p className="text-sm mt-2 text-library-gray">
                {eventDetails?.email}
              </p>
              <h1 className="mt-4 section-title text-sm">
                {localeString(language, "eventDetailsVenue")}
              </h1>
              <p className="text-sm mt-2 mb-8 text-library-light-black">
                {eventDetails?.venue}
              </p>

              {eventDetails?.is_registerable && (
                <div className="mt-6 mb-8 ">
                  <Link href={`/activities/events/eventRegister/?slug=${slug}`}>
                    <div className="borrowBookButton">
                      <Button className="w-full button-secondary h-12">
                        {localeString(language, "eventDetailsButton")}
                      </Button>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col lg={{span: 24}}>
          {galleryData.length > 0 ? (
            <>
              <h1 className="section-title text-3xl">
                {localeString(language, "eventPhotoVideo")}
              </h1>
              <div className="mt-10">
                <div>
                  <GalleryCard galleryData={photos} language={language} />
                </div>
                <div className="mt-2">
                  <VideoGalleryCard galleryData={videos} language={language} />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default EventDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {slug} = context?.query;

  const res = await getDetails(
    `public_library/events/${slug}`,
    "",
    context?.req?.cookies?.["language"] || "bn",
    context?.req?.cookies?.["token"] || ""
  );
  console.log("event Details", res);
  if (res?.success) {
    return {
      props: {
        galleryData: res?.data?.albums,
        eventDetails: res?.data,
        language: context?.req?.cookies?.["language"] || "bn",
        token: context?.req?.cookies?.["token"] || "",
        slug: slug,
        // registration_fields: res?.data?.registration_fields,
      },
    };
  } else {
    return {
      props: {
        galleryData: [],
        eventDetails: [],
      },
    };
  }
};
