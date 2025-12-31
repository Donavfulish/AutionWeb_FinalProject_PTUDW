import React from "react";
import { Order } from "../../../../../../shared/src/types";

const CancelledCard = ({ order }: { order: Order }) => {
  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="max-w-sm w-full bg-white border border-red-200 rounded-3xl p-8 shadow-xl shadow-red-50/50 relative overflow-hidden">
        {/* Decor trang trí phía sau */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-60"></div>

        <div className="relative flex flex-col items-center text-center">
          {/* Icon Hủy đơn với hiệu ứng nền */}
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Đơn hàng đã bị hủy
          </h2>

          {/* Thời gian */}
          <p className="text-slate-500 text-sm mb-6 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
            Hủy lúc:{" "}
            <span className="font-medium text-slate-700">
              {new Date(order.updated_at!).toLocaleString("vi-VN")}
            </span>
          </p>

          {/* Box Lý do */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Lý do hủy đơn
            </p>
            <p className="text-slate-700 font-medium">
              Người mua không thanh toán
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelledCard;
