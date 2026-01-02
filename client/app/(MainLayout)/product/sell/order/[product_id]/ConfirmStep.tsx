"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import OrderHook from "@/hooks/useOrder";
import React, { useState } from "react";
import { Order, Product } from "../../../../../../../shared/src/types";
import { formatCurrency } from "../../[product_slug]/components/Question";
import {
  CircleCheckBig,
  Truck,
  User,
  Mail,
  MapPin,
  ShieldAlert,
  Phone,
  Box,
  CheckCircle2,
} from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";
import RejectOrderButton from "./RejectOrderButton";
import clsx from "clsx";

type ComponentProps = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
  order: Order;
  product: Product;
};

const ConfirmStep = ({ setActive, order, product }: ComponentProps) => {
  const [isPackaged, setIsPackaged] = useState<boolean>(false);

  const { mutate: sellerConfirmOrder, isPending: isConfirmingOrder } =
    OrderHook.useSellerConfirmOrder();

  const handleConfirm = () => {
    if (!order.buyer?.id || !order.product_id) return;

    sellerConfirmOrder(
      {
        productId: order.product_id,
        buyerId: order.buyer.id,
      },
      {
        onSuccess: () => setActive(2),
      }
    );
  };

  if (isConfirmingOrder) {
    return (
      <div className="relative flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-full h-50">
          <LoadingSpinner />
        </div>
        <p className="text-teal-600 font-medium animate-pulse">
          Đang kết nối với đơn vị vận chuyển...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 py-2">
      {/* BƯỚC 1: XÁC NHẬN & ĐÓNG GÓI */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 min-w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-800 text-lg">
              Xác nhận thông tin & Đóng gói
            </h3>
          </div>

          <div className="flex justify-start sm:justify-end">
            {isPackaged ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-xl border border-teal-200 font-bold animate-in zoom-in duration-300">
                <CircleCheckBig size={20} />
                <span>Đã đóng gói hàng</span>
              </div>
            ) : (
              <div className="w-[105%] sm:w-48">
                <PrimaryButton
                  backgroundColor={"#0d9488"} // teal-600
                  hoverBackgroundColor={"#0f766e"} // teal-700
                  onClick={() => setIsPackaged(true)}
                  text="Xác nhận đóng gói"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bố cục thông tin thẳng hàng (giống Buyer) */}
        <div className="divide-y divide-slate-100">
          <div className="px-6 py-4 flex items-center gap-4">
            <User className="w-5 h-5 text-slate-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-slate-400 font-bold uppercase mb-0.5">
                Người nhận
              </p>
              <p className="font-semibold text-slate-800">{order.buyer.name}</p>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center gap-4">
            <Phone className="w-5 h-5 text-slate-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-slate-400 font-bold uppercase mb-0.5">
                Số điện thoại
              </p>
              <p className="font-semibold text-slate-800">
                {order.phone_number || "Chưa cung cấp"}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center gap-4">
            <Mail className="w-5 h-5 text-slate-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-slate-400 font-bold uppercase mb-0.5">
                Email liên hệ
              </p>
              <p className="font-semibold text-slate-800">
                {order.buyer.email}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center gap-4">
            <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-slate-400 font-bold uppercase mb-0.5">
                Địa chỉ giao hàng
              </p>
              <p className="font-semibold text-slate-800 leading-snug">
                {order.shipping_address}
              </p>
            </div>
          </div>

          {/* Banner trạng thái thanh toán cuối Card */}
          <div className="p-5 bg-teal-600 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Đã nhận thanh toán
              </span>
            </div>
            <span className="text-xl font-bold text-white">
              {formatCurrency(order.price)}
            </span>
          </div>
        </div>
      </div>

      {/* BƯỚC 2: VẬN CHUYỂN */}
      <div
        className={clsx(
          "bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-500",
          isPackaged
            ? "border-teal-200 opacity-100"
            : "border-slate-200 opacity-60 grayscale-[0.5]"
        )}
      >
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
          <div
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
              isPackaged ? "bg-teal-600 text-white" : "bg-slate-300 text-white"
            )}
          >
            2
          </div>
          <h3 className="font-bold text-slate-800 text-lg">
            Tìm tài xế & Giao hàng
          </h3>
        </div>

        <div className="p-8 flex flex-col items-center text-center">
          <div
            className={clsx(
              "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all",
              isPackaged
                ? "bg-teal-50 text-teal-600 scale-110 shadow-lg shadow-teal-100"
                : "bg-slate-100 text-slate-400"
            )}
          >
            <Truck size={40} className={isPackaged ? "animate-bounce" : ""} />
          </div>

          <h4 className="text-xl font-bold text-slate-800 mb-2">
            Sẵn sàng vận chuyển
          </h4>
          <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
            Hệ thống sẽ tìm tài xế gần nhất để đến lấy hàng tại địa chỉ của bạn
            và giao đến người mua.
          </p>

          <button
            onClick={handleConfirm}
            disabled={!isPackaged}
            className={clsx(
              "flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95",
              !isPackaged
                ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                : "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-teal-900/20"
            )}
          >
            <Truck className="w-6 h-6" />
            Tìm tài xế ngay
          </button>
        </div>
      </div>

      {/* FOOTER: HỦY ĐƠN */}
      <div className="p-5 bg-red-50 rounded-2xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-sm font-bold text-red-800">
              Cần hủy đơn hàng này?
            </p>
            <p className="text-xs text-red-600">
              Nếu phát hiện thanh toán giả mạo hoặc người mua có dấu hiệu bất
              thường.
            </p>
          </div>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <RejectOrderButton order={order} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep;
