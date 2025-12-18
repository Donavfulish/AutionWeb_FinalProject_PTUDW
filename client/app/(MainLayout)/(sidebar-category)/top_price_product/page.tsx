"use client";
import Link from "next/link";
import { ProductPreview } from "../../../../../shared/src/types";
import ProductCard from "@/components/ProductCard";
import ProductHook from "@/hooks/useProduct";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FavoriteHook from "@/hooks/useFavorite";
import { useMemo } from "react";

export default function Page() {
  const per_page = 15;
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || "1";
  let totalPages = 1;
  let dataResult = null;
  const {
    data,
    isLoading: isLoadingTopPriceProducts,
    error: errorTopPriceProducts,
  } = ProductHook.useGetTopPriceProduct(per_page, Number(page));

  const {
    data: favoriteProductData,
    isLoading: isLoadingFavoriteProduct,
    error: errorFavoriteProduct,
  } = FavoriteHook.useAllFavorite();

  const favoriteIds = useMemo(
    () =>
      new Set(favoriteProductData?.map((f: ProductPreview) => f.id)) ||
      new Set([]),
    [favoriteProductData]
  );

  const totalPriceProducts = data?.totalProducts ?? 0;
  const topPriceProducts = data?.topPriceProducts ?? [];

  const handlePageChange = (value: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(value));
    router.replace(`?${next.toString()}`);
  };

  if (data) {
    totalPages = Math.ceil(Number(totalPriceProducts) / per_page);
    dataResult = topPriceProducts as ProductPreview[];
  }
  return (
    <>
      {(isLoadingTopPriceProducts || isLoadingFavoriteProduct) && (
        <LoadingSpinner />
      )}
      {errorTopPriceProducts && <> Error.... </>}
      {errorFavoriteProduct && <> Error.... </>}
      {dataResult && (
        <div>
          <div className="text-center w-full">
            <h1 className="text-4xl">Chào mừng đến AuctionHub</h1>
            <div className="mt-2 text-gray-500">
              Tìm kiếm và đấu giá hàng triệu sản phẩm từ những người bán uy tín
            </div>
          </div>

          <div>
            <div className="mt-15">
              <div className="flex justify-between font-medium">
                <div className=" text-2xl">Sản phẩm sắp kết thúc</div>
                <Link
                  href={"/"}
                  className="text-blue-500 flex items-center  gap-2"
                >
                  <ArrowLeft className="w-5 h-5 mt-0.5" />
                  <div className="text-[15px]">Quay lại</div>
                </Link>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-3">
              {dataResult.map((item, index) => {
                const isFavoriteProduct = (item: ProductPreview) =>
                  favoriteIds.has(Number(item.id));
                return (
                  <div key={index} className="mt-3">
                    <ProductCard
                      product={item}
                      isFavorite={isFavoriteProduct(item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={Number(page)}
            />
          </div>
        </div>
      )}
    </>
  );
}
