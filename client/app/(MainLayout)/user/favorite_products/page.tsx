"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ProductPagination,
  ProductPreview,
} from "../../../../shared/src/types";
import ProductCard from "@/components/ProductCard";
import FavoriteHook from "@/hooks/useFavorite";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";

const FavoriteProductPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;

  const {
    data: favoriteData,
    isLoading,
    error,
  } = FavoriteHook.useFavorite({ page: page, limit: limit }) as {
    data: ProductPagination;
    isLoading: boolean;
    error: any;
  };

  const favoriteProducts: ProductPreview[] = favoriteData?.products || [];
  const totalPages = Math.ceil((favoriteData?.total ?? 0) / limit);

  const favoriteSet = new Set(favoriteProducts.map((item) => item.id));

  const handlePageChange = (value: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", value.toString());
    router.replace(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="background-user">
      <div className="text-2xl font-medium">Sản phẩm yêu thích</div>
      {isLoading && (
        <div className="relative w-full h-50">
          <LoadingSpinner />
        </div>
      )}
      {error && <div>{error.message}</div>}
      {!isLoading && !error && (
        <div className="flex flex-col gap-10">
          <div className="mt-2 grid grid-cols-5 gap-3">
            {favoriteProducts.map((item) => {
              return (
                <div key={item.id} className="mt-3">
                  <ProductCard
                    key={item.id}
                    product={item}
                    isFavorite={favoriteSet.has(item.id)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteProductPage;
