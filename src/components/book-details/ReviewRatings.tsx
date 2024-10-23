/** @format */

import React, {FC, useEffect, useState} from "react";
import {Row, Col, Button, Rate, Spin} from "antd";
import Image from "next/image";
import {IReviewRating} from "@/lib/model/books";
import {getPaginatedData} from "@/lib/services";
//import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import {WriteReview} from "../book/ReviewWrite";
import {SingleReview} from "../book/SingleReview";
import {DataNotFound} from "../common";
import {Typography} from "antd";
const {Text} = Typography;

interface ReviewRatingProps {
  bookReviewRating: IReviewRating[];
  slug: string;
  language: string | undefined;
}

export const ReviewRating: FC<ReviewRatingProps> = ({
  bookReviewRating,
  slug,
}) => {
  const [review, serReview] = useState(bookReviewRating);
  const [hasMore, setHasMore] = useState(true);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [sliceAdding, setSliceAdding] = useState({count: 10});

  const [isSingleReviewisible, setSingleReviewVisible] = useState(false);
  const [popUpProps, setPopUpProps] = useState();
  const reviewToggleFilterModal = () => {
    setIsReviewModalVisible(!isReviewModalVisible);
  };

  const reviewSingleReview = (item: any) => {
    setPopUpProps(item);
    setSingleReviewVisible(!isSingleReviewisible);
  };

  useEffect(() => {
    getMorePost();
  }, []);

  const getMorePost = async () => {
    const reviewRes: any = await getPaginatedData(
      `public_library/biblios/${slug}/reviews`,
      {
        page: review?.length / 1 + 1,
        //per_page: 4,
      },
      Cookies.get("language")
    );
    if (reviewRes?.success) {
      if (reviewRes?.data?.data.length > 0) {
        serReview((post) => [...post, ...reviewRes?.data?.data]);
      } else {
        setHasMore(false);
      }
    }
  };

  const language: string | undefined = Cookies.get("language");
  const getSeeMoreReview = (c: any) => {
    let _count = {...sliceAdding, count: sliceAdding?.count + c};
    setSliceAdding(_count);
  };

  return (
    <>
      <div className="pt-10 pb-4 flex items-center justify-between">
        <div className="">
          <h1 className="lg:pt-8 lg:section-title-dark min-section-title">
            {localeString(language, "ratingReviews")}
          </h1>
        </div>
        <div className="lg:h-8 borrowBookButton lg:w-28 lg:mr-4">
          <Button
            className="lg:h-10 h-full button-secondary"
            onClick={() => {
              reviewToggleFilterModal();
            }}
          >
            {localeString(language, "writeReview")}
          </Button>
        </div>
      </div>
      {bookReviewRating?.length > 0 ? (
        // <InfiniteScroll
        //   dataLength={review.length}
        //   next={getMorePost}
        //   hasMore={hasMore}
        //   loader={<Spin />}
        //   endMessage={""}
        //   >

        <Row>
          {review?.slice(0, sliceAdding?.count)?.map((item) => (
            <Col
              xs={{span: 24}}
              sm={{span: 24}}
              md={{span: 24}}
              lg={{span: 24}}
              xl={{span: 24}}
              key={item?.id}
              className="w-full mb-4 bg-white bg-opacity-50 p-4 rounded-lg cursor-pointer "
            >
              <div
                className="flex justify-start cursor-pointer"
                onClick={() => {
                  reviewSingleReview(item);
                }}
              >
                <Image
                  className=" w-8 h-8 rounded-full "
                  src={item?.icon ? item?.icon : "/icons/review/user.png"}
                  alt="Neil image"
                  width={32}
                  height={32}
                />

                <div className="pl-4">
                  <div className="text-base font-bold">{item?.user?.name}</div>
                  <div className="text-sm">
                    <Rate
                      disabled
                      defaultValue={item?.rating}
                      className="font-semibold text-sm pb-2  cursor-pointer"
                    />
                  </div>
                  <Typography.Paragraph
                    className="text-base font-normal"
                    ellipsis={{rows: 2}}
                  >
                    {item?.text}
                  </Typography.Paragraph>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        // </InfiniteScroll>
        <DataNotFound title="No Review Yet" background=" " />
      )}

      {sliceAdding?.count >= review?.length ? (
        ""
      ) : (
        <div className="flex justify-center ">
          <Button
            className="w-full lg:w-64 button-primary  uppercase"
            onClick={() => getSeeMoreReview(10)}
          >
            {localeString(language, "seeMore")}
          </Button>
        </div>
      )}

      <WriteReview
        isModalVisible={isReviewModalVisible}
        toggleModal={reviewToggleFilterModal}
        slug={slug}
      />
      <SingleReview
        isModalVisible={isSingleReviewisible}
        toggleModal={reviewSingleReview}
        popUpProps={popUpProps}
      />
    </>
  );
};
