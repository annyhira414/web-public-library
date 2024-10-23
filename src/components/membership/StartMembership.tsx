import { Button, Col, Row, Checkbox, message, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";
import { membershipType } from "@/lib/constants/membershipType";
import { useRouter } from "next/router";
import { MembershipBenefit } from "./MembershipBenefit";
import { MembershipTypeButton } from "../controls/form-controls/MembershipyTypeButton";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { getData } from "@/lib/services";
import Image from "next/image";
import { GeneralMembershipMenu, MembershipMenu } from "./MembershipMenu";
import Link from "next/link";

type Inputs = {
  membershipRadio: string;
};

export const StartMembership = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const membershipOption = membershipType(language);
  const [isOkDisabled, setIsOkDesabled] = useState<boolean>(false);
  const [messageApi] = message.useMessage();
  const [isMember, setIsMember] = useState(false);
  const [userDetails, setUserDetails] = useState<any>("");
  const [memberDetails, setMemberDetails] = useState<any>();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<Inputs>();
  const watchMembership = watch("membershipRadio");
  const onChange = (e: CheckboxChangeEvent) => {
    setIsOkDesabled(e.target.checked);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => data;
  const router = useRouter();
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const handleNextClick = () => {
    if (watchMembership == "general") {
      router.push(
        `/membership/general-membership?membershipType=${watchMembership}`
      );
    } else if (watchMembership == "student") {
      router.push(
        `/membership/student-membership?membershipType=${watchMembership}`
      );
    } else if (watchMembership == "child") {
      router.push(
        `/membership/child-membership?membershipType=${watchMembership}`
      );
    }
  };
  const getUserDetails = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      language,
      userToken
    );

    if (res?.success) {
      setUserDetails(res?.data);
      setIsMember(res?.data?.is_member);
    } else {
      errorMsg("No data Found");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="pl-content-container">
      {isMember ? (
        <h1 className="text-gray-900 font-playfairDisplay font-bold text-2xl py-6">
          {localeString(language, "member")}
        </h1>
      ) : (
        <h1 className="text-gray-900 font-playfairDisplay font-bold text-2xl text-center py-6">
          {localeString(language, "startMembership")}
        </h1>
      )}

      <Row gutter={[25, 25]}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <MembershipBenefit />
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          {isMember ? (
            <>
              <div className="p-12 border">
                <div className="member-heading flex justify-between mb-3">
                  <h2 className="font-playfairDisplay text-xl font-semibold">
                    {localeString(language, "membership")}
                  </h2>
                  {userDetails?.member?.membership_category === "general" ? (
                    <Popover
                      placement="bottom"
                      content={GeneralMembershipMenu}
                      trigger="click"
                    >
                      <p className="cursor-pointer text-xl">...</p>
                    </Popover>
                  ) : (
                    <Popover
                      placement="bottom"
                      content={MembershipMenu}
                      trigger="click"
                    >
                      <p className="cursor-pointer text-xl">...</p>
                    </Popover>
                  )}
                </div>
                <div className="membership-status bg-[#E0FFED] p-12">
                  <div className="status-img flex justify-center ">
                    <Image
                      src="/images/successIcon.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="status-text text-center">
                    <h2 className="my-2.5 text-library-primary font-playfairDisplay text-xl font-semibold">
                      {localeString(
                        language,
                        userDetails?.member?.membership_category
                      )}
                    </h2>
                    <span className="text-library-primary text-xs">
                      {localeString(language, "membershipCategory")}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="membership-role p-8 bg-white rounded">
                <h4 className="font-bold font-playfairDisplay text-grey-900 mb-4">
                  {localeString(language, "chooseMembership")}
                </h4>
                <div className="membership-type">
                  <MembershipTypeButton
                    name="membershipRadio"
                    direction="vertical"
                    errors={errors}
                    control={control}
                    options={membershipOption}
                    className="grid grid-cols-1 radio-bg"
                  />
                </div>
              </div>
              <div className="my-8">
                <Checkbox onChange={onChange}>
                  <p>
                    {localeString(language, "membershipCheckBox")}
                    <span className="underline">
                      <Link href="/privacy-policy" target="_blank">
                        {localeString(language, "refundAndReturn")}
                      </Link>
                    </span>
                    <span className="ml-2 underline">
                      <Link href="/terms-and-condition" target="_blank">
                        {localeString(language, "termsAndCondition")}
                      </Link>
                    </span>
                  </p>
                </Checkbox>
              </div>

              <div className="flex justify-end borrowBookButton">
                <Button
                  className="button-secondary w-32"
                  disabled={
                    !isDirty || !isValid || isSubmitting || !isOkDisabled
                  }
                  onClick={handleNextClick}
                >
                  {localeString(language, "nextbtn")}
                </Button>
              </div>
            </form>
          )}
        </Col>
      </Row>
    </div>
  );
};
