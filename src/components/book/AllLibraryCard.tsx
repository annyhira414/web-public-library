import { INotice } from "@/lib/model/activities/notice";
import { IAllLibrary } from "@/lib/model/books";
import { IAllLibraryType } from "@/pages/books/all-library";
import { Typography } from "antd";
import moment from "moment";
import Link from "next/link";
import React, { FC } from "react";
import { HiOutlineLibrary } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";

interface IAllLibraryCard {
  allLibrary: IAllLibraryType;
}

const AllLibraryCard: FC<IAllLibraryCard> = ({ allLibrary }) => {
  return (
    <div className="bg-white p-4 flex-center-gap rounded-md  hover:bg-library-primary  hover:text-white hover:underline transition duration-700 ease-in-out cursor-pointer ">
      <HiOutlineLibrary />
      <div className="w-full">
        <span className="text-sm font-normal">
          {allLibrary?.name}
          {", "}
          {allLibrary?.thana?.name}
          {", "}
          {allLibrary?.district?.name}{" "}
        </span>
      </div>
    </div>
  );
};

export default AllLibraryCard;
