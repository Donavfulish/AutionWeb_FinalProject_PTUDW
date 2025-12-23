import { UserConfirm } from './User';
export type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  profile_img: string;
  role: "guest" | "bidder" | "seller" | "admin";
  seller_expired_date?: Date;
  positive_points: number;
  negative_points: number;
  created_at: Date;
  updated_at: Date | null;
};

export type ShortUser = Pick<User, "id" | "name" | "profile_img">;

export type RegisterRequest = {
  username: string;
  password: string;
  email: User["email"];
  name: User["name"];
};

export type ForgetPasswordRequest = {
  username: string;
  email: string;
}



export type ResetPasswordRequest = {
  newPassword: string;
  confirmPassword: string;
}


export type SignRequest = {
  username: string;
  password: string;
};

export type CreateUser = {
  name: User["name"];
  username: string;
  email: User["email"];
  password_hash: string;
};

export type UserEntity = {
  id: User["id"];
  email: User["email"];
  role: User["role"]
};

export type UserConfirm = {
  id: User["id"],
  newPassword: string;
  confirmPassword: string;
}
