import { Input, Select } from "@/components/controls";
import { localeString } from "@/lib/helpers/utils";
import { deleteData, getData, postData, updateData } from "@/lib/services";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Popconfirm, message } from "antd";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from "yup";
import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IMyAddress {}
type Inputs = {
  division: string | null;
  district: string | null;
  thana: string | null;
  division_id: string;
  district_id: string;
  thana_id: string;
  addressTitle: string;
  addressLine: string;
  addressId: number;
};

export const MyAddress: FC<IMyAddress> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [divisions, setDiviosins] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [userAddress, setUserAddress] = useState<any>([]);
  const [editButton, setEditButton] = useState(false);

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      addressTitle: "",
      addressLine: "",
      division: null,
      district: null,
      thana: null,
    },
    mode: "all",
    resolver: yupResolver(addressSchema),
  });

  const getDivision = async () => {
    const res = await getData(
      `public_library/divisions`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setDiviosins(
        res.data.map((division: any) => {
          return { label: division?.name, value: division?.id };
        })
      );
    } else {
      errorMsg("Division Can't Be Empty");
    }
  };
  const divisionId = watch("division");
  useEffect(() => {
    getDivision();
  }, []);

  const districtId = watch("district");

  const getDistrict = async (divisionId: any) => {
    const res = await getData(
      `public_library/districts`,
      { division_id: divisionId?.toString() },
      language,
      userToken
    );
    if (res?.success) {
      setDistricts(
        res.data.map((district: any) => {
          return { label: district?.name, value: district?.id };
        })
      );
    } else {
      errorMsg("District Can't Be Empty");
    }
  };
  useEffect(() => {
    if (!divisionId) return;
    getDistrict(divisionId);
  }, [divisionId]);

  const getThana = async (districtId: any) => {
    const res = await getData(
      `public_library/thanas`,
      { district_id: districtId?.toString() },
      language,
      userToken
    );
    if (res?.success) {
      setThanas(
        res.data.map((thana: any) => {
          return { label: thana?.name, value: thana?.id };
        })
      );
    } else {
      errorMsg("Thana Can't Be Empty");
    }
  };
  useEffect(() => {
    if (!districtId) return;
    getThana(districtId);
  }, [districtId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const thana = watch("thana");
  const getSaveAddress = async () => {
    const res = await getData(
      `public_library/saved_addresses`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setUserAddress(res?.data);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  useEffect(() => {
    getSaveAddress();
  }, []);
  const updateAddressTitle = watch("addressTitle");
  const updateAddressLine = watch("addressLine");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const id = data?.addressId;
    let params: any = {
      name: data?.addressTitle,
      division_id: data?.division,
      district_id: data?.district,
      thana_id: data?.thana,
      address: data?.addressLine,
    };
    if (!editButton) {
      const res = await postData(
        `public_library/saved_addresses`,
        params,
        language,
        userToken
      );
      if (res?.success) {
        reset();
        setIsModalOpen(false);
        getSaveAddress();
      } else {
        const response = res as any;
        errorMsg(response?.data?.data?.error);
      }
    }
    if (editButton) {
      const res = await updateData(
        `public_library/saved_addresses`,
        params,
        id,
        userToken
      );
      if (res?.success) {
        reset();
        setIsModalOpen(false);
        getSaveAddress();
      } else {
        const response = res as any;
        errorMsg(response?.data?.data?.error);
      }
    }
  };
  const handleAddAddress = async () => {
    reset();
    setEditButton(false);
    showModal();
  };

  const handleEditAddress = async (
    id: number,
    name: string,
    address: string,
    division: string,
    district: string,
    thana: string
  ) => {
    setEditButton(true);
    if (editButton) {
      setValue("addressId", id);
      setValue("addressTitle", name);
      setValue("addressLine", address);
      setValue("division", division);
      setValue("district", district);
      setValue("thana", thana);
      showModal();
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const res = await deleteData(
      `public_library/saved_addresses`,
      id,
      userToken
    );
    console.log("Delete =>", res);
    if ([200, 201].includes(res?.data)) {
      console.log("Delete =>", res);
      const updateUserAddress = userAddress.filter(
        (newAddress: any) => newAddress?.id !== id
      );
      setUserAddress(updateUserAddress);
    } else {
      errorMsg(res?.data?.error);
    }
  };

  const changeDivision = () => {
    setValue("district", "");
    setValue("thana", "");
  };
  const changeDistrict = () => {
    setValue("thana", "");
  };
  console.log("Address =>", userAddress);
  return (
    <div>
      {contextHolder}
      <h4 className="mb-4 text-gray-700 font-bold font-playfairDisplay text-xl">
        {localeString(language, "address")}
      </h4>
      {userAddress?.map((addressField: any) => {
        return (
          <div key={addressField?.id}>
            <div className="present-addres-info-card bg-white p-4 my-6">
              <div className="info-card-haeding flex justify-between border-b">
                <div className="address-title">
                  <p className="font-bold text-sm text-library-primary capitalize">
                    {addressField?.name}
                  </p>
                </div>
                <div className="address-icon flex mb-2">
                  <div
                    className="edit-icon cursor-pointer mr-4"
                    onClick={() =>
                      handleEditAddress(
                        addressField?.id,
                        addressField?.address_type,
                        addressField?.address,
                        addressField?.division?.id,
                        addressField?.district?.id,
                        addressField?.thana?.id
                      )
                    }
                  >
                    <EditOutlined />
                  </div>
                  <div className="confirm-delete">
                    <Popconfirm
                      okButtonProps={{
                        type: "ghost",
                        className:
                          "border border-[#FFEAEA] text-library-royal-red transition-all duration-500 hover:border-library-royal-red p-2 ",
                      }}
                      title={localeString(language, "deleteAddress")}
                      okText={localeString(language, "deleteBtn")}
                      cancelText={localeString(language, "cancel")}
                      onConfirm={() => handleDeleteAddress(addressField?.id)}
                      description={localeString(
                        language,
                        "deleteAddressMessage"
                      )}
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: "red",
                          }}
                        />
                      }
                    >
                      <h2>
                        {addressField?.address_type === "others" && (
                          <DeleteOutlined />
                        )}
                      </h2>
                    </Popconfirm>
                  </div>
                </div>
              </div>
              <div className="address-info-card-body">
                <div className="area flex justify-between mt-4">
                  <div className="area-division">
                    <p>
                      <span className="text-gray-700 font-bold text-sm">
                        {localeString(language, "division")} :
                      </span>
                      <span> {addressField?.division?.name}</span>
                    </p>
                  </div>
                  <div className="area-distric">
                    <p>
                      <span className="text-gray-700 font-bold text-sm">
                        {localeString(language, "district")} :
                      </span>
                      <span> {addressField?.district?.name}</span>
                    </p>
                  </div>
                  <div className="area-thana">
                    <p>
                      <span className="text-gray-700 font-bold text-sm">
                        {localeString(language, "thana")} :
                      </span>
                      <span> {addressField?.thana?.name}</span>
                    </p>
                  </div>
                </div>
                <div className="address-line mt-4">
                  <p>
                    <span className="text-gray-700 font-bold text-sm">
                      {localeString(language, "addressLine")} :
                    </span>
                    <span> {addressField?.address}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="add-address-btn bg-white p-4 flex justify-center items-center">
        <Button
          className="text-library-primary font-medium text-sm border-none"
          onClick={handleAddAddress}
        >
          <span>
            <PlusCircleOutlined /> {localeString(language, "addAddress")}
          </span>
        </Button>
      </div>
      <div className="add-address-form-modal">
        <Modal
          footer={null}
          maskClosable={false}
          open={isModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <div className="address-user-modal">
            <div className="address-heading">
              <div className="address-delete-title flex justify-center">
                <h2 className="font-bold text-gray-700 font-playfairDisplay text-3xl my-4">
                  {editButton
                    ? `${localeString(language, "editAddress")}`
                    : `${localeString(language, "addAddress")}`}
                </h2>
              </div>
            </div>
            <div className="address-title px-8">
              <Input
                name="addressTitle"
                control={control}
                errors={errors}
                placeholder={localeString(language, "addressTitle")}
                className="mb-1 capitalize border border-gray-400 rounded-md"
              />
            </div>
            <div className="address-modal-content text-justify px-8">
              <p className="text-gray-600 text-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="select-diviosion">
                    <Select
                      name="division"
                      control={control}
                      errors={errors}
                      options={divisions}
                      placeholder={localeString(language, "division")}
                      className="my-5"
                      onChangeOption={changeDivision}
                      allowClear={false}
                    />
                  </div>
                  <div className="select-district">
                    <Select
                      name="district"
                      control={control}
                      errors={errors}
                      options={districts}
                      placeholder={localeString(language, "district")}
                      className=""
                      onChangeOption={changeDistrict}
                      allowClear={false}
                    />
                  </div>
                  <div className="select-thana">
                    <Select
                      name="thana"
                      control={control}
                      errors={errors}
                      options={thanas}
                      placeholder={localeString(language, "thana")}
                      className="my-5"
                      allowClear={false}
                    />
                  </div>
                  <div className="add-address-line">
                    <Input
                      name="addressLine"
                      control={control}
                      errors={errors}
                      placeholder={localeString(language, "addressLine")}
                      className="border border-gray-400 rounded-md"
                    />
                  </div>
                  <div className="address-modal-button flex justify-between mt-6">
                    <div className="cancleButton">
                      <Button
                        onClick={handleCancel}
                        className="button-cancel px-3 mr-1 md:px-16 lg:px-16 xl:px-16"
                      >
                        {localeString(language, "cancelBtn")}
                      </Button>
                    </div>
                    <div className="cancel-modal borrowBookButton">
                      <Button
                        htmlType="submit"
                        className="button-secondary px-3 mr-1 md:px-16 lg:px-16 xl:px-16"
                      >
                        {editButton
                          ? `${localeString(language, "updateAddress")}`
                          : `${localeString(language, "addAddress")}`}
                      </Button>
                    </div>
                  </div>
                </form>
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
const addressSchema = y.object().shape({
  addressTitle: y
    .string()
    .typeError("Address Title is required")
    .required("Address Title is required")
    .max(300, "Address Title contain at most 300 characters.")
    .trim(),

  division: y
    .string()
    .typeError("Division is required")
    .required("Division is required"),
  district: y
    .string()
    .typeError("District is required")
    .required("District is required"),
  thana: y
    .string()
    .typeError("Thana  is required")
    .required("Thana is required"),
  addressLine: y
    .string()
    .typeError("Address Line  is required")
    .required("Address Line is required"),
});
