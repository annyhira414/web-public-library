import React, { FC, useEffect, useState } from "react";
import {
  commaRemover,
  currencyFormatter,
  filterFalsyValues,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { Button, Checkbox, Col, Modal, Row, message } from "antd";
import Image from "next/image";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { getData, postData } from "@/lib/services";
import moment from "moment";
import { isEmpty } from "lodash";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";
import {
  AddAddress,
  DataNotFound,
  RecipientForm,
  SavedAddress,
} from "@/components/common";

import { useForm } from "react-hook-form";
import { CiViewList } from "react-icons/ci";
import { BsPlusCircleFill } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";

interface ICurrentBooks {}

export const CurrentBooks: FC<ICurrentBooks> = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<any>({
    defaultValues: {
      selectAddress: NaN,
      addNewAddress: false,
      name: "",
      phone: "",
      thanas: null,
      districts: null,
      divisions: null,
      addressLine: "",
      isSaveAddress: false,
      addressTitle: "",
    },
  });
  const width = useMediaQuery("(min-width: 768px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooksList, setCurrentBooksList] = useState<any>();
  const [saveAdd, setSaveAdd] = useState<any>([]);
  const [addressLimit, setAddressLimit] = useState(2);
  const [addresstype, setAddresstype] = useState<any>([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [divisions, setDiviosins] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [thanas, setThanas] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const currentBooks = async () => {
    let params = { status_key: "borrowed" };
    const res = await getData(
      `public_library/circulations`,
      params,
      language,
      userToken
    );

    if (res?.success) {
      setCurrentBooksList(res?.data);
    } else {
    }
  };
  useEffect(() => {
    currentBooks();
  }, []);
  useEffect(() => {
    Savedaddresses();
  }, [addressLimit]);

  const Savedaddresses = async () => {
    const res = await getData(
      `public_library/saved_addresses`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setSaveAdd(
        res?.data?.slice(0, addressLimit).map((item: any, index: number) => ({
          value: index,
          label: (
            <>
              {item?.name} <hr className="w-full mt-2" />
              <div className="pt-2">
                <span>{localeString(language, "address")}:</span>

                <span className="pl-1">
                  {item?.division?.name}
                  {" ,"}
                  {item?.district?.name}
                  {" ,"}
                  {item?.thana?.name}
                </span>
              </div>
            </>
          ),
        }))
      );
      setAddresstype(res?.data);
    }
  };
  const now: any = new Date();
  const calculateDays = (returnDate: any) => {
    const now: any = new Date();
    const days =
      Math.floor(((new Date(returnDate) as any) - now) / 1000 / 60 / 60 / 24) +
      1;
    return days;
  };

  const onChange = (e: CheckboxChangeEvent, id: number) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      const newIds = selectedIds.filter((fid: number) => fid !== id);
      setSelectedIds(newIds);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSelfAddress = () => {
    const name = Cookies.get("fullName") || "";
    const phone = Cookies.get("phone") || "";
    setValue("phone", phone);
    setValue("name", name);
  };
  const handleAddAddress = () => {
    setShowAddAddress(!showAddAddress);
    setValue("selectAddress", null);
    setValue("divisions", null);
    setValue("districts", null);
    setValue("thanas", null);
  };

  useEffect(() => {
    librarydivisions();
  }, []);

  const librarydivisions = async () => {
    const res = await getData(
      `public_library/divisions`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setDiviosins(
        res?.data?.map((division: any) => {
          return { label: division?.name, value: division?.id };
        })
      );
    }
  };
  const divisionId = watch("divisions");

  useEffect(() => {
    setValue("districts", null);
    setValue("thanas", null);
    divisionId && libraryDistricts(divisionId);
  }, [divisionId]);

  const libraryDistricts = async (divisionId: any) => {
    const res = await getData(
      `public_library/districts`,
      { division_id: divisionId?.toString() },
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setDistricts(
        res?.data?.map((district: any) => {
          return { label: district?.name, value: district?.id };
        })
      );
    }
  };
  const districtId = watch("districts");

  useEffect(() => {
    setValue("thanas", null);
    districtId && librarythanas(districtId);
  }, [districtId]);

  const librarythanas = async (districtId: any) => {
    const res = await getData(
      `public_library/thanas`,
      { district_id: districtId?.toString() },
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setThanas(
        res?.data?.map((thanas: any) => {
          return { label: thanas?.name, value: thanas?.id };
        })
      );
    }
  };
  const selectAddress = watch("selectAddress");
  let circulationId: number[] = selectedIds;

  const onSubmit = async (data: any) => {
    console.log("Address =>", showAddAddress);

    let postPickupAddress = {
      circulation_ids: circulationId,
      address_type: showAddAddress
        ? "others"
        : addresstype?.[data?.selectAddress]?.address_type,
      recipient_name: data?.name,
      recipient_phone: data?.phone,

      division_id: !showAddAddress
        ? addresstype[selectAddress]?.division?.id
        : data?.divisions,
      district_id: !showAddAddress
        ? addresstype[selectAddress]?.district?.id
        : data?.districts,
      thana_id: !showAddAddress
        ? addresstype[selectAddress]?.thana?.id
        : data?.thanas,
      address_name: showAddAddress ? data?.addressTitle || null : null,
      save_address: showAddAddress ? data?.isSaveAddress || null : null,
      address: showAddAddress
        ? data?.addressLine || null
        : addresstype[selectAddress]?.address,
    };
    const params = filterFalsyValues(postPickupAddress);
    const res = await postData(
      `public_library/return_orders`,
      params,
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      setIsModalOpen(false);
    } else {
      messageApi.open({
        type: "error",
        content: res?.data?.error,
      });
      setIsModalOpen(false);
    }
  };
  return (
    <div>
      {contextHolder}
      <div className="current-books-header flex justify-between">
        <div className="order-card-title mb-6">
          <h4 className="text-gray-700 font-bold font-playfairDisplay text-xl">
            {localeString(language, "currentBooks")}
          </h4>
        </div>
        <div className="return-from-home-button">
          <Button disabled={!selectedIds?.length} onClick={showModal}>
            {localeString(language, "returnFromHome")}
          </Button>
        </div>
      </div>
      {currentBooksList?.length > 0 ? (
        currentBooksList?.map((currentBook: any) => {
          return (
            <div key={currentBook?.id}>
              <div className="relative current-card-body bg-white p-6 ml-4 rounded">
                <div className="checkbox absolute left-1 top-52 md:top-80 ml-4">
                  <Checkbox onChange={(e) => onChange(e, currentBook?.id)} />
                </div>
                <div className="flex mt-4 border-b ml-8">
                  <div className="order-book-image mb-3">
                    {!isEmpty(currentBook?.item_info?.image_url) && (
                      <Image
                        src={
                          width
                            ? currentBook?.item_info?.image_url?.desktop_image
                              ? currentBook?.item_info?.image_url?.desktop_image
                              : "/no-image.png"
                            : currentBook?.item_info?.image_url?.tab_image
                            ? currentBook?.item_info?.image_url?.tab_image
                            : "/no-image.png"
                        }
                        alt="gallery-img"
                        width={180}
                        height={150}
                        className="rounded"
                      />
                    )}
                  </div>
                  <div className="order-book-title ml-2">
                    <h5 className="text-gray-700 text-base">
                      {currentBook?.item_info?.title}
                    </h5>
                  </div>
                </div>

                <div className="current-date flex justify-between border-b py-4 ml-8">
                  <div className="issue-date">
                    <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                      <span className="font-semibold">
                        {localeString(language, "issueDate")} :
                      </span>
                      <span> </span>
                      <span>
                        {currencyFormatter(
                          language,
                          parseInt(moment(currentBook?.issue_date)?.format("D"))
                        )}{" "}
                        {localeString(
                          language,
                          `${moment(currentBook?.issue_date).format("MMMM")}`
                        )}{" "}
                        {commaRemover(
                          currencyFormatter(
                            language,
                            parseInt(
                              moment(currentBook?.issue_date)?.format(`YYYY`)
                            )
                          )
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="return-date">
                    <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                      <span className="font-semibold">
                        {localeString(language, "returnDate")} :
                      </span>
                      <span> </span>
                      <span>
                        {currencyFormatter(
                          language,
                          parseInt(
                            moment(currentBook?.return_date)?.format("D")
                          )
                        )}{" "}
                        {localeString(
                          language,
                          `${moment(currentBook?.return_date).format("MMMM")}`
                        )}{" "}
                        {commaRemover(
                          currencyFormatter(
                            language,
                            parseInt(
                              moment(currentBook?.return_date)?.format(`YYYY`)
                            )
                          )
                        )}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="current-body-footer flex justify-between mt-3 ">
                  <div className="current-return-status py-3 mt-3">
                    {now > moment(currentBook?.return_date) ? (
                      <p className="uppercase px-1 md:px-3 lg:px-5 text-xs lg:text-lg rounded bg-[#FFEBEB] text-[#FD0C0F] ml-8">
                        {localeString(language, "returnDateOver")}
                      </p>
                    ) : (
                      <p className="uppercase text-xs lg:text-lg  md:px-3 lg:px-5 px-1 rounded bg-[#E1EDFF] text-[#024F9C] ml-8">
                        {calculateDays(currentBook?.return_date)} <span> </span>
                        {localeString(language, "daysToReturn")}
                      </p>
                    )}
                  </div>
                  <div className="current-view-details  py-3">
                    <Link
                      href={`/user/my-orders/current-books/${currentBook?.id}`}
                    >
                      <Button className="h-10 rounded bg-[#E6F0ED] text-library-primary px-2 md:px-16 lg:px-32 border border-library-primary">
                        {localeString(language, "viewDetails")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <DataNotFound title={localeString(language,"noCurrentBook")}/>
      )}

      <div className="return-details-address-modal">
        <Modal
          footer={null}
          maskClosable={false}
          open={isModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <div className="return-card-body bg-white rounded">
            {contextHolder}
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="bg-library-white mt-8 mb-8 rounded">
                  <Col className=" pb-6 ">
                    <div>
                      <div className="flex justify-between ">
                        <div>
                          {!showAddAddress && (
                            <h1 className="section-title text-xl mb-5 pt-5">
                              {localeString(language, "borrowAddress")}{" "}
                              <span className="text-red-600">*</span>
                            </h1>
                          )}
                        </div>
                        {showAddAddress ? (
                          <Button
                            onClick={handleAddAddress}
                            className="text-sm flex gap-1 p-0 mt-6 text-library-primary border-0 shadow-none"
                          >
                            <CiViewList className="w-5 h-5" />
                            {localeString(language, "showSavedAddresses")}
                          </Button>
                        ) : (
                          <Button
                            onClick={handleAddAddress}
                            className="text-sm flex gap-1 p-0 mt-6 text-library-primary border-0 shadow-none"
                          >
                            <BsPlusCircleFill className="w-5 h-5" />
                            {localeString(language, "addAddress")}
                          </Button>
                        )}
                      </div>
                      {!showAddAddress ? (
                        <SavedAddress
                          control={control}
                          errors={errors}
                          language={language}
                          saveAdd={saveAdd}
                          setAddressLimit={setAddressLimit}
                          addresstype={addresstype}
                        />
                      ) : (
                        ""
                      )}
                      <div className="bg-library-light-white mt-5 p-5 rounded">
                        <div className="flex justify-between">
                          <div className="section-title text-base lg:text-xl mb-5">
                            {localeString(language, "dispatcherDetails")}{" "}
                            <span className="text-red-600">*</span>
                          </div>

                          <div className="mt-1">
                            <Button
                              type="text"
                              block
                              className=" flex justify-start "
                              onClick={() => {
                                handleSelfAddress();
                              }}
                            >
                              {localeString(language, "borrowCheckSelf")}
                            </Button>
                          </div>
                        </div>
                        <RecipientForm
                          control={control}
                          errors={errors}
                          language={language}
                        />
                        <AddAddress
                          control={control}
                          errors={errors}
                          language={language}
                          showAddAddress={showAddAddress}
                          divisions={divisions}
                          districts={districts}
                          thanas={thanas}
                          watch={watch}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <>
                  <div className="bg-library-sky rounded mt-8 h-52">
                    <h1 className="section-title text-xl ml-5 lg:ml-10 pt-5">
                      {localeString(language, "borrowPayment")}
                    </h1>
                    <Row className="lg:ml-12 ml-5 space-y-4 mt-4 p-1">
                      <Col
                        className="flex justify-between"
                        xs={{ span: 23 }}
                        lg={{ span: 22 }}
                      >
                        <h3>{localeString(language, "borrowDeliveryfee")}</h3>
                        <span className="flex">
                          <TbCurrencyTaka className="w-5 h-5" />
                          {currencyFormatter(language, 60)}
                        </span>
                      </Col>
                      <Col
                        xs={{ span: 23 }}
                        lg={{ span: 22 }}
                        className="border-b-2 flex justify-between pb-2 border-library-primary"
                      >
                        <h3 className="uppercase">
                          {localeString(language, "borrowVat")}
                        </h3>
                        <span className="flex">
                          <TbCurrencyTaka className="w-5 h-5" />{" "}
                          {currencyFormatter(language, 9)}
                        </span>
                      </Col>
                      <Col
                        className="uppercase font-bold flex justify-between text-library-primary"
                        xs={{ span: 23 }}
                        lg={{ span: 22 }}
                      >
                        <h3>{localeString(language, "borrowTotal")}</h3>
                        <span className="flex">
                          <TbCurrencyTaka className="w-5 h-5" />
                          {currencyFormatter(language, 69)}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </>

                <div className="flex justify-end">
                  <Button
                    htmlType="submit"
                    className="lg:w-64 w-full rounded-md mt-10 lg:mb-44 font-semibold uppercase text-library-white h-12 bg-library-primary"
                    disabled={!isValid}
                  >
                    {localeString(language, "confirmReturn")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
