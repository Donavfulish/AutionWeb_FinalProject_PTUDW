import {
  BiddingProductIcon,
  FavoriteIcon,
  InfoIcon,
  RatingIcon,
  SellerRoleIcon,
  SellingProductIcon,
  SoldProductIcon,
  WinningProductIcon,
} from "@/components/icons";
import { UserCategory } from "@/components/UserCategoryTable";
export const userCategories: UserCategory[] = [
  {
    id: 1,
    name: "Thông tin tài khoản",
    slug: "/info",
    icon: InfoIcon,
  },
  {
    id: 2,
    name: "Chi tiết đánh giá",
    slug: "/rating",
    icon: RatingIcon,
  },
  {
    id: 3,
    name: "Sản phẩm yêu thích",
    slug: "/favorite_products",
    icon: FavoriteIcon,
  },
  {
    id: 4,
    name: "Sản phẩm đang đấu giá",
    slug: "/bidding_products",
    icon: BiddingProductIcon,
  },
  {
    id: 5,
    name: "Sản phẩm đã thắng",
    slug: "/winning_products",
    icon: WinningProductIcon,
  },
  {
    id: 6,
    name: "Quyền seller",
    slug: "/seller_role",
    icon: SellerRoleIcon,
  },
  {
    id: 7,
    name: "Sản phẩm đang bán",
    slug: "/selling_products",
    icon: SellingProductIcon,
  },
  {
    id: 8,
    name: "Sản phẩm đã bán",
    slug: "/sold_products",
    icon: SoldProductIcon,
  },
  {
    id: 9,
    name: "Tạo sản phẩm",
    slug: "/selling_products/create",
    icon: SoldProductIcon,
  },
];
