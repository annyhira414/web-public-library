import React, {FC, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Button, Image} from "antd";
import {localeString} from "@/lib/helpers/utils";
import {IReviewDetails} from "@/lib/model/physical-book-review";
import {getData} from "@/lib/services";
import {useRouter} from "next/router";
import {BiArrowBack} from "react-icons/bi";
import Link from "next/link";

interface IMyReviewsDetails {
  language: string | undefined;
}

const MyReviewsDetails: FC<IMyReviewsDetails> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const [detailsData, setDetailsData] = useState<IReviewDetails>();
  const router = useRouter();

  const {id} = router?.query;

  const getlist = async (id: string) => {
    const res: any = await getData(
      `public_library/physical_reviews/${id}`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setDetailsData(res?.data);
    }
  };

  useEffect(() => {
    getlist(id as string);
  }, [id]);

  return (
    <div className="py-20 pl-content-container">
      <>
        <Link href={"/physical-book-review"}>
          <div>
            <div className="flex justify-start">
              <div className="mt-2 text-xl">
                <BiArrowBack />
              </div>
              <button className="pl-2 pt-1 text-lg">
                {localeString(language, "back")}
              </button>
            </div>
          </div>
        </Link>
        <h1 className="py-8  min-section-title">
          {localeString(language, "bookConditionReview")}
        </h1>
        <div className="p-8 bg-white w-full h-full rounded-lg">
          <>
            <div className="py-4">
              <h1 className="sub-card-title ">
                {localeString(language, "barcodeNo")}
              </h1>
              <p className="pt-2 sub-text">
                {detailsData?.biblio_item?.barcode}
              </p>
            </div>
            <hr />
          </>
          <>
            <div className="py-4">
              <h1 className="sub-card-title ">
                {localeString(language, "bookName")}
              </h1>
              <p className="pt-2 sub-text">
                {detailsData?.biblio_item?.book_name}
              </p>
            </div>
            <hr />
          </>
          <>
            <div className="py-4">
              <h1 className="sub-card-title ">
                {localeString(language, "authorName")}
              </h1>
              <p className="pt-2 sub-text">
                {detailsData?.biblio_item?.author_name &&
                detailsData?.biblio_item?.author_name?.length > 0
                  ? detailsData?.biblio_item?.author_name?.join(", ")
                  : "..."}
              </p>
            </div>
          </>
          <>
            <div className="py-4">
              <h1 className="sub-card-title ">
                {localeString(language, "description")}
              </h1>
              <p className="pt-2 sub-text">{detailsData?.review_body}</p>
            </div>
          </>
          {detailsData?.book_image_url ? (
            <>
              <div className="py-4">
                <h1 className="sub-card-title ">
                  {localeString(language, "bookImage")}
                </h1>
                <p className="pt-2 sub-text">
                  <Image
                    src={
                      detailsData?.book_image_url
                        ? detailsData?.book_image_url
                        : ""
                    }
                    alt="Book Image"
                    height={100}
                    width={100}
                  />
                </p>
              </div>
            </>
          ) : (
            <h1>
              <h1 className="sub-card-title ">
                {localeString(language, "noImage")}
              </h1>
            </h1>
          )}

          <>
            <Link href={"/physical-book-review"}>
              <div className="py-3 pr-4 flex justify-end">
                <Button className="w-full md:w-40 sub-button">
                  {localeString(language, "back")}
                </Button>
              </div>
            </Link>
          </>
        </div>
      </>
    </div>
  );
};

export default MyReviewsDetails;
