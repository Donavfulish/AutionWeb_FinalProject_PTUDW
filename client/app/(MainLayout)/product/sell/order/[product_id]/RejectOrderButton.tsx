"use client";

import React, { useState, useTransition } from "react";
import {
  CreateRating,
  Order,
  Product,
  UserRating,
} from "../../../../../../../shared/src/types";
import { RatingHook } from "@/hooks/useRating";
import OrderHook from "@/hooks/useOrder";
import { useRouter } from "next/navigation";
import { CircleMinus } from "lucide-react";
import { ConfirmPopup } from "@/components/ConfirmPopup";
import LoadingSpinner from "@/components/LoadingSpinner";

const RejectOrderButton = ({
  order,
  product,
}: {
  order: Order;
  product: Product;
}) => {
  const router = useRouter();
  const [rejectConfirmModal, setRejectConfirmModal] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const { data: rating, isLoading: isLoadingRating } =
    RatingHook.useGetOneRating(order?.seller?.id, order?.buyer?.id) as {
      data: UserRating;
      isLoading: boolean;
    };
  const { mutate: sellerRejectOrder, isPending: isRejectingOrder } =
    OrderHook.useSellerRejectOrder();
  const { mutate: createRating, isPending: isCreatingRating } =
    RatingHook.useCreateRating();

  const { mutate: updateRating, isPending: isUpdatingRating } =
    RatingHook.useUpdateRating();
  const handleRejectOrder = (id: number) => {
    if (!order || !order.product_id || !order.buyer?.id) return;
    setRejectConfirmModal(false);
    sellerRejectOrder(
      {
        productId: Number(order.product_id),
        buyerId: order.buyer.id,
      },
      {
        onSuccess: () =>
          startTransition(() => router.push(`/product/sell/${product.slug}`)),
      }
    );

    if (!order.buyer.id || !order.seller.id) return;
    const newRating: CreateRating & { silent: boolean } = {
      ratee: order.buyer,
      rating: -1,
      comment: "Người thắng không thanh toán",
      silent: true,
    };

    if (!rating) createRating(newRating);
    else updateRating(newRating);
  };

  if (isPending)
    return (
      <div className="fixed w-screen h-screen inset-0 z-500">
        <LoadingSpinner />
      </div>
    );
  return (
    <div>
      <div className="flex flex-row gap-2 justify-center">
        <div className="relative w-50">
          <button
            onClick={() => setRejectConfirmModal(true)}
            className="flex flex-rows gap-2 items-center border border-red-500 py-2 px-7 rounded-lg bg-white-500 text-red-500 hover:bg-red-400 hover:border-red-400 hover:text-white cursor-pointer disabled:bg-gray-400 disabled:border-gray-400"
          >
            <CircleMinus height={20} width={20} />
            <span className="text-md font-medium">Hủy đơn hàng</span>
          </button>
        </div>
      </div>

      <ConfirmPopup
        isOpen={rejectConfirmModal}
        onClose={() => setRejectConfirmModal(false)}
        selected={{
          id: 0,
          contentHtml: (
            <div className="flex flex-col gap-2">
              <p>
                Bạn có chắc chắn muốn hủy đơn hàng với <b>{order.buyer.name}</b>{" "}
                và người dùng này thực hiện mọi thao tác trên sản phẩm.
              </p>
              <p>
                Một đánh giá tự động với nội dung{" "}
                <i>"Người mua không thanh toán"</i> sẽ được gửi trực tiếp tới
                người mua sau khi hủy đơn hàng.
              </p>
              <p className="text-red-600">
                Lưu ý: Hành động này không thể hoàn tác
              </p>
            </div>
          ),
        }}
        onConfirm={handleRejectOrder}
      />
    </div>
  );
};

export default RejectOrderButton;
