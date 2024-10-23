import React, {FC, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Col, Divider, Row, Tooltip} from "antd";
import {localeString} from "@/lib/helpers/utils";
import {BiArrowBack} from "react-icons/bi";
import {getData} from "@/lib/services";
import {useMediaQuery} from "usehooks-ts";
import {IDetailsData, ITableDetailsProps} from "@/lib/model/publisher";

interface ITableDetails {
  language: string | undefined;
  tableDetailsProps: ITableDetailsProps;
  onBack: () => void;
}

export const PreviousTableDetails: FC<ITableDetails> = ({
  tableDetailsProps,
  onBack,
}) => {
  const [detailsData, setDetailsData] = useState<IDetailsData>();

  const width = useMediaQuery("(min-width: 768px)");
  const {id} = tableDetailsProps;

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
  }, []);

  const language: string | undefined = Cookies.get("language");

  const authorData = detailsData?.authors;
  const authorCount = Array.isArray(authorData) ? authorData.length : 0;
  const websiteLink = detailsData?.publisher_website;
  return (
    <>
      <div className="py-4">
        <div className="pb-4 ">
          <div className="">
            <div onClick={() => onBack()} className="flex justify-start">
              <div className="mt-2 text-sm">
                <BiArrowBack />
              </div>
              <div>
                <button className="pl-2 pt-1 text-sm">
                  {localeString(language, "back")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:pr-2 pr-4 lg:pl-0 md:pl-0 pl-4  py-10 mb-14 border border-white bg-white ">
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
                  {detailsData?.title
                    ? detailsData?.title.charAt(0).toUpperCase() +
                      detailsData?.title.slice(1)
                    : "..."}
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
                        {authorData![0]}
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
                    {detailsData?.total_page ? detailsData?.total_page : "..."}
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
    </>
  );
};
