import { localeString } from "@/lib/helpers/utils";
import { IGallery } from "@/lib/model/gallery";
import { Row, Col, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiPhotoAlbum } from "react-icons/bi";
import { useMediaQuery } from "usehooks-ts";
import { isEmpty } from "lodash";
import { ShareButton } from "../common";

interface IGalleryPage {
  galleryData: IGallery[];
  language: string | undefined;
}

export const GalleryCard: FC<IGalleryPage> = ({ galleryData, language }) => {
  const width = useMediaQuery("(min-width: 768px)");
  const [isModalOpen, setIsMOdalOpen] = useState(false);
  const [shareableId, setSharedableId] = useState<number | null>(null);
  const handleModal = (sharedId: number) => {
    setSharedableId(sharedId);
    setIsMOdalOpen(true);
  };
  const handleCancel = () => {
    setIsMOdalOpen(!isModalOpen);
  };

  return (
    <div className="photo-album">
      <Row gutter={[10, 10]}>
        {galleryData?.map((element: IGallery) => {
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
                  <Link href={`/gallery/photo-gallery/${element?.id}`}>
                    <div className="gallery-card bg-white p-4 rounded-lg border-white border cursor-pointer common-card-hover ">
                      <div
                        className="book-card overflow-hidden"
                        key={element?.id}
                      >
                        {!isEmpty(element?.thumbnail_url) && (
                          <Image
                            src={
                              width
                                ? element?.thumbnail_url?.desktop_image
                                  ? element?.thumbnail_url?.desktop_image
                                  : "/no-image.png"
                                : element?.thumbnail_url?.tab_image
                                ? element?.thumbnail_url?.tab_image
                                : "/no-image.png"
                            }
                            alt="gallery-img"
                            fill={true}
                            className="rounded transition-all duration-500  hover:scale-105"
                          />
                        )}
                      </div>

                      <div className="img-card-content  text-gray-700 mt-3">
                        <div className="image-number flex">
                          <div className="album-icon mt-0.5 mr-1">
                            <BiPhotoAlbum />
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
                        <Tooltip placement="topLeft" title={element?.title}>
                          <h5 className="card-title  line-clamp-1">
                            {element?.title}
                          </h5>
                        </Tooltip>
                      </div>
                    </div>
                  </Link>
                  <div className="image-share cursor-pointer absolute bottom-16 right-4">
                    <ShareButton
                      isModalOpen={isModalOpen}
                      onCancel={handleCancel}
                      url={`/gallery/photo-gallery/${shareableId}`}
                    />
                    <AiOutlineShareAlt
                      className="text-2xl "
                      onClick={() => handleModal(element?.id)}
                    />
                  </div>
                </div>
              </Col>
            </>
          );
        })}
      </Row>
    </div>
  );
};
