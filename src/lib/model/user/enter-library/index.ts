/** @format */

export interface ILibrary {
  name: string;
  district: {
    id: number | null;
    name: string | null;
  };
  thana: {
    id: number;
    name: string;
  };
}

export interface IQrCode {
  id: number;
  library: ILibrary;
  services: string[];
  expired_at: string;
  qr_code: string;
  user_uniq_id: string;
}
