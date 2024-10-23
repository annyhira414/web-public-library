import {useState, FC, useEffect} from "react";
import type {MenuProps} from "antd";
import {Menu} from "antd";
import Link from "next/link";
import {IoMdArrowDropdown} from "react-icons/io";
import {localeString} from "@/lib/helpers/utils";
import {useRouter} from "next/router";

interface IHeaderMenusProps {
  language: string | undefined;
}

export const HeaderMenus: FC<IHeaderMenusProps> = ({language}) => {
  const [current, setCurrent] = useState("mail");
  const {pathname} = useRouter();
  // console.log("path", pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  const menuKeys: any = {
    "/": "home",
    "/about": "about-us",
    "/mission": "mission",
    "/vision": "vision",
    "/history": "history",
    "/privacy-policy": "privacy-policy",
    "/contact-us": "contact-us",
    "/membership-policy": "membership-policy",
    "/books": "all_books",
    "/books/[slug]": "all_books",
    "/e-books": "e-books",
    "/e-books/[slug]": "e-books",
    "/activities/notice": "notice",
    "/activities/notice/[slug]": "notice",
    "/activities/events": "events",
    "/activities/events/[slug]": "events",
    "/activities/events/eventRegister": "events",
    "/activities/newspaper-list": "newspaper",
    "/activities/newspaper-list/[slug]": "newspaper",
    "/gallery/photo-gallery": "photo-gallery",
    "/gallery/photo-gallery/[slug]": "photo-gallery",
    "/gallery/video-gallery": "video-gallery",
    "/gallery/video-gallery/[slug]": "video-gallery",
    "/library": "library",
    "/library/[slug]": "library",
  };
  useEffect(() => {
    setCurrent(menuKeys[pathname]);
  }, [pathname]);

  const items: MenuProps["items"] = [
    {
      label: <Link href="/"> {localeString(language, "home")}</Link>,
      key: "home",
    },

    {
      label: (
        <div className="flex items-center gap-1">
          {localeString(language, "aboutDPL")}
          <span className="text-lg text-black ">
            <IoMdArrowDropdown />
          </span>
        </div>
      ),
      key: "about-DPL",
      children: [
        {
          type: "group",
          children: [
            {
              label: (
                <Link href="/about"> {localeString(language, "aboutUs")}</Link>
              ),
              key: "about-us",
            },
            {
              label: (
                <Link href="/mission">{localeString(language, "mission")}</Link>
              ),
              key: "mission",
            },
            {
              label: (
                <Link href="/vision">{localeString(language, "vision")}</Link>
              ),
              key: "vision",
            },
            {
              label: (
                <Link href="/history">{localeString(language, "history")}</Link>
              ),
              key: "history",
            },
            {
              label: (
                <Link href="/privacy-policy">
                  {localeString(language, "privacyPolicy")}
                </Link>
              ),
              key: "privacy-policy",
            },
            {
              label: (
                <Link href="/contact-us">
                  {localeString(language, "contactUs")}
                </Link>
              ),
              key: "contact-us",
            },
            {
              label: (
                <Link href="/membership-policy">
                  {localeString(language, "membershipPolicy")}
                </Link>
              ),
              key: "membership-policy",
            },
          ],
        },
      ],
    },

    {
      label: (
        <div className="flex items-center gap-1 ">
          {localeString(language, "books")}
          <span className="text-lg text-black ">
            <IoMdArrowDropdown />
          </span>
        </div>
      ),
      key: "books",
      children: [
        {
          type: "group",
          children: [
            {
              label: (
                <Link href="/books?page=1&title=">
                  {localeString(language, "allBooks")}
                </Link>
              ),
              key: "all_books",
            },

            {
              label: (
                <Link href="/e-books?page=1&title=">
                  {localeString(language, "eBooks")}
                </Link>
              ),
              key: "e-books",
            },

            {
              //: "Liberation war",
              label: (
                <Link href="/"> {localeString(language, "liberationWar")}</Link>
              ),
              key: "liberationWar",
            },
            {
              //label: "Art & Photography",
              label: (
                <Link href="/">{localeString(language, "artPhotography")}</Link>
              ),
              key: "setting:3",
            },
            {
              //label: "Biography",
              label: (
                <Link href="/"> {localeString(language, "biography")}</Link>
              ),
              key: "setting:4",
            },
            {
              //label: "Children's Book",
              label: (
                <Link href="/"> {localeString(language, "childrensBook")}</Link>
              ),
              key: "childrensBook",
            },
          ],
        },
      ],
    },
    {
      //label: "Liberation war",
      label: <> {localeString(language, "liberationWar")}</>,
      key: "liberation-war",
    },
    {
      //label: "Bongobondhu",
      label: <> {localeString(language, "bongobondhu")}</>,
      key: "bongobondhu",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          {localeString(language, "activities")}
          <span className="text-lg text-black">
            <IoMdArrowDropdown />
          </span>
        </div>
      ),
      key: "activities",
      children: [
        {
          type: "group",
          children: [
            {
              label: (
                <Link href="/activities/notice?page=1&startDate=&endDate=&keywords=">
                  {localeString(language, "notice")}
                </Link>
              ),
              key: "notice",
            },
            {
              label: (
                <Link href="/activities/events">
                  {localeString(language, "events")}
                </Link>
              ),
              key: "events",
            },
            {
              label: (
                <Link href="/activities/newspaper-list">
                  {localeString(language, "newspaper")}
                </Link>
              ),
              key: "newspaper",
            },
          ],
        },
      ],
    },
    {
      label: (
        <div className="flex items-center gap-1">
          {localeString(language, "gallery")}
          <span className="text-lg text-black">
            <IoMdArrowDropdown />
          </span>
        </div>
      ),
      key: "gallery",
      children: [
        {
          type: "group",
          children: [
            {
              label: (
                <Link href="/gallery/photo-gallery?page=1">
                  {localeString(language, "photoGallery")}
                </Link>
              ),
              key: "photo-gallery",
            },
            {
              label: (
                <Link href="/gallery/video-gallery?page=1">
                  {localeString(language, "videoGallery")}
                </Link>
              ),
              key: "video-gallery",
            },
          ],
        },
      ],
    },
    {
      label: <Link href="/library"> {localeString(language, "library")}</Link>,
      key: "library",
    },
  ];
  return (
    <div>
      <Menu
        className="space-x-1 custom-header-menus"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
