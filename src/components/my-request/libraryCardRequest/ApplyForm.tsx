import {CustomRadioGroup} from "@/components/controls/form-controls/CustomRadioGroup";
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {PickUpFromLibrary} from "./PickUpFromLibrary";
import HomeDelivery from "./HomeDelivery";

interface IApplyForm {
  language: string | undefined;
}

export const ApplyForm: FC<IApplyForm> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const [applyReason, setApplyReason] = useState<string>("");
  const router = useRouter();
  const {
    control,
    watch,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      reason: router?.query?.reason === "damage" ? "damage" : "lost",
      delivery:
        router?.query?.delivery === "home_delivery"
          ? "home_delivery"
          : "pickup",
    },
    mode: "all",
  });

  const delivery = watch("delivery");
  const reason: string = watch("reason");

  useEffect(() => {
    router.replace({
      // pathname: "/my-request/library-card-request",
      query: {
        reason: reason,
        delivery: delivery,
      },
    });
    setApplyReason(reason);
  }, [delivery, reason]);

  const reasoneRadio = [
    {
      label: <>{localeString(language, "lost")}</>,
      value: "lost",
    },
    {
      label: <>{localeString(language, "destroyed")}</>,
      value: "damage",
    },
  ];

  const deliveryOptions = [
    {
      label: (
        <div>
          <div>
            <div className="flex justify-center">
              <Image
                src="/images/borrow/location.svg"
                alt="App logo"
                width={44}
                height={44}
              />
            </div>
            <div>
              <h1 className="section-title text-sm lg:text-base pt-4">
                {localeString(language, "borrowPickup")}
              </h1>
              <p className="mt-1 lg:text-sm text-xs text-library-gray">
                {localeString(language, "borrwPickupCost")}
              </p>
            </div>
          </div>
        </div>
      ),
      value: "pickup",
    },
    {
      label: (
        <div>
          <div className="">
            <div className="flex justify-center">
              <Image
                src="/images/borrow/home.svg"
                alt="App logo"
                width={44}
                height={44}
              />
            </div>
            <h1 className="section-title text-sm lg:text-base pt-4">
              {localeString(language, "borrowHomeDelivery")}
            </h1>
            <p className="mt-1 lg:text-sm text-xs text-library-gray">
              {localeString(language, "borrowHomeDeliveryCost")}
            </p>
          </div>
        </div>
      ),
      value: "home_delivery",
    },
  ];

  return (
    <div className="pb-12">
      <div>
        <>
          <div className="bg-white  mt-8 rounded-lg ">
            <h2 className="card-title pt-4 pl-4">
              {localeString(language, "reason")}
            </h2>
            <div className="pb-4 mx-4">
              <CustomRadioGroup
                className="section border hover:border-library-primary broder-library-gray-300 my-3 rounded-lg "
                name="reason"
                errors={errors}
                options={reasoneRadio}
                control={control}
                direction="vertical"
              />
            </div>
          </div>
          <div className="pt-4">
            <div className="bg-white  pt-4 pb-6 rounded-lg ">
              <h1 className="section-title text-xl pl-4">
                {localeString(language, "borrowDelivery")}
              </h1>

              <div className="mt-5 mx-4 group-radio">
                <CustomRadioGroup
                  className="section border hover:border-library-primary broder-library-gray-300  rounded-lg "
                  name="delivery"
                  errors={errors}
                  options={deliveryOptions}
                  control={control}
                />
              </div>
            </div>
          </div>
        </>

        {delivery === "pickup" && (
          <PickUpFromLibrary language={language} reason={reason} />
        )}

        {delivery === "home_delivery" && applyReason && (
          <HomeDelivery language={language} reason={applyReason} />
        )}
      </div>
    </div>
  );
};
