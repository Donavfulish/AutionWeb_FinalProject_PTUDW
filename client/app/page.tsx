"use client";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { LoveIcon } from "@/components/icons";
function Page() {
  return (
    <>
        <PrimaryButton text="Click me"  onClick={() => console.log("123")} textColor="#333333" hoverBackgroundColor="#FF00FF" backgroundColor="#808080"  />
        <SecondaryButton text="Click me" icon={LoveIcon} onClick={() => console.log("123")} textColor="#333333" hoverBackgroundColor="#FF00FF" backgroundColor="#808080"  />
    </>
    
  )
}
export default Page;
// "/category/[:...category_slugs]/product/[:product_slug]"
// "/user/info"
// "/user/rating"
// "/user/favourite_products"
// "/user/bidding_products"
// "/user/winning_products"
// "/user/seller_role"
// "/user/selling_products"
// "/user/sold_products"

