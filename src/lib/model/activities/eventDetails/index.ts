/** @format */

export interface IEventDetails {
  title: string;
  details: string;
  organizer: string;
  phone: string;
  email: string;
  venue: string;
  is_local: boolean;
  slug: string;
  start_date: string;
  end_date: string;
  end_time: string;
  is_all_library: boolean;
  is_registerable: boolean;
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
  libraries: [
    {
      name: string;
      code: string;
      district: {
        id: number;
        bn_name: string;
      };
      thana: {
        id: number;
        bn_name: string;
      };
      address: null;
    }
  ];
}
