import { localeString } from "@/lib/helpers/utils";
import { IGallery } from "@/lib/model/gallery";
import { Row, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useMediaQuery } from "usehooks-ts";

import { ShareButton } from "../common";

interface IVideoGalleryPage {
  galleryData: IGallery[];
  language: string;
}
export const VideoGalleryCard: FC<IVideoGalleryPage> = ({
  galleryData,
  language,
}) => {
  const width = useMediaQuery("(min-width: 768px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareableId, setSharedableId] = useState<number | null>(null);
  const handleModal = (sharedId: number) => {
    setSharedableId(sharedId);
    setIsModalOpen(true);
  };
  console.log("dsadsadsad==", galleryData);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row gutter={[10, 10]}>
        {galleryData?.map((element: any) => {
          return (
            <>
              <Col
                key={element.id}
                xs={{ offset: 0, span: 24 }}
                sm={{ offset: 0, span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                xxl={{ span: 8 }}
              >
                <div className="relative">
                  <Link href={`/gallery/video-gallery/${element?.id}`}>
                    <div className="gallery-card bg-white p-4 rounded-lg border-2 border-white  cursor-pointer common-card-hover">
                      <div
                        className="book-card overflow-hidden"
                        key={element?.id}
                      >
                        <Image
                          src={
                            width
                              ? element?.thumbnail_url?.desktop_image
                              : element?.thumbnail_url?.tab_image
                          }
                          alt="gallery-img"
                          fill={true}
                          className="rounded transition-all duration-500  hover:scale-105"
                        />
                      </div>

                      <div className="text-sm img-card-content flex justify-between text-gray-700">
                        <div className="image-number flex">
                          <div className="album-icon mt-0.5 mr-1">
                            <BsFillCameraVideoFill />
                          </div>
                          <div className="photo-number">
                            <p>
                              {element?.total_items}{" "}
                              {element?.total_items === 1
                                ? `${localeString(language, "galleryItem")}`
                                : `${localeString(language, "galleryItems")}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-heading my-4 ">
                        <h5 className="text-gray-700 text-base font-bold font-playfairDisplay">
                          {element?.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                  <div className="video-share cursor-pointer absolute bottom-16 right-4">
                    <ShareButton
                      isModalOpen={isModalOpen}
                      onCancel={handleCancel}
                      url={`/gallery/video-gallery/${shareableId}`}
                    />
                    <AiOutlineShareAlt
                      className="text-2xl"
                      onClick={() => handleModal(element?.id)}
                    />
                  </div>
                </div>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
};
