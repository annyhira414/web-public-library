import { MembershipTypeButton } from "@/components/controls/form-controls/MembershipyTypeButton";
import {
  childMembershiUpgrade,
  studentMembershiUpgrade,
} from "@/lib/constants/membershipType";
import { localeString } from "@/lib/helpers/utils";
import { getData } from "@/lib/services";
import { Button, message } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Inputs = {
  membershipRadio: string;
};

export const UpgradeMembership = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [messageApi, contextHolder] = message.useMessage();
  const studentMembershipOption = studentMembershiUpgrade(language);
  const childMembershipOption = childMembershiUpgrade(language);
  const [memberDetails, setMemberDetails] = useState<any>();
  const router = useRouter();
  const {
    control,
    watch,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm<Inputs>();
  const watchMembership = watch("membershipRadio");
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const getMeberDetails = async () => {
    const res = await getData(
      `public_library/membership_requests/details`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setMemberDetails(res?.data?.request_detail);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  useEffect(() => {
    getMeberDetails();
  }, []);

  const handleNextClick = () => {
    if (watchMembership === "general") {
      router.push(
        `/user/change-membership/upgrade-general?membershipType=${watchMembership}`
      );
    } else if (watchMembership === "student") {
      router.push(
        `/user/change-membership/upgrade-student?membershipType=${watchMembership}`
      );
    }
  };
  return (
    <>
      {contextHolder}
      <div className="upgrade-member ">
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
              className="grid grid-cols-1 radio-bg"
              options={
                memberDetails?.membership_category === "student"
                  ? studentMembershipOption
                  : childMembershipOption
              }
            />
          </div>
        </div>
        <div className=" my-6 next-btn flex justify-end">
          <Button
            className="bg-library-primary px-24 h-10 rounded text-white"
            disabled={!isDirty || !isValid || isSubmitting}
            onClick={handleNextClick}
          >
            {localeString(language, "nextbtn")}
          </Button>
        </div>
      </div>
    </>
  );
};
