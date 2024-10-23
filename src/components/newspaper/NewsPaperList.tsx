import { localeString } from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services";
import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import { TbNews } from "react-icons/tb";
import { Col, Pagination, Row, message } from "antd";
import Link from "next/link";
import { DataNotFound, Loader, Search } from "@/components/common";
import { date } from "yup";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
interface INewspaperList {
  total: string;
  name: string;
}
interface InewsRecord {
  name: string;
  id: number;
}
export const NewsPaperList: FC<INewspaperList> = () => {
  let router = useRouter();
  const language = Cookies.get("language");
  const [loader, setLoader] = useState(false);
  const [newspaperRecordList, setNewspaperRecordList] = useState<any>();
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [keywords, setKeywords] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const getNewspapaerList = async () => {
    setLoader(true);
    const res: any = await getPaginatedData(
      `public_library/newspapers`,
      {
        name: keywords,
        per_page: perPage,
        page: page,
      },
      language
    );
    if (res.success) {
      setTotalPages(parseInt(res?.data?.headers["x-total"]));
      setPage(parseInt(res?.data?.headers["x-page"]));
      router.push(`/activities/newspaper-list?page=${page}`, undefined, {
        shallow: false,
      });
      setKeywords(keywords);
      setNewspaperRecordList(res?.data?.data);
      setLoader(false);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  const handlePageChange = (page: number) => {
    router.push(`/activities/newspaper-list?page=${page}`, undefined, {
      shallow: false,
    });
    setPage(page);
  };
  useEffect(() => {
    getNewspapaerList();
  }, [page, keywords]);
  return (
    <div className="pl-content-container">
      <>
        <NextSeo
          title={`${localeString(language, "newsPaperList")}`}
          description="The public libraries' Order Will SShown here"
          openGraph={{
            title: "Public Library : My Order",
            description:
              "The public libraries' all notice has been published here",
            images: [
              {
                url: "/library_logo.svg",
                alt: "Public Library : My Order",
              },
            ],
          }}
        />
        <Row gutter={[25, 25]} className="mb-4">
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
          >
            <div className="order-card-title my-3 ms:my-0 lg:my-0">
              <h3 className="text-gray-700 font-bold font-playfairDisplay text-3xl">
                {localeString(language, "newspaper")}
              </h3>
            </div>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
          >
            <div>
              <Search
                placeholder={localeString(language, "search")}
                className="w-full"
                setKeywords={setKeywords}
              />
            </div>
          </Col>
        </Row>
        {newspaperRecordList?.length > 0 ? (
          <>
            {loader ? (
              <Loader />
            ) : (
              <>
                {newspaperRecordList?.map((singleNewsRecord: any) => {
                  return (
                    <>
                      <Link
                        href={`/activities/newspaper-list/${singleNewsRecord?.id}`}
                      >
                        <div
                          key={singleNewsRecord?.id}
                          className="flex mb-4 show-newspaperList-card bg-white p-3 border rounded shadow-sm  common-card-hover hover:text-library-primary group"
                        >
                          <div className="text-library-primary text-3xl">
                            <TbNews />
                          </div>
                          <div className="ml-3 text-base">
                            {singleNewsRecord?.name}
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
                <Pagination
                  total={totalPages}
                  showSizeChanger={false}
                  pageSize={perPage}
                  defaultCurrent={1}
                  current={page}
                  onChange={handlePageChange}
                />
              </>
            )}
          </>
        ) : (
          <DataNotFound title={localeString(language, "newspaperNotFound")} />
        )}
      </>
    </div>
  );
};
