import React, {FC, useEffect, useState} from "react";
import {Row, Col, Pagination, Rate, Popover} from "antd";
import {BookCard} from "@/components/book/BookCard";
import {currentPageChecker, scrollToTop} from "@/lib/helpers/utils";
import {useRouter} from "next/router";
import {
  IBook,
  ISubject,
  IAuthor,
  IOption,
  IPublication,
} from "@/lib/model/books";
import {GetServerSideProps} from "next";
import {getPaginatedData} from "@/lib/services";
import {useForm} from "react-hook-form";
import {DataNotFound} from "@/components/common";
import {localeString} from "@/lib/helpers/utils";
import {option} from "@/lib/model";
import {SearchControl, Select} from "@/components/controls";
import Cookies from "js-cookie";
import {CiFilter} from "react-icons/ci";
import {NextSeo} from "next-seo";

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
  totalPage: string;
  name: string;
  options: IOption[];
  placeholder: string;
  multiple?: boolean;
  subjectList: ISubject[];
  authorList: IAuthor[];
  publicationList: IPublication[];
  onChange?: (value: any) => void;
}
const BookList: FC<AddBannerProps> = ({
  language,
  bookData,
  subjectList,
  authorList,
  publicationList,
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
  const [publicationData, setPublicationData] = useState<option[]>([]);

  let router = useRouter();

  const text = (
    <div>
      <h1 className="section-title text-base lg:w-96 pt-8 pl-8 ">
        {localeString(language, "subwiseFilter")}
      </h1>
    </div>
  );

  const lang = Cookies.get("language");

  const {control, watch, handleSubmit} = useForm({
    defaultValues: {
      title: router?.query?.title ? router?.query?.title : "",
      subject: router?.query?.subject ? router?.query?.subject : [],
      rating: router?.query?.rating ? router?.query?.rating : [],
      author: router?.query?.author ? router?.query?.author : [],
      publication: router?.query?.publication ? router?.query?.publication : [],
    },
  });

  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );

  useEffect(() => {
    fetchSubjectName();
    fetchAuthorName();
    fetchPublicationName();
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

  const fetchPublicationName = async () => {
    const additionalItem = {value: "", label: localeString(language, "all")};

    setPublicationData([
      additionalItem,
      ...publicationList?.map((item: IPublication) => ({
        value: item?.id.toString(),
        label: item?.title,
      })),
    ]);
  };

  //const title = router?.query?.title ? router?.query?.title : "";

  const title = watch("title");
  const subject = watch("subject");
  const rating = watch("rating");
  const author = watch("author");
  const publication = watch("publication");

  useEffect(() => {
    setTotal(parseInt(totalData));
    router.replace({
      pathname: "books",
      query: {
        page,
        title,
        subject,
        author,
        rating,
        publication,
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
  }, [totalData, title, rating, subject, author, publication]);

  const handlePageChange = (page: number) => {
    router.push({
      pathname: "books",
      query: {
        page,
        title,
        subject,
        author,
        rating,
        publication,
      },
    });
    setPage(page);
    scrollToTop();
  };

  const content = (
    <div className="lg:w-96 w-56 md:w-96">
      <hr className="pt-4 mx-4 ml-8" />
      <div className="pt-2 pr-4 pl-4 ">
        <Row>
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 24}}>
            <div className="ml-3">
              <Select
                className="h-full "
                control={control}
                name="subject"
                multiple={true}
                options={subjectData}
                placeholder={localeString(language, "subject")}
              />
            </div>
          </Col>
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 24}}>
            <div className="ml-3 pt-2 md:pt-0 lg:pt-2 ">
              <Select
                className="h-full "
                control={control}
                name="author"
                multiple={true}
                options={authorData}
                placeholder={localeString(language, "author")}
              />
            </div>
          </Col>
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 24}}>
            <div className="ml-3 mb-1 pt-2 bookRating ">
              <Select
                className=""
                control={control}
                name="rating"
                showSearch={false}
                options={ratingData}
                placeholder={localeString(language, "rating")}
              />
            </div>
          </Col>
          <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 24}}>
            <div className="ml-3 mb-3  bookRating lg:pt-0 md:pt-2 ">
              <Select
                className=""
                control={control}
                name="publication"
                options={publicationData}
                placeholder={localeString(language, "publication")}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );

  return (
    <>
      <NextSeo
        title={localeString(language, "publicLibraryBooks")}
        description="books"
        openGraph={{
          title: "books",
          description: "books",
          images: [
            {
              url: "/library_logo.svg",
              alt: "books",
            },
          ],
        }}
      />
      <div className="pt-10 pl-content-container">
        <div className="pb-8">
          <Row gutter={[8, 8]}>
            <Col lg={{span: 10}}>
              <p className="section-title-dark">
                {localeString(language, "discoverBooks")}
              </p>
            </Col>
            <Col
              xs={{span: 24}}
              sm={{span: 24}}
              md={{span: 24}}
              lg={{span: 7, offset: 5}}
            >
              <SearchControl
                className="w-full"
                control={control}
                name="title"
                placeholder={localeString(language, "searchPlaceHolder")}
              />
            </Col>
            <Col xs={{span: 24}} lg={{span: 2}} md={{span: 24}}>
              <div
                style={{background: "white"}}
                className="border border-library-light-gray rounded p-2 "
              >
                <Popover
                  title={text}
                  placement="bottomRight"
                  className="cursor-pointer"
                  content={content}
                  trigger="click"
                >
                  <div className="flex gap-1 ">
                    <CiFilter className="w-5 h-5 text-library-gray-700" />
                    <h3 className="font-light text-sm">
                      {localeString(language, "subwiseFilter")}
                    </h3>
                  </div>
                </Popover>
              </div>
            </Col>
          </Row>
        </div>

        <Row gutter={[25, 25]}>
          {bookData?.length > 0 ? (
            <>
              {bookData?.map((bookItem, index: number) => (
                <Col
                  key={index}
                  xs={{span: 24}}
                  sm={{span: 24}}
                  md={{span: 12}}
                  lg={{span: 8}}
                  xl={{span: 6}}
                  xxl={{span: 6}}
                >
                  <div>
                    <BookCard bookItem={bookItem} />
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <DataNotFound />
          )}
        </Row>

        <div className="py-10">
          <Pagination
            defaultCurrent={1}
            current={
              router?.query?.page ? parseInt(router?.query?.page as string) : 1
            }
            defaultPageSize={perPage}
            total={total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
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
    filter_with: ["subject", "author", "publication"];
    subject_ids: commonType;
    rating: number | null;
    author_ids: commonType;
    publication_ids: commonType;
  };

  let currentPage: number = currentPageChecker(context);
  let title: commonType = context?.query?.title || null;
  let author: commonType = context?.query?.author || null;
  let ratings: commonType = context?.query?.rating || null;
  let subject: commonType = context?.query?.subject || null;
  let publication: commonType = context?.query?.publication || null;

  if (typeof author === "string") {
    author = [author];
  }

  if (typeof ratings === "string") {
    ratings = [ratings];
  }

  if (typeof subject === "string") {
    subject = [subject];
  }

  if (typeof publication === "string") {
    publication = [publication];
  }

  const params: Iparam = {
    sort_by: "asc",
    title: title,
    filter_with: ["subject", "author", "publication"],
    subject_ids: subject,
    rating: parseInt(ratings?.[0] as string)
      ? parseInt(ratings?.[0] as string)
      : null,
    author_ids: author,
    publication_ids: publication,
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
        publicationList: res?.data?.data?.filter_with?.publications || [],
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
        publicationList: [],
      },
    };
  }
};

const ratingData: option[] = [
  {
    value: "",
    label: localeString(Cookies.get("language"), "all"),
  },
  {
    value: "5",
    label: (
      <Rate key={5} disabled defaultValue={5} className="text-black text-sm" />
    ),
  },
  {
    value: "4",
    label: (
      <Rate key={4} disabled defaultValue={4} className="text-black text-sm" />
    ),
  },
  {
    value: "3",
    label: (
      <Rate key={3} disabled defaultValue={3} className="text-black text-sm" />
    ),
  },
  {
    value: "2",
    label: (
      <Rate key={2} disabled defaultValue={2} className="text-black text-sm" />
    ),
  },
  {
    value: "1",
    label: (
      <Rate key={1} disabled defaultValue={1} className="text-black text-sm" />
    ),
  },
];
