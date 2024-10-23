import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { GetServerSideProps } from "next";
import { getData } from "@/lib/services";
import { useRouter } from "next/router";
import { Card, Col, Row } from "antd";
import { useMediaQuery } from "usehooks-ts";
import moment from "moment";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";

interface IPhotoGalleryDetails {
  galleryDetails: {
    id: string;
    title: string;
    library: {
      id: string;
      name: string;
    };
    album_items: [
      {
        id: string;
        caption: string;
        image_url: {
          desktop_image: string;
          tab_image: string;
        };
        video_link: string;
      }
    ];
    published_at: string;
  };
}

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nextImageUrl(src: string, size: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

const GalleryDetails: FC<IPhotoGalleryDetails> = ({ galleryDetails }) => {
  const width = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { slug } = router?.query;
  const language = Cookies.get("language");
  const slides = galleryDetails?.album_items?.map((item) => ({
    width: 300,
    height: 150,
    src: nextImageUrl(item?.image_url?.desktop_image, 300),
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter((size) => size <= 300)
      .map((size) => ({
        src: nextImageUrl(item?.image_url?.desktop_image, size),
        width: size,
        height: Math.round((300 / 150) * size),
      })),
    description: item?.caption,
  }));

  useEffect(() => {
    slug;
  }, [slug]);

  const [open, setOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <>
      <div className="pl-content-container py-8">
        {galleryDetails?.title ? (
          <h3 className="font-bold text-2xl my-3">{galleryDetails?.title}</h3>
        ) : (
          ""
        )}

        <div className="photo-album-details">
          {galleryDetails?.library?.name ? (
            <>
              <span className="mr-2.5">
                <span className="font-semibold text-library-light-black">
                  {localeString(language, "libraryName")}:
                </span>
                {galleryDetails?.library?.name}
              </span>
              |
            </>
          ) : (
            ""
          )}
          {galleryDetails?.published_at ? (
            <span className="">
              <span className="font-semibold text-library-light-black">
                {localeString(language, "date")} <span> : </span>
              </span>
              {currencyFormatter(
                language,
                parseInt(moment(galleryDetails?.published_at)?.format("D"))
              )}{" "}
              {localeString(
                language,
                `${moment(galleryDetails?.published_at).format("MMMM")}`
              )}{" "}
              {commaRemover(
                currencyFormatter(
                  language,
                  parseInt(moment(galleryDetails?.published_at)?.format(`YYYY`))
                )
              )}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <Row gutter={[25, 25]}>
            {galleryDetails?.album_items?.map(
              (
                galleryItem: {
                  id: string;
                  caption: string;
                  image_url: {
                    desktop_image: string;
                    tab_image: string;
                  };
                },
                i: number
              ) => {
                return (
                  <Col
                    key={i}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 11 }}
                    lg={{ span: 7 }}
                    xl={{ span: 7 }}
                    xxl={{ span: 7 }}
                    className="md:mx-3 lg:mx-4"
                  >
                    <div
                      onClick={() => {
                        setOpen(true);
                        setCurrentIndex(i);
                      }}
                      className="album-details"
                    >
                      {galleryItem && (
                        <div className="common-card-hover border-2 cursor-pointer p-4 ">
                          <div className="book-card overflow-hidden">
                            <Image
                              fill
                              alt="Gallery Image"
                              src={
                                width
                                  ? galleryItem?.image_url?.desktop_image
                                  : galleryItem?.image_url?.tab_image
                              }
                              className="transition-all duration-500  hover:scale-105"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                );
              }
            )}
          </Row>
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={currentIndex}
          plugins={[Captions]}
        />
      </div>
    </>
  );
};

export default GalleryDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context?.query;
  const res = await getData(
    `public_library/gallery_albums/${slug}`,
    {},
    context?.req?.cookies?.["language"] || "bn"
  );
  if (res?.success) {
    return {
      props: {
        galleryDetails: res?.data,
        language: context?.req?.cookies?.["language"] || "bn",
      },
    };
  } else {
    return {
      props: {
        galleryDetails: [],
      },
    };
  }
};
