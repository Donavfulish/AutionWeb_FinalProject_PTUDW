"use client";

import React from "react";
import Lottie from "lottie-react";
import checkAnimation from "@/public/Success.json";
import FeedbackBox from "@/components/FeedbackBox";
import {
  CreateRating,
  Order,
  UserRating,
} from "../../../../../../shared/src/types";
import { RatingHook } from "@/hooks/useRating";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronRight, PartyPopper, Star } from "lucide-react";
import Link from "next/link";

type PageProps = {
  order: Order;
};

const FinishStep = ({ order }: PageProps) => {
  const { data: rating, isLoading: isLoadingRating } =
    RatingHook.useGetOneRating(order?.buyer?.id, order?.seller?.id) as {
      data: UserRating;
      isLoading: boolean;
    };

  const { mutate: createRating } = RatingHook.useCreateRating();
  const { mutate: updateRating } = RatingHook.useUpdateRating();

  const handleRatingBuyer = (ratingPoint: number, message: string) => {
    if (!order.buyer.id || !order.seller.id) return;
    const newRating: CreateRating = {
      ratee: order.seller,
      rating: ratingPoint,
      comment: message,
    };

    if (!rating) createRating(newRating);
    else updateRating(newRating);
  };

  return (
    <div className="max-w-[600px] mx-auto py-8 px-4 space-y-10 animate-in fade-in zoom-in duration-500 flex flex-col items-center">
      {/* Phần chúc mừng */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="relative inline-block">
          <Lottie
            animationData={checkAnimation}
            loop={false}
            className="w-32 h-32"
          />
          <div className="absolute -top-1 -right-1 bg-amber-100 p-2 rounded-full text-amber-600 shadow-sm animate-bounce">
            <PartyPopper className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Giao dịch thành công!
          </h2>
          <p className="text-slate-500 font-medium max-w-[350px]">
            Hãy để lại đánh giá cho <b>{order.seller.name}</b> nhé!
          </p>
        </div>
      </div>

      {isLoadingRating ? (
        <div className="relative h-32 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          {/* Thêm div bọc ngoài FeedbackBox với w-full để nó chiếm hết diện tích card */}
          <div className="w-full max-w-md mx-auto">
            <FeedbackBox
              targetName={order.seller.name}
              rating={rating}
              onRating={handleRatingBuyer}
            />
          </div>
        </div>
      )}

      <div className="pt-6 flex flex-col items-center gap-2">
        <Link
          href="/user/winning_products"
          className="group flex items-end gap-1 text-sm text-blue-400 font-medium hover:text-blue-500 transition-colors"
        >
          <span>Xem các đơn hàng khác</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default FinishStep;
