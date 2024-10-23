import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Checkbox, CustomRadioGroup, Input } from "../controls";
import Cookies from "js-cookie";
import { makePaymentOption } from "@/lib/constants/payment-option";
import { memberAddresOptions } from "@/lib/constants/memberAddress";
import { Button, Col, Collapse, Row, Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { localeString } from "@/lib/helpers/utils";
import { MembershipTypeButton } from "../controls/form-controls/MembershipyTypeButton";
import { ResipientForm } from "../auth";
interface IRenewMembership {
  divisions: any;
  districts: any;
  thanas: any;
}
type Inputs = {
  paymentForm: string;
};
export const RenewMembership: FC<IRenewMembership> = ({
  divisions,
  districts,
  thanas,
}) => {
  const [isOkDisabled, setIsOkDesabled] = useState<boolean>(false);
  const onChange = (e: CheckboxChangeEvent) => {
    setIsOkDesabled(e.target.checked);
  };
  const language = Cookies.get("language");
  const paymentOption = makePaymentOption();
  const addressOption = memberAddresOptions();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const watchPaymentMethod = watch("paymentForm");
  const [reciepent, setReciepent] = useState(false);
  const handleAddAddress = () => {
    setReciepent(true);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => (data);

  return (
    <div className="pl-content-container my-4">
      <h3 className="mb-5 font-bold font-playfairDisplay text-library-light-black text-3xl">
        {localeString(language, "makePayment")}
      </h3>
      <div className="renew-invoice p-4 bg-[#DEECFF] my-6">
        <h5 className="font-bold text-gray-700 font-playfairDisplay text-sm">
          {localeString(language, "invoiceDetails")}
        </h5>
        <div className="flex justify-between mt-3">
          <p> {localeString(language, "renewFee")}</p>
          <p>50.00 Tk</p>
        </div>
        <div className="my-3">
          <hr className="h-1 bg-black" />
        </div>
        <div className="flex justify-between">
          <p> {localeString(language, "total")}</p>
          <p>50.00 Tk</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="payment-method bg-white p-8">
          <h5 className="text-black font-playfairDisplay font-bold mb-3">
            {localeString(language, "paymentMethod")}
          </h5>
          <div className="makePayment">
            <MembershipTypeButton
              name="paymentForm"
              options={paymentOption}
              control={control}
              direction="vertical"
              className="payment-radio"
            />
          </div>
        </div>
        {watchPaymentMethod === "nagadHome" ? (
          <>
            {" "}
            <div className="nagad-input bg-white p-8 my-5">
              <label htmlFor="nagadNumber" className="text-sm text-gray-700">
                {localeString(language, "enterNagad")}
                <span className="text-red-700">*</span>
              </label>
              <Input
                name="nagadNumber"
                placeholder="Nagad Number"
                control={control}
                errors={errors}
                className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400"
              />
            </div>
            <div className="member-address bg-white p-8 my-5">
              <div className="member-address-heading flex justify-between">
                <h5 className="text-black font-playfairDisplay font-bold mb-3">
                  {localeString(language, "selectAddress")}
                </h5>
                <div className="add-address-btn">
                  <button
                    className="text-library-primary text-xs"
                    onClick={handleAddAddress}
                  >
                    {localeString(language, "addAddress")}
                  </button>
                </div>
              </div>
              <div className="select-address-radio">
                <CustomRadioGroup
                  name="selectAddress"
                  control={control}
                  options={addressOption}
                  className="section border hover:border-library-primary broder-library-gray-300 my-3 mx-4 rounded-lg "
                />
              </div>
              <div className="seemore-btn text-center mb-3">
                <Button className="uppercase bg-[#E6F0ED;] w-full">
                  {localeString(language, "seeMoreBtn")}
                </Button>
              </div>

              {reciepent ? (
                <div className="mt-3 more-reciepent recipent-details p-4 bg-gray-100">
                  <div className="recipent-details-heading flex justify-between">
                    <div className="recipent-details">
                      <h5 className="text-black font-playfairDisplay font-bold mb-3">
                        {localeString(language, "borrowRecipient")}
                      </h5>
                    </div>
                    <div className="self-check">
                      <Checkbox
                        name="self"
                        control={control}
                        errors={errors}
                        label={localeString(language, "self")}
                      />
                    </div>
                  </div>
                  <ResipientForm language={language} />
                </div>
              ) : (
                <div className="recipent-details p-4 bg-gray-100">
                  <div className="recipent-details-heading flex justify-between">
                    <div className="recipent-details">
                      <h5 className="text-black font-playfairDisplay font-bold mb-3">
                        {localeString(language, "borrowRecipient")}
                      </h5>
                    </div>
                    <div className="self-check">
                      <Checkbox
                        name="self"
                        control={control}
                        errors={errors}
                        label={localeString(language, "self")}
                      />
                    </div>
                  </div>
                  <div className="recipent-input ">
                    <Row gutter={[25, 25]}>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <Input
                          name="recipentName"
                          placeholder="Name"
                          control={control}
                          errors={errors}
                          className=" inline-block mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-40"
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                      >
                        <Input
                          name="recipentPhone"
                          placeholder="Name"
                          control={control}
                          errors={errors}
                          className=" inline-block mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-40"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          ""
        )}

        {watchPaymentMethod === "nagadLibrary" && (
          <div className="nagad-input bg-white p-8 my-5">
            <label htmlFor="nagadNumber" className="text-sm text-gray-700">
              {localeString(language, "enterNagad")}
              <span className="text-red-700">*</span>
            </label>
            <Input
              name="nagadNumber"
              placeholder="Nagad Number"
              control={control}
              errors={errors}
              className="mb-2 border border-gray-400 rounded-md mt-2 hover:border-gray-400 focus:border-gray-400"
            />
          </div>
        )}

        <div className="library-payment bg-white p-6 mt-6">
          <div className="library-accordian ">
            <Collapse>
              <Collapse.Panel header="Library Delivery" key={1}>
                <Typography.Text>
                  <div className="headOfLibrary border-b-2 ">
                    <h4 className="text-sm text-gray-700 font-bold font-playfairDisplay">
                      {localeString(language, "headOfLibrary")} :
                    </h4>
                    <p className="text-gray-700 text-sm">
                      MD. Ashraful Alom Hero Mia
                    </p>
                  </div>
                  <div className="headOfLibrary border-b-2 ">
                    <h4 className="text-gray-700 font-bold font-playfairDisplay">
                      {localeString(language, "designation")}
                    </h4>
                    <p className="text-gray-700 text-sm">Senior Librarian</p>
                  </div>
                  <div className="headOfLibrary border-b-2 ">
                    <h4 className="text-sm text-gray-700 font-bold font-playfairDisplay">
                      {localeString(language, "mobilePhone")} :
                    </h4>
                    <p className="text-gray-700 text-sm">01912-001252</p>
                  </div>
                  <div className="headOfLibrary border-b-2 ">
                    <h4 className="text-sm text-gray-700 font-bold font-playfairDisplay">
                      {localeString(language, "telephone")} :
                    </h4>
                    <p className="text-gray-700 text-sm">02 568 1256</p>
                  </div>
                  <div className="headOfLibrary border-b-2 ">
                    <h4 className="text-sm text-gray-700 font-bold font-playfairDisplay">
                      {localeString(language, "email")} :{" "}
                    </h4>
                    <p className="text-gray-700 text-sm">library@mail.com</p>
                  </div>
                  <div className="headOfLibrary border-b-2 ">
                    <h4 className="text-sm text-gray-700 font-bold font-playfairDisplay">
                      {localeString(language, "address")} :{" "}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Shema Choron Rai Rd, Mymensingh
                    </p>
                  </div>
                </Typography.Text>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>

        <div className="payment-btn flex justify-end mt-4">
          <Button className="bg-library-primary text-white">Payment</Button>
        </div>
      </form>
    </div>
  );
};
