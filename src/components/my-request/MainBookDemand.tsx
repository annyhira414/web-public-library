import React, { FC, useEffect, useState } from "react";
import { filterFalsyValues, localeString } from "@/lib/helpers/utils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/controls";
import { Button, message } from "antd";
import ImageUploader from "@/components/controls/button-controls/ImageUploader";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getData, postData } from "@/lib/services";
import { Select } from "@/components/controls";
import { Ioption, ISubject_id, IAuthor_id } from "@/lib/model/myRequest";
import { objectToFormData } from "@/lib/helpers/utils";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface IMainBookDemandProps {}

export const MainBookDemand: FC<IMainBookDemandProps> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  let router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      bookTitle: "",
      author: router?.query?.author ? router?.query?.author : [],
      subject: router?.query?.subject ? router?.query?.subject : [],
      isbn: "",
      publication: "",
      edition: "",
      volume: "",
    },
    mode: "all",
    //resolver: yupResolver(setRequiredFields),
  });
  const [messageApi, contextHolder] = message.useMessage();

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const countPropertiesWithNoValue = (obj: any) => {
    let noValueCount = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          noValueCount++;
        }
      }
    }
    return noValueCount;
  };

  const [subjectIdData, setSubjectIdData] = useState<Ioption[]>([]);
  const [authorIdData, setAuthorIdData] = useState<Ioption[]>([]);

  const backToBookList = async (data: any) => {
    console.log("befor ", data);

    const bookSearchList = {
      biblio_title: data?.bookTitle,
      authors_name: data?.author,
      biblio_subjects_name: data?.subject || "",
      isbn: data?.isbn,
      publication: data?.publication,
      edition: data?.edition,
      volume: data?.volume,
    };
    const count = countPropertiesWithNoValue(bookSearchList);

    const bookListRes = await getData(
      `public_library/biblios/advance_search`,
      filterFalsyValues({ ...bookSearchList }),
      language,
      Cookies.get("token")
    );
    console.log("bookListRes", bookListRes);
    console.log("bookSearchList", bookSearchList);

    if (bookSearchList?.isbn === "" && count > 5) {
      errorMsg("Please fill up at least two fields");
    } else {
      if (bookListRes?.data?.length > 0) {
        router.push({
          pathname: "my-request/book-list",
          query: {
            bookTitle,
            author,
            subject,
            isbn,
            publication,
            edition,
            volume,
          },
        });
      } else {
        const requested_bibliosParam = {
          biblio_title: data?.bookTitle,
          authors_name: data?.author,
          biblio_subjects_name: data?.subject || "",
          isbn: data?.isbn,
          publication: data?.publication,
          edition: data?.edition,
          volume: data?.volume,
          image_file: data?.image_file?.file,
        };
        const res = await postData(
          `public_library/requested_biblios`,
          objectToFormData(requested_bibliosParam || null),
          language,
          Cookies.get("token")
        );
        if (res?.success) {
          successMsg(localeString(language, "waitForAdmin"));

          successMsg(localeString(language, "requestSuccessfull"));
          // router.push("my-request/success-massage/book-demand");
          console.log("res", res);
        } else {
          errorMsg(res?.data?.errors);
        }
      }
    }
  };

  useEffect(() => {
    subjectFunction();
    authorFunction();
  }, []);

  const authorFunction = async () => {
    const biblioAuthorDropdown = await getData(`/public_library/biblio_authors/dropdown`);
    if (biblioAuthorDropdown?.success) {
      setAuthorIdData(
        biblioAuthorDropdown?.data?.map((item: IAuthor_id) => ({
          // value: item?.id?.toString(),
          value: item?.full_name,
          label: item?.full_name,
        }))
      );
    }
  };

  const subjectFunction = async () => {
    const biblioSubjectDropdown = await getData(`/public_library/biblio_subjects/dropdown`);
    if (biblioSubjectDropdown?.success) {
      setSubjectIdData(
        biblioSubjectDropdown?.data?.map((item: ISubject_id) => ({
          // value: item?.id?.toString(),
          value: item?.title?.toString(),
          label: item?.title?.toString(),
        }))
      );
    }
  };

  const bookTitle = watch("bookTitle");
  const author = watch("author");
  const subject = watch("subject");
  const isbn = watch("isbn");
  const publication = watch("publication");
  const edition = watch("edition");
  const volume = watch("volume");

  const handlePageChange = () => {
    router.push({
      pathname: "/my_request/book-list",
      query: {
        bookTitle,
        author,
        subject,
        isbn,
        publication,
        edition,
        volume,
      },
    });
  };

  return (
    <>
      {contextHolder}
      <ToastContainer autoClose={2000} />

      <div className="pt-10">
        <form onSubmit={handleSubmit(backToBookList)} className="custom-placeholder">
          <div className="">
            <div className="px-8 bg-white rounded-lg">
              <div className="w-full mainBookDemand">
                <div className="">
                  <h4 className=" sub-section-title pt-4 pb-2">{localeString(language, "bookDemands")}</h4>
                  <p className="sub-text py-2 ">{localeString(language, "myRequestSubTitle")}</p>
                </div>
                <div className="pt-3">
                  <Input
                    name="bookTitle"
                    control={control}
                    errors={errors}
                    placeholder={localeString(language, "bookName")}
                    className="mb-2 rounded-md"
                  />
                  <div className="pt-1 select-border-radius">
                    <Select
                      name="author"
                      className="h-full w-full mb-1   "
                      control={control}
                      multiple={true}
                      options={authorIdData}
                      placeholder={localeString(language, "author")}
                    />
                  </div>
                  <div className="pt-2 select-border-radius">
                    <Select
                      name="subject"
                      className="h-full w-full mb-1   "
                      control={control}
                      multiple={true}
                      options={subjectIdData}
                      placeholder={localeString(language, "subject")}
                    />
                  </div>

                  <div className="pt-2">
                    <Input
                      name="isbn"
                      control={control}
                      errors={errors}
                      placeholder={localeString(language, "isbn")}
                      className="mb-2 rounded-md"
                    />
                  </div>

                  <div className="pt-2">
                    <Input
                      name="publication"
                      control={control}
                      errors={errors}
                      placeholder={localeString(language, "publication")}
                      className="mb-2 rounded-md "
                    />
                  </div>

                  <div className="pt-2">
                    <Input
                      name="edition"
                      control={control}
                      errors={errors}
                      placeholder={localeString(language, "edition")}
                      className="mb-2 rounded-md"
                    />
                  </div>

                  <div className="pb-4 pt-2">
                    <Input
                      name="volume"
                      control={control}
                      errors={errors}
                      placeholder={localeString(language, "volume")}
                      className="mb-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <ImageUploader
                required={false}
                placeholder={localeString(language, "uploadBookCoverPhoto")}
                isButtonFullScreen
                control={control}
                name="image_file"
              />

              <div className="pt-6 w-full md:flex md:justify-end">
                <div className="lg:w-72 borrowBookButton">
                  <Button
                    htmlType="submit"
                    className="mt-2 button-secondary h-11"
                    loading={isSubmitting}
                    onChange={handlePageChange}
                    block
                  >
                    {localeString(language, "sendRequest")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
