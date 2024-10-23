import { CustomRadioGroup } from "@/components/controls/form-controls/CustomRadioGroup";
import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { HomeDelivery, PickUpFromLibrary } from "@/components/book-borrow";
import { useRouter } from "next/router";
const BagBookCard = dynamic(() => import("@/components/book/bagBookCard"), {
  loading: () => <p>Loading...</p>,
});

interface IBookBorrow {
  language: string | undefined;
}

const BorrowSummary: FC<IBookBorrow> = ({ language }) => {
  language = Cookies.get("language");
  const router = useRouter();
  const {
    control,

    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      delivery:
        router?.query?.deliveryType === "home_delivery"
          ? "home_delivery"
          : "pickup",
    },
    mode: "all",
  });

  const delivery = watch("delivery");

  useEffect(() => {
    router.replace({
      pathname: "book-borrow",
      query: {
        deliveryType: delivery,
      },
    });
  }, [delivery]);

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
    <div className="pl-content-container">
      <div>
        <form>
          <div className="bg-library-white p-5 lg:p-10 mt-8 h-auto  rounded">
            <h1 className="section-title text-xl">
              {localeString(language, "borrowDelivery")}
            </h1>
            <div className="mt-5">
              <CustomRadioGroup
                // {...register}
                className="section border hover:border-library-primary broder-library-gray-300  rounded-lg "
                name="delivery"
                errors={errors}
                options={deliveryOptions}
                control={control}
                isIconcenter={true}
              />
            </div>
          </div>
        </form>
        {delivery === "pickup" ? (
          <PickUpFromLibrary language={language} />
        ) : (
          <HomeDelivery language={language} />
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;
