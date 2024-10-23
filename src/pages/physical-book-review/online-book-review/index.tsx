import React, {FC, useState, useEffect} from "react";
import {localeString} from "@/lib/helpers/utils";
import {Pagination, Col, Row, Typography, Rate} from "antd";
import Cookies from "js-cookie";
import {Common} from "@/components/Physical-Book-Review/Common/Common";
import {IReviewData} from "@/lib/model/physical-book-review";
import {DataNotFound} from "@/components/common";
import {useRouter} from "next/router";
import {currentPageChecker, scrollToTop} from "@/lib/helpers/utils";
import {getPaginatedData} from "@/lib/services";
import SingleReview from "./[slug]";
import {Loader} from "@/components/common";

interface IOnlineBookReviewProps {
  language: string | undefined;
  total: number | string;
}

const OnlineBookReview: FC<IOnlineBookReviewProps> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const [reviewsData, setReviewsData] = useState<IReviewData[]>([]);
  const [perPage, setPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [isSingleReviewisible, setSingleReviewVisible] = useState(false);
  const [popUpProps, setPopUpProps] = useState();
  const [loading, setLoading] = useState(false);

  let router = useRouter();
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );

  // useEffect(() => {
  //   getReviews();
  // }, [page]);
  const getReviews = async () => {
    setLoading(true);
    const res: any = await getPaginatedData(
      `public_library/reviews`,
      {
        per_page: 4,
        page: page,
      },
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setReviewsData(res?.data?.data);
      setTotalPages(parseInt(res?.data?.headers["x-total"]));
      setPage(parseInt(res?.data?.headers["x-page"]));
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
    router.replace({
      pathname: "online-book-review",
      query: {
        page,
      },
    });
    if (page > totalPages) {
      setPage(page);
    }

    scrollToTop();
  }, [totalPages, page]);

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "online-book-review",
      query: {
        page,
      },
    });
    setPage(page);
  };

  const reviewSingleReview = (item: any) => {
    setPopUpProps(item);
    setSingleReviewVisible(!isSingleReviewisible);
  };

  return (
    <>
      <div className="pl-content-container">
        <Row gutter={[16, 25]}>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 6}}
            lg={{span: 6}}
            xl={{span: 6}}
            xxl={{span: 6}}
          >
            <Common language={language} />
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 18}}
            lg={{span: 16}}
            xl={{span: 18}}
            xxl={{span: 18}}
          >
            <div className="lg:pl-10 w-full xl:w-10/12 md:pl-4">
              <h3 className="text-left section-title md:pt-12">
                {localeString(language, "onlineBookReview")}
              </h3>
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {reviewsData?.length > 0 ? (
                      <div>
                        <div className="w-full">
                          <div className="pt-8">
                            {reviewsData?.map(
                              (item: IReviewData, index: number) => (
                                <div
                                  className="bg-white p-4 rounded-lg mb-6 cursor-pointer"
                                  key={index}
                                  onClick={() => {
                                    reviewSingleReview(item);
                                  }}
                                >
                                  <div className="flex justify-between pt-2">
                                    <div>
                                      <h1 className="card-title w-full">
                                        {item?.biblio?.title}
                                      </h1>
                                    </div>
                                    <div className="">
                                      <Rate
                                        disabled
                                        allowHalf
                                        defaultValue={item?.rating}
                                        className="text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div className="pt-4">
                                    <Typography.Paragraph
                                      className="sub-container-text  text-left text-base text-black"
                                      ellipsis={{rows: 2}}
                                    >
                                      {item?.text}
                                    </Typography.Paragraph>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="py-10 ">
                          <Pagination
                            total={totalPages}
                            showSizeChanger={false}
                            defaultCurrent={1}
                            current={
                              router?.query?.page
                                ? parseInt(router?.query?.page as string)
                                : 1
                            }
                            pageSize={perPage}
                            onChange={handlePageChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="pt-6 pb-16">
                        <DataNotFound />
                      </div>
                    )}
                  </>
                )}
              </>
            </div>
          </Col>
        </Row>

        <SingleReview
          isModalVisible={isSingleReviewisible}
          toggleModal={reviewSingleReview}
          popUpProps={popUpProps}
        />
      </div>
    </>
  );
};
export default OnlineBookReview;
