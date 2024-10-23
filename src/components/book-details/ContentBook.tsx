import {FC, useState, useEffect} from "react";
import {Rate, Button, Row, Col} from "antd";
import Image from "next/image";
import {HiOutlineHeart, HiHeart} from "react-icons/hi";
import {IContent} from "@/lib/model/books";
import NoImageFound from "../../../public/images/book-page/noImageFound.png";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";

interface ContentProps {
  bookItem: IContent;
  isModalVisible?: boolean;
  toggleModal?: () => void;
  control?: any;
  handleSubmit?: (value: any) => any;
  onSubmit?: (value: any) => void;
  onReset?: (value: any) => void;
}
export const ContentBook: FC<ContentProps> = ({
  bookItem,
  control,
  handleSubmit,
  onSubmit,
}) => {
  const [wishList, setWishList] = useState(bookItem?.is_wishlisted);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const language: string | undefined = Cookies.get("language");

  const toggleFilterModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const iconHandler = () => {
    if (wishList === false) setWishList(true);
    else setWishList(false);
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth >= 1024) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <>
      <h1 className="pt-10 section-title-dark">
        {localeString(language, "bookDetails")}
      </h1>
      <div className="bg-white pb-10 xs:pr-8 sm:pr-8">
        <Row gutter={[25, 25]}>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 8}}
            lg={{span: 8}}
            xl={{span: 8}}
          >
            <div className="">
              <div className="w-full h-[500px] relative">
                <Image
                  sizes="w-full"
                  className="pt-10 pl-10"
                  alt="example"
                  src={
                    desktop
                      ? bookItem?.image_url?.desktop_image || NoImageFound
                      : bookItem?.image_url?.tab_image || NoImageFound
                  }
                  fill={true}
                />
              </div>
              <div className="absolute left-12 top-10 pt-4 pl-4 ">
                {wishList === true ? (
                  <HiHeart
                    onClick={() => iconHandler()}
                    style={{fontSize: "32px"}}
                    className="absolute cursor-pointer bg-white rounded-full text-red-600 p-1 text-xl "
                  />
                ) : (
                  <HiOutlineHeart
                    onClick={() => iconHandler()}
                    style={{fontSize: "32px"}}
                    className="absolute cursor-pointer bg-white rounded-full text-red-600 p-1 text-xl"
                  />
                )}
              </div>

              <div className="pt-4 pl-10">
                {/* <Button className=" w-full uppercase hover:bg-library-primary hover:text-white bg-library-light-secondary-green text-library-primary font-semibold h-10 text-xs">
                  read
                </Button> */}
                <Button className="button-secondary w-full uppercase">
                  {localeString(language, "readSomePages")}
                </Button>
              </div>
            </div>
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 16}}
            lg={{span: 16}}
            xl={{span: 16}}
          >
            <div className="lg:w-8/12 xl:10/12 xs:w-full sm:w-full xs:pr-8 xs:pl-8 lg:pl-4 xl:pl-4">
              <div className="pt-10 text-black text-sm ">
                <h1 className="text-xl font-semibold">{bookItem?.title}</h1>
                <div className="font-semibold text-sm mt-5 pb-1">
                  {localeString(language, "author")}
                </div>
                <div className="font-normal pb-1">{bookItem?.author}</div>
                <hr />
                <div className="mt-2 font-semibold pb-1">
                  {localeString(language, "ratingReviews")}
                  <div className="flex font-semibold text-sm ">
                    <Rate
                      defaultValue={bookItem?.average_rating}
                      className="font-semibold text-sm pb-1"
                    />
                    <div className="font-normal">
                      ({bookItem?.total_review ? bookItem?.total_review : "..."}
                      )
                    </div>
                  </div>
                </div>
                <hr />
                <div className="font-semibold pt-2">
                  {localeString(language, "internationalStandardBookNumber")}
                </div>
                <div className="font-normal pb-2">
                  {bookItem?.isbn ? bookItem?.isbn : "null"}
                </div>
                <hr />
                <div className="font-semibold pt-2">
                  {localeString(language, "language")}
                </div>
                <div className="font-normal pb-2">
                  {bookItem?.language ? bookItem.language : "Bangla"}
                </div>
                <hr />
                <div className="font-semibold pt-2">
                  {localeString(language, "edition")}
                </div>
                <div className="font-normal pb-2">
                  {bookItem?.biblio_edition ? bookItem?.biblio_edition : "null"}
                </div>
                <hr />
                <div className="font-semibold pt-2">
                  {localeString(language, "yearOfPublishing")}
                </div>
                <div className="font-normal pb-2">
                  {bookItem?.date_of_publication
                    ? bookItem?.date_of_publication
                    : "2023"}
                </div>
                <hr />
                <div className="font-semibold pt-2">
                  {localeString(language, "volume")}
                </div>
                <div className="font-normal pb-2">
                  {bookItem?.remainder_of_title
                    ? bookItem?.remainder_of_title
                    : "V-1"}
                </div>
                <hr />
                <div className="font-semibold pt-2">
                  {localeString(language, "subject")}
                </div>
                <div className="font-normal pb-2">
                  {bookItem?.subject ? bookItem?.subject : "null"}
                </div>
                <hr />
              </div>
              <div className="">
                <div className="flex justify-between gap-2 mt-10  ">
                  <Button className="button-secondary w-full">
                    {localeString(language, "eBooks")}
                  </Button>
                  <Button
                    onClick={() => {
                      toggleFilterModal();
                    }}
                    className="button-secondary w-full"
                  >
                    {localeString(language, "paperBooks")}
                  </Button>
                </div>
                <div className="pt-2">
                  <Button className="button-primary w-full">
                    {localeString(language, "borrowbook")}
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <CheckAvailability
          isModalVisible={isModalVisible}
          toggleModal={toggleFilterModal}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        /> */}
      </div>
    </>
  );
};
