import {getData, postData, updateData} from "@/lib/services";
import {Button, Col, Divider, Row} from "antd";
import Cookies from "js-cookie";
import React, {FC, useEffect, useState} from "react";
import {INotification} from "@/lib/model/notification";
import {localeString} from "@/lib/helpers/utils";
import {useRouter} from "next/router";
import {DataNotFound} from "@/components/common";
import {getTimeDifference} from "@/lib/helpers/utils";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {refatchCountNotification} from "@/redux/features/counter/counterSlice";
interface Inotification {
  language: string;
}

const Notification: FC<Inotification> = () => {
  const language = Cookies.get("language");
  const [notification, setNotification] = useState<INotification[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    getNotification();
  }, []);

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
  const handleMarkAllNotifications = async () => {
    const params = {};
    const response = await postData(
      "public_library/notifications/mark_as_read",
      params,
      language,
      Cookies.get("token")
    );
    if (response.success) {
      getNotification();
      dispatch(refatchCountNotification());
    } else {
      toast.error(response?.message);
    }
  };
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
    <div className="pl-content-container mb-24">
      <div className="bookButton flex border-b-2 pb-3 mt-10 justify-between">
        <h1 className="section-title text-xl  border-library-light-gray">
          {localeString(language, "nNotification")}
        </h1>
        <Button
          onClick={() => {
            handleMarkAllNotifications();
            location.reload();
          }}
          className="button-primary"
        >
          {localeString(language, "Readall")}
        </Button>
      </div>
      {notification?.length > 0 ? (
        <div>
          {notification?.map((user: INotification, i: number) => (
            <Row
              className="cursor-pointer"
              onClick={() =>
                handleMarkSingleNotifications(
                  user?.id,
                  user?.notificationable_id,
                  user?.notificationable_type
                )
              }
              key={user.id}
            >
              <Col
                className={`${
                  !user?.is_read
                    ? "p-4 w-full border-b bg-library-order-sidebar-background border-library-light-gray pt-3"
                    : "p-4 w-full border-b bg-library-white border-library-light-gray pt-3"
                }`}
                // className="p-4 w-full border-b border-library-light-gray mt-3"
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
      ) : (
        <>
          <DataNotFound
            title={localeString(language, "noNotification")}
            src={"/images/notification/n.svg"}
          />
        </>
      )}
    </div>
  );
};

export default Notification;
