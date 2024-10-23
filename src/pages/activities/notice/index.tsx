import NoticeCard from "@/components/activities/notice/NoticeCard";
import {DataNotFound, RangePicker, Search} from "@/components/common";
import {
  currentPageChecker,
  localeString,
  scrollToTop,
} from "@/lib/helpers/utils";
import {INotice} from "@/lib/model/activities/notice";
import {getPaginatedData} from "@/lib/services";
import {Pagination} from "antd";
import dayjs from "dayjs";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React, {FC, useEffect, useState} from "react";
import {NextSeo} from "next-seo";
import {Helmet} from "react-helmet-async";
import Image from "next/image";

interface INoticeProps {
  noticeData: INotice[];
  total: string;
  totalPage: string;
  language: string;
}

const Notice: FC<INoticeProps> = ({
  language,
  noticeData,
  total: totalData,
  totalPage,
}) => {
  const [dateRange, setDateRange] = useState<any>([]);
  let router = useRouter();
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    setTotal(parseInt(totalData));
    let startDate: any = dateRange?.[0]?.$d
      ? dayjs(dateRange?.[0]?.$d?.toString()).format("YYYY-MM-DD")
      : "";
    let endDate: any = dateRange?.[1]?.$d
      ? dayjs(dateRange?.[1]?.$d?.toString()).format("YYYY-MM-DD")
      : "";

    router.push(
      `/activities/notice?page=${page}&startDate=${startDate}&endDate=${endDate}&keywords=${keywords}`,
      undefined,
      {
        shallow: false,
      }
    );
    if (startDate || endDate || keywords !== "") {
      setPage(1);
    }

    if (page > parseInt(totalPage)) {
      setPage(1);
    }

    scrollToTop();
  }, [keywords, dateRange, totalData, page]);

  const handlePageChange = (page: number) => {
    let startDate = router?.query?.startDate?.toString();
    let endDate = router?.query?.endDate?.toString();
    router.push(
      `/activities/notice?page=${page}&startDate=${startDate}&endDate=${endDate}&keywords=${keywords}`,
      undefined,
      {
        shallow: false,
      }
    );
    setPage(page);
    scrollToTop();
  };
  const startIndex = (page - 1) * perPage;

  return (
    <>
      {/* <Helmet>
        <meta property="og:title" content={"Test title"} />
        <meta property="og:description" content={"Test description"} />
        <meta
          property="og:image"
          content={
            "https://dodgevillewi.gov/sites/default/files/styles/full_node_primary/public/imageattachments/publicworks/page/8615/notice-1024x747.jpg?itok=Vv9cLhKI"
          }
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <NextSeo
        title="Public Library: Notice"
        description="The public libraries' all notice has been published here"
        openGraph={{
          title: "Public Library: Notice",
          description:
            "The public libraries' all notice has been published here",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library: Notice",
            },
          ],
        }}
      />

      <div className="pl-content-container">
        {/* <Image src={"/book2.png"} alt="image" height={200} width={200} /> */}
        <div className="my-10 ActivitiesHeader-flex">
          <h1 className="section-title ">
            {localeString(language, "noticeBoard")}
          </h1>
          <div className="flex gap-2 flex-col md:flex-row lg:mt-0 mt-8">
            <Search
              placeholder={localeString(language, "search")}
              className="w-full md:w-64"
              setKeywords={setKeywords}
            />
            <RangePicker
              setDateRange={setDateRange}
              className="w-full md:!w-64"
              startDate={localeString(language, "startDate")}
              endDate={localeString(language, "endDate")}
            />
          </div>
        </div>

        {noticeData?.length > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              {noticeData?.map((notice: INotice, index: number) => (
                <div key={notice?.id}>
                  <NoticeCard
                    language={language}
                    notice={notice}
                    startIndex={startIndex}
                    index={index}
                  />
                </div>
              ))}
            </div>
            <div className="py-10">
              <Pagination
                // showQuickJumper
                defaultCurrent={1}
                current={
                  router?.query?.page
                    ? parseInt(router?.query?.page as string)
                    : 1
                }
                defaultPageSize={perPage}
                total={total || 0}
                onChange={handlePageChange}
                showSizeChanger={false}
                responsive
              />
            </div>
          </>
        ) : (
          <DataNotFound />
        )}
      </div>
    </>
  );
};

export default Notice;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let currentPage: number = currentPageChecker(context);
  let keywords: string | string[] | undefined = context?.query?.keywords;
  let startDate: string | null = context?.query?.startDate
    ? context?.query?.startDate.toString()
    : null;
  let endDate: string | null = context?.query?.endDate
    ? context?.query?.endDate.toString()
    : null;

  const res: any = await getPaginatedData(
    `public_library/notices`,
    {
      page: currentPage,
      per_page: 10,
      start_date: startDate,
      end_date: endDate,
      // title: keywords,
    },
    context?.req?.cookies?.["language"] || "bn"
  );

  if (res?.success) {
    return {
      props: {
        noticeData: res?.data?.data,
        page: res?.data?.headers["x-page"],
        total: res?.data?.headers["x-total"],
        totalPage: res?.data?.headers["x-total-pages"],
        language: context?.req?.cookies?.["language"] || "bn",
        token: context?.req?.cookies?.["token"] || "",
      },
    };
  } else {
    return {
      props: {
        noticeData: [],
      },
    };
  }
};
