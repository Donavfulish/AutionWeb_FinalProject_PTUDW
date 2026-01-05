"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductPreview } from "../../../shared/src/types";
import { getTimeDifference } from "@/utils";
import FavoriteHook from "@/hooks/useFavorite";
import SystemHook from "@/hooks/useSystem";
import { formatCurrency } from "@/app/(MainLayout)/product/[product_slug]/components/Question";
import FavoriteButton from "../FavoriteButton";
import { useAuthStore } from "@/store/auth.store";
import { CheckCircle2, User as UserIcon } from "lucide-react";

const FireIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const DEFAULT_IMAGE =
  "https://img.freepik.com/premium-photo/white-colors-podium-abstract-background-minimal-geometric-shape-3d-rendering_48946-113.jpg?semt=ais_hybrid&w=740&q=80";

interface ProductCardProps {
  product: ProductPreview;
  isFavorite: boolean;
}

export default function ProductCard({
  product,
  isFavorite = false,
}: ProductCardProps) {
  const user = useAuthStore((s) => s.user);
  const { mutate: addFavorite, isPending: isAdding } =
    FavoriteHook.useAddFavorite();
  const { mutate: removeFavorite, isPending: isRemoving } =
    FavoriteHook.useRemoveFavorite();

  const { data: serverMinTime } = SystemHook.useGetProductMinTime();

  console.log("user?.id::", user?.id);
  const isLeading = user?.id && user.id == product.top_bidder_id;
  const isSeller = user?.id && user.id === product.seller_id;

  const isHighlight = useMemo(() => {
    if (!serverMinTime || serverMinTime.length === 0) return false;
    const minTimeConfig = serverMinTime[0].new_product_min_time;
    const nowTime = new Date().getTime();
    const createProductTime = new Date(product.created_at).getTime();
    const diffMinutes = (nowTime - createProductTime) / 60000;
    return diffMinutes <= minTimeConfig;
  }, [serverMinTime, product.created_at]);

  const handleFavorite = (
    e: React.MouseEvent,
    productId: number,
    currentStatus: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStatus) {
      removeFavorite({ productId });
    } else {
      addFavorite({ productId });
    }
  };

  const isLoadingFavorite = isAdding || isRemoving;

  return (
    <div
      className={`relative group rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border-2 bg-white
        ${
          isSeller
            ? "border-amber-500 shadow-md shadow-amber-50/50" // Màu vàng cho Seller
            : isLeading
            ? "border-emerald-500 shadow-md shadow-emerald-50/50"
            : isHighlight
            ? "border-red-500/70"
            : "border-gray-200 hover:border-blue-400"
        }
      `}
    >
      {/* Badge Header Logic */}
      {isSeller ? (
        <div className="absolute top-0 right-0 bg-amber-500 text-white px-2.5 py-1 rounded-bl-lg rounded-tr-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 z-30 shadow-md animate-pulse">
          <UserIcon className="w-3 h-3 text-white" />
          <span>Sản phẩm của bạn</span>
        </div>
      ) : (
        /* Ưu tiên 2: Các trạng thái khác */
        <>
          {isLeading ? (
            <div
              className={`absolute top-0 right-0 text-white px-2.5 py-1 rounded-bl-lg rounded-tr-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 z-30 shadow-sm animate-pulse
                ${
                  isHighlight
                    ? "bg-gradient-to-r from-orange-500 to-emerald-500"
                    : "bg-emerald-500"
                }`}
            >
              {isHighlight ? (
                <>
                  <FireIcon className="w-3.5 h-3.5" />
                  <span>Dẫn đầu • Mới</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Đang dẫn đầu</span>
                </>
              )}
            </div>
          ) : (
            isHighlight && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2.5 py-1 rounded-bl-lg rounded-tr-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 z-30 animate-pulse">
                <FireIcon className="w-3.5 h-3.5" />
                Mới
              </div>
            )
          )}
        </>
      )}

      <Link
        href={`/product/${product.slug}`}
        className="block h-full flex flex-col"
      >
        <div className="relative w-full aspect-[5/4] overflow-hidden rounded-t-lg bg-gray-100">
          <Image
            src={product.main_image || DEFAULT_IMAGE}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-3 flex flex-col flex-1 justify-between">
          <div>
            <div className="mb-2">
              <h3
                className={`font-semibold line-clamp-2 h-12 leading-6 transition-colors ${
                  isSeller
                    ? "text-amber-700"
                    : isLeading
                    ? "text-emerald-700"
                    : "text-gray-800"
                }`}
                title={product.name}
              >
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-xs font-medium text-gray-500">
                <FireIcon
                  className={`w-4 h-4 ${
                    isSeller
                      ? "text-amber-500"
                      : isLeading
                      ? "text-emerald-500"
                      : "text-orange-500"
                  }`}
                />
                <span>{product.bid_count} lượt đấu giá</span>
              </div>
            </div>

            <div
              className={`space-y-1 p-2 rounded-md ${
                isSeller
                  ? "bg-amber-50"
                  : isLeading
                  ? "bg-emerald-50"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500">Giá hiện tại</span>
                <span
                  className={`text-lg font-bold ${
                    isSeller
                      ? "text-amber-600"
                      : isLeading
                      ? "text-emerald-600"
                      : "text-blue-600"
                  }`}
                >
                  {formatCurrency(product.current_price)}
                </span>
              </div>

              <div className="flex justify-between items-baseline border-t border-dashed border-gray-200 pt-1">
                <span className="text-xs text-gray-500">Mua ngay</span>
                <span className="text-sm font-semibold text-red-500">
                  {product.buy_now_price
                    ? formatCurrency(product.buy_now_price)
                    : "---"}
                </span>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <p className="text-xs text-gray-500 mb-0.5">
                Người trả cao nhất:
              </p>
              {product.top_bidder_name ? (
                <p className="font-medium text-gray-700 truncate">
                  {isLeading ? (
                    <span className="font-bold text-emerald-600 rounded">
                      Bạn
                    </span>
                  ) : (
                    `${product.top_bidder_name[0]}*****${
                      product.top_bidder_name[
                        product.top_bidder_name.length - 1
                      ]
                    }`
                  )}
                </p>
              ) : (
                <p className="text-gray-400 italic text-xs">
                  Chưa có lượt trả giá
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex flex-col gap-2">
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <span>Ngày đăng:</span>
              <span className="font-medium text-gray-600">
                {new Date(product.created_at).toLocaleDateString("en-GB")}
              </span>
            </div>

            <div
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
                isSeller
                  ? "bg-amber-600 text-white"
                  : isLeading
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              <ClockIcon className="w-3.5 h-3.5" />
              <span>
                {getTimeDifference(new Date(), new Date(product.end_time))}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute top-2 left-2 z-20">
        <div
          className={`transition-all duration-200 
            ${isLoadingFavorite ? "opacity-50 cursor-wait" : "cursor-pointer"}
            ${isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"} 
          `}
          onClick={(e) =>
            !isLoadingFavorite && handleFavorite(e, product.id, isFavorite)
          }
        >
          <FavoriteButton isFavorite={isFavorite} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
