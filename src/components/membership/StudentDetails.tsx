import { localeString } from "@/lib/helpers/utils";
import { Input } from "@/components/controls";
import Cookies from "js-cookie";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Col, Row } from "antd";
interface IDetails {}

type Inputs = {
  institutionName: string;
  institutionAddress: string;
  class?: string;
  section?: string;
  id: string;
};

export const StudentDetails: FC<IDetails> = () => {
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
              {localeString(language, "schoolDetails")}
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
          <div className="details border border-gray-200 shadow-sm shadow-pl-box-shadow p-6">
            <div className=" institutionName">
              <label
                htmlFor=" institutionName"
                className="text-sm text-gray-700"
              >
                {localeString(language, "educationalIstituteName")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="institutionName"
                control={control}
                placeholder={localeString(language, "educationalIstituteName")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="institutionAddress">
              <label
                htmlFor="institutionAddress"
                className="text-sm text-gray-700"
              >
                {localeString(language, "educationalInstituteAddress")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="institutionAddress"
                control={control}
                placeholder={localeString(
                  language,
                  "educationalInstituteAddress"
                )}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="class">
              <label htmlFor="class" className="text-sm text-gray-700">
                {localeString(language, "class")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="class"
                control={control}
                placeholder={localeString(language, "class")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="section">
              <label htmlFor="section" className="text-sm text-gray-700">
                {localeString(language, "section")}
                {/* <span className="text-red-700">*</span> */}
              </label>
              <Input
                name="section"
                control={control}
                placeholder={localeString(language, "section")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="studentId">
              <label htmlFor="studentId" className="text-sm text-gray-700">
                {localeString(language, "idOfStudent")}
                {/* <span className="text-red-700">*</span> */}
              </label>
              <Input
                name="studentId"
                control={control}
                placeholder={localeString(language, "idOfStudent")}
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
