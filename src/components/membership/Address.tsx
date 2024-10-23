import { localeString } from "@/lib/helpers/utils";
import { Input, Select, Checkbox } from "@/components/controls";
import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getData } from "@/lib/services";
import { Col, Row, message } from "antd";

interface IAddress {}

type Inputs = {
  division: any;
  district: any;
  thana: any;
  addressLine: any;
};

export const Address: FC<IAddress> = () => {
  const language = Cookies.get("language");
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const [messageApi] = message.useMessage();
  const [divisions, setDiviosins] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);

  //Present Address
  const getDivision = async () => {
    const res = await getData(`public_library/divisions`, {}, language);
    if (res?.success) {
      setDiviosins(
        res.data.map((division: any) => {
          return { label: division?.name, value: division?.id };
        })
      );
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: msg,
        });
      };
      errorMsg("No data Found");
    }
  };
  const divisionId = watch("preDivision");

  useEffect(() => {
    getDivision();
  }, []);

  const districtId = watch("preDistrict");
  const getDistrict = async (divisionId: any) => {
    const res = await getData(
      `public_library/districts`,
      { division_id: divisionId?.toString() },
      language
    );
    if (res?.success) {
      setDistricts(
        res.data.map((district: any) => {
          return { label: district?.name, value: district?.id };
        })
      );
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      };
      errorMsg("No data Found");
    }
  };
  useEffect(() => {
    getDistrict(divisionId);
  }, [divisionId]);

  const getThana = async (districtId: any) => {
    const res = await getData(
      `public_library/thanas`,
      { district_id: districtId?.toString() },
      language
    );
    if (res?.success) {
      setThanas(
        res.data.map((thana: any) => {
          return { label: thana?.name, value: thana?.id };
        })
      );
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      };
      errorMsg("No data Found");
    }
  };
  useEffect(() => {
    getThana(districtId);
  }, [districtId]);
  //Permenant
  const getPerDivision = async () => {
    const res = await getData(`public_library/divisions`, {}, language);
    if (res?.success) {
      setDiviosins(
        res.data.map((division: any) => {
          return { label: division?.name, value: division?.id };
        })
      );
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      };
      errorMsg("No data Found");
    }
  };
  const perDivisionId = watch("perDivision");
  useEffect(() => {
    getPerDivision();
  }, []);

  const perDistrictId = watch("perDistrict");
  const getPerDistrict = async (perDivisionId: any) => {
    const res = await getData(
      `public_library/districts`,
      { division_id: perDivisionId?.toString() },
      language
    );
    if (res?.success) {
      setDistricts(
        res.data.map((district: any) => {
          return { label: district?.name, value: district?.id };
        })
      );
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      };
      errorMsg("No data Found");
    }
  };
  useEffect(() => {
    getPerDistrict(perDivisionId);
  }, [perDivisionId]);

  const perGetThana = async (perDistrictId: any) => {
    const res = await getData(
      `public_library/thanas`,
      { district_id: perDistrictId?.toString() },
      language
    );
    if (res?.success) {
      setThanas(
        res.data.map((thana: any) => {
          return { label: thana?.name, value: thana?.id };
        })
      );
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      };
      errorMsg("No data Found");
    }
  };
  useEffect(() => {
    perGetThana(perDistrictId);
  }, [perDistrictId]);

  const addressCheckbox = watch("addressCheckbox");
  useEffect(() => {
    const preDiv = watch("preDivision");
    const preDist = watch("preDistrict");
    const preThana = watch("preThana");
    const preAddressLine = watch("preAddressLine");
    if (addressCheckbox) {
      setValue("perDivision", preDiv);
      setValue("perDistrict", preDist);
      setValue("perThana", preThana);
      setValue("perAddressLine", preAddressLine);
    } else {
      setValue("perDivision", "");
      setValue("perDistrict", "");
      setValue("perThana", "");
      setValue("perAddressLine", "");
    }
  }, [addressCheckbox]);
  return (
    <div>
      <Row className="bg-white py-6 px-16 border-t-4 border-library-primary rounded-b-lg mt-5">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="address-heading">
            <h4 className="font-bold font-playfairDisplay text-gray-700 text-xl">
              {localeString(language, "address")}
            </h4>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="present-address-details border border-gray-200 shadow-sm shadow-pl-box-shadow p-6">
            <h5 className="text-gray-600 text-sm font-semibold border-b border-gray-600 pb-1">
              {localeString(language, "presentAddress")}
            </h5>
            <div className="select-diviosion mt-3">
              <label htmlFor="division" className="text-sm text-gray-700">
                {localeString(language, "division")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="preDivision"
                control={control}
                placeholder={localeString(language, "selectDivision")}
                errors={errors}
                options={divisions}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="select-district">
              <label htmlFor="District" className="text-sm text-gray-700">
                {localeString(language, "district")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="preDistrict"
                control={control}
                placeholder={localeString(language, "selectDistrict")}
                errors={errors}
                options={districts}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="select-thana">
              <label htmlFor="Thana" className="text-sm text-gray-700">
                {localeString(language, "thana")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="preThana"
                control={control}
                placeholder={localeString(language, "selectThana")}
                errors={errors}
                options={thanas}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="add-address-line">
              <label htmlFor="addressLine" className="text-sm text-gray-700">
                {localeString(language, "addressLine")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="preAddressLine"
                control={control}
                placeholder={localeString(language, "presentAddress")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
          </div>
          <div className="permanent-address-details border border-gray-200 shadow-sm shadow-pl-box-shadow mt-4 p-6">
            <div className="permenant-add flex justify-between border-b border-gray-600 pb-1">
              <h5 className="text-gray-600 text-sm font-semibold ">
                {localeString(language, "permenantAddress")}
              </h5>
              <div className="check-address mt-1">
                <Checkbox
                  name="addressCheckbox"
                  control={control}
                  label={localeString(language, "sameAs")}
                />
              </div>
            </div>
            <div className="select-diviosion mt-3">
              <label htmlFor="division" className="text-sm text-gray-700">
                {localeString(language, "division")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="perDivision"
                control={control}
                placeholder={localeString(language, "selectDivision")}
                errors={errors}
                options={divisions}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="select-district">
              <label htmlFor="District" className="text-sm text-gray-700">
                {localeString(language, "district")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="perDistrict"
                control={control}
                placeholder={localeString(language, "selectDistrict")}
                errors={errors}
                options={districts}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="select-thana">
              <label htmlFor="Thana" className="text-sm text-gray-700">
                {localeString(language, "thana")}
                <span className="text-red-700">*</span>
              </label>
              <Select
                name="perThana"
                control={control}
                placeholder={localeString(language, "selectThana")}
                errors={errors}
                options={thanas}
                className="mb-5 pb-1 rounded-md mt-2"
              />
            </div>
            <div className="add-address-line">
              <label htmlFor="addressLine" className="text-sm text-gray-700">
                {localeString(language, "addressLine")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="perAddressLine"
                control={control}
                placeholder={localeString(language, "permenantAddress")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
