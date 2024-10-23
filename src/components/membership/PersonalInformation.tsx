import {localeString} from "@/lib/helpers/utils";
import {DatePickerControl, Input, RadioGroup} from "@/components/controls";
import Cookies from "js-cookie";

import React, {FC} from "react";
import {useFormContext} from "react-hook-form";
import {Col, Row} from "antd";
import {genderFunc} from "@/lib/constants";

interface IPersonalInfo {}

type Inputs = {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  dob: Date;
};
export const PersonalInformation: FC<IPersonalInfo> = () => {
  const language = Cookies.get("language");
  const options = genderFunc(language);

  const {
    control,
    watch,
    formState: {errors},
  } = useFormContext();
  return (
    <div>
      <Row className="bg-white py-6 px-16 border-t-4 border-library-primary rounded-b-lg">
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 12}}
          lg={{span: 12}}
          xl={{span: 12}}
        >
          <div className="personal-info">
            <h4 className="font-bold font-playfairDisplay text-gray-700 text-xl">
              {localeString(language, "personalInformation")}
            </h4>
          </div>
        </Col>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 12}}
          lg={{span: 12}}
          xl={{span: 12}}
        >
          <div className="personal-info border border-gray-200 shadow-sm shadow-pl-box-shadow p-6">
            <div className="full-name">
              <label htmlFor="fullName" className="text-sm text-gray-700">
                {localeString(language, "fullName")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="fullName"
                // defaultValue={name}
                control={control}
                //placeholder={localeString(language, "fullName")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="phone-number">
              <label htmlFor="phoneNumber" className="text-sm text-gray-700">
                {localeString(language, "mobilePhone")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="phone"
                control={control}
                placeholder={localeString(language, "mobilePhone")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="email">
              <label htmlFor="Email" className="text-sm text-gray-700">
                {localeString(language, "email")}
              </label>
              <Input
                name="email"
                control={control}
                placeholder={localeString(language, "email")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="gender-selection">
              <label htmlFor="gender" className="text-sm text-gray-700 mb-2">
                {localeString(language, "gender")}
                <span className="text-red-700">*</span>
              </label>
              <RadioGroup
                name="gender"
                control={control}
                errors={errors}
                options={options}
              ></RadioGroup>
            </div>
            <div className="dob">
              <label htmlFor="dob" className="text-sm text-gray-700">
                {localeString(language, "dateOfBirth")}
                <span className="text-red-700">*</span>
              </label>

              <DatePickerControl
                name="dob"
                control={control}
                errors={errors}
                format="DD-MM-YYYY"
                placeholder={localeString(language, "dateOfBirth")}
                className="border border-gray-400 mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
