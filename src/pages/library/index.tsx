import React, { FC, useEffect, useState } from "react";
import { LibraryList } from "@/components/library";
import { Row, Col } from "antd";
import { FieldLabel, SearchControl, Select } from "@/components/controls";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { getData, getPaginatedData } from "@/lib/services";
import { DataNotFound } from "@/components/common";
import { Pagination } from "antd";
import { useRouter } from "next/router";
import { ILibaryList, IDistrictList } from "@/lib/model/library/index";
import { scrollToTop, currentPageChecker } from "@/lib/helpers/utils";
import { localeString } from "@/lib/helpers/utils";
import { option } from "@/lib/model";

interface LibaryListProps {
  language: string;
  image_url?: any;
  width?: number;
  height?: number;
  libraryData: ILibaryList[];
  name: string;
  options: option[];
  placeholder: string;
  multiple?: boolean;
  districts: IDistrictList[];
  total: string;
  totalPage: string;
  onChange?: (value: any) => void;
}

const LibaryList: FC<LibaryListProps> = ({
  libraryData,
  districts,
  total: totalData,
  totalPage,
  language,
}) => {
  const [perPage, setPerPage] = useState(15);
  const [total, setTotal] = useState(0);
  const [district, setDistrict] = useState<option[]>([]);
  let router = useRouter();

  const { control, watch } = useForm({
    defaultValues: {
      district: router?.query?.districtId
        ? parseInt(router?.query?.districtId as string)
        : null,
      name: router?.query?.name ? router?.query?.name : null,
    },
  });

  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );

  const districtId: number = watch("district")!;
  const name: string | string[] | null = watch("name");

  useEffect(() => {
    featchDistrict();
  }, []);

  const featchDistrict = async () => {
    const districtList = districts?.map((item: IDistrictList) => ({
      value: item?.id,
      label: item?.name,
    }));

    districtList.unshift({ value: NaN, label: localeString(language, "all") });

    setDistrict(districtList);
  };

  useEffect(() => {
    setTotal(parseInt(totalData));
    router.push({
      pathname: "library",
      query: {
        page,
        name,
        districtId,
      },
    });

    if (districtId || name !== "") {
      setPage(1);
    }

    if (page > parseInt(totalPage)) {
      setPage(page);
    }
    scrollToTop();
  }, [totalData, districtId, name]);

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "library",
      query: {
        page,
        name,
        districtId,
      },
    });
    setPage(page);
    scrollToTop();
  };

  return (
    <>
      <div className="pt-10 pl-content-container">
        <Row gutter={[16, 16]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 18 }}
            xl={{ span: 18 }}
            xxl={{ span: 18 }}
          >
            <FieldLabel
              className=" text-black font-bold text-base leading-6 mb-4"
              name="searchLibraryName"
              label={localeString(language, "searchLibraryName")}
            />

            <SearchControl
              className="w-full"
              control={control}
              name="name"
              placeholder={localeString(language, "searchPlaceHolder")}
            />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <FieldLabel
              className=" text-black font-bold text-base leading-6 mb-4"
              name="searchbyDistrict "
              label={localeString(language, "searchByDistrictName")}
            />

            <Select
              className="w-full"
              control={control}
              name="district"
              options={district}
              placeholder={localeString(language, "selectDistrict")}
            />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <div className="pt-10">
              <div>
                {libraryData?.length > 0 ? (
                  <div>
                    {libraryData.map((library: ILibaryList) => (
                      <LibraryList key={library?.code} libraryData={library} />
                    ))}
                  </div>
                ) : (
                  <DataNotFound />
                )}
              </div>
            </div>
          </Col>
          <div className="py-10">
            <Pagination
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
            />
          </div>
        </Row>
      </div>
    </>
  );
};
export default LibaryList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  type commonType = string | string[] | null;

  let currentPage: number = currentPageChecker(context);
  let name: commonType = context?.query?.name || null;
  const districtId: commonType = context?.query?.districtId || null;

  const res: any = await getPaginatedData(
    `public_library/libraries`,
    {
      page: currentPage,
      per_page: 15,
      name,
      district_id: districtId ? parseInt(districtId as string) : null,
    },
    context?.req?.cookies?.["language"] || "bn"
  );

  const district_res: any = await getData(
    "public_library/districts",
    {},
    context?.req?.cookies?.["language"] || "bn"
  );

  if (res?.success) {
    return {
      props: {
        libraryData: res?.data?.data,
        districts: district_res?.data,
        page: res?.data?.headers["x-page"],
        total: res?.data?.headers["x-total"],
        totalPage: res?.data?.headers["x-total-pages"],
        language: context?.req?.cookies?.["language"] || "bn",
      },
    };
  } else {
    return {
      props: { libraryData: [], districts: [] },
    };
  }
};
