import { localeString } from "@/lib/helpers/utils";
import { Input } from "@/components/controls";
import Cookies from "js-cookie";
import React, { FC } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Col, Row } from "antd";
interface IDetails {}

type Inputs = {
  profession: string;
  organizationName: string;
  organizationAddress: string;
};

export const ProfesionalDetails: FC<IDetails> = () => {
  const language = Cookies.get("language");
  const {
    control,
    formState: { errors },
  } = useFormContext<any>();

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
              {localeString(language, "professionalDetais")}
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
            <div className="profession">
              <label htmlFor=" profession" className="text-sm text-gray-700">
                {localeString(language, "profession")}
                {/* <span className="text-red-700">*</span> */}
              </label>
              <Input
                name="profession"
                control={control}
                placeholder={localeString(language, "profession")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="organizationName">
              <label
                htmlFor="organizationName"
                className="text-sm text-gray-700"
              >
                {localeString(language, "organizationName")}
                {/* <span className="text-red-700">*</span> */}
              </label>
              <Input
                name="organizationName"
                control={control}
                placeholder={localeString(language, "organizationName")}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400 bg-gray-100"
              />
            </div>
            <div className="organizationAddress">
              <label
                htmlFor="organizationAddress"
                className="text-sm text-gray-700"
              >
                {localeString(language, "organizationAddress")}
                {/* <span className="text-red-700">*</span> */}
              </label>
              <Input
                name="organizationAddress"
                control={control}
                placeholder={localeString(language, "organizationAddress")}
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
