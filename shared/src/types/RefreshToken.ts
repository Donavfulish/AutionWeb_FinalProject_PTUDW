import { User } from "./User";
export type CreateRefreshToken = {
  user_id: User["id"];
  token: string;
  expired_at: Date;
};


export type RefreshToken = {
  id: number,
  user_id: User["id"];
  token: string;
  expired_at: Date;
  created_at: Date;
};