import { EventCard } from "@/components/events/EventCard";
import { Col, Row, Pagination } from "antd";
import { IEvent } from "@/lib/model/events";
import React, { FC, useEffect, useState } from "react";
import { getPaginatedData } from "@/lib/services";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { DataNotFound, RangePicker } from "@/components/common";
import { localeString } from "@/lib/helpers/utils";
import dayjs from "dayjs";

const RegisteredEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const language = Cookies.get("language");
  const [dateRange, setDateRange] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let startDate: any = dateRange?.[0]
    ? dayjs(dateRange?.[0]?.toString()).format("YYYY-MM-DD")
    : "";
  let endDate: any = dateRange?.[1]
    ? dayjs(dateRange?.[1]?.toString()).format("YYYY-MM-DD")
    : "";
  useEffect(() => {
    router.push(
      `/activities/events/registered-events?page=${page}&start_date=${startDate}&end_date=${endDate}`,
      undefined,
      {
        shallow: false,
      }
    );
    regEvents();
  }, [page, dateRange]);

  const regEvents = async () => {
    setLoading(true);
    try {
      const res: any = await getPaginatedData(
        "public_library/events/registered",
        {
          per_page: perPage,
          page: page,
          start_date: startDate,
          end_date: endDate,
        },
        language,
        Cookies.get("token")
      );
      if (res?.success) {
        setEvents(res?.data?.data);
        setTotalPages(parseInt(res?.data?.headers["x-total"]));
        setPage(parseInt(res?.data?.headers["x-page"]));
        setLoading(false);
      } else {
        if (res.status === 401) {
          router.push("/auth/login");
        }
      }
    } catch (error) {}
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className="pl-content-container mt-10">
      <Row gutter={[20, 25]}>
        <Col lg={{ span: 14 }}>
          <h1 className="section-title text-3xl">
            {localeString(language, "registeredEvents")}
          </h1>
        </Col>
        <Col lg={{ span: 10 }}>
          <RangePicker
            setDateRange={setDateRange}
            className=""
            startDate={localeString(language, "startDate")}
            endDate={localeString(language, "endDate")}
          />
        </Col>
      </Row>
      {events?.length > 0 ? (
        <>
          <Row gutter={[25, 25]}>
            {events?.map((eventItem: IEvent) => (
              <Col
                className="mt-10"
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                key={eventItem.slug}
              >
                <EventCard eventItem={eventItem} />
              </Col>
            ))}
          </Row>
          <div className="mt-8 mb-28">
            <Pagination
              total={totalPages}
              showSizeChanger={false}
              pageSize={perPage}
              defaultCurrent={1}
              current={page}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-5 mb-10">
            <DataNotFound />
          </div>
        </>
      )}
      {/* <Row gutter={[25, 25]}>
        {events?.map((eventItem: IEvent) => (
          <Col
            className="mt-10"
            xs={{span: 24}}
            sm={{span: 12}}
            md={{span: 8}}
            lg={{span: 8}}
            xl={{span: 8}}
            key={eventItem.slug}
          >
            <EventCard eventItem={eventItem} />
          </Col>
        ))}
      </Row>
      <div className="mt-8 mb-28">
        <Pagination
          total={totalPages}
          showSizeChanger={false}
          pageSize={perPage}
          defaultCurrent={1}
          current={page}
          onChange={handlePageChange}
        />
      </div> */}
    </div>
  );
};

export default RegisteredEvents;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   let currentPage: number = currentPageChecker(context);
//   let keywords: string | string[] | undefined = context?.query?.keywords;
//   let startDate: string | null = context?.query?.startDate
//     ? context?.query?.startDate.toString()
//     : null;
//   let endDate: string | null = context?.query?.endDate
//     ? context?.query?.endDate.toString()
//     : null;
//   let lang = context?.req?.cookies?.["language"] || "bn";
//   let token = context?.req?.cookies?.["token"] || "";

//   const res: any = await getPaginatedData(
//     `public_library/events/registered`,
//     {},
//     lang,
//     token
//   );
//
//   if (res?.success) {
//     return {
//       props: {
//         regEvents: res?.data?.data,
//         page: res?.data?.headers["x-page"],
//         total: res?.data?.headers["x-total"],
//         totalPage: res?.data?.headers["x-total-pages"],
//         language: context?.req?.cookies?.["language"] || "bn",
//         token: context?.req?.cookies?.["token"] || "",
//       },
//     };
//   } else {
//     return {
//       props: {
//         regEvents: [],
//       },
//     };
//   }
// };
