import Image from "next/image";
import React from "react";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {Button} from "antd";
import {useRouter} from "next/router";

const MemorandumNotice = () => {
  const language: string | undefined = Cookies.get("language");
  const publisher = Cookies.get("is_publisher");

  let router = useRouter();
  const handleApply = () => {
    const IsPublisher = publisher === "true";
    IsPublisher
      ? router.push("/publisher-panel/active-memorandum ")
      : router.push("/publisher");
  };

  return (
    <div className="flex justify-center items-center pt-12 pl-content-container">
      <div className="pb-20">
        <Image
          src="/images/notice.png"
          alt="publisher"
          width={1096}
          height={300}
        />
        <div className="flex justify-center pt-8 borrowBookButton">
          <Button
            className="w-full lg:w-96 button-secondary"
            onClick={handleApply}
          >
            {localeString(language, "apply")}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MemorandumNotice;
