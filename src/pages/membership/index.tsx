import { MembershipStatus, StartMembership } from "@/components/membership";
import { getData } from "@/lib/services";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { NextSeo } from "next-seo";
import { localeString } from "@/lib/helpers/utils";

const MemberCard = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [userDetails, setUserDetails] = useState<any>();
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const getUserDetails = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setUserDetails(res);
    } else {
      const errorMsg = (msg: string) => {
        messageApi.open({
          type: "error",
          content: msg,
        });
      };
      errorMsg(res?.data?.message);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const isMembership = userDetails?.data?.is_membership;
  const isMember = userDetails?.data?.is_member;
  return (
    <div className="mb-12">
      <NextSeo
        title={`${localeString(language, "membershipTitle")}`}
        description="User Profile"
        openGraph={{
          title: "Public Library : My Profile",
          description: "The public libraries' User Profile Will Be Shown here",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library : My Profile",
            },
          ],
        }}
      />
      {contextHolder}
      {isMembership | isMember ? <MembershipStatus /> : <StartMembership />}
    </div>
  );
};

export default MemberCard;
