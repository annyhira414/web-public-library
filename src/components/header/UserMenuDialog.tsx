import React, {FC, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Avatar, message, Button} from "antd";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import {deleteData, getData} from "@/lib/services";
import {useRouter} from "next/router";
interface IHeaderLoginProps {
  hide: () => void;
}

export const UserMenuDialog: FC<IHeaderLoginProps> = ({hide}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const userName = Cookies.get("fullName");
  const phoneNumber = Cookies.get("phone");
  const isPublisher = Cookies.get("is_publisher");
  const [userDetails, setUserDetails] = useState<any>();
  const getProfileDetails = async () => {
    const res = await getData(
      `public_library/users/profile
    `,
      {},
      language,
      userToken
    );

    if (res?.success) {
      setUserDetails(res?.data);
    } else {
    }
  };
  useEffect(() => {
    getProfileDetails();
  }, []);

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const router = useRouter();

  const handleLogout = async () => {
    const res = await deleteData(`public_library/users/logout`, NaN, userToken);
    if (res.success) {
      Cookies.remove("token");
      Cookies.remove("id");
      Cookies.remove("fullName");
      Cookies.remove("email");
      Cookies.remove("phone");
      Cookies.remove("dob");
      Cookies.remove("gender");
      Cookies.remove("isMember");
      Cookies.remove("membershipStatus");
      Cookies.remove("member_activated_at");
      Cookies.remove("libraryCode");
      Cookies.remove("libraryId");
      Cookies.remove("is_publisher");
      window.location.href = "/";
    } else {
      errorMsg("Something went wrong");
    }
  };
  let profile = [
    "/user/my-profile",
    "/user/my-profile/my-address",
    "/user/my-profile/document-details",
    "/user/my-profile/change-password",
  ];
  let myOrder = [
    "/user/my-orders",
    "/user/my-orders/current-books",
    "/user/my-orders/return-books",
    "/user/my-orders/lost-books",
    "/user/my-orders/damage-books",
  ];
  let finePay = ["/payment&fine", "/payment&fine/paymentHistory"];
  let myRequest = [
    "/my-request",
    "/my-request/book-transfer-requests",
    "/my-request/library-card-request",
    "/my-request/security-money-request",
  ];
  let publisher = [
    "/publisher",
    "/publisher-panel",
    "/publisher-panel/active-memorandum",
    "/publisher-panel/previous-memorandum",
  ];
  let bookReview = [
    "/physical-book-review",
    "/physical-book-review/online-book-review",
  ];
  const {pathname} = useRouter();
  // console.log("path", pathname);

  const activeClass =
    "flex border-b items-center gap-2 cursor-pointer hover:text-library-primary bg-library-secondary p-2 text-library-primary";
  const hoverClass =
    "flex border-b items-center gap-2 cursor-pointer hover:bg-library-secondary p-2 hover:text-library-primary";

  return (
    <div className="p-2 w-[348px]">
      {contextHolder}
      {userToken && (
        <div className="flex flex-col items-center">
          {userDetails?.profile_image_url ? (
            <div className="header-profile-img">
              <Avatar
                className="cursor-pointer"
                size={40}
                icon={
                  <Image
                    src={userDetails?.profile_image_url}
                    alt="App logo"
                    width={28}
                    height={28}
                    className="rounded-full border border-gray-300 p-1 bg-library-white"
                  />
                }
              />
            </div>
          ) : (
            <Avatar
              className="cursor-pointer"
              size={30}
              icon={
                <Image
                  src="/icons/user.png"
                  alt="App logo"
                  width={28}
                  height={28}
                />
              }
            />
          )}

          <div className="mt-4 text-center">
            <h4 className="text-library-primary font-semibold">{userName}</h4>
            <p>{phoneNumber}</p>
          </div>
        </div>
      )}
      <div onClick={hide} className="mt-2">
        {userToken && (
          <>
            <>
              <div>
                <Link
                  href="/user/my-profile"
                  className={
                    profile.includes(pathname) ? activeClass : hoverClass
                  }
                >
                  <span>{localeString(language, "myProfile")}</span>
                </Link>
              </div>
            </>
            {userDetails?.is_member && (
              <>
                <Link
                  href="/user/my-orders"
                  className={
                    myOrder.includes(pathname) ? activeClass : hoverClass
                  }
                >
                  <span>{localeString(language, "myOrder")}</span>
                </Link>

                <Link
                  href="/favourite-books"
                  className={
                    pathname == "/favourite-books" ? activeClass : hoverClass
                  }
                >
                  <span>{localeString(language, "favouriteBooks")}</span>
                </Link>

                <Link
                  href="/payment&fine"
                  className={
                    finePay.includes(pathname) ? activeClass : hoverClass
                  }
                >
                  <span>{localeString(language, "fineTitle")}</span>
                </Link>

                <Link
                  href="/my-request"
                  className={
                    myRequest.includes(pathname) ? activeClass : hoverClass
                  }
                >
                  <span>{localeString(language, "myRequest")}</span>
                </Link>
              </>
            )}

            <>
              <Link
                href="/activities/events/registered-events"
                className={
                  pathname == "/activities/events/registered-events"
                    ? activeClass
                    : hoverClass
                }
              >
                <span>{localeString(language, "myRegisteredEvents")}</span>
              </Link>
            </>

            <>
              <div
                onClick={() => {
                  userDetails?.is_publisher
                    ? router.push("/publisher-panel")
                    : router.push("/publisher");
                }}
                className={
                  publisher.includes(pathname) ? activeClass : hoverClass
                }
              >
                {userDetails?.is_publisher ? (
                  <span>{localeString(language, "publisherPanel")}</span>
                ) : (
                  <span>{localeString(language, "beAPublisher")}</span>
                )}
              </div>
            </>

            <>
              <Link
                href="/physical-book-review"
                className={
                  bookReview.includes(pathname) ? activeClass : hoverClass
                }
              >
                <span>{localeString(language, "myBookReviews")}</span>
              </Link>
            </>

            <>
              <Link
                href="/membership"
                className={pathname == "/membership" ? activeClass : hoverClass}
              >
                {userDetails?.is_member ? (
                  <span>{localeString(language, "myMebership")}</span>
                ) : (
                  <span>{localeString(language, "beAMember")}</span>
                )}
              </Link>
            </>
            <>
              <div className="borrowBookButton mt-2">
                <Button
                  htmlType="submit"
                  className="button-secondary w-full font-semibold mb-2"
                  onClick={handleLogout}
                >
                  <span>{localeString(language, "logOut")}</span>
                </Button>
              </div>
            </>
          </>
        )}
      </div>
    </div>
  );
};
