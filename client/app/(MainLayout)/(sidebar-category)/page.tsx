// "use client";
// import { ArrowRight } from "@/components/icons";
// import Link from "next/link";
// import { ProductPreview } from "../../../../shared/src/types";
// import ProductCard from "@/components/ProductCard";
// import ProductHook from "@/hooks/useProduct";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import FavoriteHook from "@/hooks/useFavorite";
// import { use, useMemo } from "react";
// import { useAuthStore } from "@/store/auth.store";

// interface PageItem {
//   title: string;
//   href?: string;
//   products: ProductPreview[];
// }

// function Page() {
//   // const {user} = useAuthStore(); --> Khong nen

//   const user = useAuthStore((s) => s.user);
//   console.log(user);
//   const {
//     data: productTop,
//     isLoading: isLoadingTopProduct,
//     error: errorTopProduct,
//   } = ProductHook.useGetProductTop();

//   const {
//     data: fullFavoriteProductData,
//     isLoading: isLoadingFavoriteProduct,
//     error: errorFavoriteProduct,
//   } = FavoriteHook.useAllFavorite();

//   const favoriteIds = useMemo(
//     () =>
//       new Set(fullFavoriteProductData?.map((f: ProductPreview) => f.id)) ||
//       new Set([]),
//     [fullFavoriteProductData]
//   );

//   if (isLoadingTopProduct || isLoadingFavoriteProduct)
//     return (
//       <>
//         <LoadingSpinner />
//       </>
//     );
//   if (errorTopProduct) {
//     return <>{errorTopProduct.message};</>;
//   }

//   if (errorFavoriteProduct) {
//     return <>{errorFavoriteProduct.message};</>;
//   }
//   let pageItems: PageItem[] = [];
//   if (productTop) {
//     pageItems = [
//       {
//         title: "Sản phẩm sắp kết thúc",
//         href: "/top_end_product",
//         products: productTop.topEndingSoonProducts,
//       },
//       {
//         title: "Sản phẩm nhiều lượt đấu giá nhất",
//         href: "/top_bid_product",
//         products: productTop.topBiddingProducts,
//       },
//       {
//         title: "Sản phẩm giá cao nhất",
//         href: "/top_price_product",
//         products: productTop.topPriceProducts,
//       },
//     ];
//   }

//   return (
//     <>
//       <div>
//         <div className="text-center w-full">
//           <h1 className="text-4xl">Chào mừng đến AuctionHub</h1>
//           <div className="mt-2 text-gray-500">
//             Tìm kiếm và đấu giá hàng triệu sản phẩm từ những người bán uy tín{" "}
//             {user?.username}
//           </div>
//         </div>
//         {pageItems.map((item, index) => {
//           return (
//             <div key={index}>
//               <div className="mt-15">
//                 <div className="flex justify-between font-medium">
//                   <div className=" text-2xl">{item.title}</div>
//                   <Link
//                     href={item.href || "/"}
//                     className="text-blue-500 flex items-center  gap-2"
//                   >
//                     <div className="text-[15px]">Xem tất cả</div>
//                     <ArrowRight className="w-5 h-5 mt-0.5" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="mt-2 grid grid-cols-5 gap-3">
//                 {item.products.map((item, _) => {
//                   return (
//                     <div key={item.id} className="mt-3">
//                       <ProductCard
//                         key={item.id}
//                         product={item}
//                         isFavorite={favoriteIds.has(item.id)}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
// export default Page;

"use client";
import { ArrowRight } from "@/components/icons";
import Link from "next/link";
import { ProductPreview } from "../../../../shared/src/types";
import ProductCard from "@/components/ProductCard";
import ProductHook from "@/hooks/useProduct";
import LoadingSpinner from "@/components/LoadingSpinner";
import FavoriteHook from "@/hooks/useFavorite";
import { useMemo } from "react";
import { useAuthStore } from "@/store/auth.store";
import ShortCategorySideBar from "@/components/ShortCategorySidebar";
import { useState } from "react";

interface PageItem {
  title: string;
  href?: string;
  products: ProductPreview[];
}

function Page() {
  const user = useAuthStore((s) => s.user);

  const {
    data: productTop,
    isLoading: isLoadingTopProduct,
    error: errorTopProduct,
  } = ProductHook.useGetProductTop();

  const {
    data: fullFavoriteProductData,
    isLoading: isLoadingFavoriteProduct,
    error: errorFavoriteProduct,
  } = FavoriteHook.useAllFavorite();

  const favoriteIds = useMemo(
    () =>
      new Set(fullFavoriteProductData?.map((f: ProductPreview) => f.id)) ||
      new Set([]),
    [fullFavoriteProductData]
  );

  if (isLoadingTopProduct || isLoadingFavoriteProduct)
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );

  if (errorTopProduct)
    return <div className="text-red-500">{errorTopProduct.message}</div>;
  if (errorFavoriteProduct)
    return <div className="text-red-500">{errorFavoriteProduct.message}</div>;

  let pageItems: PageItem[] = [];
  if (productTop) {
    pageItems = [
      {
        title: "Sản phẩm sắp kết thúc",
        href: "/top_end_product",
        products: productTop.topEndingSoonProducts,
      },
      {
        title: "Sản phẩm nhiều lượt đấu giá nhất",
        href: "/top_bid_product",
        products: productTop.topBiddingProducts,
      },
      {
        title: "Sản phẩm giá cao nhất",
        href: "/top_price_product",
        products: productTop.topPriceProducts,
      },
    ];
  }

  return (
    <div className="pb-10">
      {/* Header Section */}
      <div className="text-center w-full mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Chào mừng đến AuctionHub
        </h1>
        <div className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
          Tìm kiếm và đấu giá hàng triệu sản phẩm từ những người bán uy tín{" "}
        </div>
      </div>

      <ShortCategorySideBar />
      {/* Product Sections */}
      <div className="flex flex-col gap-10 md:gap-16">
        {pageItems.map((item, index) => {
          // Chỉ render section nếu có sản phẩm
          if (!item.products || item.products.length === 0) return null;

          return (
            <div key={index}>
              {/* Section Title */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {item.title}
                </h2>

                <Link
                  href={item.href || "/"}
                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group"
                >
                  <span className="text-sm font-medium">Xem tất cả</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Responsive Product Grid */}
              <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
                {item.products.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      product={product}
                      isFavorite={favoriteIds.has(product.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Page;
