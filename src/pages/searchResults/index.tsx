import {getData} from "@/lib/services";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import {Ioption, option} from "@/lib/model";
import {useRouter} from "next/router";
import {Col, Divider, Row} from "antd";
import {BookCard, DataNotFound, NoFavoriteBooks} from "@/components/common";
import {localeString} from "@/lib/helpers/utils";
import {Loader} from "@/components/common";

const SearchResults = () => {
  const language = Cookies.get("language");
  const [data, setData] = useState<option[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSearchData();
  }, [router.query]);
  const {title, authors, biblio_subjects, isbn, publication, edition, volume} =
    router.query;

 

  const getSearchData = async () => {
    // const authorIds = (authors && [...(authors as string[])]) || [];

    // let arrayOfNumbers = authorIds?.map((str) => Number(str));
    const authorIds =
      authors && typeof authors == "string"
        ? [Number(authors)]
        : authors
        ? [...(authors as string[])]
        : [];

    let arrayOfNumbers = authorIds?.map((str) => Number(str));
    console.log("subjectIds", arrayOfNumbers);

    const subjectIds =
      biblio_subjects && typeof biblio_subjects == "string"
        ? [Number(biblio_subjects)]
        : biblio_subjects
        ? [...(biblio_subjects as string[])]
        : [];

    let arrayOfSubjects = subjectIds?.map((str) => Number(str));
    console.log("subjectIds", arrayOfSubjects);

    const requestData = {
      biblio_title: title,
      authors: arrayOfNumbers?.length ? arrayOfNumbers : undefined,
      biblio_subjects: arrayOfSubjects || undefined,
      // biblio_subjects: biblio_subjects ? [biblio_subjects] : undefined,
      isbn: isbn,
      publication: publication,
      edition: edition,
      volume: volume,
    };
    setLoading(true);
    const res = await getData(
      `public_library/biblios/advance_search`,
      requestData,
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setData(res?.data);
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="pl-content-container mb-24">
            <div>
              <h1 className="section-title mt-10 mb-10">
                {localeString(language, "searchResults")}
              </h1>
            </div>
            {data?.length > 0 ? (
              <>
                <Row gutter={[25, 25]}>
                  {data?.map((user: any, i: number) => (
                    <Col xs={{span: 24}} lg={{span: 6}} key={user.id}>
                      <BookCard
                        bookItem={{
                          slug: user?.slug,
                          title: user?.title,
                          image_url: user?.image_url,
                          is_wishlisted: user?.is_wishlisted,
                          authors: user?.authors,
                          average_rating: user?.average_rating,
                          total_reviews: user?.total_reviews,
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <div>
                <DataNotFound />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
