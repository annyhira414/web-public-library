/** @format */
import React, {FC} from "react";
import {useAppSelector} from "@/redux";

import {
  DiscoverBooks,
  KeypersonSection,
  Subject,
  TrendingBooks,
  EBooks,
  EventSection,
} from "@/components/home";

import {Slider} from "@/components/home";
import {GetServerSideProps} from "next";
import {getData} from "@/lib/services";
import {IKeyPeople} from "@/lib/model/home-page-models";
import {IBook} from "@/lib/model/books";
import NoticeBoard from "@/components/home/notice-board/NoticeBoard";
import {INotice} from "@/lib/model/activities/notice";
import {IEvent} from "@/lib/model/events";
import {
  currentPageChecker,
  localeString,
  scrollToTop,
} from "@/lib/helpers/utils";
import {ISlider} from "@/lib/model/slider";
import {IsubList} from "@/lib/model/subjectList";
import {MembershipBanner} from "@/components/membership";
import {AddAnimation} from "@/components/common/AddAnimation";
import {DownloadBanner} from "@/components/downloadApp/Banner";
import {NextSeo} from "next-seo";
import {IMemorandumData} from "@/lib/model/publisher";
import {MemorandumBanner, PublisherBanner} from "@/components/publisher";

interface IHomePage {
  sliderData: ISlider[];
  keyPersonData: IKeyPeople[];
  bookData: IBook[];
  trendingBooks: IBook[];
  eBooks: IBook[];
  NoticeData: INotice[];
  eventData: IEvent[];
  language: string;
  subjectData: IsubList[];
  startIndex: number;
  index: number;
  memorandumsData: IMemorandumData;
}

const Home: FC<IHomePage> = ({
  sliderData,
  keyPersonData,
  bookData,
  trendingBooks,
  eBooks,
  NoticeData,
  eventData,
  subjectData,
  language,
  startIndex,
  index,
  memorandumsData,
}) => {
  console.log("IMemorandumData", memorandumsData);

  return (
    <>
      <NextSeo
        title="Department of Public Libraries"
        description="Department of Public Libraries"
        openGraph={{
          title: "Department of Public Libraries",
          description: "Department of Public Libraries",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library: Notice",
            },
          ],
        }}
      />
      {sliderData && (
        <div className="">
          <AddAnimation>
            <Slider sliderData={sliderData} />
          </AddAnimation>
        </div>
      )}

      {bookData?.length > 0 && (
        <div className="pt-12 pl-content-container">
          <AddAnimation>
            <div className="pt-1">
              <DiscoverBooks bookData={bookData} language={language} />
            </div>
          </AddAnimation>
        </div>
      )}
      <div className="pt-20 pb-12 pl-content-container">
        {subjectData?.length > 0 && (
          <AddAnimation>
            <div className="pt-1">
              <Subject subjectData={subjectData} language={language} />
            </div>
          </AddAnimation>
        )}
      </div>

      {keyPersonData && (
        <AddAnimation>
          <div className="pt-1">
            <KeypersonSection
              keyPersonData={keyPersonData}
              language={language}
            />
          </div>
        </AddAnimation>
      )}
      <div className="py-12 pl-content-container">
        <AddAnimation>
          <div>
            <MembershipBanner />
          </div>
        </AddAnimation>
      </div>

      {trendingBooks?.length > 0 && (
        <div className="pt-12 pl-content-container">
          <AddAnimation>
            <div className="pt-1">
              <TrendingBooks
                trendingBooks={trendingBooks}
                language={language}
              />
            </div>
          </AddAnimation>
        </div>
      )}
      {eBooks?.length > 0 && (
        <div className="pt-12 pl-content-container">
          <AddAnimation>
            <div className="pt-1">
              <EBooks eBooks={eBooks} language={language} />
            </div>
          </AddAnimation>
        </div>
      )}
      {NoticeData?.length > 0 && (
        <div className="pt-12">
          <AddAnimation>
            <div className="pt-1">
              <NoticeBoard language={language} noticeData={NoticeData} />
            </div>
          </AddAnimation>
        </div>
      )}

      <div>
        {memorandumsData?.memorandum_no?.length > 0 ? (
          <div className="bg-bg-memorandum pt-12 pb-20 pl-content-container">
            <div className="section-title-dark">
              {localeString(language, "memorandum")}
            </div>
            <AddAnimation>
              <div className="pt-1">
                <MemorandumBanner
                  backgroundImage="/images/Memorandum.png"
                  url="/../../../publisher/MemorandumNotice"
                  memorandumsData={memorandumsData}
                />
              </div>
            </AddAnimation>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="pt-12 pl-content-container">
        <AddAnimation>
          <div className="pt-1">
            <PublisherBanner />
          </div>
        </AddAnimation>
      </div>

      {eventData && (
        <div className="pt-12 pl-content-container">
          <AddAnimation>
            <div className="pt-1">
              <EventSection language={language} eventData={eventData} />
            </div>
          </AddAnimation>
        </div>
      )}
      <div className="pt-6 pb-16">
        <AddAnimation>
          <div>
            <DownloadBanner />
          </div>
        </AddAnimation>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let currentPage: number = currentPageChecker(context);

  const res = await getData(
    `public_library/key_people`,
    {
      sort_by: "asc",
      count: 8,
    },
    context?.req?.cookies?.["language"] || "bn"
  );
  const res_biblios = await getData(
    `public_library/biblios`,
    {
      sort_by: "asc",
      count: 8,
    },
    context?.req?.cookies?.["language"] || "bn",
    context?.req?.cookies?.["token"] || ""
  );

  const res_trending = await getData(
    `public_library/biblios`,
    {
      collection_type: "trending",
      count: 8,
    },
    context?.req?.cookies?.["language"] || "bn",
    context?.req?.cookies?.["token"] || ""
  );

  const res_eBooks = await getData(
    `public_library/biblios`,
    {
      is_ebook: true,
      count: 8,
    },
    context?.req?.cookies?.["language"] || "bn",
    context?.req?.cookies?.["token"] || ""
  );

  const NoticeRes: any = await getData(
    `public_library/notices`,
    {
      count: 6,
    },
    context?.req?.cookies?.["language"] || "bn"
  );
  const eventRes: any = await getData(
    `/public_library/events`,
    {
      state: "completed",
      count: 6,
    },
    context?.req?.cookies?.["language"] || "bn"
  );

  const res_slider = await getData(`public_library/homepage_sliders`);

  const res_subjects: any = await getData(
    `/public_library/biblio_subjects`,
    {},
    context?.req?.cookies?.["language"] || "bn"
  );
  const res_memorandumsData = await getData(
    `public_library/memorandums/latest`,
    {},
    context?.req?.cookies?.["language"] || "bn"
  );
  if (
    res_biblios?.success ||
    res_trending?.success ||
    res_eBooks?.success ||
    res?.success ||
    NoticeRes?.success ||
    eventRes?.success ||
    res_slider?.success ||
    res_subjects?.success ||
    res_memorandumsData?.success
  ) {
    return {
      props: {
        sliderData: res_slider?.data || null,
        keyPersonData: res?.data || null,
        bookData: res_biblios?.data?.biblio_list || null,
        trendingBooks: res_trending?.data?.biblio_list || null,
        eBooks: res_eBooks?.data?.biblio_list || null,
        eventData: eventRes?.data || null,
        subjectData: res_subjects?.data || null,
        NoticeData: NoticeRes?.data || null,
        memorandumsData: res_memorandumsData?.data || null,
        language: context?.req?.cookies?.["language"] || "bn",
        token: context?.req?.cookies?.["token"] || "",
      },
    };
  } else {
    return {
      props: {
        sliderData: [],
        keyPersonData: [],
        bookData: [],
        memorandumsData: [],
      },
    };
  }
};
