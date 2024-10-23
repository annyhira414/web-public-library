import {localeString} from "@/lib/helpers/utils";
import {INotification} from "@/lib/model/notification";
import {getData, updateData} from "@/lib/services";
import {Col, Row} from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {getTimeDifference} from "@/lib/helpers/utils";
import {useDispatch, useSelector} from "react-redux";
import {refatchCountNotification} from "@/redux/features/counter/counterSlice";
import {AppState} from "@/redux/store";

const Notification = () => {
  const language = Cookies.get("language");
  const [notification, setNotification] = useState<INotification[]>([]);
  const dispatch = useDispatch();
  const notificationCount = useSelector(
    (state: AppState) => state?.notificationCount.value
  );
  const router = useRouter();
  useEffect(() => {
    getNotification();
  }, [notificationCount]);

  const getNotification = async () => {
    const res = await getData(
      "/public_library/notifications",
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setNotification(res?.data);
    } else {
      if (res.status === 401) {
        router.push("/auth/login");
      }
    }
  };

  // console.log("click====>")

  const handleMarkSingleNotifications = async (
    id: number,
    notificationable_id: number,
    notificationable_type: string
  ) => {
    const params = {};
    const response = await updateData(
      `public_library/notifications/${id}/mark_as_read`,
      params,
      undefined,
      Cookies.get("token")
    );
    if (response.success) {
      dispatch(refatchCountNotification());
      getNotification();
      if (notificationable_type == "Order") {
        router.push(`/user/my-orders/${notificationable_id}`);
      }
      if (notificationable_type == "Notice") {
        router.push("/");
      }
      if (notificationable_type == "Album") {
        router.push("/");
      }
      if (notificationable_type == "Announcement") {
        router.push("/");
      }
      if (notificationable_type == "Complain") {
        router.push("/");
      }
      if (notificationable_type == "Circulation") {
        router.push("/");
      }
      if (notificationable_type == "Invoice") {
        router.push("/");
      }
      if (notificationable_type == "LostDamagedBiblio") {
        router.push("/");
      }
      if (notificationable_type == "SecurityMoneyRequest") {
        router.push("/");
      }
      if (notificationable_type == "LibraryCard") {
        router.push("/");
      }
    }
    // else {
    //   router.push("/notification");
    // }
  };
  return (
    <div>
      {notification?.length > 0 ? (
        <div>
          <div className="flex justify-between p-4 h-10 items-center">
            <h1 className="lg:w-60 section-title text-base">
              {localeString(language, "nNotification")}
            </h1>
            <Link
              href={"/notification"}
              className="lg:w-60 text-library-primary flex justify-end"
              type="link"
            >
              {localeString(language, "nSeeall")}
            </Link>
          </div>
          <div className="notifyHeight lg:w-[516px] overflow-auto">
            {notification?.map((user: INotification, i: number) => (
              <Row
                onClick={() =>
                  handleMarkSingleNotifications(
                    user?.id,
                    user?.notificationable_id,
                    user?.notificationable_type
                  )
                }
                className="cursor-pointer"
                key={user.id}
              >
                <Col
                  className={`${
                    user?.is_read === false
                      ? "p-4 w-full border-t bg-library-order-sidebar-background border-library-light-gray pt-3"
                      : "p-4 w-full border-t bg-library-white border-library-light-gray pt-3"
                  }`}
                  lg={{span: 24}}
                >
                  <h2 className="section-title text-base">{user?.title}</h2>
                  <p className="mt-2 text-sm font-light">{user?.message}</p>
                  <h3 className="text-xs text-library-gray mt-2">
                    {getTimeDifference(user?.created_at)}
                  </h3>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between p-4 h-10 items-center">
            <h1 className="lg:w-96 w-60 section-title text-base">
              {localeString(language, "nNotification")}
            </h1>
          </div>
          <div className="flex justify-center pt-16 border-t-2 border-library-light-gray">
            <Image
              src="/images/notification/n.svg"
              alt="App logo"
              width={64}
              height={64}
            />
          </div>
          <div className="mt-3 pb-16 text-center text-gray-700 section-title text-base">
            You have no notifications
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
