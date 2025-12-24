import { User } from "./User";
export type CreateResetPasswordOTP = {
  user_id: User["id"];
  otp_hash: string;
  expired_at: Date;
};

export type UserOTP = {
  user_id: User["id"] | null;
  otp: string;
};

export type UserRegisterOTP = {
  email: string | null;
  otp: string;
};

export type UserHashOTP = {
  user_id: User["id"];
  otp_hash: string;
  is_verified: boolean;
  expired_at: Date;
};

export type PendingUserHashOTP = {
  user_id: User["id"];
  user_name: string;
  email: string;
  password_hash: string;
  name: string;
  address: string;
  day_of_birth: string;
  otp_hash: string;
  is_verified: boolean;
  expired_at: Date;
};
