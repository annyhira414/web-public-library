import Image from "next/image";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";

export const PublisherBanner = () => {
  const publisher = Cookies.get("is_publisher");
  const language = Cookies.get("language");
  const router = useRouter();

  console.log("publisher in banner", publisher);

  const PublisherChecker = () => {
    const isPublisher = publisher === "true";
    if (isPublisher) {
      router.push("/publisher-panel");
    } else {
      router.push("/publisher");
    }
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="common-card-hover">
      {language === "bn" && (
        <Image
          className={`cursor-pointer ${isDesktop ? "" : "rounded-lg"}`}
          onClick={PublisherChecker}
          src={
            isDesktop
              ? "/images/bn-publishe-web.png"
              : "/images/bn-publisher-mobile.png"
          }
          alt="publisher Banner Image"
          width={1400}
          height={200}
        />
      )}
      {language === "en" && (
        <Image
          className={`cursor-pointer ${isDesktop ? "" : "rounded-lg"}`}
          onClick={PublisherChecker}
          src={
            isDesktop
              ? "/images/newBanner.png"
              : "/images/en-publisher-mobile.png"
          }
          alt="publisher Banner Image"
          width={isDesktop ? 1400 : 360}
          height={isDesktop ? 200 : 140}
        />
      )}
    </div>
  );
};
