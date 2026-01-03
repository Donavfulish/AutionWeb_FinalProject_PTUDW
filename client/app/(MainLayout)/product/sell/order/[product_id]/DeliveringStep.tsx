"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Order } from "../../../../../../../shared/src/types";
import { Truck, Phone, User, MapPin, CalendarDays, Info } from "lucide-react";
import DeliveryGuy from "@/public/Delivery guy.json";

type ComponentProps = {
  order: Order;
};

const DeliveryAnimation = () => {
  return (
    <div className="w-full flex justify-center py-2">
      {/* Đồng bộ chiều cao mobile 200px và desktop 300px */}
      <div className="w-full max-w-[450px] h-[200px] md:h-[300px] overflow-hidden flex items-center justify-center relative">
        <div className="absolute transform scale-110 md:scale-140">
          <DotLottieReact
            data={DeliveryGuy}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

const DeliveringStep = ({ order }: ComponentProps) => {
  const beginDate = new Date(order.updated_at || order.created_at);
  const expectedDate = new Date(beginDate);
  expectedDate.setDate(beginDate.getDate() + 3);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 md:gap-6 py-2 px-1">
      {/* Tiêu đề trạng thái - Responsive font size & gap */}
      <div className="text-center space-y-2 px-4">
        <h2 className="text-xl md:text-3xl font-black text-teal-600 tracking-tight flex items-center justify-center gap-2 md:gap-3">
          <Truck className="w-6 h-6 md:w-8 md:h-8" />
          Đơn hàng đang giao
        </h2>
        <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
          Tài xế đã lấy hàng thành công và đang trên đường đến người mua
        </p>
      </div>

      <DeliveryAnimation />

      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 px-2 md:px-0">
        {/* Card 1: Thông tin người nhận */}
        <div className="bg-white border border-slate-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3 text-base md:text-lg">
            <User className="w-4 h-4 md:w-5 md:h-5 text-teal-500" />
            Thông tin người nhận
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div className="flex gap-3 md:gap-4 items-start">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  Tên khách hàng
                </span>
                <span className="font-semibold text-slate-700 text-sm md:text-base truncate">
                  {order.buyer.name}
                </span>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 items-start">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  Số điện thoại
                </span>
                <span className="font-semibold text-slate-700 text-sm md:text-base">
                  {order.phone_number}
                </span>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 items-start">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  Địa chỉ giao hàng
                </span>
                <span className="font-semibold text-slate-700 text-sm md:text-base leading-snug">
                  {order.shipping_address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Tiến độ vận chuyển */}
        <div className="bg-white border border-slate-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3 text-base md:text-lg">
            <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-teal-500" />
            Tiến độ vận chuyển
          </h3>
          <div className="flex-1 flex flex-col justify-center gap-5">
            <div className="relative pl-7 md:pl-8 border-l-2 border-dashed border-slate-200 space-y-6 md:space-y-8 ml-2">
              <div className="relative">
                <div className="absolute -left-[37px] md:-left-[41px] top-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-teal-500 border-2 md:border-4 border-white shadow-sm" />
                <p className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  Bàn giao vận chuyển
                </p>
                <p className="font-bold text-slate-800 text-base md:text-lg">
                  {beginDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[37px] md:-left-[41px] top-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-emerald-500 border-2 md:border-4 border-white shadow-sm" />
                <p className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  Thời gian khách nhận dự kiến
                </p>
                <p className="font-bold text-emerald-600 text-base md:text-lg">
                  {expectedDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="bg-teal-50 p-3 rounded-xl border border-teal-100 flex gap-2 md:gap-3">
              <Info className="w-4 h-4 md:w-5 md:h-5 text-teal-600 shrink-0 mt-0.5" />
              <p className="text-[11px] md:text-xs text-teal-800 font-medium leading-relaxed italic">
                Lưu ý: Tiền thanh toán sẽ được hệ thống tạm giữ cho đến khi
                người mua xác nhận <b>Đã nhận hàng.</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer gợi ý - Responsive margin & font */}
      <div className="text-center pt-4 pb-6 md:pb-0">
        <p className="text-slate-400 text-[10px] md:text-sm font-medium animate-pulse px-6">
          Đang chờ người mua xác nhận đã nhận hàng thành công...
        </p>
      </div>
    </div>
  );
};

export default DeliveringStep;
