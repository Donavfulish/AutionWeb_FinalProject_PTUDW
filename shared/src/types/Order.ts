import { User } from "./User";

export type Order = {
  product_id: number;
  seller: User;
  bidder: User;
  status: 'pending | paid | shipped | completed | cancelled';
  shipping_address: string;
  payment_invoice: string;
  created_at: Date;
  updated_at: Date | null;
}