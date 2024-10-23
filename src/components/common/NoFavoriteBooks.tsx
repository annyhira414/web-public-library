/** @format */

import Image from "next/image";
import React, {FC} from "react";
import {localeString} from "@/lib/helpers/utils";

interface BooksNotFoundProps {
  title?: string;
  background?: string;
  textColor?: string;
  language: string | undefined;
}

export const NoFavoriteBooks: FC<BooksNotFoundProps> = ({
  language,
  title = `${localeString(language, "noFavoriteBooks")}`,
  background = "bg-white",
  textColor = "text-black",
}) => {
  return (
    <div
      className={`w-full h-96 content-center flex justify-center items-center ${background}`}
    >
      <div>
        <div className="relative h-40">
          <Image
            src="/images/noBooks.png"
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
