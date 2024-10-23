import React, {FC} from "react";
import {localeString} from "@/lib/helpers/utils";
import {Select} from "antd";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {useMediaQuery} from "usehooks-ts";
import Link from "next/link";
import Image from "next/image";

interface IOtpCreadentialHeadingProps {
  language?: string | undefined;
}

const OtpCreadentialHeading: FC<IOtpCreadentialHeadingProps> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  const router = useRouter();

  const width = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div className="flex justify-between mt-16">
        <div>
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
                <h1 className="text-library-primary text-xs md:text-sm lg:text-xl  lg:mt-2 ml-0 md:ml-1 md:mt-3 lg:ml-1">
                  {localeString(language, "departmentHeader")}
                </h1>
                <h3 className="text-xs text-library-primary  font-playfairDisplay  lg:mt-0  ml-0 md:ml-1 lg:ml-1">
                  {localeString(language, "subHeader")}
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OtpCreadentialHeading;
