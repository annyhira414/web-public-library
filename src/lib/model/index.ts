export interface Header {
  token: string;
}

export interface Ioption {
  value: string | number;
  label: string | number | JSX.Element;
}
export interface global {
  index: number;
  published_date: string;
  document_url: string;
  title: string;
  slug: string;
  is_local: boolean;
  start_date: number | string;
  end_date: number | string;
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  details: string;
  filter_results: any;
  value: string | number;
  label: string | number | JSX.Element;
  id: number;
  total_items: number;
  description: string;
  thumbnail_url: {
    desktop_image: string;
    tab_image: string;
  };
}
export interface option {
  // index: number;
  // published_date: string;
  // document_url: string;
  // title: string;
  // slug: string;
  // is_local: boolean;
  // start_date: number | string;
  // end_date: number | string;
  // image_url: {
  //   desktop_image: string | null;
  //   tab_image: string | null;
  // };
  // details: string;
  // filter_results: any;
  value: string | number;
  label: string | number | JSX.Element;
  // id: number;
  // total_items: number;
  // description: string;
  // thumbnail_url: {
  //   desktop_image: string;
  //   tab_image: string;
  // };
}

export interface optionAllLibrary {
  value: string | number;
  label: string | number | JSX.Element;
}

// export interface Istatistics {
//   id: number;
//   title: string;
//   bn_title: string;
//   description: string;
//   bn_description: string;
//   is_active: boolean;
//   slug: string;
//   created_at: string;
//   banner_url: string;
// }

// export interface StatisticPage {
//   id: number;
//   title: string;
//   bn_title: string;
//   description: string;
//   bn_description: string;
//   is_active: boolean;
//   slug: string;
//   created_at: string;
//   banner_url: string;
// }
// export interface Contact {
//   id: number;
//   title: string;
//   bn_title: string;
//   description: string;
//   bn_description: string;
//   is_active: boolean;
//   slug: string;
//   created_at: string;
//   banner_url: string;
// }
// export interface About{
//   id: number;
//   title: string;
//   bn_title: string;
//   description: string;
//   bn_description: string;
//   is_active: boolean;
//   slug: string;
//   created_at: string;
//   banner_url: string;
// }
