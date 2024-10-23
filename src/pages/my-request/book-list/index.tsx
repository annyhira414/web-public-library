import React, { FC, useEffect, useState } from "react";
import { Row, Col, Button, Checkbox } from "antd";
import { BookCard } from "@/components/book/BookCard";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { getData } from "@/lib/services";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface IbookList {
  language: string;
}

const BookList: FC<IbookList> = ({}) => {
  let router = useRouter();
  const language = Cookies.get("language");
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      bookTitle: "",
      authorName: null,
      subject: null,
      isbn: "",
      publication: "",
      edition: "",
      volume: "",
    },
    mode: "all",
  });

  const [bookData, setBookData] = useState<any>([]);
  const [isOkDisabled, setIsOkDesabled] = useState<boolean>(true);

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsOkDesabled(false);
    } else {
      setIsOkDesabled(true);
    }
  };

  useEffect(() => {
    bookFunction();
  }, []);

  const bookFunction = async () => {
    const bookSearchList = {
      biblio_title: router?.query?.bookTitle || null,
      authors_name: router?.query?.bauthorName || "",
      biblio_subjects_name: router?.query?.subject || "",
      isbn: router?.query?.isbn || null,
      publication: router?.query?.publication || null,
      edition: router?.query?.edition || null,
      volume: router?.query?.volume || null,
    };
    const bookListRes = await getData(
      `public_library/biblios/advance_search`,
      { ...bookSearchList },
      language,
      Cookies.get("token")
    );
    if (bookListRes?.success) {
      bookListRes;
    }
  };

  const handelChange = () => {
    router.push("/my-request");
  };
  console.log("bookdata", bookData);

  return (
    <>
      {/* <form onSubmit={handleSubmit(bookFunction)} className="custom-placeholder"> */}

      <div className="pt-10 pl-content-container">
        <div className="section-title-dark">{localeString(language, "bookList")}</div>

        <Row gutter={[16, 16]}>
          {bookData?.map((bookItem: any) => (
            <Col
              key={bookItem?.id}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            >
              <>
                <BookCard bookItem={bookItem} />
              </>
            </Col>
          ))}
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12, offset: 6 }}
            xl={{ span: 12, offset: 6 }}
            xxl={{ span: 12, offset: 6 }}
          >
            <div className="pt-8 pb-20">
              <div className="bg-white h-full w-full p-4 rounded-lg ">
                <h1 className="card-title">{localeString(language, "bookListTitle")}</h1>
                <div className="pt-6">
                  <Checkbox onChange={onChange}>
                    {/* control={control} */}
                    {localeString(language, "yesIwant")}:
                  </Checkbox>
                </div>
                <div className="pt-4 w-full md:flex md:justify-end">
                  <div className="rounded-lg">
                    <Button
                      disabled={isOkDisabled}
                      htmlType="submit"
                      className=" mt-2 uppercase shadow-none h-11 !rounded text-library-white text-base bg-library-primary hover:!text-green-200"
                      //disabled={!isDirty || !isValid || isSubmitting}
                      onClick={handelChange}
                      block
                    >
                      {localeString(language, "submit")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* </form> */}
    </>
  );
};
export default BookList;

// const bookMockdata = [
//   {
//     id: 1,
//     slug: "one",
//     name: "book name1 ",
//     title: "Book title",
//     is_wishlisted: true,

//     image_url: {
//       desktop_image: null,
//       tab_image: null,
//     },
//     author: "hasan1",
//   },
//   {
//     id: 2,
//     slug: "two",
//     image_url: {
//       desktop_image: null,
//       tab_image: null,
//     },
//     name: "book name2 ",
//     title: "Book title",
//     is_wishlisted: false,
//     author: "hasan2",
//   },
//   {
//     id: 3,
//     slug: "one1",
//     name: "book name3 ",
//     title: "Book title",
//     is_wishlisted: true,
//     image_url: {
//       desktop_image: null,
//       tab_image: null,
//     },
//     author: "hasan3",
//   },
//   {
//     id: 4,
//     slug: "o",
//     name: "book name3 ",
//     title: "Book title",
//     is_wishlisted: true,
//     image_url: {
//       desktop_image: null,
//       tab_image: null,
//     },
//     author: "hasan4",
//   },
// ];
