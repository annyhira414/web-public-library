import React, {FC, useState, useEffect} from "react";
import {MyRequestCommon} from "@/components/my-request/MyRequest";
import {localeString} from "@/lib/helpers/utils";
import {Button, Col, Row} from "antd";
import {ApplyForm} from "@/components/my-request/libraryCardRequest/ApplyForm";

import Cookies from "js-cookie";
import LibraryCardHistory from "../../../pages/my-request/library-card-request/history";
import {getData} from "@/lib/services";
import {useRouter} from "next/router";

interface ILibraryCardRequest {}

const LibraryCardRequest: FC<ILibraryCardRequest> = () => {
  const language: string | undefined = Cookies.get("language");

  const [isLibraryCard, isNotLibraryCard] = useState(false);
  const handleShowApplyCard = () => {
    isNotLibraryCard(false);
  };
  const router = useRouter();

  const handleShowCardHistory = () => {
    router.push("/my-request/library-card-request");
    isNotLibraryCard(true);
  };

  const [cardData, setCardData] = useState<any>();

  const historyData = async () => {
    const res = await getData(
      `public_library/library_cards`,
      {},
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      setCardData(res?.data);
    }
  };

  useEffect(() => {
    historyData();
  }, []);

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
            <MyRequestCommon language={language} />
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 18}}
            lg={{span: 18}}
            xl={{span: 18}}
            xxl={{span: 18}}
          >
            <div className="lg:pl-16 w-full xl:w-10/12">
              <h3 className="text-left section-title pb-2 lg:mt-12 md:mt-12 mt-2 md:pt-0">
                {localeString(language, "libraryCardRequest")}
              </h3>
              <div className="flex justify-between gap-4 pt-4">
                <div className="w-full">
                  <Button
                    onClick={handleShowApplyCard}
                    className={`${
                      !isLibraryCard
                        ? "myRequestPrimaryButton"
                        : " myRequesSecondarytButton"
                    }`}
                  >
                    {localeString(language, "applyForCard")}
                  </Button>
                </div>
                <div className="w-full">
                  <Button
                    onClick={handleShowCardHistory}
                    className={`${
                      isLibraryCard
                        ? "myRequestPrimaryButton"
                        : " myRequesSecondarytButton"
                    }`}
                  >
                    {localeString(language, "libraryCardHistory")}
                  </Button>
                </div>
              </div>

              {!isLibraryCard && <ApplyForm language={language} />}
              {isLibraryCard && (
                <LibraryCardHistory language={language} cardData={cardData} />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LibraryCardRequest;
