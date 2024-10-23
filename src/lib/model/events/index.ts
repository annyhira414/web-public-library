export interface IEvent {
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
}

export interface IForm {
  name: string;
  phone: string;
  identity_type: string;
  identity_number: string;
  email: string;
  address: string;
  father_name: string;
  mother_name: string;
  profession: string;
}

export interface IOption {
  id: string;
  name: string;
  code: string;
  value: string;
  label: string;
}
