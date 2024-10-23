export interface Ibarcode {
  barcode: string | undefined;
}

export interface IlistData {
  biblio_item: {
    author_name: string;
    barcode: string | number;
    book_name: string;
  };
  id: number;
  library_id: number;
}

export interface IReviewData {
  biblio: {
    id: number;
    title: string;
  };
  created_at: string;
  id: number;
  rating: number;
  text: string;
  user: {
    id: number;
    image_url: string | null;
    name: string;
  };
}

export interface IReviewDetails {
  biblio_item: {
    author_name: string[];
    barcode: string;
    book_name: string;
  };
  book_image_url: string | null;

  created_at: string;
  id: number;
  library_id: string;
  review_body: string;
}

export interface IBookAuthor {
  id: number;
  full_name: string;
}
export interface IBookReview {
  authors: [
    {
      id: number;
      full_name: string;
    }
  ];

  biblio_publication: null | string;
  id: number;
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  is_wishlisted: boolean;
  isbn: string | null;
  series_statement_volume: string;
  slug: string;
  title: string;
  total_reviews: number;
  average_rating: number;
}

export interface ISuggestions {
  id: number;
  title: string;
  name: string;
}

export interface ISuggestionsArray {
  value: string;
  label: string;
}
