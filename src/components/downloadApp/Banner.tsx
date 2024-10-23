import Image from "next/image";
import React from "react";

export const DownloadBanner = () => {
  return (
    <div className="pl-content-container">
      <div className="common-carrd-hover">
        <Image
          className="cursor-pointer hover:rounded-[32px]"
          src="/images/Banner-download-app.svg"
          alt="publisher Banner Image"
          width={1400}
          height={200}
        />
      </div>
    </div>
  );
};
