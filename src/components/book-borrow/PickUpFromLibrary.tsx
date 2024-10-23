import { Row, Col, Button, Modal, message } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Select } from "@/components/controls";
import { useForm } from "react-hook-form";
import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { getData, postData } from "@/lib/services";
import { CheckAvailability } from "@/components/common";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../redux/store";
import { addtoBag, crearBag } from "@/redux/features/add-to-bag/addToBagSlice";
import { refatchCountNotification } from "@/redux/features/counter/counterSlice";
const BagBookCard = dynamic(() => import("@/components/book/bagBookCard"), {
  loading: () => <p>Loading...</p>,
});

interface IPickUp {
  language: string | undefined;
}

interface ILibrary {
  id: number;
  name: string;
  code: string;
}

const PickUpFromLibrary: FC<IPickUp> = ({ language }) => {
  language = Cookies.get("language");
  const [option, setOption] = useState<any>([]);
  const [allLibrary, setAllLibrary] = useState<ILibrary[]>([]);
  const [bookIds, setBookIds] = useState([]);
  const [availableDataId, setAvailabledataId] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleFilterModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const [addresstype, setAddresstype] = useState<any>([]);
  const [saveprePer, setSaveprePer] = useState<any>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const bookCart = useSelector((state: AppState) => state?.bag?.data);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      library: Cookies.get("libraryCode") || "",
      lineItems: [],
      selectAddress: NaN,
    },
    mode: "all",
  });

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

  const libraryCode = watch("library");
  const onSubmit = async (data: any) => {
    const [pickUpLibrary] = findLibraryId(data?.library);
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

    const libraryCardRequestData = {
      cart_items: cart_items,
      delivery_type: "pickup",
      pick_up_library_id: pickUpLibrary?.id,
    };
    // console.log("my card request data is = ", libraryCardRequestData);
    // return;
    const res = await postData(
      `public_library/orders`,
      libraryCardRequestData,
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      dispatch(crearBag());
      dispatch(refatchCountNotification());
      setIsModalVisible(true);
    } else {
      messageApi.open({
        type: "error",
        content: res?.data?.error,
      });
    }
  };

  const findLibraryId = (libraryCode: string) => {
    const library = allLibrary?.filter(
      (item: ILibrary) => item?.code === libraryCode
    );
    return library;
  };

  useEffect(() => {
    Availability();
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
    } else {
    }
  };

  const deliveryMethod = watch("delivery");

  useEffect(() => {
    payment();
  }, [deliveryMethod]);

  const payment = async () => {
    if (deliveryMethod == "home_delivery") {
      const res = await getData(
        `/public_library/libraries/${libraryCode}/cart_items_delivery_charge`,
        {
          biblio_ids: bookCart?.map((user: any, i: number) => user?.biblio_id),
        },
        language
      );
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

  return (
    <div>
      {contextHolder}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="h-auto lg:h-36 mt-8 rounded bg-library-white">
            <h1 className="section-title text-xl ml-5 lg:ml-10 pt-5">
              {localeString(language, "EnterLibrarySelect")}
            </h1>
            <Col
              className="lg:ml-10 mb-4 lg:mb-0 mt-5 lg:mt-0"
              xs={{ span: 22, offset: 1 }}
              lg={{ span: 22 }}
            >
              <Select
                name="library"
                control={control}
                allowClear={false}
                errors={errors}
                options={option}
                placeholder={localeString(language, "EnterLibrarySelect")}
                className="h-10"
              />
            </Col>
          </Row>
          <BagBookCard
            bookCart={bookCart}
            control={control}
            availableData={availableDataId}
          />

          <div className="flex justify-end borrowBookButton">
            <Button
              htmlType="submit"
              disabled={!isValid}
              className="lg:w-64 button-secondary w-full mt-10 lg:mb-44 h-12"
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

export default PickUpFromLibrary;
