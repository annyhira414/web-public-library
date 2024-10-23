import { localeString } from "@/lib/helpers/utils";
import { Input } from "@/components/controls";
import Cookies from "js-cookie";
import React, { FC } from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { Col, Row } from "antd";
interface IParentsDetails {}

type Inputs = {
  fatherName: string;
  motherName: string;
};
export const ParentDetails: FC<IParentsDetails> = () => {
  const language = Cookies.get("language");

  const {
    control,
    formState: { errors },
  } = useFormContext();
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
          <div className="personal-info">
            <h4 className="font-bold font-playfairDisplay text-gray-700 text-xl">
              {localeString(language, "parentsDetails")}
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
          <div className="parents-details border border-gray-200 shadow-sm shadow-pl-box-shadow p-6">
            <div className="father-name">
              <label htmlFor="fatherName" className="text-sm text-gray-700">
                {localeString(language, "fatherName")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="fatherName"
                control={control}
                placeholder={localeString(language, "fatherName")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="mother-name">
              <label htmlFor="motherName" className="text-sm text-gray-700">
                {localeString(language, "motherName")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="motherName"
                control={control}
                placeholder={localeString(language, "motherName")}
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
