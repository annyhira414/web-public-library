import {Row, Col, Button, message} from "antd";
import React, {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
  filterFalsyValues,
  localeString,
  objectToFormData,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {getData, postData} from "@/lib/services";
import {AddAddress, RecipientForm, SavedAddress} from "@/components/common";
import {BsPlusCircleFill} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {addtoBag} from "@/redux/features/add-to-bag/addToBagSlice";
import {CiViewList} from "react-icons/ci";
import {zodResolver} from "@hookform/resolvers/zod";
import {addNewAddressSchema, savedAddressSchema} from "./validation";
import {ImageUploader} from "@/components/controls";
import {useRouter} from "next/router";
import PaymentDetails from "@/components/book-borrow/PaymentDetails";
import {Ioption, ILibrary, ISaveAdd, ISaveAddress} from "@/lib/model/myRequest";

interface IHomedelivery {
  language: string | undefined;
  reason: string;
}

const HomeDelivery: FC<IHomedelivery> = ({language, reason}) => {
  language = Cookies.get("language");
  const [option, setOption] = useState<Ioption[]>([]);
  const [allLibrary, setAllLibrary] = useState<ILibrary[]>([]);
  const [libraryCode, setLibraryCode] = useState<string>();
  const [bookIds, setBookIds] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [paymentData, setPaymentData] = useState<{delivery_charge: number}>();

  const [saveAdd, setSaveAdd] = useState<ISaveAdd[]>([]);
  const [addressLimit, setAddressLimit] = useState(2);
  const [addresstype, setAddresstype] = useState<ISaveAddress[]>([]);
  const [saveprePer, setSaveprePer] = useState<any>([]);
  const [divisions, setDiviosins] = useState<Ioption[]>([]);
  const [districts, setDistricts] = useState<Ioption[]>([]);
  const [thanas, setThanas] = useState<Ioption[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: {errors, isValid},
  } = useForm<any>({
    defaultValues: {
      delivery: "pickup",
      gd_image_file: "",
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
    mode: "all",
    resolver: showAddAddress
      ? zodResolver(addNewAddressSchema)
      : zodResolver(savedAddressSchema),
  });

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const selectAddress = watch("selectAddress");
  useEffect(() => {
    selectAddress !== null &&
      setLibraryCode(addresstype[selectAddress]?.library?.code);
  }, [selectAddress]);

  useEffect(() => {
    getBookCart();
    getLibrary();
  }, []);

  const getLibrary = async () => {
    const response = await getData(
      `/public_library/libraries/dropdown`,
      {},
      language,
      Cookies.get("token")
    );
    if (response?.success) {
      setAllLibrary(response?.data);
      const options = response?.data?.map((item: any) => {
        return {
          id: item?.id,
          value: item?.code,
          label: item?.name,
        };
      });
      setOption(options);
    }
  };
  const getBookCart = async () => {
    const res = await getData(
      `public_library/carts/details`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      dispatch(addtoBag(res?.data?.cart_items));
      setBookIds(
        res?.data?.cart_items?.map((biblio: any) => biblio?.biblio_id)
      );
    }
  };

  const onSubmit = async (data: any) => {
    if (
      (data?.gd_image_file === "" ||
        data?.gd_image_file?.fileList.length === 0) &&
      reason === "lost"
    ) {
      messageApi.open({
        type: "error",
        content: localeString(language, "enterYourGdCopy"),
      });
      return;
    }
    const [pickUpLibrary] = findLibraryId(data?.library);

    let libraryCardRequestData = {
      apply_reason: reason,
      delivery_type: "home_delivery",

      address_type: data?.addNewAddress
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
      issued_library_id: !showAddAddress
        ? addresstype[selectAddress]?.library?.id
        : libraryCode,
      address_name: showAddAddress ? data?.addressTitle || null : null,
      save_address: showAddAddress ? data?.isSaveAddress || null : null,
      address: showAddAddress
        ? data?.addressLine || null
        : addresstype[selectAddress]?.address,
    };

    libraryCardRequestData = filterFalsyValues(libraryCardRequestData);

    const res = await postData(
      `public_library/library_cards/apply`,
      objectToFormData(libraryCardRequestData),
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      router.push("/my-request/success-massage");
    } else {
      errorMsg(res?.data?.data?.error);
    }
  };

  const findLibraryId = (libraryCode: string) => {
    const library = allLibrary?.filter(
      (item: ILibrary) => item?.code === libraryCode
    );
    return library;
  };

  const handleAddAddress = () => {
    setShowAddAddress(!showAddAddress);
    setValue("selectAddress", null);
    setValue("divisions", null);
    setValue("districts", null);
    setValue("thanas", null);
    setLibraryCode("");
  };

  useEffect(() => {
    libraryCode && paymentSumarry();
  }, [libraryCode, bookIds]);

  const paymentSumarry = async () => {
    const res = await getData(
      `public_library/libraries/${libraryCode}/cart_items_delivery_charge`,
      {
        biblio_ids: bookIds,
      },
      language
    );

    if (res?.success) {
      setPaymentData(res?.data);
    }
  };

  const watchType = watch("selectAddress");
  useEffect(() => {
    filterPresentPermanetType();
  }, [watchType]);

  const filterPresentPermanetType = () => {
    const value = addresstype?.filter(
      (user: any, i: number) => watchType === user.address_type
    );
    setSaveprePer(value);
  };

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
          return {label: division?.name, value: division?.id};
        })
      );
    }
  };
  const divisionId = watch("divisions");

  useEffect(() => {
    setLibraryCode("");
    setValue("districts", null);
    setValue("thanas", null);
    divisionId && libraryDistcts(divisionId);
  }, [divisionId]);

  const libraryDistcts = async (divisionId: any) => {
    const res = await getData(
      `public_library/districts`,
      {division_id: divisionId?.toString()},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setDistricts(
        res?.data?.map((district: any) => {
          return {label: district?.name, value: district?.id};
        })
      );
    }
  };
  const districtId = watch("districts");

  useEffect(() => {
    setLibraryCode("");
    setValue("thanas", null);
    districtId && librarythanas(districtId);
  }, [districtId]);

  const librarythanas = async (districtId: any) => {
    const res = await getData(
      `public_library/thanas`,
      {district_id: districtId?.toString()},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setThanas(
        res?.data?.map((thanas: any) => {
          return {label: thanas?.name, value: thanas?.id};
        })
      );
    }
  };

  const thanaId = watch("thanas");

  useEffect(() => {
    thanaId && getLibraryUnderThana(thanaId);
  }, [thanaId]);

  const getLibraryUnderThana = async (thanaId: number) => {
    const res = await getData(`public_library/thanas/${thanaId}`, {}, language);
    if (res?.success) {
      setLibraryCode(res?.data?.id);
    }
  };

  const handleSelfAddress = () => {
    const name = Cookies.get("fullName") || "";
    const phone = Cookies.get("phone") || "";
    setValue("phone", phone);
    setValue("name", name);
  };

  useEffect(() => {
    showAddAddress
      ? setValue("addNewAddress", true)
      : setValue("addNewAddress", false);
  }, [showAddAddress]);
  // const [isImageValid, setIsImageValid] = useState(false);
  // const gdImageFile = watch("gd_image_file");
  // useEffect(() => {
  //   if (gdImageFile?.fileList?.length === 0 && reason === "lost") {
  //     setIsImageValid(true);
  //   } else {
  //     setIsImageValid(false);
  //   }
  // }, [gdImageFile, reason]);

  return (
    <div>
      {contextHolder}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row id="hiddenDiv" className=" mt-8 mb-8 rounded">
            <div className="bg-library-white">
              <Col
                xs={{span: 22}}
                lg={{span: 22}}
                className="ml-5 pb-6 lg:ml-10"
              >
                <>
                  <div className="flex justify-between">
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
                    <>
                      <SavedAddress
                        control={control}
                        errors={errors}
                        language={language}
                        saveAdd={saveAdd}
                        setAddressLimit={setAddressLimit}
                        addresstype={addresstype}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  <div className="bg-library-light-white mt-5 p-5 rounded">
                    <div className="flex justify-between">
                      <div className="section-title text-base lg:text-xl mb-5">
                        {localeString(language, "borrowRecipient")}{" "}
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
                </>
              </Col>
            </div>
            <>
              <div className="homedeliveryImage pt-6">
                <div className="border-gray-300 rounded-2xl">
                  {
                    <ImageUploader
                      placeholder={
                        reason === "lost"
                          ? localeString(language, "uploadGeneralDiary")
                          : localeString(language, "uploadDamagePhoto")
                      }
                      isButtonFullScreen
                      control={control}
                      name="gd_image_file"
                      errors={errors}
                    />
                  }
                </div>
              </div>
            </>
          </Row>
          {/* {libraryCode && (
            <BagBookCard
              bookCart={bookCart}
              control={control}
              availableData={availableDataId}
            />
          )}

          {libraryCode && (
            <PaymentDetails language={language} paymentData={paymentData} />
          )} */}

          <div className="pt-4">
            {libraryCode && (
              <PaymentDetails
                language={language}
                paymentData={{delivery_charge: 60}}
              />
            )}
          </div>
          <div className="flex justify-end borrowBookButton">
            <Button
              htmlType="submit"
              className="lg:w-64 w-full button-secondary mt-10 lg:mb-44 h-12"
              disabled={!isValid}
            >
              {localeString(language, "submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeDelivery;
