import {getData} from "@/lib/services";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import {global} from "@/lib/model";
import {useRouter} from "next/router";
import {Col, Divider, Row} from "antd";
import {BookCard, DataNotFound, NoFavoriteBooks} from "@/components/common";
import {localeString} from "@/lib/helpers/utils";
import {Loader} from "@/components/common";
import {EventCard} from "@/components/events/EventCard";
import {GalleryCard} from "@/components/gallery";
import NoticeCard from "@/components/activities/notice/NoticeCard";
import {INotice} from "@/lib/model/activities/notice";
import {NewsPaperList} from "@/components/newspaper";

const GlobalSearchResults = () => {
  const language = Cookies.get("language") as string;
  const [globalData, setGlobalData] = useState<global>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const filter_with = router.query.filter_with;
  const query = router.query.query;

  useEffect(() => {
    getGlobalData();
  }, [router.query]);

  const {title, authors, biblio_subjects, isbn, publication, edition, volume} =
    router.query;

  const getGlobalData = async () => {
    const requestData = {
      filter_with: filter_with,
      query: query,
    };
    setLoading(true);
    const res = await getData(
      `public_library/search/list`,
      requestData,
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setGlobalData(res?.data);
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="pl-content-container mb-28">
            <div>
              <h1 className="section-title mt-10 mb-10">
                {localeString(language, "searchResults")}
              </h1>
            </div>
            {filter_with == "biblio" && (
              <div>
                {globalData?.filter_results?.length > 0 ? (
                  <>
                    <Row gutter={[25, 25]}>
                      {globalData?.filter_results?.map(
                        (user: any, i: number) => (
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
                        )
                      )}
                    </Row>
                  </>
                ) : (
                  <div>
                    <DataNotFound />
                  </div>
                )}
              </div>
            )}
            {filter_with == "event" && (
              <div>
                {globalData?.filter_results?.length > 0 ? (
                  <>
                    <Row gutter={[25, 25]}>
                      {globalData?.filter_results?.map(
                        (user: any, i: number) => (
                          <Col xs={{span: 24}} lg={{span: 8}} key={user.id}>
                            <EventCard
                              eventItem={{
                                slug: user?.slug,
                                title: user?.title,
                                image_url: user?.image_url,
                                start_date: user?.start_date,
                                details: user?.details,
                                is_local: user?.is_local,
                                end_date: user?.end_date,
                              }}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </>
                ) : (
                  <div>
                    <DataNotFound />
                  </div>
                )}
              </div>
            )}
            {filter_with == "album" && (
              <div>
                {globalData?.filter_results?.length > 0 ? (
                  <GalleryCard
                    language={language}
                    galleryData={globalData?.filter_results}
                  />
                ) : (
                  <div>
                    <DataNotFound />
                  </div>
                )}
              </div>
            )}
            {filter_with == "notice" && (
              <div>
                {globalData?.filter_results?.length > 0 ? (
                  <>
                    <Row gutter={[25, 25]}>
                      {globalData?.filter_results?.map(
                        (user: INotice, i: number) => (
                          <Col xs={{span: 24}} lg={{span: 24}} key={user.id}>
                            <NoticeCard
                              index={1}
                              language={language}
                              startIndex={2}
                              key={i}
                              notice={user}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </>
                ) : (
                  <div>
                    <DataNotFound />
                  </div>
                )}
              </div>
            )}
            {filter_with == "newspaper" && (
              <div>
                {globalData?.filter_results?.length > 0 ? (
                  <>
                    <Row gutter={[25, 25]}>
                      {globalData?.filter_results?.map(
                        (user: INotice, i: number) => (
                          <Col xs={{span: 24}} lg={{span: 24}} key={user.id}>
                            <NewsPaperList total="" name="" />
                          </Col>
                        )
                      )}
                    </Row>
                  </>
                ) : (
                  <div>
                    <DataNotFound />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSearchResults;
