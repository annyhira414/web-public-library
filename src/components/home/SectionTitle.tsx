/** @format */

import React, {FC} from "react";
import Link from "next/link";

interface ISectionTitle {
  title: string;
  link?: string;
}

const SectionTitle: FC<ISectionTitle> = ({title, link = "/"}) => {
  return (
    <div className="flex justify-between">
      <p className="section-title-dark">{title}</p>
      <p className="font-semibold text-sm text-green-800">
        <Link href={"/activities/events"}>See All</Link>
      </p>
    </div>
  );
};

export default SectionTitle;
