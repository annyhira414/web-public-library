/** @format */

import React, { FC, useEffect, useState } from "react";
import { Row, Col, Pagination, Rate, Popover } from "antd";
import { BookCard } from "@/components/book/BookCard";
import { Search } from "@/components/common";
import { currentPageChecker, scrollToTop } from "@/lib/helpers/utils";
import { useRouter } from "next/router";
import { IBook, ISubject, IAuthor, IOption } from "@/lib/model/books";
import { GetServerSideProps } from "next";
import { getData, getPaginatedData } from "@/lib/services";
import { MultipleSelectControl } from "@/components/controls/form-controls/MultipleSelectControl";
import { useForm } from "react-hook-form";
import { DataNotFound } from "@/components/common";
import { localeString, currencyFormatter } from "@/lib/helpers/utils";
import { Ioption, option } from "@/lib/model";
import { RadioGroup, SearchControl, Select } from "@/components/controls";
import Cookies from "js-cookie";
import { CiFilter } from "react-icons/ci";
import { BookBorrowBag } from "@/components/header";
import Filter from "@/components/subject-wise/Filter";

interface AddBannerProps {
  language: string;
  image_url?: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  width?: number;
  height?: number;
  bookData: IBook[];
  total: string;
  control: any;
  totalPage: string;
  name: string;
  options: IOption[];
  placeholder: string;
  multiple?: boolean;
  subjectList: ISubject[];
  authorList: IAuthor[];
  onChange?: (value: any) => void;
}
const BookList: FC<AddBannerProps> = ({
  language,
  bookData,
  subjectList,
  authorList,
  total: totalData,
  totalPage,
  name,
  placeholder = "",
  multiple = true,
}) => {
  const [perPage, setPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [subjectData, setSubjectData] = useState<option[]>([]);
  const [authorData, setAuthorData] = useState<option[]>([]);
  const [titleName, setTitleName] = useState<IOption[]>([]);
  let router = useRouter();

  const lang = Cookies.get("language");

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      title: router?.query?.title ? router?.query?.title : "",
      subject: router?.query?.subject ? router?.query?.subject : [],
      rating: router?.query?.rating ? router?.query?.rating : [],
      author: router?.query?.author ? router?.query?.author : [],
    },
  });

  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );

  useEffect(() => {
    // fetchSubjectName();
    fetchAuthorName();
  }, []);

  const fetchSubjectName = async () => {
    setSubjectData(
      subjectList?.map((item: ISubject) => ({
        value: item?.id.toString(),
        label: item?.name,
      }))
    );
  };

  const fetchAuthorName = async () => {
    setAuthorData(
      authorList?.map((item: IAuthor) => ({
        value: item?.id.toString(),
        label: item?.full_name,
      }))
    );
  };

  const title = watch("title");
  const subject = watch("subject");
  const rating = watch("rating");
  const author = watch("author");

  useEffect(() => {
    setTotal(parseInt(totalData));
    router.replace({
      pathname: "subjectWise",
      query: {
        page,
        title,
        subject,
        author,
        rating,
      },
    });

    if (
      subject?.length > 0 ||
      author?.length > 0 ||
      rating?.length > 0 ||
      title !== ""
    ) {
      setPage(1);
    }

    if (page > parseInt(totalPage)) {
      setPage(1);
    }

    scrollToTop();
  }, [totalData, title, rating, subject, author]);

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "subjectWise",
      query: {
        page,
        title,
        subject,
        author,
        rating,
      },
    });
    setPage(page);
    scrollToTop();
  };

  useEffect(() => {
    getSubject();
  }, []);

  const getSubject = async () => {
    const response = await getData(
      `/public_library/biblio_subjects`,
      {},
      lang,
      Cookies.get("token")
    );
    if (response?.success) {
      const options = response?.data?.map((item: IOption) => {
        return {
          value: item?.id.toString(),
          label: item?.title,
        };
      });
      setSubjectData(options);
      setTitleName(response?.data);
    } else {
    }
  };

  return (
    <>
      <div className="pt-10 pl-content-container mb-24">
        <div>
          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} lg={{ span: 10 }}>
              {subjectData.length > 0 && (
                <p className="section-title text-3xl">
                  {
                    subjectData?.filter(
                      (item: option) =>
                        Number(item?.value) === Number(router?.query?.subject)
                    )[0].label
                  }
                </p>
              )}
            </Col>
            <Col
              xs={{ span: 18 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 7, offset: 5 }}
            >
              {/* <Search
                placeholder={localeString(language, "bookSearch")}
                className="w-full"
                setKeywords={setTitle}
              /> */}
              <SearchControl
                className="w-full"
                control={control}
                name="title"
                placeholder={localeString(language, "searchPlaceHolder")}
              />
            </Col>
            <Col xs={{ span: 6 }} lg={{ span: 2 }}>
              <div className="border border-library-light-gray rounded p-2">
                <Popover
                  className="bagPopover cursor-pointer"
                  placement="bottom"
                  content={
                    <Filter
                      ratingData={ratingData}
                      authorData={authorData}
                      control={control}
                    />
                  }
                  trigger="click"
                >
                  <div className="flex gap-1">
                    <CiFilter className="w-5 h-5 text-library-gray-700" />
                    <h3 className="font-light text-sm">
                      {localeString(language, "subwiseFilter")}
                    </h3>
                  </div>
                </Popover>
              </div>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            >
              {/* <div className="multipleSelect">
                <MultipleSelectControl
                  className="w-full"
                  control={control}
                  name="Subject"
                  options={subject}
                  placeholder={localeString(language, "subject")}
                  setValue={setsubject}
                />
                <Select
                  className="w-full"
                  control={control}
                  name="subject"
                  multiple={true}
                  options={subjectData}
                  placeholder={localeString(language, "subject")}
                />
              </div> */}
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            >
              {/* <div className="multipleSelect">
                <MultipleSelectControl
                  className="w-full"
                  control={control}
                  name="Author"
                  options={author}
                  placeholder={localeString(language, "author")}
                  setValue={setauthor}
                />
                <Select
                  className="w-full"
                  control={control}
                  name="author"
                  multiple={true}
                  options={authorData}
                  placeholder={localeString(language, "author")}
                />
              </div> */}
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            >
              {/* <div className="multipleSelect">
                <MultipleSelectControl
                  showSearch={false}
                  className="w-full"
                  control={control}
                  name="Rating"
                  options={rating}
                  placeholder={localeString(language, "rating")}
                  setValue={setrating}
                />
                <Select
                  className="w-full"
                  control={control}
                  name="rating"
                  // multiple={true}
                  options={ratingData}
                  placeholder={localeString(language, "rating")}
                />
              </div> */}
            </Col>
          </Row>
        </div>
        <div className="text-xs font-normal py-2 text-text-color">
          <span>{localeString(language, "totalBook")}</span>
          <span>{localeString(language, "entire")}</span>
          <span className="pl-1">
            {currencyFormatter(language, bookData?.length)}
          </span>
          <span className="pl-1">{localeString(language, "ti")}</span>
          <span className="pl-1">{localeString(language, "book")}</span>
          <span>{localeString(language, "totalBooks")}</span>
        </div>

        <Row gutter={[25, 25]}>
          {bookData?.length > 0 ? (
            <>
              {bookData?.map((bookItem, index: number) => (
                <Col
                  key={index}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 6 }}
                  xxl={{ span: 6 }}
                >
                  <div>
                    <BookCard bookItem={bookItem} />
                  </div>
                </Col>
              ))}
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
                  // responsive
                />
              </div>
            </>
          ) : (
            <DataNotFound />
          )}

          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            xxl={{ span: 24 }}
          >
            {/* <AddBanner image_url={image} height={200} width={1096} /> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BookList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  type commonType = string | string[] | null;
  type Iparam = {
    sort_by: "asc";
    title: commonType;
    filter_with: ["subject", "author"];
    subject_ids: commonType;
    rating: number | null;
    author_ids: commonType;
  };

  let currentPage: number = currentPageChecker(context);
  let title: commonType = context?.query?.title || null;
  let author: commonType = context?.query?.author || null;
  let ratings: commonType = context?.query?.rating || null;
  let subject: commonType = context?.query?.subject || null;

  if (typeof author === "string") {
    author = [author];
  }

  if (typeof ratings === "string") {
    ratings = [ratings];
  }

  if (typeof subject === "string") {
    subject = [subject];
  }

  const params: Iparam = {
    sort_by: "asc",
    title: title,
    filter_with: ["subject", "author"],
    subject_ids: subject,
    rating: parseInt(ratings?.[0] as string)
      ? parseInt(ratings?.[0] as string)
      : null,
    author_ids: author,
  };
  const res: any = await getPaginatedData(
    `public_library/biblios`,
    {
      page: currentPage,
      per_page: 20,
      ...params,
    },
    context?.req?.cookies?.["language"] || "bn",
    context?.req?.cookies?.["token"]
  );

  if (res?.success) {
    return {
      props: {
        bookData: res?.data?.data?.biblio_list || [],
        subjectList: res?.data?.data?.filter_with?.subjects || [],
        authorList: res?.data?.data?.filter_with?.authors || [],
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
        subjectList: [],
        bookData: [],
        authorList: [],
      },
    };
  }
};

const ratingData: option[] = [
  {
    value: "5",
    label: <Rate disabled defaultValue={5} className="text-black text-sm" />,
  },
  {
    value: "4",
    label: <Rate disabled defaultValue={4} className="text-black text-sm" />,
  },
  {
    value: "3",
    label: <Rate disabled defaultValue={3} className="text-black text-sm" />,
  },
  {
    value: "2",
    label: <Rate disabled defaultValue={2} className="text-black text-sm" />,
  },
  {
    value: "1",
    label: <Rate disabled defaultValue={1} className="text-black text-sm" />,
  },
];
