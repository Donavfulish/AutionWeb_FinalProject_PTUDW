import { User } from "./User";

export type Product = {
  id: number;
  slug: string;
  seller: Pick<User, 'id' | 'name' | 'profile_img'>;
  category_id: number;
  main_image: string;
  extra_images: string[];
  name: string;
  initial_price: number;
  buy_now_price: number;
  top_bidder: Pick<User, 'id' | 'name' | 'profile_img'> | null;
  end_time: Date;
  description: string;
  auto_extend: boolean;
  price_increment: number;
  created_at: Date;
  updated_at: Date | null;
}

export type ProductCategoryTree = {
  id: number;
  slug: string;
  name: string;
  parent_id?: number;
  children?: ProductCategoryTree[];
  created_at: Date;
  updated_at: Date | null;
}

export type ProductAnswer = {
  id: number;
  question_id: number;
  user: Pick<User, 'id' | 'name' | 'profile_img'>;
  comment: string;
  created_at: Date;
}

export type ProductQuestion = {
  id: number;
  product_id: number;
  user: Pick<User, 'id' | 'name' | 'profile_img'>;
  comment: string;
  answer?: ProductAnswer;
  created_at: Date;
}