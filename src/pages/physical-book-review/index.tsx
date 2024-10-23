import { Button, Col, Row, Typography } from "antd";
import React, { FC, useState, useEffect } from "react";
import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { Common } from "@/components/Physical-Book-Review/Common/Common";
import { getData } from "@/lib/services";
import { IlistData } from "@/lib/model/physical-book-review";
import MyReviews from "./my-reviews";
import WriteReview from "@/components/Physical-Book-Review/BookReview/WriteReview";
import { useRouter } from "next/router";

interface IMyRequestProps {
  language: string | undefined;
}

const MyRequest: FC<IMyRequestProps> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  let router = useRouter();

  const [listData, setListData] = useState<IlistData[]>([]);
  const [isWriteReview, isNotWriteReview] = useState(false);
  const [isNeedReload, setIsNeedReload] = useState("");

  // const [urlParam, setUrlParam] = useState(
  //   router?.query ? router?.query : "physical-book-review"
  // );

  const handleShowBookDemand = () => {
    isNotWriteReview(false);
  };

  const handleShowRequestHistory = () => {
    isNotWriteReview(true);
  };

  const getlist = async () => {
    const res = await getData(
      `public_library/physical_reviews`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setListData(res?.data);
    }
  };
  useEffect(() => {
    getlist();
  }, []);

  return (
    <>
      <div className="pl-content-container">
        <Row gutter={[16, 2]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <Common language={language} />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 18 }}
            lg={{ span: 16 }}
            xl={{ span: 18 }}
            xxl={{ span: 18 }}
          >
            <div className="lg:pl-10 w-full xl:w-10/12 md:pl-4">
              <h3 className="text-left section-title md:pt-12 mt-0">
                {localeString(language, "bookConditionReview")}
              </h3>
              <div className="w-full flex justify-between gap-4 pt-4">
                <div className="w-full">
                  <Button
                    onClick={handleShowBookDemand}
                    className={`${
                      !isWriteReview
                        ? "myRequestPrimaryButton"
                        : " myRequesSecondarytButton"
                    }`}
                  >
                    {localeString(language, "writeReview")}
                  </Button>
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <Button
                      onClick={handleShowRequestHistory}
                      className={`${
                        isWriteReview
                          ? "myRequestPrimaryButton"
                          : " myRequesSecondarytButton"
                      }`}
                    >
                      {localeString(language, "myReviews")}
                    </Button>
                  </div>
                </div>
              </div>
              {!isWriteReview && <WriteReview getlist={getlist} />}

              {isWriteReview && (
                <MyReviews language={language} listData={listData} />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default MyRequest;
