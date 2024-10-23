import React, {FC, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Col, Divider, Row, Tooltip} from "antd";
import {localeString} from "@/lib/helpers/utils";
import {BiArrowBack} from "react-icons/bi";
import {getData} from "@/lib/services";
import {useMediaQuery} from "usehooks-ts";
import {IDetailsData} from "@/lib/model/publisher";

interface IActiveTableDetails {
  language?: string | undefined;
  id: number;
  setIsShowDetails: (data: boolean) => void;
}

export const ActiveTableDetails: FC<IActiveTableDetails> = ({
  id,
  setIsShowDetails,
}) => {
  const [detailsData, setDetailsData] = useState<IDetailsData>();
  const width = useMediaQuery("(min-width: 768px)");

  const getDetailsData = async () => {
    const res: any = await getData(
      `public_library/publisher_biblios/${id}`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setDetailsData(res?.data);
    } else {
    }
  };
  useEffect(() => {
    getDetailsData();
  }, [id]);

  const language: string | undefined = Cookies.get("language");
  const authorData: string[] | undefined = detailsData?.authors;
  const authorCount = Array.isArray(authorData) ? authorData.length : 0;
  const websiteLink = detailsData?.publisher_website;
  return (
    <>
      <div className="mt-5">
        <div
          className="pb-4"
          onClick={() => {
            setIsShowDetails(false);
          }}
        >
          <div className="flex justify-start ">
            <div className="mt-2 text-xl">
              <BiArrowBack />
            </div>
            <button className="pl-2 pt-1 text-lg">
              {localeString(language, "back")}
            </button>
          </div>
        </div>
        <div className="py-10 bg-white rounded-md ">
          <div className="lg:px-0 px-3">
            <Row className="">
              <>
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "bookType")}
                  </div>
                  <div className="pt-1">
                    {detailsData?.is_foreign ? " Foreign Book" : "Deshi Book"}
                  </div>
                </Col>
                <Divider className="mt-2" />
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                  xl={{span: 6, offset: 2}}
                  xxl={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "title")}
                  </div>
                  <div className="pt-1 h-full lg:w-24 w-full">
                    {detailsData?.title ? detailsData?.title : "..."}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div>
                    {authorCount === 1 ? (
                      <>
                        <div className="font-semibold">
                          {localeString(language, "authorName")}
                        </div>

                        <div className="pt-1 h-full lg:w-24 w-full">
                          {authorData![0]}{" "}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-semibold">
                          {localeString(language, "authorsName")}
                        </div>

                        <div className="pt-1 h-full lg:w-24 w-full">
                          {authorData?.join(", ") || ""}
                        </div>
                      </>
                    )}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "publisherName")}
                  </div>
                  <p className="pt-1 h-full lg:w-24 w-full">
                    {detailsData?.publisher_name
                      ? detailsData?.publisher_name
                      : ""}
                  </p>
                </Col>
                <Divider className="mt-2" />
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "organizationPhoneNumber")}
                  </div>
                  <div className="pt-1">
                    {detailsData?.publisher_phone
                      ? detailsData?.publisher_phone
                      : "..."}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "publisherAddress")}
                  </div>
                  <p className="pt-1 h-full lg:w-24 w-full">
                    {detailsData?.publisher_address
                      ? detailsData?.publisher_address
                      : "..."}
                  </p>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "dateOfPublication")}
                  </div>
                  <div className="pt-1 ">
                    {detailsData?.publication_date
                      ? detailsData?.publication_date
                      : "..."}
                  </div>
                </Col>
                <Divider className="mt-2" />
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "isbn")}
                  </div>
                  <div className="pt-1 h-full lg:w-24 w-full">
                    {detailsData?.isbn ? detailsData?.isbn : "..."}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "price")}
                  </div>
                  <div className="pt-1">
                    {detailsData?.price ? detailsData?.price : "..."}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "subject")}
                  </div>
                  <div className="pt-1 h-full lg:w-24 w-full ">
                    {detailsData?.subject ? detailsData?.subject : "..."}
                  </div>
                </Col>
                <Divider className="mt-2" />
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold ">
                    {localeString(language, "websiteLink")}
                  </div>

                  <Tooltip title={websiteLink}>
                    <p className="pt-1 h-full lg:w-24 w-full overflow-hidden whitespace-nowrap overflow-ellipsis ">
                      {websiteLink ? websiteLink : "..."}
                    </p>
                  </Tooltip>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "edition")}
                  </div>
                  <div className="pt-1 ">
                    {detailsData?.edition ? detailsData?.edition : "..."}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
              </>

              <>
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <>
                    <div className="font-semibold">
                      {localeString(language, "numberOfPage")}
                    </div>
                    <div className="pt-1">
                      {detailsData?.total_page
                        ? detailsData?.total_page
                        : "..."}
                    </div>
                  </>
                </Col>
                <Divider className="mt-2" />
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "print")}
                  </div>
                  <div className="pt-1">
                    {detailsData?.print ? detailsData?.print : "..."}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "typeOfPaper")}
                  </div>
                  <div className="pt-1">
                    {detailsData?.paper_type ? detailsData?.paper_type : "..."}
                  </div>
                </Col>
                {width || <Divider className="mt-2" />}
              </>

              <>
                <Col
                  xs={{span: 24}}
                  md={{span: 6, offset: 2}}
                  lg={{span: 6, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "typeOfBindings")}
                  </div>
                  <div className="pt-1">
                    {detailsData?.binding_type
                      ? detailsData?.binding_type
                      : "..."}
                  </div>
                </Col>

                <Divider className="mt-2" />
                <Col
                  xs={{span: 24}}
                  md={{span: 22, offset: 2}}
                  lg={{span: 22, offset: 2}}
                >
                  <div className="font-semibold">
                    {localeString(language, "remarks")}
                  </div>
                  <div className="pt-1 w-full">
                    {detailsData?.comment ? detailsData?.comment : "..."}
                  </div>
                </Col>
              </>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
