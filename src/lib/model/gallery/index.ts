/** @format */

export interface IGallery {
  id: number;
  title: string;
  total_items: number;
  description: string;
  album_type: string;
  thumbnail_url: {
    desktop_image: string;
    tab_image: string;
  };
}
