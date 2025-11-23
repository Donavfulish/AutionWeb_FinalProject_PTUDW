import { User } from "./User";

export type BidLog = {
  id: number;
  user: Pick<User, "id" | "name">;
  price: number;
  product_id: number;
  created_at?: Date;
  updated_at?: Date;
};

export type BidHistory = {
  product_id: number;
  logs: BidLog[];
};
