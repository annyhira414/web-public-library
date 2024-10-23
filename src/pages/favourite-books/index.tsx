import React, {FC, useEffect, useState} from "react";
import {Row, Col, Pagination, Rate, Card, Typography} from "antd";
import Image from "next/image";
import {BookCard, DataNotFound, NoFavoriteBooks} from "@/components/common";
import {HiOutlineHeart, HiHeart} from "react-icons/hi";
import {currentPageChecker, localeString} from "@/lib/helpers/utils";
import {deleteData, getPaginatedData} from "@/lib/services";
import {IFavBooks} from "@/lib/model/books";
import Cookies from "js-cookie";
import {Loader} from "@/components/common";
import {number} from "yup";

interface IFavouriteBook {
  language: string | undefined;
  bookData: IFavBooks;
}

const FavouriteBooks: FC<IFavouriteBook> = () => {
  const [perPage, setPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const language = Cookies.get("language");
  const token = Cookies.get("token");
  const [books, setBooks] = useState<IFavBooks[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFavoritebooks();
  }, [page]);

  const getFavoritebooks = async () => {
    setLoading(true);
    const res: any = await getPaginatedData(
      `/public_library/wishlists`,
      {per_page: perPage, page: page},
      language,
      token
    );
    if (res?.success) {
      setBooks(res?.data?.data);
      setTotalPages(parseInt(res?.data?.headers["x-total"]));
      setPage(parseInt(res?.data?.headers["x-page"]));
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="pl-content-container">
              <h1 className="section-title mt-10 mb-10">
                {localeString(language, "favouriteBooks")}
              </h1>
              <div className="mt-10">
                <div>
                  {books?.length > 0 ? (
                    <div>
                      <Row gutter={[25, 25]}>
                        {books?.map((user: IFavBooks, i: number) => (
                          <Col xs={{span: 24}} lg={{span: 6}} key={user.id}>
                            <BookCard
                              books={books}
                              setBooks={setBooks}
                              wishPage={true}
                              getFavoritebooks={getFavoritebooks}
                              bookItem={{
                                slug: user.biblio.slug,
                                title: user?.biblio?.title,
                                image_url: user?.biblio?.image_url,
                                is_wishlisted: user?.biblio?.is_wishlisted,
                                authors: user?.biblio?.authors,
                                average_rating: user?.biblio?.average_rating,
                                total_reviews: user?.biblio?.total_review,
                              }}
                            />
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
                    </div>
                  ) : (
                    <>
                      <div className="mb-24">
                        <DataNotFound
                          title={localeString(language, "noFavoriteBooks")}
                          src={"/images/noBooks.png"}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouriteBooks;
