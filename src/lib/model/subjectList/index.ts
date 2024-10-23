/** @format */

export interface IsubList {
  id: number;
  title: string;
}

type commonType = string | string[] | null;
export interface IsubWise {
  sort_by: "asc";
  title: commonType;
  filter_with: ["subject", "ratings", "author"];
  subject_ids: commonType;
  rating: number | null;
  author_ids: commonType;
}
