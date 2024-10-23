import Image from "next/image";
import React, { FC } from "react";

interface DataNotFoundProps {
  title?: string;
  background?: string;
  textColor?: string;
  src?: string;
}

export const DataNotFound: FC<DataNotFoundProps> = ({
  title = "Data Not Found",
  background = "bg-white",
  textColor = "text-black",
  src = "/images/noBooks.png",
}) => {
  return (
    <div
      className={`w-full h-96 content-center flex justify-center items-center ${background}`}
    >
      <div>
        <div className="relative h-40">
          <Image
            src={src}
            alt="Current Image"
            layout={"fill"}
            objectFit={"contain"}
            // className="mx-auto content-center"
          />
        </div>
        <h1 className={`text-center font-medium text-3xl mt-8 ${textColor}`}>
          {title}
        </h1>
      </div>
    </div>
  );
};
