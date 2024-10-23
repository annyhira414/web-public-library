import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import { Modal } from "antd";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import moment from "moment";
import Image from "next/image";
import React, { FC, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ICommonModal {
  isModalOpen: boolean;
  onCancel?: () => void;
  closable?: boolean;
  footer?: null;
  booksDetails?: {
    item_info?: {
      title?: string;
      image_url?: any;
    };
    date?: any;
    price?: number;
    status?: string;
  };
}
export const CommonModal: FC<ICommonModal> = ({
  isModalOpen,
  onCancel,
  booksDetails,
  closable,
  footer,
}) => {
  const language = Cookies.get("language");
  const width = useMediaQuery("(min-width: 768px)");
  return (
    <div>
      <Modal
        open={isModalOpen}
        footer={footer}
        onCancel={onCancel}
        maskClosable={closable}
      >
        <div className="">
          <div className="return-card-body bg-white p-4 rounded">
            <div className="mb-4">
              <div className="flex mt-4 border-b">
                <div className="order-book-image mb-3">
                  {!isEmpty(booksDetails?.item_info?.image_url) && (
                    <Image
                      src={
                        width
                          ? booksDetails?.item_info?.image_url?.desktop_image
                            ? booksDetails?.item_info?.image_url?.desktop_image
                            : "/no-image.png"
                          : booksDetails?.item_info?.image_url?.tab_image
                          ? booksDetails?.item_info?.image_url?.tab_image
                          : "/no-image.png"
                      }
                      alt="gallery-img"
                      width={180}
                      height={150}
                      className="rounded"
                    />
                  )}
                </div>
                <div className="order-book-title ml-2">
                  <h5 className="text-gray-700 text-base">
                    {booksDetails?.item_info?.title}
                  </h5>
                </div>
              </div>
              <div className="lost-date flex justify-between border-b py-4 ">
                <div className="issue-date">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                    <span className="font-semibold">
                      {localeString(language, "issueDate")} :
                    </span>
                    <span> </span>
                    <span>
                      {currencyFormatter(
                        language,
                        parseInt(moment(booksDetails?.date)?.format("D"))
                      )}{" "}
                      {localeString(
                        language,
                        `${moment(booksDetails?.date).format("MMMM")}`
                      )}{" "}
                      {commaRemover(
                        currencyFormatter(
                          language,
                          parseInt(moment(booksDetails?.date)?.format(`YYYY`))
                        )
                      )}
                    </span>
                  </p>
                </div>
                <div className="return-date">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                    <span className="font-semibold">
                      {localeString(language, "returnDate")} :
                    </span>
                    <span> </span>
                    <span>
                      {currencyFormatter(
                        language,
                        parseInt(moment(booksDetails?.date)?.format("D"))
                      )}{" "}
                      {localeString(
                        language,
                        `${moment(booksDetails?.date).format("MMMM")}`
                      )}{" "}
                      {commaRemover(
                        currencyFormatter(
                          language,
                          parseInt(moment(booksDetails?.date)?.format(`YYYY`))
                        )
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="lost-status flex justify-between border-b py-4 ">
                <div className="issue-date">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                    <span className="font-semibold">
                      {localeString(language, "orderStatus")} :
                    </span>
                    <span> {booksDetails?.status}</span>
                  </p>
                </div>
                <div className="lost-data">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                    <span className="font-semibold">
                      {localeString(language, "bookPrice")} :
                    </span>
                    <span>
                      {" "}
                      {currencyFormatter(language, booksDetails?.price)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
