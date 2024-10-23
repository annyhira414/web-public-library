/** @format */

import dayjs from "dayjs";
import { Rate } from "antd";
import { GetServerSideProps } from "next";
import { localeString } from "../helpers/utils";

export const CURRENT_DATE = dayjs(new Date()).format("YYYY-MM-DD");
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const MAX_FILE_SIZE = 1 * 1024 * 1024;
export const DEBOUNCE_TIME = 600;

export const genderFunc = (lang = "bn") => {
  return [
    { id: 1, value: "male", label: `${localeString(lang, "male")}` },
    { id: 2, value: "female", label: `${localeString(lang, "female")}` },
    { id: 3, value: "other", label: `${localeString(lang, "others")}` },
  ];
};

export const DOCUMENT_TYPE = [
  { id: 1, value: "nid", label: "NID" },
  { id: 2, value: "passport", label: "Passport" },
  { id: 3, value: "birth_registration", label: "Birth Registration" },
];
export const ID = [
  { id: 1, value: "nid", label: "NID" },
  { id: 2, value: "birth_certificate", label: "Birth Certificate" },
  { id: 3, value: "student_id", label: "Student Id" },
];
export const DIVISION = [
  { id: 1, value: "dhaka", label: "Dhaka" },
  { id: 2, value: "barisal", label: "Barisal" },
  { id: 3, value: "chittagong", label: "Chittagong" },
  { id: 4, value: "khulna", label: "Khulna" },
  { id: 5, value: "rajshahi", label: "Rajshahi" },
  { id: 6, value: "rangpur", label: "Rangpur" },
];

export const DISSTRICTS = [
  { id: 1, value: "faridpur", label: "Faridpur" },
  { id: 2, value: "gazipur ", label: "Gazipur " },
  { id: 3, value: "narayanganj", label: "Narayanganj" },
  { id: 4, value: "narsingdi", label: "Narsingdi" },
];

export const THANA = [
  { id: 1, value: "banani", label: "Banani" },
  { id: 2, value: "gazipur ", label: "Gazipur " },
  { id: 3, value: "narayanganj", label: "Narayanganj" },
  { id: 4, value: "narsingdi", label: "Narsingdi" },
];
export const SELECTBASELIBRARY = [
  { id: 1, value: "dhakaPublicLibrary", label: "Dhaka Public Library" },
  { id: 2, value: "gazipurPublicLibrary ", label: "Gazipur Public Library " },
  {
    id: 3,
    value: "narayanganjPublicLibrary",
    label: "Narayanganj Public Library",
  },
  { id: 4, value: "narsingdiPublicLibrary", label: "Narsingdi Public Library" },
];
export const DELIVERYMETHOD = [
  { id: 1, value: "home", label: "Home" },
  { id: 2, value: "picup", label: "Pickup" },
];
export const CATEGORIES = [
  {
    id: 1,
    value: "allCategoties",
    label: "All Categoties",
  },
  {
    id: 2,
    value: "drama",
    label: "Drama",
  },
  {
    id: 3,
    value: "mystery",
    label: "Mystery",
  },
  {
    id: 4,
    value: "novels",
    label: "Novels",
  },

  {
    id: 5,
    value: "recipeBooks",
    label: "Recipe Books",
  },

  {
    id: 6,
    value: "historical",
    label: "Historical",
  },
  {
    id: 7,
    value: "romance",
    label: "Romance",
  },
];

export const AUTHORS = [
  {
    id: 1,
    value: "burtGeller",
    label: "Burt Geller",
  },
  {
    id: 2,
    value: "candyCarson",
    label: "Candy Carson",
  },
  {
    id: 3,
    value: "drewBerrymore",
    label: "Drew Berrymore",
  },
  {
    id: 4,
    value: "karenPerry",
    label: "Karen Perry",
  },
  {
    id: 5,
    value: "richardMann",
    label: "Richard sMann",
  },
  {
    id: 6,
    value: "donNorman",
    label: "Don Norman",
  },
];
export const RATING: any[] = [
  {
    id: 1,
    value: "Rating-5",
    label: <Rate defaultValue={5} className="text-black text-sm" />,
  },
  {
    id: 2,
    value: "Rating-4",
    label: <Rate defaultValue={4} className="text-black text-sm" />,
  },
  {
    id: 3,
    value: "Rating-3",
    label: <Rate defaultValue={3} className="text-black text-sm" />,
  },
  {
    id: 4,
    value: "Rating-2",
    label: <Rate defaultValue={2} className="text-black text-sm" />,
  },
  {
    id: 5,
    value: "Rating-1",
    label: <Rate defaultValue={1} className="text-black text-sm" />,
  },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      language: context?.req?.cookies?.["language"] || "bn",
    },
  };
};

export const acceptFileFormat = ".png, .jpg, .jpeg, .webp";
