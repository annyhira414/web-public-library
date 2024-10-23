import React, {FC} from "react";
import {Events} from "@/components/events/Index";
import {IEvent} from "@/lib/model/events";
import {GetServerSideProps} from "next";
import {Pagination} from "antd";
import {useRouter} from "next/router";
import {currentPageChecker} from "@/lib/helpers/utils";
import {getPaginatedData} from "@/lib/services";

interface IEventPage {
  ongoingData: IEvent[];
  UpcomingData: IEvent[];
  completedData: IEvent[];
  language: string;
  total: number;
  page: number;
}

const EventPage: FC<IEventPage> = ({
  ongoingData,
  UpcomingData,
  completedData,
  language,
  total,
  page,
}) => {
  let router = useRouter();
  const handlePageChange = (page: number) => {
    router.push(`/activities/events?page=${page}#past`, undefined, {
      shallow: false,
    });
  };

  return (
    <>
      <Events
        ongoingData={ongoingData}
        UpcomingData={UpcomingData}
        completedData={completedData}
        language={language}
      />
      {completedData?.length > 0 ? (
        <div className="mt-10 mb-24 pl-content-container">
          <Pagination
            defaultCurrent={1}
            current={router?.query?.page ? parseInt(router?.query?.page[0]) : 1}
            onChange={handlePageChange}
            pageSize={9}
            total={total || 0}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EventPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let currentPage: number = currentPageChecker(context);
  const resOngoing: any = await getPaginatedData(
    `/public_library/events`,
    {
      state: "running",
    },
    context?.req?.cookies?.["language"] || "bn"
  );
  const resUpcoming: any = await getPaginatedData(
    `/public_library/events`,
    {
      state: "upcoming",
    },
    context?.req?.cookies?.["language"] || "bn"
  );
  const resCompleted: any = await getPaginatedData(
    `/public_library/events`,
    {
      state: "completed",
      page: currentPage,
      per_page: 9,
    },
    context?.req?.cookies?.["language"] || "bn"
  );
  if (
    resOngoing?.data?.data?.length > 0 ||
    resUpcoming?.data?.data?.length > 0 ||
    resCompleted?.data?.data?.length > 0
  ) {
    return {
      props: {
        ongoingData: resOngoing?.data?.data,
        UpcomingData: resUpcoming?.data?.data,
        completedData: resCompleted?.data?.data,
        language: context?.req?.cookies?.["language"] || "bn",
        page: resCompleted?.data?.headers["x-page"],
        total: resCompleted?.data?.headers["x-total"],
        token: context?.req?.cookies?.["token"] || "",
      },
    };
  } else {
    return {
      props: {
        ongoingData: [],
        UpcomingData: [],
        completedData: [],
      },
    };
  }
};
