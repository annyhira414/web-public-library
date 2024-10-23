import { Avatar, List, Typography } from "antd";
import React, { FC } from "react";
import { InputSearch, FieldLabel, Select } from "@/components/controls";
import { ILibaryList } from "@/lib/model/library/index";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { BsBuildings } from "react-icons/bs";

interface ILibraryListProps {
  libraryData: ILibaryList;
}

export const LibraryList: FC<ILibraryListProps> = ({ libraryData }) => {
  return (
    <Link href={`/library/${libraryData?.code}`}>
      <div className="bg-white mb-2 p-4 flex justify-between items-center rounded-md   hover:border-2 hover:border-library-primary  hover:text-library-primary transition duration-700 ease-in-out library-border">
        <div className="flex items-center gap-2">
          <BsBuildings />
          <h1 className="hover:text-library-primary max-line-limit">
            <span className="text-sm font-normal">{libraryData?.name}</span>
          </h1>
        </div>
        <div className="ml-2">
          <IoIosArrowForward />
        </div>
      </div>
    </Link>
  );
};
