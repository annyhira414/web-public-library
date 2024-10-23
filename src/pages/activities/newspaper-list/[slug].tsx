import {
  currencyFormatter,
  commaRemover,
  localeString,
} from "@/lib/helpers/utils";
import { getData, getPaginatedData } from "@/lib/services";
import { Col, Pagination, Row, Table } from "antd";
import { DateRangePicker, Select } from "@/components/controls";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { DataNotFound, Loader } from "@/components/common";
import Link from "next/link";
import { NextSeo } from "next-seo";
interface INewspaperDetails {}
interface ILibrary {
  id: number;
  name: string;
}

const NewspaperDetails: FC<INewspaperDetails> = () => {
  let router = useRouter();
  const language = Cookies.get("language");
  const [loader, setLoader] = useState(false);
  const [libraryData, setLibraryData] = useState<any>([]);
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const { slug } = router?.query;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      library: null,
      dataRange: [],
    },
  });
  const [recordData, setRecordData] = useState<any>([]);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColmuns] = useState([
    {
      title: `${localeString(language, "serial")}`,
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: `${localeString(language, "startDate")}`,
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: `${localeString(language, "endDate")}`,
      dataIndex: "end_date",
      key: " end_date",
    },
    {
      title: `${localeString(language, "libraryName")}`,
      dataIndex: "librarry_name",
      key: "librarry_name",
    },
  ]);
  let libraryId = watch("library");
  let dataRange = watch("dataRange");
  let startDate = dataRange?.[0] ? dataRange?.[0] : "";
  let endtDate = dataRange?.[1] ? dataRange?.[1] : "";
  const getDetailsData = async () => {
    setLoader(true);
    const res: any = await getPaginatedData(
      `public_library/newspapers/${slug}/records`,
      {
        page: page,
        per_page: perPage,
        library_id: libraryId || "",
        start_date: startDate || null,
        end_date: endtDate || null,
      },
      language
    );
    if (res?.success) {
      {
        const dataList = res?.data?.data?.map((singleData: any, index: any) => {
          const libraryName = (
            <div className="underline text-library-primary hover:text-library-primary">
              <Link
                href={`/library/${singleData?.library?.code}`}
                className="hover:text-library-primary"
              >
                {singleData?.library?.name}
              </Link>
            </div>
          );
          return {
            serial: `${currencyFormatter(language, parseInt(index + 1))}`,
            start_date: `${
              singleData?.start_date
                ? `${currencyFormatter(
                    language,
                    parseInt(moment(singleData?.start_date)?.format("DD"))
                  )}.
                 ${currencyFormatter(
                   language,
                   parseInt(moment(singleData?.start_date)?.format("MM"))
                 )}. 
                  ${commaRemover(
                    currencyFormatter(
                      language,
                      parseInt(moment(singleData?.start_date)?.format(`YYYY`))
                    )
                  )}`
                : ""
            }`,
            end_date: `${
              singleData?.end_date
                ? `${currencyFormatter(
                    language,
                    parseInt(moment(singleData?.end_date)?.format("DD"))
                  )}. ${currencyFormatter(
                    language,
                    parseInt(moment(singleData?.end_date)?.format("MM"))
                  )} . ${commaRemover(
                    currencyFormatter(
                      language,
                      parseInt(moment(singleData?.end_date)?.format(`YYYY`))
                    )
                  )}`
                : ""
            }`,
            librarry_name: libraryName,
          };
        });
        setDataSource(dataList);
        setLoader(false);
      }
      setTotalPages(parseInt(res?.data?.headers["x-total"]));
      setPage(parseInt(res?.data?.headers["x-page"]));
      router.push(
        `/activities/newspaper-list/${slug}?page=${page}`,
        undefined,
        {
          shallow: false,
        }
      );
      setRecordData(res?.data?.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  const getLibraryData = async () => {
    const res = await getData(
      `public_library/libraries/dropdown`,
      {},
      language
    );
    if (res.success) {
      setLibraryData(
        res?.data?.map((singleLibrary: ILibrary) => {
          return { label: singleLibrary?.name, value: singleLibrary?.id };
        })
      );
    }
  };
  useEffect(() => {
    getDetailsData();
  }, [page, libraryId, dataRange, slug]);

  useEffect(() => {
    getLibraryData();
  }, []);
  const handlePageChange = (page: number) => {
    router.push(`/activities/newspaper-list/${slug}?page=${page}`, undefined, {
      shallow: false,
    });
    setPage(page);
  };

  return (
    <>
    <NextSeo
          title={`${localeString(language, "newsPaperListDetails")}`}
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
      <div className="newspaper-record my-6 pl-content-container">
        <div className="p-0 lg:px-36 xl:px-36 xxl:px-36">
          <Row gutter={[25, 25]}>
            <Col xs={24} sm={24} md={8} lg={10} xl={8} xxl={8}>
              <h3 className="font-bold font-playfairDisplay text-3xl  text-library-light-black">
                {recordData[0]?.newspaper?.name}
              </h3>
            </Col>
            <Col xs={24} sm={24} md={16} lg={14} xl={16} xxl={16}>
              <form>
                <Row gutter={[25, 25]}>
                  <Col xs={24} sm={42} md={12} lg={10} xl={12} xxl={12}>
                    <Select
                      name="library"
                      control={control}
                      placeholder={localeString(language, "libraryName")}
                      errors={errors}
                      options={libraryData}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={14} xl={12} xxl={12}>
                    <DateRangePicker
                      name="dataRange"
                      startDate={localeString(language, "startDate")}
                      endDate={localeString(language, "endDate")}
                      control={control}
                      className="w-full"
                      format="DD-MM-YYYY"
                    />
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
          {loader ? (
            <Loader />
          ) : (
            <>
              {dataSource.length > 0 ? (
                <>
                  <Row>
                    <Col xs={24} sm={24}>
                      <div className="newspaper-reocrd-table my-10">
                        <Table
                          pagination={false}
                          dataSource={dataSource}
                          columns={columns}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Pagination
                    total={totalPages}
                    showSizeChanger={false}
                    pageSize={perPage}
                    defaultCurrent={1}
                    current={page}
                    onChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="mt-3">
                  <DataNotFound
                    title={localeString(language, "newspaperRecordNotFound")}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewspaperDetails;
