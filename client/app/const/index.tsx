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
import { USER_ROLES } from "@/shared/role";
export const userCategories: UserCategory[] = [
  {
    id: 1,
    name: "Thông tin tài khoản",
    slug: "/info",
    icon: InfoIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 2,
    name: "Chi tiết đánh giá",
    slug: "/rating",
    icon: RatingIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 3,
    name: "Sản phẩm yêu thích",
    slug: "/favorite_products",
    icon: FavoriteIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 4,
    name: "Sản phẩm đang đấu giá",
    slug: "/bidding_products",
    icon: BiddingProductIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 5,
    name: "Sản phẩm đã thắng",
    slug: "/winning_products",
    icon: WinningProductIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 6,
    name: "Quyền seller",
    slug: "/seller_role",
    icon: SellerRoleIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 7,
    name: "Sản phẩm đang bán",
    slug: "/selling_products",
    icon: SellingProductIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 8,
    name: "Sản phẩm đã bán",
    slug: "/sold_products",
    icon: SoldProductIcon,
    roles: [USER_ROLES.BIDDER, USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
  {
    id: 9,
    name: "Tạo sản phẩm",
    slug: "/selling_products/create",
    icon: SoldProductIcon,
    roles: [USER_ROLES.SELLER, USER_ROLES.ADMIN],
  },
];

export const defaultImage =
  "https://img.freepik.com/premium-photo/white-colors-podium-abstract-background-minimal-geometric-shape-3d-rendering_48946-113.jpg?semt=ais_hybrid&w=740&q=80";
