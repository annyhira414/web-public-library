import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AllLibraryCard from "@/components/book/AllLibraryCard";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {CheckAvailability, DataNotFound} from "@/components/common";
import {useForm} from "react-hook-form";
import {GetServerSideProps} from "next";
import {Button, Checkbox, Spin, message} from "antd";
import type {CheckboxChangeEvent} from "antd/es/checkbox";
import {getData, postData} from "@/lib/services";
import {useSession} from "next-auth/react";
import {ToastContainer} from "react-toastify";

// type IAllLibrary

export type IAllLibraryType = {
  name: string;
  code: string;
  district: {
    id: number;
    name?: string;
  };
  thana: {
    id: number;
    name?: string;
  };
};
interface AllLibraryItem {
  allLibrary: any;
  language: string;
}
const AllLibrary: FC<AllLibraryItem> = ({language}) => {
  const router = useRouter();
  const {slug} = router?.query;
  const [messageApi, contextHolder] = message.useMessage();
  const [isOkDisabled, setIsOkDesabled] = useState<boolean>(true);
  const [isDisabled, setIsDesabled] = useState<boolean>(true);
  const {watch, control, handleSubmit} = useForm({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState<string>("congratulations");
  const [allLibraries, setAllLibraries] = useState();
  const [libraryList, setLibraryList] = useState<IAllLibraryType[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [bookMessage, setBookMessage] = useState<string>("");
  const [isNormal, setIsnormal] = useState<boolean>(true);
  const toggleFilterModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    AllLibraryCheck();
  }, []);

  const AllLibraryCheck = async () => {
    const library = await getData(
      `public_library/biblios/${slug}/all_library_availability`,
      {},
      language
    );
    if (library?.success) {
      setLibraryList(library?.data);
    }
    setIsLoading(false);
  };

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsOkDesabled(false);
    } else {
      setIsOkDesabled(true);
    }
  };

  const handleRequest = () => {
    setModalStatus("request");
    toggleFilterModal();
  };
  const library = watch("libraryName");

  useEffect(() => {
    !library ? setIsDesabled(true) : setIsDesabled(false);
  }, [library]);

  const {data: session, status} = useSession();

  const onSubmit = async (data: any) => {
    setBookMessage("sendBookMessage");
    const library = await postData(
      `public_library/book_transfer_orders`,
      {
        biblio_id: slug,
        library_id: parseInt(data?.libraryName),
      },
      language,
      Cookies.get("token")
    );

    console.log("library", library);

    if (library?.success) {
      setBookMessage("bookSendMessage");
      setIsnormal(true);
      setModalStatus("congratulations");
      success();
    } else {
      errorMsg(library?.data?.error);

      if (library?.status?.status === 401) {
        window.location.href = "/auth/login";
      }
      toggleFilterModal();
    }
  };

  const [data, setData] = useState();

  const showLibraryDetails = async (libraryCode: string) => {
    setBookMessage("congratulationMessage");
    const library = await getData(
      `public_library/biblios/${slug}/library_wise_availability`,
      {library_code: libraryCode},
      language
    );
    if (library?.success) {
      setData(library?.data);
      setIsnormal(false);
      setModalStatus("congratulations");
    } else {
      setModalStatus("sorry");
    }

    setModalStatus("congratulations");
    toggleFilterModal();
  };

  useEffect(() => {
    allLibraryFuc();
  }, []);

  const allLibraryFuc = async () => {
    const libraries = await getData(
      "/public_library/libraries/dropdown",
      {},
      language
    );
    if (libraries?.success) {
      setAllLibraries(
        libraries?.data?.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        }))
      );
    }
  };

  return isloading ? (
    <div className="h-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  ) : (
    <div className="pl-content-container mb-16">
      {libraryList?.length > 0 ? (
        <>
          <div>
            <div className="my-10 ">
              <h1 className="section-title">
                {localeString(language, "libraryList")}
              </h1>
              <h3 className="mt-2"> {localeString(language, "bookFound")}</h3>
            </div>
            <div className="flex flex-col gap-2 scroll-auto mb-10 all-library-max-height">
              {libraryList?.map((library: IAllLibraryType) => (
                <div
                  key={library?.name}
                  onClick={() => {
                    showLibraryDetails(library?.code);
                  }}
                >
                  <AllLibraryCard allLibrary={library} />
                </div>
              ))}
            </div>
          </div>

          <>
            <div className="w-full md:w-1/2 bg-white p-6 mx-auto">
              <h1>
                Did not find your preferred library above? Don worry! Would you
                like to read from another library?
              </h1>
              <div className="my-8">
                <Checkbox onChange={onChange}>Yes, I want</Checkbox>
              </div>
              <div className="flex justify-end">
                <Button disabled={isOkDisabled} onClick={handleRequest}>
                  {localeString(language, "ok")}
                </Button>
              </div>
            </div>
          </>
        </>
      ) : (
        <div className="my-10">
          <DataNotFound title="No Library Found" />
        </div>
      )}

      {
        <>
          {contextHolder}
          <ToastContainer autoClose={2000} />

          <CheckAvailability
            isModalVisible={isModalVisible}
            toggleModal={toggleFilterModal}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            status={modalStatus}
            isDisabled={isDisabled}
            allLibrary={allLibraries}
            data={data}
            congratulationMessage={bookMessage}
            isNormal={isNormal}
            buttonText="browse"
          />
        </>
      }
    </div>
  );
};
export default AllLibrary;
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      language: context?.req?.cookies?.["language"] || "bn",
    },
  };
};
