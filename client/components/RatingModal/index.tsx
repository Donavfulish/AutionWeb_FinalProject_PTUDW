"use client";

import Image from "next/image";
import { UserRating } from "../../../shared/src/types";

interface RatingModalProps {
  rating: UserRating | null;
  onClose: () => void;
}

export default function RatingModal({ rating, onClose }: RatingModalProps) {
  if (!rating) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Đánh giá từ người mua
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={rating.rater.profile_img}
            alt={rating.rater.name}
            width={50}
            height={50}
            className="rounded-full border"
          />
          <div>
            <p className="font-semibold text-gray-700">{rating.rater.name}</p>
            <p className="text-gray-400 text-sm">Đánh giá: {rating.rating}/10</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex mb-4">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${
                i < rating.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {rating.comment || "Không có nhận xét."}
        </p>

        {/* Footer */}
        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
