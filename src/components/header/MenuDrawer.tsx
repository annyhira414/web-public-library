import {FC} from "react";
import Link from "next/link";
import {Drawer, Menu} from "antd";
import type {MenuProps} from "antd";
import {RxCross1} from "react-icons/rx";
import {HeaderIcon} from "@/components/header";
import {localeString} from "@/lib/helpers/utils";
import {IoMdArrowDropdown} from "react-icons/io";
import Image from "next/image";

interface MenuDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  language: string | undefined;
}

export const MenuDrawer: FC<MenuDrawerProps> = ({
  language,
  isDrawerOpen,
  toggleDrawer,
}) => {
  const onClick: MenuProps["onClick"] = (e) => {
    toggleDrawer();
  };
  const items: MenuProps["items"] = [
    {
      label: <Link href="/"> {localeString(language, "home")}</Link>,
      key: "home",
    },

    {
      label: (
        <div className="flex items-center gap-1">
          {localeString(language, "aboutDPL")}
          <span className="text-lg text-black hidden">
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
              key: " history,",
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
        <div className="flex">
          {localeString(language, "books")}
          <span className="text-lg text-black hidden">
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
                  {" "}
                  {localeString(language, "allBooks")}
                </Link>
              ),
              key: "all_books",
            },
            {
              label: (
                <Link href="/e-books?page=1&title=">
                  {" "}
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
              key: "setting:2",
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
                <Link href="/"> {localeString(language, "ChildrensBook")}</Link>
              ),
              key: "setting:5",
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
          <span className="text-lg text-black hidden">
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
          <span className="text-lg text-black hidden">
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
    <Drawer
      className="custom-drawer"
      size="large"
      placement="left"
      onClose={toggleDrawer}
      open={isDrawerOpen}
    >
      <div className="flex ml-7 justify-between">
        <HeaderIcon language={language} />
        <button className=" text-white" onClick={toggleDrawer}>
          <RxCross1 className="w-7 h-7" />
        </button>
      </div>
      <Menu
        className="text-white ml-3 mt-10 space-y-4 text-base font-['']"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </Drawer>
  );
};
