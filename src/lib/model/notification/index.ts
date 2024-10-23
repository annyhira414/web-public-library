/** @format */

export interface INotification {
  id: number;
  notificationable_id: number;
  notificationable_type: string;
  notifiable_id: number;
  notifiable_type: string;
  message: string;
  is_read: boolean;
  title:string
  created_at: string;
}

export interface ICount {
  count: number ;
}
