import { localeString } from "@/lib/helpers/utils";
import { getData } from "@/lib/services";
import { Divider } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const MembershipMenu = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [memberCategory, setMemberCategory] = useState<any>();
  const getUserDetails = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setMemberCategory(res?.data);
    } else {
      alert("No data Found");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="p-2">
      <Link
        href="/user/my-profile"
        className="p-1 hover:bg-library-secondary hover:text-library-primary flex items-center gap-2 cursor-pointer"
      >
        <span>{localeString(language, "membershipInformation")}</span>
      </Link>
      <Divider className="my-2" />
      <Link
        href="#"
        className="p-1 hover:bg-library-secondary hover:text-library-primary flex items-center gap-2 cursor-pointer"
      >
        <span>{localeString(language, "digitalMembershipCard")}</span>
      </Link>
      <Divider className="my-2" />
      <Link
        href="/user/membership-history"
        className="p-1 hover:bg-library-secondary hover:text-library-primary flex items-center gap-2 cursor-pointer"
      >
        <span>{localeString(language, "membershipHistory")}</span>
      </Link>
      <Divider className="my-2" />
      <Link
        href="/user/change-membership"
        className="p-1 hover:bg-library-secondary hover:text-library-primary flex items-center gap-2 cursor-pointer"
      >
        <span>{localeString(language, "changeMembership")}</span>
      </Link>
      <Divider className="my-2" />
    </div>
  );
};
export const GeneralMembershipMenu = () => {
  const language = Cookies.get("language");
  return (
    <div className="p-4">
      <Link
        href="/user/my-profile"
        className="flex items-center gap-2 cursor-pointer"
      >
        <span>{localeString(language, "membershipInformation")}</span>
      </Link>
      <Divider className="my-2" />
      <Link href="#" className="flex items-center gap-2 cursor-pointer">
        <span>{localeString(language, "digitalMembershipCard")}</span>
      </Link>
      <Divider className="my-2" />
      <Link
        href="/user/membership-history"
        className="flex items-center gap-2 cursor-pointer"
      >
        <span>{localeString(language, "membershipHistory")}</span>
      </Link>
      <Divider className="my-2" />
      <Link href="#" className="flex items-center gap-2 cursor-pointer">
        <span>{localeString(language, "renewMembership")}</span>
      </Link>
      <Divider className="my-2" />
      <Link href="#" className="flex items-center gap-2 cursor-pointer">
        <span className="">{localeString(language, "cancelMembership")}</span>{" "}
      </Link>
      <span className="text-red-600 ">
        You are not allowed to Cancel <br /> Membership before 1 Year.
      </span>
    </div>
  );
};
