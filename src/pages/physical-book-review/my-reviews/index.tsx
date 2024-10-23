import React, {FC, useState} from "react";
import Cookies from "js-cookie";
import {Button} from "antd";
import {localeString} from "@/lib/helpers/utils";
import {DataNotFound} from "@/components/common";
import {IlistData} from "@/lib/model/physical-book-review";
import {useRouter} from "next/router";

interface IMyReviews {
  language: string | undefined;
  listData: IlistData[];
}

const MyReviews: FC<IMyReviews> = ({listData}) => {
  let router = useRouter();

  const language: string | undefined = Cookies.get("language");

  const getId = (id: number) => {
    router.push(`/physical-book-review/my-reviews/${id}`);
  };

  return (
    <div className="pb-16">
      {listData?.length > 0 ? (
        <>
          {listData?.map((item, index: number) => (
            <div className="py-4" key={index}>
              <div className="bg-white pt-4 pl-6">
                <>
                  <div className="py-4">
                    <h1 className="sub-card-title ">
                      {localeString(language, "barcodeNo")}
                    </h1>
                    <p className="pt-2 sub-text">
                      {item?.biblio_item?.barcode}
                    </p>
                  </div>
                  <hr />
                </>
                <>
                  <div className="py-4">
                    <h1 className="sub-card-title">
                      {localeString(language, "bookName")}
                    </h1>
                    <p className="pt-2 sub-text">
                      {item?.biblio_item?.book_name}
                    </p>
                  </div>
                  <hr />
                </>
                <>
                  <div className="py-6 pr-4  flex justify-end">
                    <Button
                      onClick={() => getId(item?.id)}
                      className="sub-button uppercase"
                    >
                      {localeString(language, "viewDetails")}
                    </Button>
                  </div>
                </>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="pt-4">
          <DataNotFound title={localeString(language, "noReviews")} />
        </div>
      )}
    </div>
  );
};
export default MyReviews;
