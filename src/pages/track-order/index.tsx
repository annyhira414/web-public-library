import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { localeString } from "@/lib/helpers/utils";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { getData } from "@/lib/services";

const TrackOrder = () => {
  const language = Cookies.get("language");
  const [fine, setFine] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getTrack();
  }, [router.query]);

  const { id, order_id } = router.query;

  const getTrack = async () => {
    const res = await getData(
      `public_library/orders/${id}/track`,
      { purpose: "fine" },
      language,
      Cookies.get("token")
    );
    // console.log("fine===", res);
    if (res?.success) {
      setFine(res?.data);
      // console.log("finedata", res?.data);
    }
  };
  return (
    <div className="pl-content-container mb-24">
      <p className="section-title mt-12 text-xl border-b-2 border-b-library-primary p-2">
        {localeString(language, "trackTitle")}
      </p>
      <div className="bg-white rounded-b-lg">
        <div className="lg:pl-16 w-full">
          <p className="lg:p-12 pt-6 pb-6 px-4 flex justify-between ">
            <span className="text-sm">
              <h2 className="text-library-gray">
                {localeString(language, "trackOrderid")}
              </h2>
              <h3 className="font-semibold">{order_id}</h3>
            </span>
            <Link
              className="text-library-primary text-xs pt-4 hover:text-library-primary"
              href={`/user/my-orders/${id}`}
            >
              {localeString(language, "trackbutton")}
            </Link>
          </p>
        </div>
        <div className="lg:pl-16 pt-5 pl-4 pb-6">
          <p className="section-title text-base">
            {localeString(language, "trackStatus")}
          </p>
          {fine?.filter((item: any) => item?.status_key === "cancelled")
            ?.length > 0 ? (
            <div className="mt-7">
              {fine?.map((user: any, i: number) => {
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
                    {fine
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
      </div>
    </div>
  );
};

export default TrackOrder;

const data = [
  {
    id: 1,
    status: "Order Placed",
    status_key: "order_placed",
    changed_at: "2023-08-01T17:18:34.086+06:00",
  },
  {
    id: 2,
    status: "Order Confirmed",
    status_key: "order_confirmed",
    changed_at: "2023-08-01T17:58:43.467+06:00",
  },
  {
    id: 3,
    status: "Ready For Pickup",
    status_key: "ready_for_pickup",
    changed_at: "2023-08-01T17:58:47.312+06:00",
  },
  {
    id: 4,
    status: "In-Transit",
    status_key: "collected_by_3pl",
    changed_at: "2023-08-01T17:58:43.467+06:00",
  },
  {
    id: 5,
    status: "Delivered",
    status_key: "delivered",
    changed_at: "2023-08-01T17:58:47.312+06:00",
  },
];
