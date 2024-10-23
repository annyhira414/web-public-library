import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IBecomeMember {}

export const MembershipBanner = () => {
  const language = Cookies.get("language");
  return (
    <div>
      <div className="member-card cursor-pointer common-card-hover">
        <Link href="/membership">
          {language === "en" ? (
            <Image
              src="/images/Banner-Member.svg"
              alt="membership-btn"
              width={1400}
              height={300}
            />
          ) : (
            <Image
              src="/images/BB.png"
              alt="membership-btn"
              width={1400}
              height={300}
            />
          )}
        </Link>
      </div>
    </div>
  );
};
