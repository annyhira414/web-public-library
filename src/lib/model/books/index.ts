import {number} from "yup";

export interface IBook {
  id?: number;
  is_ebook?: boolean;
  slug: string;
  title: string;
  is_wishlisted: boolean;
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  authors: [
    {
      full_name: string;
    }
  ];
  series_statement_volume?: any;
  average_rating: number;
  total_reviews: number;
}
export interface IWishlist {
  id: number;
  name: string;
  slug: string;
  biblio: {
    title: string;
    is_wishlisted: boolean;
    authors: [
      {
        full_name: string;
      }
    ];
  };
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  author: string;
  average_rating: number;
  total_review: number;
}

export interface IFavBooks {
  id: number;
  name: string;
  biblio: {
    slug: string;
    title: string;
    is_wishlisted: boolean;
    authors: [
      {
        full_name: string;
      }
    ];
    image_url: {
      desktop_image: string | null;
      tab_image: string | null;
    };
    average_rating: number;
    total_review: number;
  };
  average_rating: number;
  author: string;
}

export interface ISubject {
  id: number;
  name: string;
}

export interface IAuthor {
  id: number;
  full_name: string;
}

export interface IPublication {
  id: number;
  title: string;
}
export interface IOption {
  id: number;
  title: string;
  full_name: string;
}
export interface IReviewRating {
  slug: number;
  title: string;
  is_wishlisted: boolean;
  siug: string;
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  author: string;
  average_rating: number;
  total_reviews: number | string;
  language: string;
}

export interface IReviewRating {
  id: number;
  user: {
    id: number;
    name: string;
  };
  icon: string;
  rating: number;
  text: string;
}

export interface IContent {
  id: number;
  slug: string;
  title: string;
  is_wishlisted: boolean;
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  author?: any;
  full_ebook_file_url: string;

  authors?: any;
  remainder_of_title: string;
  series_statement_volume: number;
  isbn: number | string;
  language: string;
  biblio_edition: string;
  date_of_publication: string;
  average_rating: number;
  total_review: number;
  subjects?: any;
  subject?: any;
  biblio_publication: string;
  full_call_number: string;
  preview_ebook_file_url: string;
}

export interface IAllLibrary {
  name: string;
  district: {
    id: number;
    name: string;
  };
  thana: {
    id: number;
    name: string;
  };
}
export interface IOptionAllLibrary {
  code: string;
  name: string;
}

// export interface IBookReview {
//   id: number;
//   text: string;
//   rating: number;
//   user: {
//     id: number;
//     name: string;
//     image_url: string;
//   };
//   created_at: string;
// }

// export interface IGetAllReview {
//   data: IBookReview[];
//   success: boolean;
// }

export interface IBookSubject {
  id: number;
  title: string;
}
export interface IBookAuthors {
  id?: number;
  full_name: string;
}
export interface IBookLibrary {
  is_available: boolean;
  library_name?: string;
  libraryName?: string;
  //"shelves": [ "A1", "A5"]
}
