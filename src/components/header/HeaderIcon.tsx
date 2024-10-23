/** @format */

import Image from "next/image";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import { localeString } from "@/lib/helpers/utils";
import React, { FC } from "react";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";
interface IHeaderIconProps {
  language: string | undefined;
}

export const HeaderIcon: FC<IHeaderIconProps> = ({ language }) => {
  const router = useRouter();

  const goToHomePage = () => {
    router.push("/");
  };
  const width = useMediaQuery("(min-width: 768px)");
  return (
    <Row>
      <Col>
        <Link href="/">
          <div className="flex">
            {width ? (
              <Image
                src="/logo/applogo.svg"
                alt="App logo"
                width={66}
                height={72}
              />
            ) : (
              <Image
                src="/logo/applogo.svg"
                alt="App logo"
                width={36}
                height={40}
              />
            )}

            <div className="ml-1 mt-1">
              <h1 className=" text-white font-playfairDisplay text-xs md:text-sm lg:text-xl  lg:mt-2 ml-0 md:ml-1 md:mt-3 lg:ml-1">
                {localeString(language, "departmentHeader")}
              </h1>
              <h3 className="text-sm text-library-white font-playfairDisplay  lg:mt-0  ml-0 md:ml-1 lg:ml-1">
                {localeString(language, "subHeader")}
              </h3>
            </div>
          </div>
        </Link>
      </Col>
    </Row>
  );
};
