/** @format */

import React, { FC, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { Input, Select } from "@/components/controls";
import { useForm } from "react-hook-form";
import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { getData, getPaginatedData } from "@/lib/services";
import { currentPageChecker, scrollToTop } from "@/lib/helpers/utils";
import { IBook, ISubject, IAuthor, IOption } from "@/lib/model/books";
import { Ioption, option } from "@/lib/model";
import { useRouter } from "next/router";

interface search {
  hide?: () => void;
}

const AdvanceSearch: FC<search> = ({ hide }) => {
  const language = Cookies.get("language");
  const [subjectData, setSubjectData] = useState<option[]>([]);
  const [authorData, setAuthorData] = useState<option[]>([]);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      title: "",
      author: "",
      subjects: [],
      isbn: "",
      publication: "",
      edition: "",
      volume: "",
    },
    mode: "all",
    // resolver: yupResolver(signUpSchema),
  });
  useEffect(() => {
    getSubject();
    getAuthor();
    // getSearchData()
  }, []);

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

  const onSubmit = async (data: any) => {
    router.push({
      pathname: "/searchResults",
      query: {
        biblio_title: data.title,
        authors: data.author,
        biblio_subjects: data.subject,
        isbn: data.isbn,
        publication: data.publication,
        edition: data.edition,
        volume: data.volume,
      },
    });
  };

  const author = watch("author");
  useEffect(() => {}, [author]);
  return (
    <div className="">
      <h1 className="font-bold text-center pt-3 pb-3 border-b text-sm text-library-primary">
        {localeString(language, "searchTitle")}
      </h1>
      <form className="pr-2 " onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          control={control}
          errors={errors}
          placeholder={localeString(language, "searchBookTitle")}
          className="h-10 mb-2 mt-6"
        />
        <Select
          className="mb-1"
          control={control}
          name="author"
          multiple={true}
          options={authorData}
          placeholder={localeString(language, "searchAuthor")}
        />
        <Select
          className="mb-1"
          control={control}
          name="subject"
          multiple={false}
          options={subjectData}
          placeholder={localeString(language, "searchSubject")}
        />
        <Input
          name="isbn"
          control={control}
          errors={errors}
          placeholder={localeString(language, "searchISBN")}
          className="h-10 mb-2"
        />
        <Input
          name="publication"
          control={control}
          errors={errors}
          placeholder={localeString(language, "searchPublication")}
          className="h-10 mb-2"
        />
        <Input
          name="edition"
          control={control}
          errors={errors}
          placeholder={localeString(language, "searchEdition")}
          className="h-10 mb-2"
        />
        <Input
          name="volume"
          control={control}
          errors={errors}
          placeholder={localeString(language, "searchVolume")}
          className="h-10 mb-2"
        />
        <div className="mt-6 mb-4 flex justify-end">
          <Button
            onClick={() => hide && hide()}
            className="px-10 mr-1 uppercase border border-library-primary bg-library-white h-12 text-library-primary font-bold hover:text-white"
          >
            {localeString(language, "searchCancel")}
          </Button>
          <Button
            className="px-10 uppercase bg-library-primary font-bold h-12 text-white hover:text-white"
            htmlType="submit"
          >
            {localeString(language, "searchButton")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvanceSearch;
