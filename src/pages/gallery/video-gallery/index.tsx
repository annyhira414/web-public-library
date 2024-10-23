import { getPaginatedData } from "@/lib/services";
import { GetServerSideProps } from "next";
import { VideoGalleryCard } from "@/components/gallery";
import { IGallery } from "@/lib/model/gallery";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import { localeString } from "@/lib/helpers/utils";
import { NextSeo } from "next-seo";
import dayjs from "dayjs";
import { DataNotFound, RangePicker, Search } from "@/components/common";

interface IVideoGalleryPage {
  galleryData: IGallery[];
  total: string;
  language: string;
  search_term: string;
}

const VideoGallery: FC<IVideoGalleryPage> = ({
  galleryData,
  total: totalData = 0,
  language,
}) => {
  let router = useRouter();
  const [perPage, setPerPage] = useState(9);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [keywords, setKeywords] = useState("");
  const [dateRange, setDateRange] = useState<any>([]);

  useEffect(() => {
    setTotal(Number(totalData));
    let startDate: any = dateRange?.[0]?.$d
      ? dayjs(dateRange?.[0]?.$d?.toString()).format("DD-MM-YYYY")
      : "";
    let endDate: any = dateRange?.[1]?.$d
      ? dayjs(dateRange?.[1]?.$d?.toString()).format("DD-MM-YYYY")
      : "";

    router.push(
      `/gallery/video-gallery?page=${page}&startDate=${startDate}&endDate=${endDate}&search_term=${keywords}`,
      undefined,
      {
        shallow: false,
      }
    );
  }, [keywords, dateRange, page]);

  const handlePageChange = (pageNumber: number) => {
    let startDate = router?.query?.startDate?.toString();
    let endDate = router?.query?.endDate?.toString();
    router.push(
      `/gallery/video-gallery?page=${pageNumber}&startDate=${startDate}&endDate=${endDate}&search_term=${keywords}`,
      undefined,
      {
        shallow: false,
      }
    );
  };

  return (
    <>
      <NextSeo
        title="Public Library : Video Gallery"
        description="The public libraries' all video has been published here"
        openGraph={{
          title: "VIdeo Gallery",
          description: "This is a Video Gallery",
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/video-gallery`,
              alt: "Video Gallery",
            },
          ],
        }}
      />
      <div className="pl-content-container pb-6">
        <div className="ActivitiesHeader-flex">
          <h1 className="text-3xl text-library-light-black mb-4 font-playfairDisplay">
            {localeString(language, "videoGallery")}
          </h1>
          <div className="gallery-header flex gap-2 flex-col md:flex-row">
            <Search
              placeholder={localeString(language, "search")}
              className="w-full md:w-40 lg:w-64 xl:w-64 xxl:w-64 tex-base"
              setKeywords={setKeywords}
            />
            <RangePicker
              setDateRange={setDateRange}
              className="w-full md:!w-64"
              startDate={localeString(language, "startDate")}
              endDate={localeString(language, "endDate")}
              format="DD-MM-YYYY"
            />
          </div>
        </div>
        <VideoGalleryCard galleryData={galleryData} language={language} />
        {galleryData.length > 0 ? (
          <div className="py-10">
            <Pagination
              defaultCurrent={1}
              current={
                router?.query?.page ? parseInt(router?.query?.page[0]) : 1
              }
              defaultPageSize={perPage}
              total={Number(totalData)}
              onChange={handlePageChange}
              responsive
            />
          </div>
        ) : (
          <DataNotFound />
        )}
      </div>
    </>
  );
};
export default VideoGallery;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let currentPage = context?.query?.page || 1;
  let keywords: string | string[] | undefined =
    context?.query?.search_term || "";
  let startDate: string | null = context?.query?.startDate
    ? context?.query?.startDate.toString()
    : null;
  let endDate: string | null = context?.query?.endDate
    ? context?.query?.endDate.toString()
    : null;

  const res: any = await getPaginatedData(
    `public_library/gallery_albums`,
    {
      page: currentPage,
      per_page: 9,
      album_type: "video",
      start_date: startDate,
      end_date: endDate,
      search_term: keywords,
    },

    context?.req?.cookies?.["language"] || "bn"
  );
  if (res?.success) {
    return {
      props: {
        galleryData: res?.data?.data,
        page: res?.data?.headers["x-page"],
        total: res?.data?.headers["x-total"],
        language: context?.req?.cookies?.["language"] || "bn",
      },
    };
  } else {
    return {
      props: {
        galleryData: [],
        language: context?.req?.cookies?.["language"] || "bn",
      },
    };
  }
};
