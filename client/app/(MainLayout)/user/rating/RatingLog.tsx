import Image from "next/image";
import { UserRating } from "../../../../../shared/src/types";
import { ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
import { defaultImage } from "@/app/const";

export default function RatingLog({ ratingLog }: { ratingLog: UserRating }) {
  const { rater, rating, comment = "", updated_at: date } = ratingLog;

  const isGood = rating === 1;

  return (
    <div
      className={`group bg-white rounded-2xl p-5 border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
        isGood
          ? "border-emerald-100 hover:border-emerald-200"
          : "border-rose-100 hover:border-rose-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Phần thông tin người đánh giá */}
        <div className="flex gap-3">
          <div className="relative">
            <Image
              src={rater.profile_img || defaultImage}
              width={44}
              height={44}
              alt={`Avatar của ${rater.name}`}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            {/* Badge icon góc avatar */}
            <div
              className={`absolute -bottom-1 -right-1 rounded-full p-1 ring-2 ring-white ${
                isGood ? "bg-emerald-500" : "bg-rose-500"
              }`}
            >
              {isGood ? (
                <ThumbsUp className="w-2 h-2 text-white" />
              ) : (
                <ThumbsDown className="w-2 h-2 text-white" />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="text-slate-800 font-bold text-[15px] leading-tight">
              {rater.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">
                {new Date(date || "").toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </div>

        {/* Badge trạng thái đánh giá */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-0 font-bold uppercase tracking-tight text-[11px] ${
            isGood
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          <span>{isGood ? "＋" : "－"}</span>
          <span>{isGood ? "Hài lòng" : "Không hài lòng"}</span>
        </div>
      </div>

      {/* Nội dung bình luận - Hiển thị bình thường */}
      {comment ? (
        <div className="mt-4">
          <p className="text-slate-700 text-[14.5px] leading-relaxed whitespace-pre-wrap">
            {comment}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-slate-400 text-xs italic">
          Người dùng không để lại bình luận.
        </p>
      )}
    </div>
  );
}
