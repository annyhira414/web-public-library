import { Row, Col, Button, message } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { filterFalsyValues, localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { getData, postData } from "@/lib/services";
import { CheckAvailability } from "@/components/common";
import { BsPlusCircleFill } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../redux/store";
import { addtoBag, crearBag } from "@/redux/features/add-to-bag/addToBagSlice";
import { CiViewList } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import RecipientForm from "../common/RecipientForm";
import AddAddress from "../common/AddAddress";
import SavedAddress from "../common/SavedAddress";
import {
  addNewAddressSchema,
  addNewAddressSchemaWithoutLineItems,
  savedAddressSchema,
  savedAddressSchemaWithoutLineItems,
} from "./validation";
import PaymentDetails from "./PaymentDetails";
const BagBookCard = dynamic(() => import("@/components/book/bagBookCard"), {
  loading: () => <p>Loading...</p>,
});

interface IHomedelivery {
  language: string | undefined;
}

interface ILibrary {
  id: number;
  name: string;
  code: string;
}

const HomeDelivery: FC<IHomedelivery> = ({ language }) => {
  language = Cookies.get("language");
  const [option, setOption] = useState<any>([]);
  const [allLibrary, setAllLibrary] = useState<ILibrary[]>([]);
  const [libraryCode, setLibraryCode] = useState<string>();
  const [bookIds, setBookIds] = useState([]);
  const [availableDataId, setAvailabledataId] = useState<any>();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAllBookAvailable, setIsAllBookAvailavle] = useState(false);
  const [paymentData, setPaymentData] = useState<{ delivery_charge: number }>();
  const toggleFilterModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const [saveAdd, setSaveAdd] = useState<any>([]);
  const [addressLimit, setAddressLimit] = useState(2);
  const [addresstype, setAddresstype] = useState<any>([]);
  const [saveprePer, setSaveprePer] = useState<any>([]);
  const [divisions, setDiviosins] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [thanas, setThanas] = useState<any>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const bookCart = useSelector((state: AppState) => state?.bag?.data);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<any>({
    defaultValues: {
      delivery: "pickup",
      lineItems: [],
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
      ? isAllBookAvailable
        ? zodResolver(addNewAddressSchemaWithoutLineItems)
        : zodResolver(addNewAddressSchema)
      : isAllBookAvailable
      ? zodResolver(savedAddressSchemaWithoutLineItems)
      : zodResolver(savedAddressSchema),
  });

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
    // console.log("my data is = ", data);
    // console.log("my availableDataId card data is = ", bookCart);
    // return;
    const [pickUpLibrary] = findLibraryId(libraryCode);
    const cart_items = [];
    for (let i = 0; i < bookCart?.length; i++) {
      if (availableDataId?.[i]?.is_available) {
        cart_items.push({
          biblio_id: availableDataId?.[i]?.biblio?.id,
          library_id: pickUpLibrary?.id,
        });
      } else {
        if (data?.lineItems?.[i]?.availavleLibraryForBook) {
          cart_items.push({
            biblio_id: availableDataId?.[i]?.biblio?.id,
            library_id: data?.lineItems?.[i]?.availavleLibraryForBook,
          });
        } else {
          messageApi.open({
            type: "error",
            content: (
              <p>
                Please select available library for{" "}
                <span className="font-bold">
                  {availableDataId?.[i]?.biblio?.title}
                </span>{" "}
                book, or delete this book
              </p>
            ),
          });
          return;
        }
      }
    }

    let libraryCardRequestData = {
      cart_items: cart_items,
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
      address_name: showAddAddress ? data?.addressTitle || null : null,
      save_address: showAddAddress ? data?.isSaveAddress || null : null,
      address: showAddAddress
        ? data?.addressLine || null
        : addresstype[selectAddress]?.address,
    };
    libraryCardRequestData = filterFalsyValues(libraryCardRequestData);

    // console.log("callable data is = ", libraryCardRequestData);
    // return;

    const res = await postData(
      `public_library/orders`,
      libraryCardRequestData,
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      dispatch(crearBag());
      setIsModalVisible(true);
    } else {
      messageApi.open({
        type: "error",
        content: res?.data?.error,
      });
    }
  };
  // ============
  const findLibraryId = (libraryCode: string | undefined) => {
    const library = allLibrary?.filter(
      (item: ILibrary) => item?.code === libraryCode
    );
    return library;
  };

  const handleAddAddress = () => {
    setShowAddAddress(!showAddAddress);
    reset();
    setValue("selectAddress", null);
    setValue("divisions", null);
    setValue("districts", null);
    setValue("thanas", null);
    setLibraryCode("");
    setIsAllBookAvailavle(false);
  };

  useEffect(() => {
    libraryCode && Availability();
    libraryCode && paymentSumarry();
  }, [libraryCode, bookIds]);

  const Availability = async () => {
    const res = await getData(
      `public_library/libraries/${libraryCode}/biblios_availability`,
      {
        biblio_ids: bookIds,
      },
      language
    );

    if (res?.success) {
      const myNewArray = res?.data?.map((item: any, i: number) => ({
        ...bookCart?.[i],
        is_available: item?.is_available,
        available_libraries: item?.available_libraries,
      }));

      dispatch(addtoBag(myNewArray));
      setAvailabledataId(res?.data);
      console.log("my available data is = ", res?.data);
      // const status = ;
      setIsAllBookAvailavle(
        res?.data?.every((item: any) => item?.is_available)
      );
    }
  };
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
          return { label: division?.name, value: division?.id };
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
    setLibraryCode("");
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

  const thanaId = watch("thanas");

  useEffect(() => {
    thanaId && getLibraryUnderThana(thanaId);
  }, [thanaId]);

  const getLibraryUnderThana = async (thanaId: number) => {
    const res = await getData(`public_library/thanas/${thanaId}`, {}, language);
    if (res?.success) {
      setLibraryCode(res?.data?.code);
    }
  };

  const handleSelfAddress = () => {
    const name = Cookies.get("fullName") || "";
    const phone = Cookies.get("phone") || "";
    setValue("phone", phone);
    setValue("name", name);
    trigger(["phone", "name"]);
  };

  useEffect(() => {
    showAddAddress
      ? setValue("addNewAddress", true)
      : setValue("addNewAddress", false);
  }, [showAddAddress]);

  const lineItems = watch("lineItem");

  useEffect(() => {
    console.log("my line item is = ", lineItems);
  }, [lineItems]);

  return (
    <div>
      {contextHolder}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row id="hiddenDiv" className="bg-library-white mt-8 mb-8 rounded">
            <Col
              xs={{ span: 22 }}
              lg={{ span: 22 }}
              className="ml-5 pb-6 lg:ml-10"
            >
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
              </div>
            </Col>
          </Row>

          {libraryCode && (
            <BagBookCard
              bookCart={bookCart}
              control={control}
              availableData={availableDataId}
            />
          )}

          {libraryCode && (
            <PaymentDetails language={language} paymentData={paymentData} />
          )}

          <div className="flex justify-end borrowBookButton">
            <Button
              htmlType="submit"
              className="lg:w-64 button-secondary w-full mt-10 lg:mb-44 h-12"
              disabled={!isValid}
            >
              {localeString(language, "borrowBtn")}
            </Button>
          </div>
        </form>
      </div>

      <CheckAvailability
        isModalVisible={isModalVisible}
        toggleModal={toggleFilterModal}
        control={control}
        isNormal={true}
        status={"congratulations"}
        congratulationMessage={"borrwoCongratulationMessage"}
        buttonText="browse"
        maskClosable={false}
      />
    </div>
  );
};

export default HomeDelivery;
