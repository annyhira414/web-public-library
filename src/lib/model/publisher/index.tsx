export interface IHistory {
  id: number;
  memorandum: {
    id: number;
    memorandum_no: string;
    tender_session: string;
  };
  track_no?: number | string;
}

export interface DataType {
  key: React.Key;
  no: any;
  title: string;
  author: string;
  isbn: string;
  dateOfPublication: string;
  subject: string;
  websiteLink: string;
  edition: string;
  print: string;
  price: number;
  typeOfBindings: string;
  numberOfPage: number;
  typeOfPaper: string;
  remarks: string;
}

export interface IbookTable {
  id: number;
  author_name: string;
  isbn: string;
  publication_date: string;
  title: string;
}
export interface IBookPublisher {
  id: number;
  authors: string;
  isbn: string;
  publication_date: string;
  title: string;
}

export interface ITableDetailsProps {
  id: number;
}
export interface IPublisherData {
  publicationOrganizationName: null | string;
  publicationOrganizationPhoneNumber: null | string;
  publicationOrganizationEmailAddress: null | string;
  publisherName: any;
  publisherMobileNumber: null | string;
  address: string;
  authorName: string;
  author_name: string;
  id?: number;
  name: string;
  publication_name: string;
  organization_email: string;
  organization_phone: string;
  publisher_phone: string;
}

export interface IMemorandumDetailsData {
  id: number;
  is_final_submitted: boolean;
  memorandum: {
    id: number;
    memorandum_no: string;
  };
  publisher: {
    address: string;
    author_name: string;
    id: number;
    name: string;
    organization_email: string;
    organization_phone: string;
    publication_name: string;
    publisher_phone: string;
    track_no: string;
  };
  publisher_biblios: {
    authors: string;
    binding_type: string;
    comment: string;
    edition: string;
    id: number;
    is_foreign: false;
    isbn: string;
    paper_type: string;
    price: number;
    print: string;
    publication_date: string;
    publisher_address: string;
    publisher_name: string;
    publisher_phone: string;
    publisher_website: string;
    subject: string;
    title: string;
    total_page: number;
  }[];
}

export interface IMemorandumData {
  book_delivery_date?: string;
  created_by_id?: number;
  description?: string;
  end_date?: string;
  end_time?: string;
  id?: number;
  image_url?: string;
  is_publisher_submitted?: boolean;
  is_visible?: boolean;
  last_submission_date?: string;
  memorandum_no: string;
  start_date?: string;
  start_time?: string;
  status?: string;
  tender_session?: string;
  updated_by_id?: null;
  work_order_date?: string;
}

export interface IPublicationDetails {
  address: string;
  author_name: string;
  id: number;
  name: string;
  organization_email: string;
  organization_phone: string;
  publication_name: string;
  publisher_phone: string;
  track_no: string;
}

export interface IlistData {
  author_name: string;
  binding_type: string;
  comment: string;
  edition: string;
  is_foreign: boolean;
  isbn: string;
  memorandum_id: number;
  paper_type: string;
  price: number;
  print: string;
  publication_date: string;
  publisher_address: string;
  publisher_phone: string;
  publisher_website: string;
  subject: string;
  title: string;
  total_page: string;
}

export interface IDetailsData {
  authors: string[];
  binding_type: string;
  comment: string;
  edition: string;
  is_foreign: boolean;
  isbn: string;
  memorandum: {
    id: number;
    memorandum_no: string;
  };
  paper_type: string;
  price: number;
  print: string;
  publication_date: string;
  publisher_address: string;
  publisher_phone: string;
  publisher_website: string;
  publisher_name: string;
  subject: string;
  title: string;
  total_page: number;
}

export interface IDetailsData {
  authors: string[];
  binding_type: string;
  comment: string;
  edition: string;
  is_foreign: boolean;
  isbn: string;
  memorandum: {
    id: number;
    memorandum_no: string;
  };
  paper_type: string;
  price: number;
  print: string;
  publication_date: string;
  publisher_address: string;
  publisher_phone: string;
  publisher_website: string;
  publisher_name: string;
  subject: string;
  title: string;
  total_page: number;
}
