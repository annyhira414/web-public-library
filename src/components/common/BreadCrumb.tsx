import React, { FC } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
// import { localeString } from "@/lib/helper/utils";
import { useRouter } from "next/router";

interface PageheaderProps {
  routes?: any;
  classname?: any;
  text_color?: string;
}

export const BreadCrumb: FC<PageheaderProps> = ({
  routes,
  classname = "common-breadcrumb",
  text_color = "text-white",
}) => {
  const routesAraay: any = routes;
  let { locale } = useRouter();
  return (
    <div className={`${classname}`}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href={"/"} passHref>
            <span className={`cursor-pointer ${text_color}`}>
              {/* {localeString(locale, "home")} */}
              Home
            </span>
          </Link>
        </Breadcrumb.Item>
        {routes?.map((route: any, i: any) =>
          route.path === "" ? (
            <Breadcrumb.Item key={i}>
              <span className={`${text_color}`}>{route.breadcrumbName}</span>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={i}>
              <Link href={route.path} passHref>
                <span className={`cursor-pointer ${text_color}`}>
                  {route.breadcrumbName}
                </span>
              </Link>
            </Breadcrumb.Item>
          )
        )}
      </Breadcrumb>
    </div>
  );
};
