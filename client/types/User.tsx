export type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  profile_img: string;
  password_hash: string;
  role: "guest" | "bidder" | "seller" | "admin";
  positive_points: number;
  negative_points: number;
  created_at: Date;
  updated_at: Date;
}