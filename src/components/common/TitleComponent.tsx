import {localeString} from "@/lib/helpers/utils";
import Link from "next/link";
import React, {FC} from "react";

interface SearchProps {
  title: string;
  link: string;
  language: string;
}
export const TitleCompoent: FC<SearchProps> = ({title, language, link}) => {
  return (
    <div className="flex justify-between">
      <p className="font-bold lg:text-3xl text-2xl  pb-8 leading-5 font-poppins">
        {title}
      </p>

      <p className="section-sub-title-light hover:underline uppercase font-poppins">
        <Link href={link}>{localeString(language, "seeMore")}</Link>
      </p>
    </div>
  );
};
