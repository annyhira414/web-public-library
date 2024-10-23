import { SelectControl } from "@/components/controls/form-controls/SelectControl";
import { localeString } from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";
interface ICommonSidebar {
  title?: string;
  sideMenuItems: { value: any; label: string }[];
  dropDownPlaceholder?: string;
}

export const CommonSidebar: FC<ICommonSidebar> = ({
  title,
  sideMenuItems,
  dropDownPlaceholder,
}) => {
  const language = Cookies.get("language");
  const width = useMediaQuery("(min-width: 768px)");

  const {
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm<any>({
    mode: "all",
  });
  const router = useRouter();
  const myLink = watch("menu");

  useEffect(() => {
    router.push({
      pathname: myLink,
    });
  }, [myLink]);

  useEffect(() => {
    reset({
      menu: router.pathname,
    });
  }, [router.pathname]);

  return (
    <div className="md:bg-white lg:bg-white md:p-4 lg:p-4">
      {width ? (
        <div className="">
          <div className="order-status-title border-b pb-2 md:border-0 lg:border-0 md:pb-0 lg:pb:0">
            <h5 className="font-bold text-base text-gray-700 font-playfairDisplay pb-2">
              {title}
            </h5>
          </div>
          <div className="order-status-list px-2 text-xs flex flex-col">
            {sideMenuItems?.map((sideMenuItem) => (
              <Link href={sideMenuItem.value} key={sideMenuItem.value}>
                <div
                  className={`
                  ${
                    sideMenuItem.value === router.pathname
                      ? "select-control-color"
                      : "select-control-not-color"
                  } 
                  `}
                >
                  {sideMenuItem.label}
                </div>
              </Link>
            ))}
            
          </div>
        </div>
      ) : (
        <div>
          <SelectControl
            name="menu"
            control={control}
            errors={errors}
            options={sideMenuItems}
            placeholder={dropDownPlaceholder}
            className="mb-5 pb-1"
          />
        </div>
      )}
    </div>
  );
};
