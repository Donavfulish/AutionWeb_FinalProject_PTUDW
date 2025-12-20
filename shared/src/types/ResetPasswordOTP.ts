import { User } from "./User";
export type CreateResetPasswordOTP = {
  user_id: User["id"];
  otp_hash: string;
  expired_at: Date;
};

export type UserOTP = {
  user_id: User["id"];
  otp: string;
  is_verify: boolean;
  expired_at: Date;
};
