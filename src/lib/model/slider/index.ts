export interface ISlider {
  id: number;
  title: string;
  link: string;
  serial_no: number;
  image_url: {
    desktop_image: string | null;
    tab_image: string | null;
  };
}
