import {number} from "yup";

export interface ILibaryList {
  name: string;
  code: string;
  district: {
    id: number;
    name: string;
  };
  thana: {
    id: number;
    name: string;
  };
}
export interface IDistrictList {
  id: number;
  name: string;
  value: string;
  code: string | number;
}

export interface ILibraryDetails {
  name: string;
  code: string | number;
  head_of_library: {
    name: string;
    phone: number;
    designation: string;
    telephone: number;
  };
  lat: null | string;
  long: null | string;
  email: string;
  opening_hour: {
    start_week_day: string;
    end_week_day: string;
    start_week_hour: string;
    end_week_hour: string;
  };
  description: string;
  phone: number;
  address: null;
  library_images: [
    {
      small: string | null | any;
      large: string | null | any;
    }
  ];
  working_days?: [
    {
      id: number;
      end_time: string;
      is_holiday: boolean;
      start_time: string;
      week_days: string;
    }
  ];
}

export interface Iitem {
  id: number;
  end_time: string;
  is_holiday: boolean;
  start_time: string;
  week_days: string;
}
