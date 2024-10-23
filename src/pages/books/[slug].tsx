import {ReviewRating} from "@/components/book-details";
import {localeString} from "@/lib/helpers/utils";
import React, {FC, useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import {ShareButton} from "../../components/common/ShareButton";
import {deleteData, getData, getPaginatedData, postData} from "@/lib/services";
import {
  IReviewRating,
  IContent,
  IOptionAllLibrary,
  IBookSubject,
  IBookAuthors,
  IBookLibrary,
} from "@/lib/model/books";
import {useRouter} from "next/router";
import {CheckAvailability} from "@/components/common";
import {useForm} from "react-hook-form";
import {Rate, Button, Row, Col, message} from "antd";
import Image from "next/image";
import {HiOutlineHeart, HiHeart} from "react-icons/hi";
import NoImageFound from "../../../public/images/book-page/noImageFound.png";
import Cookies from "js-cookie";
import {MembershipBanner} from "@/components/membership";
import {BsFillShareFill} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {addtoBag} from "@/redux/features/add-to-bag/addToBagSlice";
import {motion} from "framer-motion";
import {NextSeo} from "next-seo";
import {useMediaQuery} from "usehooks-ts";
import Link from "next/link";

interface BookDetailsItemProps {
  book_reviewRating: IReviewRating[];
  bookItem: IContent;
  language: string;
  IOptionAllLibrary: IOptionAllLibrary;
}

const BookDetails: FC<BookDetailsItemProps> = ({bookItem, language}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {slug} = router?.query;
  const [modalStatus, setModalStatus] = useState<string>("select-library");

  useEffect(() => {
    slug;
  }, [slug]);

  const {watch, control, handleSubmit} = useForm({});
  const [data, setData] = useState();
  const [wishList, setWishList] = useState(bookItem?.is_wishlisted);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const toggleFilterModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // const successMsg = messageApi.open({
  //   type: "success",
  //   content: localeString(language, "addToCardMessage"),
  // });
  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const library = watch("libraryName");
  const width = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    !library ? setIsDisabled(true) : setIsDisabled(false);
  }, [library]);

  const [allLibraries, setAllLibraries] = useState();
  useEffect(() => {
    allLibrary();
  }, []);

  const allLibrary = async () => {
    const libraries = await getData(
      "/public_library/libraries/dropdown",
      {},
      language
    );
    if (libraries?.success) {
      setAllLibraries(
        libraries?.data?.map((item: IOptionAllLibrary) => ({
          value: item?.code,
          label: item?.name,
        }))
      );
    }
  };
  const onSubmit = async (data: IBookLibrary) => {
    const library = await getData(
      `public_library/biblios/${slug}/library_wise_availability`,
      {library_code: data?.libraryName},
      language
    );
    if (library?.data?.is_available) {
      setData(library?.data);
      setModalStatus("congratulations");
    } else {
      setModalStatus("sorry");
    }
  };

  const [reviews, setReviews] = useState<IReviewRating[]>([]);

  useEffect(() => {
    getAllReview();
  }, []);

  const getAllReview = async () => {
    const review: any = await getPaginatedData(
      `public_library/biblios/${slug}/reviews`,
      {
        page: 1,
        per_page: 1,
      }
    );
    if (review?.success) {
      setReviews(review?.data?.data);
    }
  };

  const handleAddWishList = async () => {
    const res = await postData(
      `public_library/wishlists`,
      {
        biblio_slug: bookItem?.slug,
      },
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setWishList(true);
    } else if (res?.status?.status === 401) {
      router.push("/auth/login");
    }
  };
  const handleRemoveWishList = async () => {
    const res = await deleteData(
      `public_library/wishlists`,
      bookItem?.slug as string,
      Cookies.get("token")
    );
    if (res?.success) {
      setWishList(false);
    } else if (res?.status?.status === 401) {
      router.push("/auth/login");
    }
  };

  const borrowBook = async () => {
    const res = await postData(
      `/public_library/carts/add_item`,
      {
        biblio_slug: bookItem?.slug,
      },
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      dispatch(addtoBag(res?.data?.data?.cart_items));
      successMsg(localeString(language, "addToCardMessage"));
    } else {
      if (res?.status?.status === 401) {
        router.push("/auth/login");
      } else {
        errorMsg(res?.data?.error);
      }
    }

    // else if (res?.status?.status === 401) {
    //   router.push("/auth/login");
    // }

    // else {
    //   errorMsg(res?.data?.error);
    // }
  };
  const totalReviewData = bookItem?.total_review;
  const authorData = bookItem?.authors;
  const [isModalOpen, setIsMOdalOpen] = useState(false);
  const handleModal = () => {
    setIsMOdalOpen(true);
  };
  const handleCancel = () => {
    setIsMOdalOpen(!isModalOpen);
  };

  console.log("bookItem", bookItem);

  return (
    <div>
      <NextSeo
        title={bookItem?.title}
        description={bookItem?.title}
        openGraph={{
          title: bookItem?.title,
          description: bookItem?.title,
          images: [
            {
              url: "/library_logo.svg",
              alt: bookItem?.title,
            },
          ],
        }}
      />
      {contextHolder}
      <div className="pb-10 pl-content-container overflow-hidden">
        <>
          <h1 className="pt-10 section-title-dark">
            {localeString(language, "bookDetails")}
          </h1>
          <div className="bg-white rounded-2xl">
            <div className="pb-10 ">
              <Row gutter={[0, 25]}>
                <Col
                  xs={{span: 24}}
                  sm={{span: 24}}
                  md={{span: 8}}
                  lg={{span: 8}}
                  xl={{span: 8}}
                >
                  <motion.div
                    initial={{x: -100, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{type: "spring", delay: 0.5, duration: 1}}
                  >
                    <div className="w-full h-[500px] relative ">
                      <Image
                        className="px-4 py-8 lg:pl-10 rounded-2xl"
                        alt="example"
                        src={
                          width
                            ? bookItem?.image_url?.desktop_image || NoImageFound
                            : bookItem?.image_url?.tab_image || NoImageFound
                        }
                        fill={true}
                      />
                    </div>
                    <div className="absolute right-16 top-10 pl-2 pt-2 ">
                      {wishList === true ? (
                        <HiHeart
                          onClick={() => handleRemoveWishList()}
                          style={{fontSize: "32px"}}
                          className="absolute cursor-pointer bg-white rounded-full text-red-600 p-1 text-xl animation-pulse"
                        />
                      ) : (
                        <HiOutlineHeart
                          onClick={() => handleAddWishList()}
                          style={{fontSize: "32px"}}
                          className="absolute cursor-pointer bg-white rounded-full text-red-600 p-1 text-xl"
                        />
                      )}
                    </div>
                    {bookItem?.preview_ebook_file_url ? (
                      <Link
                        target="_blank"
                        href={bookItem?.preview_ebook_file_url}
                      >
                        <div className="px-4 lg:pl-10  bookButton">
                          <Button className="button-primary w-full uppercase">
                            {localeString(language, "readSomePages")}
                          </Button>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )}
                  </motion.div>
                </Col>

                <Col
                  xs={{span: 24}}
                  sm={{span: 24}}
                  md={{span: 16}}
                  lg={{span: 16}}
                  xl={{span: 16}}
                >
                  <motion.div
                    initial={{x: 100, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{type: "spring", delay: 0.5, duration: 1}}
                  >
                    <div className="lg:w-8/12 xl:10/12 xs:w-full sm:w-full xs:pr-8 xs:pl-8 lg:pl-4 xl:pl-4 ">
                      <div className="pl-4 pt-10 text-black text-sm ">
                        <div className="flex justify-between">
                          <motion.h1
                            variants={{
                              hidden: {opacity: 0, y: 75},
                              visible: {opacity: 1, y: 0},
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 1, delay: 0.25}}
                            className="text-xl font-semibold w-96"
                          >
                            {bookItem?.title}
                          </motion.h1>
                          <div className="pt-1 cursor-pointer lg:pr-0  pr-4">
                            <ShareButton
                              isModalOpen={isModalOpen}
                              onCancel={handleCancel}
                              url={`/books/${slug}`}
                            />

                            <BsFillShareFill
                              className="text-lg "
                              onClick={handleModal}
                            />
                          </div>
                        </div>

                        <>
                          {authorData <= 1 ? (
                            <div>
                              <div className="font-semibold text-sm mt-5 pb-1">
                                {localeString(language, "authorName")}
                              </div>
                            </div>
                          ) : (
                            <div className="font-semibold text-sm mt-5 pb-1">
                              {localeString(language, "authorsName")}
                            </div>
                          )}

                          <div className="font-normal pb-2">
                            {authorData?.length > 0
                              ? authorData?.map(
                                  (item: IBookAuthors, index: number) => (
                                    <span key={item?.id}>
                                      <>
                                        {item?.full_name}
                                        {/* {index < authorData?.length - 1
                                          ? ", "
                                          : "..."} */}
                                      </>
                                    </span>
                                  )
                                )
                              : "..."}
                          </div>
                        </>
                        <hr />
                        <div className="mt-2 font-semibold pb-1">
                          {localeString(language, "ratingReviews")}
                          <div className="flex font-semibold text-sm ">
                            <Rate
                              disabled
                              defaultValue={bookItem?.average_rating}
                              className="pt-1 font-semibold text-sm pb-1"
                            />
                            <>
                              {totalReviewData <= 1 ? (
                                <span className="pl-1 font-normal pt-1">
                                  ( {totalReviewData}
                                  <span className="pl-1">
                                    {localeString(language, "review")})
                                  </span>
                                </span>
                              ) : (
                                <span className="pl-1 font-normal pt-1">
                                  ( {totalReviewData}{" "}
                                  <span className="pl-1">
                                    {localeString(language, "reviews")})
                                  </span>
                                </span>
                              )}
                            </>
                          </div>
                        </div>
                        <hr />
                        <div className="font-semibold pt-2">
                          {localeString(language, "biblioPublication")}
                        </div>
                        <div className="font-normal pb-2 pt-1">
                          {bookItem?.biblio_publication
                            ? bookItem?.biblio_publication
                            : "..."}
                        </div>
                        <hr />

                        <div className="font-semibold pt-2">
                          {localeString(language, "callNumber")}
                        </div>
                        <div className="font-normal pb-2 pt-1">
                          {bookItem?.full_call_number
                            ? bookItem?.full_call_number
                            : "..."}
                        </div>
                        <hr />
                        <div className="font-semibold pt-2">
                          {localeString(
                            language,
                            "internationalStandardBookNumber"
                          )}
                        </div>
                        <div className="font-normal pb-2 pt-1">
                          {bookItem?.isbn ? bookItem?.isbn : "..."}
                        </div>
                        <hr />
                        <div className="font-semibold pt-2">
                          {localeString(language, "language")}
                        </div>
                        <div className="pt-1 font-normal pb-2">
                          {bookItem?.language ? bookItem.language : "Bangla"}
                        </div>
                        <hr />
                        <div className="font-semibold pt-2">
                          {localeString(language, "edition")}
                        </div>
                        <div className="pt-1 font-normal pb-2">
                          {bookItem?.biblio_edition
                            ? bookItem?.biblio_edition
                            : "..."}
                        </div>
                        <hr />
                        <div className="font-semibold pt-2">
                          {localeString(language, "yearOfPublishing")}
                        </div>
                        <div className="pt-1 font-normal pb-2">
                          {bookItem?.date_of_publication
                            ? bookItem?.date_of_publication
                            : "..."}
                        </div>
                        <hr />
                        <div className="font-semibold pt-2">
                          {localeString(language, "volume")}
                        </div>
                        <div className="pt-1 font-normal pb-2">
                          {bookItem?.series_statement_volume
                            ? bookItem?.series_statement_volume
                            : "..."}
                        </div>
                        <hr />
                        <div className="font-semibold pt-2 pb-2">
                          {localeString(language, "subject")}
                        </div>
                        <div className="pb-3">
                          {bookItem?.subjects?.length > 0
                            ? bookItem?.subjects?.map((x: IBookSubject) => (
                                <>
                                  <span key={x?.id}>{x?.title} </span>{" "}
                                </>
                              ))
                            : "..."}
                        </div>
                        <hr />
                      </div>
                      <div className="p-4">
                        {bookItem?.full_ebook_file_url ? (
                          <div className="flex justify-between gap-2 mt-10 bookButton">
                            <div className="w-full">
                              <Link
                                target="_blank"
                                href={bookItem?.full_ebook_file_url}
                              >
                                <Button className="button-primary w-full ">
                                  {localeString(language, "eBook")}
                                </Button>
                              </Link>
                            </div>
                            <div className="w-full">
                              <Button
                                onClick={() => {
                                  toggleFilterModal();
                                }}
                                className="button-primary  w-full"
                              >
                                {localeString(language, "paperBook")}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full  gap-2 mt-10 bookButton">
                            <Button
                              onClick={() => {
                                toggleFilterModal();
                              }}
                              className="button-primary  w-full"
                            >
                              {localeString(language, "paperBook")}
                            </Button>
                          </div>
                        )}

                        <div className="pt-2 borrowBookButton">
                          <Button
                            onClick={() => {
                              borrowBook();
                            }}
                            className="button-secondary w-full"
                          >
                            {localeString(language, "borrowBook")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              </Row>
              <CheckAvailability
                isModalVisible={isModalVisible}
                toggleModal={toggleFilterModal}
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                isDisabled={isDisabled}
                status={modalStatus}
                setModalStatus={setModalStatus}
                allLibrary={allLibraries}
                slug={slug as string}
                data={data}
                congratulationMessage="congratulationMessage"
              />
            </div>
          </div>
        </>
        <ReviewRating
          bookReviewRating={reviews}
          slug={slug as string}
          language={language}
        />
      </div>
      <div className="py-12 pl-content-container">
        <MembershipBanner />
      </div>
    </div>
  );
};
export default BookDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession(context);
  const {slug} = context?.query;

  const res_biblios_reviewRating = await getData(
    `public_library/biblios/${slug}/reviews`
  );

  const book_details = await getData(
    `/public_library/biblios/${slug}`,
    {},
    context?.req?.cookies?.["language"] || "bn",
    context?.req?.cookies?.["token"]
  );

  if (res_biblios_reviewRating?.success || book_details?.success) {
    return {
      props: {
        book_reviewRating: res_biblios_reviewRating?.data,
        bookItem: book_details?.data,
        language: context?.req?.cookies?.["language"] || "bn",
      },
    };
  } else {
    return {
      props: {
        book_reviewRating: [],
        bookItem: [],
        language: context?.req?.cookies?.["language"] || "bn",
      },
    };
  }
};
