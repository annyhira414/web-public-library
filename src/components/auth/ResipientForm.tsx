/** @format */

import {localeString} from "@/lib/helpers/utils";
import {Checkbox, Input, Select} from "@/components/controls";
import React, {FC, useState, useEffect} from "react";
import {Row, Col, message} from "antd";
import {useForm} from "react-hook-form";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {getData, postData} from "@/lib/services";
import Cookies from "js-cookie";
import {useFormContext} from "react-hook-form";

interface IBookBorrow {
  language: string | undefined;
  // districts?: any;
  // divisions?: any;
  // thanas?: any;
  control?: any;
  watch?: any;
}

const ResipientForm: FC<IBookBorrow> = ({watch, language, control}) => {
  const [isOkDisabled, setIsOkDesabled] = useState<boolean>(false);
  const [option, setOption] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const methods = useFormContext();

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const {
    handleSubmit,
    reset,

    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<any>({
    defaultValues: {
      library_code: "",
    },
    mode: "all",
  });

  const [divisions, setDiviosins] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [thanas, setThanas] = useState<any>([]);

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
    } else {
      errorMsg("No data Found");
    }
  };

  const divisionId = watch("divisions");

  useEffect(() => {
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
    } else {
      errorMsg("No data Found");
    }
  };

  const districtId = watch("districts");
  useEffect(() => {
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
    } else {
      errorMsg("No data Found");
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Row gutter={[20, 0]} className="mt-2 lg:mt-5">
        <Col xs={{span: 24}} lg={{span: 8}}>
          <Select
            //{...methods.register}
            name="divisions"
            control={control}
            // errors={errors}
            options={divisions}
            placeholder={localeString(language, "borrowRecipientDivision")}
            className="h-11 mb-1 lg:mb-0"
          />
        </Col>

        <Col xs={{span: 24}} lg={{span: 8}}>
          <Select
            // {...methods.register}
            name="districts"
            control={control}
            // errors={errors}
            options={districts}
            placeholder={localeString(language, "borrowRecipientDistrict")}
            className="h-11 mb-1 lg:mb-0"
          />
        </Col>

        <Col xs={{span: 24}} lg={{span: 8}}>
          <Select
            //{...methods.register}
            name="thanas"
            control={control}
            // errors={errors}
            options={thanas}
            placeholder={localeString(language, "borrowRecipientThana")}
            className="h-11"
          />
        </Col>

        <Col xs={{span: 24}} lg={{span: 24}} className="lg:mt-5 mt-1">
          <Input
            // {...methods.register}
            name="addressLine"
            control={control}
            // errors={errors}
            placeholder={localeString(language, "borrowRecipientAddressline")}
            className="h-10 mb-2"
          />
        </Col>
        <Col className="mt-5" lg={{span: 24}}>
          <Checkbox
            name="isSaveAddress"
            control={control}
            // errors={errors}
            label={localeString(language, "saveThisAddress")}
          />
        </Col>

        <Col xs={{span: 24}} lg={{span: 24}} className="mt-5 mb-6">
          <Input
            name="addressTitle"
            control={control}
            // errors={errors}
            placeholder={localeString(language, "borrowRecipientAddress")}
            className="h-10"
          />
        </Col>
      </Row>
      {/* </form> */}
    </>
  );
};
export default ResipientForm;
