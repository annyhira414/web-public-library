import internal from "stream";
import {number} from "yup";

export interface Ioption {
  value: string | number | any;
  label: string | number | JSX.Element;
  deiscription?: string | number | JSX.Element;
}

export interface IOptionBookTransferRequests {
  value: string | number | any | null;
  label: string | number | null | JSX.Element;
  deiscription?: string | number | JSX.Element;
}

export interface IAuthor_id {
  id: number;
  full_name: string;
}

export interface IAuthor {
  id: number;
  text: string;
}
export interface ISubject {
  id: number;
  text: string;
}
export interface ISubject_id {
  id: number;
  title: string;
}

export interface IBookDemand {
  id: number;
  biblio_title: string | null;
  authors: string[] | null;
}

// export interface IBookDemandModalData {

// }
export interface IBlockStatusDetails {
  status: string;
  bookName: string;
  preferredLibrary: string;
  requestedDate: string;
  arrivalDate: string;
  language: string | undefined;
}

export interface ISecurityHistorylistData {
  amount: number;
  created_at: string;
  id: number;
  note: string | null;
  payment_method: string;
  status: string;
  user: {
    id: number;
    full_name: string;
    phone: string;
  };
}

export interface ISecurityHistoryItem {
  amount: number;
  created_at: string;
  id: number;
  note: string | null;
  payment_method: string;
  status: string;
  user: {
    id: number;
    full_name: string;
    phone: string;
  };
}

export interface IDivisions {
  id: number;
  label: string;
  value: number;
}

export interface IDistricts {
  id: number;
  label: string;
  value: number;
}

export interface IThanas {
  id: number;
  label: string;
  value: number;
}

export interface ISaveAdd {
  id: number;
  label: string;
  value: string;
}
export interface IDivisionsItem {
  id: number;
  name: string;
}
export interface IDistrictsItem {
  id: number;
  name: string;
}

export interface IThanasItem {
  id: number;
  name: string;
}

export interface ISaveAddItem {
  id: number;
  name: string;
}

export interface ISaveAddress {
  id: number;
  name: string;
  recipient_name: string;
  recipient_phone: string;
  address_type?: null | string;

  address: string;
  division: {
    id: number;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  thana: {
    id: number;
    name: string;
  };
  library: {
    id: number;
    name: string;
    code: string;
  };
}

export interface IStatusItem {
  id: number | null;
  value: string | null;
  name: string | null | JSX.Element;
}

export interface IBookTransfer {
  biblio: string;
  id: number;
  status: string;
}

export interface IDetailsData {
  biblio: {
    id: number;
    slug: string;
    title: string;
  };
  id: number;
  receiver_library: {
    id: number;
    name: string;
    code: string;
  };
  status: string;
  arrived_at: string | null;
  created_at: string | null;
}

export interface ILibrary {
  id: number;
  name: string;
  code: string;
}

// export interface IDataCardHistory {
//   amount: number;
//   created_at: string;
//   id: number;
//   note: null | string;
//   payment_method: string;
//   status: string;
//   user: {
//     full_name?: string;
//     id?: number;
//     phone?: string;
//   };
// }

export interface ILibraryCardHistoryData {
  id: number;
  barcode: string;
  issued_library: {
    id: number;
    name: string;
    code: string;
    district: {
      id: null | number;
      name: null;
    };
    thana: {
      id: number | null;
      name: string;
    };
  };
  name: string;
  issue_date: string | null;
  expire_date: null | number;
  membership_category: string;
  card_status: {
    id: null | number;
    status_key: string;
    patron_status: string;
  };
  is_active: boolean;
  is_lost: boolean;
  is_damaged: boolean;
  delivery_type: string;
  address_type: null | string;
  recipient_name: null | string;
  recipient_phone: null | string;
  delivery_address: null | string;
  division: null | string;
  district: null | string;
  thana: null | string;
  gd_image_url: null | string;
  damaged_card_image_url: null | string;
  reference_card: {
    id: number;
    barcode: string;
    issued_library: {
      name: string;
      code: string;
      district: {
        id: null;
        name: null | string;
      };
      thana: {
        id: number;
        name: string;
      };
    };
    name: string;
    issue_date: null | string;
    expire_date: null | string;
    membership_category: string;
    card_status: {
      id: number | null;
      status_key: string;
      patron_status: string;
    };
    is_active?: boolean;
    is_lost?: boolean;
    is_damaged?: boolean;
    gd_image_url: string | null;
    damaged_card_image_url?: null | string;
  };
}

export interface IuserDetails617 {
  message: string;
  status_code: number;
  id: number;
}
export interface IuserDetails200 {
  amount: number;
  id: number;
  payment_method: string;
  message: string | undefined;
}

export interface IItemUserDetails {
  amount?: number;
  id?: number;
  payment_method?: string | undefined[];
}

export interface IData {
  password: string;
  phone: string;
}
export interface IItem {
  message: string | undefined;
  status_code?: number;
  id?: number;
}

export interface IModalData {
  isbn: string;
  publication: string;
  volume: string;
  biblio_title: string | null | undefined;
  edition: string;
  id: number;
  image: {
    tab_image: null | string;
    desktop_image: null | string;
  };
  biblio_subjects: string[];
  authors: string[];
}
