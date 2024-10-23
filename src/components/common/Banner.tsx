import Image from "next/image";
import React, { FC } from "react";
import { string } from "yup";
import { BreadCrumb } from "./BreadCrumb";
// import { translate } from "./../../lib/helper/utils";
import { useRouter } from "next/router";
import { Tooltip, Typography } from "antd";
import image from "../../../public/images/about-us.jpg";
const { Paragraph } = Typography;
interface BannerProps {
  title: string;
  image_url?: any;
  routes?: any;
}

export const Banner: FC<BannerProps> = ({
  title,
  image_url = "/donate_banner.png",
  routes,
}) => {
  const { locale } = useRouter();
  return (
    <div
      className={`height w-full relative ${
        locale === "bn" ? "font-notoBangali" : "font-fontNewAmericaSchool"
      }`}
    >
      <Image
        src={image}
        // src={image_url ? image_url : "/card-image-1.png"}
        layout="fill"
        alt="musume pic"
        objectFit="fill"
      />
      <div className="image-overlay">
        <div className=" font-light contect-center w-11/12 ">
          <div className="flex justify-center text-3xl md:text-5xl">
            {/* <h1 className="text-white "> */}
            <Tooltip placement="topLeft" title={title}>
              <Paragraph
                ellipsis={{
                  rows: 1,
                }}
                className="text-6xl text-white font-medium mb-0 py-5 "
              >
                {title}
              </Paragraph>
            </Tooltip>
            {/* </h1> */}
          </div>
          <div className="ant-breadcrumb-separator  text-base flex justify-center">
            <BreadCrumb routes={routes} />
          </div>
        </div>
      </div>
    </div>
  );
};
