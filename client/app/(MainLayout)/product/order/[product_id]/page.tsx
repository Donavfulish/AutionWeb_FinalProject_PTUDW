"use client";

import OrderHook from "@/hooks/useOrder";
import { useAuthStore } from "@/store/auth.store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Order,
  OrderStatus,
  Product,
} from "../../../../../../shared/src/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import { Stepper } from "@mantine/core";
import { ClipboardList, Info } from "lucide-react";
import PaymentStep from "./PaymentStep";
import BuyingProductCard from "./BuyingProductCard";
import ProductHook from "@/hooks/useProduct";
import WaitingConfirmStep from "./WaitingConfirmStep";
import DeliveringStep from "./DeliveringStep";
import FinishStep from "./FinishStep";
import OrderChat from "../../sell/order/[product_id]/components/OrderChat";
import OrderInfoCard from "./OrderInfoCard";
import CancelledCard from "./CancelledCard";
import { useMediaQuery } from "@mantine/hooks";

const stepperIndexDict: Record<OrderStatus, number> = {
  pending: 0,
  paid: 1,
  confirmed: 2,
  shipped: 3,
  completed: 4,
  cancelled: 5,
};

const ProductOrderPage = () => {
  const router = useRouter();
  const { product_id } = useParams();
  const [active, setActive] = useState<number>(0);
  const stepperRef = useRef<HTMLDivElement>(null);

  // Hook kiểm tra màn hình mobile để xoay Stepper
  const isMobile = useMediaQuery("(max-width: 640px)"); // sm

  const user = useAuthStore((state) => state.user);

  const { data: product, isLoading: isLoadingProduct } =
    ProductHook.useGetProductById(Number(product_id as string)) as {
      data: Product;
      isLoading: boolean;
    };
  const { data: order, isLoading: isLoadingOrder } = OrderHook.useOrderById(
    Number(product_id as string)
  ) as {
    data: Order;
    isLoading: boolean;
  };

  useEffect(() => {
    if (!order) return;
    setActive(stepperIndexDict[order.status]);
  }, [order]);

  useEffect(() => {
    if (active !== undefined && stepperRef.current) {
      const yOffset = -100; // Khoảng cách offset để không bị dính sát mép trên (ví dụ trừ đi chiều cao header)
      const element = stepperRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [active]);

  useEffect(() => {
    if (!router || !user || !order || !product) return;
    if (user.id === order.seller?.id)
      router.replace(`/product/sell/order/${product.id}`);
  }, [router, user, order, product]);

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 pb-10 px-4 md:px-0">
      {isLoadingOrder || isLoadingProduct ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : user && order && user.id === order.buyer?.id ? (
        <>
          <div className="flex flex-col gap-1 mt-4 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <ClipboardList className="text-blue-600 w-8 h-8" />
              Chi tiết đơn hàng
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Xem thông tin chi tiết và lịch sử trao đổi của đơn hàng này
            </p>
          </div>

          <div className="w-full grid grid-cols-12 gap-6 items-start">
            {/* Cột trái: Nội dung chính */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 order-1">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Info size={20} />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800">
                    Trạng thái đơn hàng
                  </h2>
                </div>

                <div className="mb-8">
                  <BuyingProductCard product={product} order={order} />
                </div>

                {order.status === "cancelled" ? (
                  <CancelledCard order={order} />
                ) : (
                  <div
                    ref={stepperRef}
                    className="mt-6 md:mt-10 py-6 px-3 md:px-4 bg-slate-50/50 rounded-xl border border-slate-100"
                  >
                    <Stepper
                      active={active}
                      color="blue"
                      allowNextStepsSelect={false}
                      orientation={isMobile ? "vertical" : "horizontal"}
                      size={isMobile ? "sm" : "md"}
                      classNames={{
                        stepLabel: "font-bold text-slate-700",
                        stepDescription: "text-slate-400 text-xs",
                        stepIcon: "shadow-sm",
                      }}
                    >
                      <Stepper.Step
                        label="Thanh toán"
                        description="Giai đoạn 1"
                      >
                        <div className="mt-4 md:mt-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <PaymentStep setActive={setActive} order={order} />
                        </div>
                      </Stepper.Step>

                      <Stepper.Step label="Chuẩn bị" description="Giai đoạn 2">
                        <div className="mt-4 md:mt-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <WaitingConfirmStep order={order} />
                        </div>
                      </Stepper.Step>

                      <Stepper.Step label="Giao hàng" description="Giai đoạn 3">
                        <div className="mt-4 md:mt-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <DeliveringStep setActive={setActive} order={order} />
                        </div>
                      </Stepper.Step>

                      <Stepper.Completed>
                        <div className="mt-4 md:mt-8">
                          <FinishStep order={order} />
                        </div>
                      </Stepper.Completed>
                    </Stepper>
                  </div>
                )}
              </div>
            </div>

            {/* Cột phải: Chat và Seller Info */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 order-2 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
              {/* Chat Box - Trên Mobile đặt chiều cao cố định để không quá dài */}
              <div className="h-[500px] lg:flex-1 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
                <OrderChat productId={product.id} />
              </div>

              {/* Thông tin người bán */}
              <div className="shrink-0 flex flex-col gap-2">
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                  Đối tác bán hàng
                </span>
                <OrderInfoCard product={product} order={order} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <UnauthorizedAccess />
      )}
    </div>
  );
};

export default ProductOrderPage;
