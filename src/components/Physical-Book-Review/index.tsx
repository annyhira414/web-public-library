import dynamic from "next/dynamic";

import {Common} from "@/components/Physical-Book-Review/Common/Common";

const BookDetails = dynamic(
  () => import("../../components/Physical-Book-Review/BookReview/BookDetails")
);
const WriteReview = dynamic(
  () => import("../../components/Physical-Book-Review/BookReview/WriteReview")
);

export {Common, BookDetails, WriteReview};
