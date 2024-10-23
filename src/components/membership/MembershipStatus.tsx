import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import { getData } from "@/lib/services";
import { message } from "antd";
import {
  MembershipPaymentStatus,
  MembershipStatusError,
  MembershipRejected,
  RequestPending,
  StartMembership,
} from "@/components/membership";

interface IMembershipStatus {}

export const MembershipStatus: FC<IMembershipStatus> = () => {
  const language = Cookies.get("language");
  const [messageApi] = message.useMessage();
  const [membershipStatus, setMembershipStatus] = useState();
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const getMemberDetails = async () => {
    const userToken = Cookies.get("token");
    const res = await getData(
      `public_library/membership_requests/details`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setMembershipStatus(res?.data?.status);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  useEffect(() => {
    getMemberDetails();
  }, []);
  return (
    <div>
      {membershipStatus === "pending" && <RequestPending />}
      {membershipStatus === "payment_pending" && <MembershipPaymentStatus />}
      {membershipStatus === "correction_required" && <MembershipStatusError />}
      {membershipStatus === "rejected" && <MembershipRejected />}
      {membershipStatus === "correction_submitted" && <RequestPending />}
      {membershipStatus === "completed" && <StartMembership />}
    </div>
  );
};
