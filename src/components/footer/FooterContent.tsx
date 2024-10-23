import React, { FC } from "react";
import { Col, Row, Divider } from "antd";
import Link from "next/link";

import { localeString, currencyFormatter } from "@/lib/helpers/utils";
import { AiFillFacebook, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";

interface IFooterContentProps {
  language: string | undefined;
}
export const FooterContent: FC<IFooterContentProps> = ({ language }) => {
  return (
    <>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
        >
          <div className=" text-library-gray-300 text-sm">
            <h1 className=" mt-10 font-bold text-base text-library-white">
              {localeString(language, "contact")}
            </h1>
            <p className="mt-4">
              {localeString(language, "address1")}
              <br /> {localeString(language, "address2")}
              <br />
              {localeString(language, "address3")}
            </p>
            <p className="mt-4">
              {localeString(language, "phone")} :
              {localeString(language, "phoneNumber")}
            </p>
            <p className="mt-4">
              {localeString(language, "email")} : dg.dpl.2012@gmail.com
            </p>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
        >
          <div className="text-library-gray-300 mt-10 text-sm">
            <p className="text-base text-library-white font-bold">
              {localeString(language, "openingHour")}
            </p>
            <p className="mt-4"> {localeString(language, "time1")}</p>
            <p className="mt-4"> {localeString(language, "time2")}</p>
            <p className="mt-4"> {localeString(language, "time3")}</p>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 4 }}
        >
          <div className="text-library-gray-300 mt-10 ">
            <p className="text-base font-bold text-library-white">
              {localeString(language, "aboutTheLibrary")}
            </p>
            <ul className=" footer-page-link text-sm mt-4 cursor-pointer">
              <li>
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/about"}
                >
                  {localeString(language, "about")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/vision"}
                >
                  {localeString(language, "vision")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/history"}
                >
                  {localeString(language, "history")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/faq"}
                >
                  {localeString(language, "faq")}
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 4 }}
        >
          <div className="text-library-gray-300 mt-10 lg:ml-4">
            <p className="text-base font-bold text-library-white">
              {localeString(language, "menu")}
            </p>
            <ul className="footer-page-link text-sm mt-4 cursor-pointer">
              <li>
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/about"}
                >
                  {localeString(language, "paperBooks")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/contact-us"}
                >
                  {localeString(language, "eBooks")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/gallery/photo-gallery"}
                >
                  {localeString(language, "gallery")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href={"/activities/events"}
                >
                  {localeString(language, "events")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href="#"
                >
                  {localeString(language, "archive")}
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 4 }}
        >
          <div className="text-library-gray-300 mt-10">
            <p className="text-base font-bold text-library-white">
              {localeString(language, "policies")}
            </p>

            <ul className="footer-page-link text-sm mt-4 cursor-pointer">
              <li>
                <Link
                  className="hover:underline hover:text-library-secondary"
                  href={"/privacy-policy"}
                >
                  {localeString(language, "privacy")}
                  {/* <Divider className="mt-1 w-10" style={{ borderColor: "white" }} /> */}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className=" hover:underline hover:text-library-secondary"
                  href={"/terms-and-condition"}
                >
                  {localeString(language, "termsConditions")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:underline hover:text-library-secondary"
                  href={"/membership-policy"}
                >
                  {localeString(language, "membershipPolicy")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className=" hover:underline hover:text-library-secondary"
                  href="#"
                >
                  {localeString(language, "bookBorrowAndReturnPolicy")}
                </Link>
              </li>
              <li className="mt-4">
                <Link
                  className="hover:text-library-secondary hover:underline"
                  href="#"
                >
                  {localeString(language, "archive")}
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          xxl={{ span: 24 }}
        >
          <div className="social-icon flex cursor-pointer mt-6 lg:mt-0">
            <span>
              <Link href="https://www.facebook.com/dpldhaka.bd" target="blank">
                <div className="fb-icon text-xl bg-white w-8 h-8 rounded-full flex justify-center items-center">
                  <AiFillFacebook className="hover:text-[#247CFA]" />
                </div>
              </Link>
            </span>
            <span className="ml-4">
              <Link href="#">
                <div className="linkedin-icon text-xl bg-white w-8 h-8 rounded-full flex justify-center items-center">
                  <AiFillLinkedin className="hover:text-[#0966C2]" />
                </div>
              </Link>
            </span>
            <span className="ml-4 ">
              <Link href="#">
                <div className="hover:text-red-600 yt-icon text-xl bg-white w-8 h-8 rounded-full flex justify-center items-center">
                  <AiFillYoutube className="hover:text-red-600" />
                </div>
              </Link>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Divider className="mt-5" style={{ borderColor: "white" }} />
        <Col className="mb-12 text-library-white text-xs">
          <p>© {localeString(language, "department")}</p>
        </Col>
      </Row>
    </>
  );
};
