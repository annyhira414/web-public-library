/** @format */

import Cookies from "js-cookie";
import {GetServerSidePropsContext} from "next";
import {serialize} from "object-to-formdata";
import {useSession, getSession} from "next-auth/react";
import {bn} from "../languages/bn";
import {en} from "../languages/en";

export const objectToFormData = (obj: any) => {
  return serialize(obj);
};

export const humanize = (str: string) => {
  let humanizedStr = "";
  if (str) {
    humanizedStr = str
      .replace(/^[\s_]+|[\s_]+$/g, "")
      .replace(/[_\s]+/g, " ")
      .replace(/\-/g, " ")
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
    // .replace(/^[A]+[a-zA-Z]$/, "");
  }
  return humanizedStr;
};

export const titleCase = (str: string = "") => {
  var splitStr = str?.toLowerCase().split("-");
  // const sliceStr = splitStr.slice(1)
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getAllCookies = () => {
  // const authSession = await getSession()

  const authToken = Cookies.get("token") || "";

  return authToken;
};

export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 50);
  }
};

export const QuickScrollToTop = () => {
  window.scrollTo(0, 0);
};
export const currentPageChecker = (
  context: GetServerSidePropsContext
): number => {
  if (context?.query?.page) {
    return parseInt(context?.query?.page as string);
  } else {
    return 1;
  }
};

export const currencyFormatter = (language = "en", value?: number) => {
  return new Intl.NumberFormat(language).format(value || 0);
};
export const commaRemover = (value: string) => {
  return value.replace(/\,/g, "");
};

export const translate = (
  language = "en",
  enValue?: string,
  bnValue?: string
) => {
  return language === "en" ? enValue || "" : bnValue || "";
};

export const localeString = (language = "bn", key: string) => {
  if (!language) return "";
  const jsonlanguage = language === "bn" ? bn : en;
  return jsonlanguage[key];
};

export const getTimeDifference = (createdDate: any) => {
  const now: any = new Date();
  const then: any = new Date(createdDate);
  const diffSeconds = Math.floor((now - then) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffSeconds < 60) {
    return `${diffSeconds} second${diffSeconds === 1 ? "" : "s"} ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }
};

export const filterFalsyValues = (obj: any) => {
  const newObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      newObj[key] = value;
    }
  }
  return newObj;
};

// export const scrollToSection = (targetSection:any) => {
//   const targetElement = document.querySelector(targetSection);
//   if (targetElement) {
//     const targetOffset = targetElement.offsetTop;
//     const currentOffset =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const distance = targetOffset - currentOffset;
//     if (distance > 0) {
//       const scrollStep = Math.ceil(distance / 200);
//       window.requestAnimationFrame(() =>
//         scrollToSectionStep(targetOffset, scrollStep)
//       );
//     }
//   }
// };
// const scrollToSectionStep = (targetOffset:any, scrollStep:any) => {
//   const currentOffset =
//     document.documentElement.scrollTop || document.body.scrollTop;
//   if (currentOffset < targetOffset) {
//     const newOffset = Math.min(currentOffset + scrollStep, targetOffset);
//     window.scrollTo(0, newOffset);
//     if (newOffset < targetOffset) {
//       window.requestAnimationFrame(() =>
//         scrollToSectionStep(targetOffset, scrollStep)
//       );
//     }
//   }
// };
