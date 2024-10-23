import React, { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getData } from "@/lib/services";
import { useRouter } from "next/router";
import { Col, Row } from "antd";
import { AiOutlineShareAlt } from "react-icons/ai";
import moment from "moment";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { ShareButton } from "@/components/common";
interface IVideoGalleryDetails {
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

const VideoGalleryDetails: FC<IVideoGalleryDetails> = ({ galleryDetails }) => {
  const router = useRouter();
  const { slug } = router?.query;
  const language = Cookies.get("language");

  useEffect(() => {
    slug;
  }, [slug]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareableId, setSharedableId] = useState<any>("");
  const handleModal = (sharedId: string) => {
    setSharedableId(sharedId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="pl-content-container py-8">
        <h3 className="font-bold text-2xl my-3">{galleryDetails?.title}</h3>
        <div className="video-album-details">
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
          <span className="ml-2.5">
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
        </div>

        <div>
          <Row gutter={[10, 10]}>
            {galleryDetails?.album_items?.map((galleryItem) => {
              return (
                <Col
                  key={galleryItem.id}
                  xs={{ offset: 0, span: 24 }}
                  sm={{ offset: 0, span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 6 }}
                >
                  <div className="gallery-card bg-white p-4 rounded-lg border-2 border-white cursor-pointer common-card-hover">
                    <div className="card-img relative">
                      {galleryItem?.video_link ? (
                        <iframe
                          src={galleryItem?.video_link}
                          allowFullScreen
                          frameBorder="0"
                        ></iframe>
                      ) : (
                        <h2 className="pt-32 text-red-500 flex justify-center font-playfairDisplay font-bold">
                          {localeString(language, "noVideo")}
                        </h2>
                      )}
                    </div>
                    <div className="image-share flex justify-end text-gray-700">
                      <ShareButton
                        isModalOpen={isModalOpen}
                        onCancel={handleCancel}
                        url={`/gallery/video-gallery/${shareableId}`}
                      />
                      <AiOutlineShareAlt
                        className="text-2xl mt-3"
                        onClick={() => handleModal(galleryItem.id)}
                      />
                    </div>
                    <div className="card-heading my-4 ">
                      <h5 className="text-gray-700 text-base font-bold font-[playfairDisplay] ">
                        {galleryDetails?.title}
                      </h5>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default VideoGalleryDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context?.query;
  const res = await getData(
    `public_library/gallery_albums/${slug}`,
    { album_type: "video" },
    context?.req?.cookies?.["language"] || "bn"
  );
  return {
    props: {
      galleryDetails: res.data,
      language: context?.req?.cookies?.["language"] || "bn",
    },
  };
};
