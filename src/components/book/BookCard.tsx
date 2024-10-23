import {FC, useState} from "react";
import {Card, Rate, Tooltip} from "antd";
import Image from "next/image";
import {HiOutlineHeart, HiHeart} from "react-icons/hi";
import {IBook} from "@/lib/model/books";
import Link from "next/link";
import NoImageFound from "../../../public/images/book-page/noImageFound.png";
import {deleteData, postData} from "@/lib/services";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {IFavBooks, IBookAuthors} from "@/lib/model/books";
import {localeString} from "@/lib/helpers/utils";
import {useMediaQuery} from "usehooks-ts";

interface ItemBook {
  bookItem: IBook;
  wishPage?: boolean;
  setBooks?: (data: IFavBooks[]) => void;
  books?: IFavBooks[] | undefined;
  getFavoritebooks?: () => void;
  url?: string;
}

export const BookCard: FC<ItemBook> = ({
  bookItem,
  getFavoritebooks,
  wishPage = false,
  setBooks,
  books,
  url = "books",
}) => {
  const [wishList, setWishList] = useState(bookItem?.is_wishlisted);
  const router = useRouter();
  const language: string | undefined = Cookies.get("language");
  const useToken = Cookies.get("token");

  const {slug} = router?.query;

  const handleAddWishList = async (slug: string) => {
    const res = await postData(
      `public_library/wishlists`,
      {
        biblio_slug: slug,
      },
      language,
      useToken
    );
    if (res?.success) {
      setWishList(true);
    } else if (res?.status?.status === 401) {
      router.push("/auth/login");
    }
  };
  const handleRemoveWishList = async (slug: string) => {
    const res = await deleteData(
      `public_library/wishlists`,
      slug as string,
      Cookies.get("token")
    );
    if (res?.success) {
      setWishList(false);
      if (wishPage === true && getFavoritebooks) {
        const updatedData =
          (books &&
            books.filter((item: IFavBooks) => item?.biblio?.slug !== slug)) ||
          [];
        if (typeof setBooks === "function") {
          setBooks(updatedData);
        }
      }
    } else if (res?.status?.status === 401) {
      router.push("/auth/login");
    }
  };

  const getReviewsData = bookItem?.total_reviews;
  const width = useMediaQuery("(min-width: 768px)");

  return (
    <div className="book-list">
      <Link href={`${url}/${bookItem?.slug}`} className="hover:text-black">
        <Card
          className="h-[510px] common-card-hover border-2 cursor-pointer px-4 pt-4 "
          cover={
            <div className="book-card overflow-hidden ">
              <Image
                className="transition-all duration-500  hover:scale-105"
                fill={true}
                alt="Book Image"
                src={
                  width
                    ? bookItem?.image_url?.desktop_image || NoImageFound
                    : bookItem?.image_url?.tab_image || NoImageFound
                }
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          }
        >
          {bookItem?.series_statement_volume ? (
            <div className="volume-content overflow-ellipsis whitespace-nowrap">
              {bookItem?.series_statement_volume?.length <= 9 ? (
                bookItem?.series_statement_volume
              ) : (
                <Tooltip title={bookItem?.series_statement_volume}>
                  {bookItem?.series_statement_volume.slice(0, 6)} {"..."}
                </Tooltip>
              )}
            </div>
          ) : (
            ""
          )}
        </Card>
        <div className="absolute pl-4 top-80 pt-10">
          <Tooltip title={bookItem?.title}>
            <h1 className="font-bold text-left text-base w-56 text-black line-clamp-2 pb-2">
              {bookItem?.title ? bookItem?.title : ""}
            </h1>
          </Tooltip>

          <h2 className="font-normal text-left text-base w-4/5 text-black line-clamp-2 ">
            <Tooltip
              title={
                <div>
                  {bookItem?.authors?.map((user: IBookAuthors) => (
                    <div key={user?.id}>{user?.full_name}</div>
                  ))}
                </div>
              }
            >
              <div className="font-normal text-base w-full">
                {bookItem?.authors
                  ?.map((user: IBookAuthors) => user?.full_name)
                  .join(", ")}
              </div>
            </Tooltip>
          </h2>

          <div>
            {bookItem?.average_rating !== 0 && (
              <div className="flex pt-2">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={bookItem?.average_rating}
                  className="text-sm"
                />
                <span className="font-normal text-xs pl-1 pt-1">
                  <>
                    {getReviewsData <= 1 ? (
                      <span className="pl-1 font-normal pt-1 ">
                        ( {getReviewsData}
                        <span className="pl-1 ">
                          {localeString(language, "review")})
                        </span>
                      </span>
                    ) : (
                      <span className="pl-1 font-normal pt-1">
                        ( {getReviewsData}{" "}
                        <span className="pl-1">
                          {localeString(language, "reviews")})
                        </span>{" "}
                      </span>
                    )}
                  </>
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
      <div className="absolute right-16 top-3 pl-2 pt-2 ">
        {wishList === true ? (
          <HiHeart
            onClick={() => {
              handleRemoveWishList(bookItem?.slug);
            }}
            style={{fontSize: "33px"}}
            className="absolute cursor-pointer bg-white rounded-full text-red-600 p-1 text-xl animation-pulse"
          />
        ) : (
          <HiOutlineHeart
            onClick={() => handleAddWishList(bookItem?.slug)}
            style={{fontSize: "32px"}}
            className="absolute cursor-pointer bg-white rounded-full text-red-600 p-1 text-xl"
          />
        )}
      </div>
    </div>
  );
};
