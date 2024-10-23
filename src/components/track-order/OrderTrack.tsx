import { localeString } from "@/lib/helpers/utils";
import {getData} from "@/lib/services";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import React, {FC, useEffect} from "react";

interface IOrderTrack {
  language: string | undefined;
}

export const OrderTrack: FC<IOrderTrack> = ({language}) => {
  // useEffect(() => {
  //   getTrack();
  // }, []);

  // const getTrack = async () => {
  //   const res = await getData(
  //     `public_library/orders/${id}/track`,
  //     {purpose: "fine"},
  //     language,
  //     Cookies.get("token")
  //   );
  //   // if (res?.success) {
  //   //   setFine(res?.data);
  //   // }
  // };
  return (
    <div className="lg:pl-16 pt-5 pl-4 pb-6">
      <p className="section-title text-base">
        {localeString(language, "trackStatus")}
      </p>

      {data2?.filter((item: any) => item?.status_key === "cancelled")?.length >
      0 ? (
        <div className="mt-7">
          {data2?.map((user: any, i: number) => {
            return (
              <div className="mb-8 text-sm flex gap-2" key={user?.id}>
                {user?.status_key == "cancelled" ? (
                  <div>
                    <Image
                      src="/logo/close-circle.svg"
                      alt="App logo"
                      width={20}
                      height={20}
                    />
                  </div>
                ) : (
                  <div>
                    <Image
                      src="/logo/checked.svg"
                      alt="App logo"
                      width={20}
                      height={20}
                    />
                  </div>
                )}
                <ul>
                  <li className="font-semibold text-library-gray-700">
                    {user?.status}
                  </li>
                  <li className="mt-1 font-light">
                    {moment(user?.changed_at)?.format("DD MMMM YYYY")}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-7">
          {data?.map((user: any, i: number) => {
            return (
              <div className="mb-8 text-sm flex gap-2" key={user?.id}>
                {data2
                  ?.map((item: any) => item?.status_key)
                  ?.includes(user.status_key) ? (
                  <div>
                    <Image
                      src="/logo/checked.svg"
                      alt="App logo"
                      width={20}
                      height={20}
                    />
                  </div>
                ) : (
                  <div>
                    <Image
                      src="/logo/emptyRadio.svg"
                      alt="App logo"
                      width={20}
                      height={20}
                    />
                  </div>
                )}
                <ul>
                  <li className="font-semibold text-library-gray-700">
                    {user?.status}
                  </li>
                  <li className="mt-1 font-light">
                    {moment(user?.changed_at)?.format("DD MMMM YYYY")}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
const data = [
  {
    id: 1,
    status: "অর্ডার স্থাপন করা হয়েছে",
    status_key: "order_placed",
    changed_at: "2023-08-01T17:18:34.086+06:00",
  },
  {
    id: 2,
    status: "নিশ্চিত করা হয়েছে",
    status_key: "order_confirmed",
    changed_at: "2023-08-01T17:58:43.467+06:00",
  },
  {
    id: 3,
    status: "ready_for_pickup",
    status_key: "ready_for_pickup",
    changed_at: "2023-08-01T17:58:47.312+06:00",
  },
  {
    id: 4,
    status: "যাত্রাপথে আছে",
    status_key: "collected_by_3pl",
    changed_at: "2023-08-01T17:58:43.467+06:00",
  },
  {
    id: 5,
    status: "ডেলিভারী করা হয়েছে",
    status_key: "delivered",
    changed_at: "2023-08-01T17:58:47.312+06:00",
  },
];

const data2 = [
  {
    id: 1,
    status: "অর্ডার স্থাপন করা হয়েছে",
    status_key: "order_placed",
    changed_at: "2023-08-01T17:18:34.086+06:00",
  },

  {
    id: 3,
    status: "পাঠানোর জন্য প্রস্তুত",
    status_key: "order_confirmed",
    changed_at: "2023-08-01T17:58:47.312+06:00",
  },
  {
    id: 3,
    status: "বাতিল করা হয়েছে",
    status_key: "cancelled",
    changed_at: "2023-08-01T17:58:47.312+06:00",
  },
];
