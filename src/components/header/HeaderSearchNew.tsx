import { localeString } from "@/lib/helpers/utils";
import { Select } from "@/components/controls";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { IoOptions } from "react-icons/io5";
import React, { FC, useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "antd";
import { Input } from "@/components/controls";
import { getData } from "@/lib/services";
import { IOption } from "@/lib/model/books";
import { option } from "@/lib/model";
import { useRouter } from "next/router";
import { RxCross1 } from "react-icons/rx";
import { SearchWithAutoFill } from "../common";

import {
  ISuggestions,
  ISuggestionsArray,
} from "@/lib/model/physical-book-review";
import { CgArrowLongLeft } from "react-icons/cg";

interface SearchProps {
  isExpandSearch: boolean;
  setIsExpandSearch: (value: boolean) => void;
  setIsShowSearch: (value: boolean) => void;
  hide?: () => void;
}

const HeaderSearchNew: FC<SearchProps> = ({
  isExpandSearch,
  setIsExpandSearch,
  setIsShowSearch,
  hide,
}) => {
  const language = Cookies.get("language");
  const router = useRouter();
  const ref = useRef(null);
  const advanceSearchRef: any = useRef(null);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [subjectData, setSubjectData] = useState<option[]>([]);
  const [authorData, setAuthorData] = useState<option[]>([]);
  const [suggestions, setSuggestions] = useState<ISuggestionsArray[]>();
  const [searchValue, setSearchValue] = useState("sfafasd");

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      dropdown: "biblio",
      authors: [],
      subjects: [],
      isbn: "",
      publication: "",
      edition: "",
      volume: "",
    },
    mode: "all",
  });
  const watchDropdown = watch("dropdown");
  const search = watch("search", "");
  const Title = watch("title");
  const Authors = watch("authors");
  const Subjects = watch("subjects");
  const Isbn = watch("isbn");
  const Publication = watch("publication");
  const Edition = watch("edition");
  const Volume = watch("volume");

  const [buttonDisable, setButtonDisable] = useState<any>(false);

  useEffect(() => {
    if (
      !Title &&
      !Authors?.length &&
      !Subjects?.length &&
      !Isbn &&
      !Publication &&
      !Edition &&
      !Volume
    ) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [Title, Authors, Subjects, Isbn, Publication, Edition, Volume]);

  useEffect(() => {
    getSubject();
    getAuthor();
  }, [search]);

  useEffect(() => {
    setSearchValue("");
    setSuggestions([]);
  }, [watchDropdown]);

  const getSuggetion = async (value: string) => {
    setSearchValue(value);
    const res = await getData(
      `public_library/search/suggestion`,
      {
        filter_with: watchDropdown,
        query: value,
      },
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      if (watchDropdown == "newspaper") {
        setSuggestions(
          res?.data?.filter_results?.map((item: ISuggestions) => ({
            id: item?.id,
            value: `${item?.name}`,
            label: item?.name,
          }))
        );
      } else {
        setSuggestions(
          res?.data?.filter_results?.map((item: ISuggestions) => ({
            id: item?.id,
            value: item?.id,
            label: item?.title,
          }))
        );
      }
    }
  };
  const getSubject = async () => {
    const res = await getData(
      `/public_library/biblio_subjects`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      const options = res?.data?.map((item: IOption) => {
        return {
          value: item?.id.toString(),
          label: item?.title,
        };
      });
      setSubjectData(options);
    }
  };
  const getAuthor = async () => {
    const response = await getData(
      `public_library/biblio_authors/dropdown`,
      {},
      language,
      Cookies.get("token")
    );
    if (response?.success) {
      const options = response?.data?.map((item: IOption) => {
        return {
          value: item?.id.toString(),
          label: item?.full_name,
        };
      });
      setAuthorData(options);
    }
  };
  const options = [
    {
      value: "Book Title",
      label: <>{localeString(language, "searchBookTitle")}</>,
    },
    {
      value: "Author",
      label: <>{localeString(language, "searchAuthor")}</>,
    },
    {
      value: "subject",
      label: <>{localeString(language, "searchSubject")}</>,
    },
    {
      value: "publication",
      label: <>{localeString(language, "searchPublication")}</>,
    },
    {
      value: "ISBN",
      label: <>{localeString(language, "searchISBN")}</>,
    },
  ];
  const onSubmit = async (data: any) => {
    router.push({
      pathname: "/searchResults",
      query: {
        title: data.title || null,
        authors: data.authors,
        biblio_subjects: data.subjects,
        isbn: data.isbn || null,
        publication: data.publication,
        edition: data.edition,
        volume: data.volume,
      },
    });
    setShowAdvanceSearch(false);
  };
  const handleClickInside = () => {
    setShowAdvanceSearch(!showAdvanceSearch);
  };
  const handleCancel = () => {
    setShowAdvanceSearch(false);
    setValue("title", "");
    setValue("authors", []);
    setValue("subjects", []);
    setValue("isbn", "");
    setValue("publication", "");
    setValue("edition", "");
    setValue("volume", "");
    if (router.pathname == "/searchResults") {
      router.push({
        query: {
          biblio_title: "",
          authors: [],
          biblio_subjects: [],
          isbn: "",
          publication: "",
          edition: "",
          volume: "",
        },
      });
    }
  };
  const closeExpandSearch = () => {
    setIsExpandSearch(false);
    setIsShowSearch(true);
  };
  const onSelect = (value: string, option: any) => {
    setSearchValue(option?.label);
    if (watchDropdown == "biblio") {
      router.push(`/books/${option?.id}`);
    }
    if (watchDropdown == "event") {
      router.push(`/activities/events/${option?.id}`);
    }
    if (watchDropdown == "notice") {
      router.push(`/activities/notice/${option?.id}`);
    }
    if (watchDropdown == "album") {
      router.push(`/gallery/photo-gallery/${option?.id}`);
    }
    if (watchDropdown == "newspaper") {
      router.push(`/activities/newspaper-list/${option?.id}`);
    }
  };

  // const handleKeyPress = (event: any) => {
  //   if (event.key === "Enter") {
  //     // Call your function here
  //     onEnterPress();
  //   }
  // };

  const onEnterPress = async () => {
    setSuggestions([]);
    router.push(
      `/global-search?filter_with=${watchDropdown}&&query=${searchValue}`
    );
  };
  return (
    <div className="relative">
      <Row>
        <Col
          xs={2}
          sm={2}
          md={0}
          lg={0}
          xl={0}
          xxl={0}
          className={`${isExpandSearch ? "flex  items-center" : ""}`}
        >
          {isExpandSearch && (
            <CgArrowLongLeft
              className="text-white cursor-pointer"
              size={24}
              onClick={closeExpandSearch}
            />
          )}
        </Col>
        <Col xs={10} sm={6} md={9} lg={7} xl={6} xxl={5}>
          <div className="advanced-search-select bg-white rounded-s">
            <Select
              name="dropdown"
              showSearch={false}
              allowClear={false}
              control={control}
              options={option}
            />
          </div>
        </Col>

        <Col
          sm={watchDropdown == "biblio" ? 14 : 17}
          xs={watchDropdown == "biblio" ? 10 : 13}
          md={watchDropdown == "biblio" ? 13 : 15}
          lg={watchDropdown == "biblio" ? 15 : 17}
          xl={watchDropdown == "biblio" ? 16 : 18}
          xxl={watchDropdown == "biblio" ? 17 : 19}
          className={
            watchDropdown == "biblio"
              ? "global-search-field2"
              : "global-search-field"
          }
        >
          <form
            className="global-search-Hover"
            onSubmit={handleSubmit(onEnterPress)}
          >
            <SearchWithAutoFill
              allowClear={true}
              name="search"
              value={searchValue}
              placeholder="Search"
              control={control}
              suggestions={suggestions}
              onSelect={onSelect}
              handleSearch={getSuggetion}
              onEnterPress={onEnterPress}
            />
          </form>
        </Col>

        <Col sm={2} xs={2} md={2} lg={2} xl={2} xxl={2}>
          <div>
            {watchDropdown == "biblio" && (
              <div>
                <div
                  className="bg-library-white advanceSearch h-12  py-3 flex justify-end rounded-e cursor-pointer "
                  ref={ref}
                  onClick={handleClickInside}
                >
                  {showAdvanceSearch ? (
                    <RxCross1 className="w-7 h-5 text-library-primary" />
                  ) : (
                    <IoOptions className="w-7 h-5 text-library-primary" />
                  )}
                </div>
              </div>
            )}
          </div>
        </Col>
        {showAdvanceSearch && watchDropdown == "biblio" && (
          <div
            className="absolute z-50 top-12 bg-library-white shadow-2xl rounded-md w-full"
            ref={advanceSearchRef}
          >
            <div>
              <h1 className="font-bold text-center py-4 border-b text-sm text-library-primary">
                {localeString(language, "searchTitle")}
              </h1>
              <form className="px-8" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  allowClear
                  name="title"
                  control={control}
                  errors={errors}
                  placeholder={localeString(language, "searchBookTitle")}
                  className="h-10 mb-2 mt-6"
                />
                <Select
                  className="mb-1"
                  control={control}
                  name="authors"
                  multiple={true}
                  options={authorData}
                  placeholder={localeString(language, "searchAuthor")}
                />
                <Select
                  className="mb-1"
                  control={control}
                  name="subjects"
                  multiple={true}
                  options={subjectData}
                  placeholder={localeString(language, "searchSubject")}
                />
                <Input
                  allowClear
                  name="isbn"
                  control={control}
                  errors={errors}
                  placeholder={localeString(language, "searchISBN")}
                  className="h-10 mb-2"
                />
                <Input
                  allowClear
                  name="publication"
                  control={control}
                  errors={errors}
                  placeholder={localeString(language, "searchPublication")}
                  className="h-10 mb-2"
                />
                <Input
                  allowClear
                  name="edition"
                  control={control}
                  errors={errors}
                  placeholder={localeString(language, "searchEdition")}
                  className="h-10 mb-2"
                />
                <Input
                  allowClear
                  name="volume"
                  control={control}
                  errors={errors}
                  placeholder={localeString(language, "searchVolume")}
                  className="h-10 mb-2"
                />
                <div className="mt-6 mb-4 flex justify-end">
                  <div className="bookButton">
                    <Button
                      disabled={buttonDisable}
                      onClick={() => {
                        handleCancel();
                      }}
                      className="px-10 button-primary mr-1 h-12"
                    >
                      {localeString(language, "searchCancel")}
                    </Button>
                  </div>
                  <div className="borrowBookButton">
                    <Button
                      disabled={buttonDisable}
                      className="px-10 button-secondary h-12"
                      htmlType="submit"
                    >
                      {localeString(language, "searchButton")}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
};

export default HeaderSearchNew;

const option: any = [
  {
    value: "biblio",
    label: "Book Search",
    // label: <>{localeString(language, "Book Title")}</>,
  },
  {
    value: "event",
    label: "Event",
    // label: <>{localeString(language, "war")}</>
  },
  {
    value: "notice",
    label: "Notice",
    // label: <>{localeString(language, "art")}</>
  },
  {
    value: "album",
    label: "Gallery",
    // label: <>{localeString(language, "art")}</>
  },
  {
    value: "newspaper",
    label: "Newspaper",
    // label: <>{localeString(language, "art")}</>
  },
];
