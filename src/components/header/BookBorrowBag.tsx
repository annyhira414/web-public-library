/** @format */

import React, {FC, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Divider, Row, Col, Button} from "antd";
import {RiDeleteBinLine} from "react-icons/ri";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import {Card} from "antd";
import {deleteData, getData} from "@/lib/services";
import NoImageFound from "../../../public/images/book-page/noImageFound.png";
import {DataNotFound} from "../common";

interface IBookCard {
  bookCart: any;
  deleteCart?: any;
}

export const BookBorrowBag: FC<IBookCard> = ({bookCart, deleteCart}) => {
  const language = Cookies.get("language");

  return (
    <div className="p-6 lg:w-[550px]">
      {bookCart?.length > 0 ? (
        <div>
          <div>
            <div className="flex justify-between">
              <h1 className="section-title text-xl">
                {localeString(language, "borrowYourBag")}
              </h1>
              {/* <button>
              <HiXMark className="w-5 h-5" />
            </button> */}
            </div>
            <Divider className="my-2" />
          </div>
          <div className="mt-7">
            <>
              <div>
                {bookCart?.map((user: any, i: number) => (
                  <Card
                    key={user.id}
                    hoverable
                    className="borrowAntcard mt-3 mb-2 px-4 py-3"
                  >
                    <Row>
                      <Col lg={{span: 18}} xs={{span: 20}} className="flex">
                        <div className="borrowCard">
                          <Image
                            src={
                              user?.image_url?.desktop_image
                                ? user?.image_url?.desktop_image
                                : NoImageFound
                            }
                            alt="App logo"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="ml-2">
                          <h2 className="section-title text-sm lg:text-base font-normal text-library-gray-700">
                            {user?.title}
                          </h2>
                          <h3 className="mt-1 text-xs text-library-gray-700">
                            {user?.authors?.map(
                              (user: any, i: number) => user?.full_name
                            )}
                          </h3>
                        </div>
                      </Col>
                      <Col lg={{span: 2, offset: 4}} xs={{span: 2}}>
                        <div className="flex justify-end">
                          {/* <button>
                          <HiHeart className="cursor-pointer text-red-600 text-lg " />
                        </button> */}
                          <button
                            onClick={() => {
                              deleteCart(user.id);
                            }}
                          >
                            <RiDeleteBinLine className="cursor-pointer rounded-full text-library-gray text-lg " />
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
              <Link href={"/book-borrow?deliveryType=pickup"}>
                <div className="borrowBookButton">
                  <Button
                    htmlType="submit"
                    className="button-secondary mt-6 w-full h-12"
                  >
                    {localeString(language, "borrowPopButton")}
                  </Button>
                </div>
              </Link>
            </>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="section-title text-xl">
              {localeString(language, "borrowYourBag")}
            </h1>
            {/* <button>
              <HiXMark className="w-5 h-5" />
            </button> */}
          </div>
          <Divider className="my-2" />
          <DataNotFound title={localeString(language, "emptyBag")} />
        </>
      )}
    </div>
  );
};
