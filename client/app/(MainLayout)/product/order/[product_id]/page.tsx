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

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallMobile = useMediaQuery("(max-width: 420px)");

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
      const yOffset = -80;
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
    <div className="w-full flex flex-col gap-4 md:gap-6 pb-10 px-0 md:px-4 lg:px-0">
      {isLoadingOrder || isLoadingProduct ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : user && order && user.id === order.buyer?.id ? (
        <>
          {/* Header Section - Căn lề mobile bằng padding nội bộ */}
          <div className="flex flex-col gap-1 mt-4 px-4 md:px-0">
            <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 md:gap-3">
              <ClipboardList className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />
              Chi tiết đơn hàng
            </h1>
            <p className="text-slate-500 text-xs md:text-sm font-medium">
              Thông tin chi tiết và lịch sử đơn hàng của bạn
            </p>
          </div>

          <div className="w-full grid grid-cols-12 gap-y-6 lg:gap-6 items-start">
            {/* Cột trái: Nội dung chính */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 md:gap-6 order-1">
              {/* Card Container - Mobile: Phẳng hóa, Desktop: Có border & shadow */}
              <div className="bg-white md:border md:border-slate-200 md:rounded-2xl p-0 md:p-6 md:shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-4 md:mb-6 px-4 md:px-0 pt-2 md:pt-0">
                  <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Info size={18} />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-slate-800">
                    Trạng thái đơn hàng
                  </h2>
                </div>

                {/* Product Card tự thân nó đã có padding nên không cần bọc thêm */}
                <div className="mb-4 md:mb-8 px-4 md:px-0">
                  <BuyingProductCard product={product} order={order} />
                </div>

                {order.status === "cancelled" ? (
                  <div className="px-4 md:px-0 font-sans">
                    <CancelledCard order={order} />
                  </div>
                ) : (
                  <div
                    ref={stepperRef}
                    className="md:mt-10 py-4 md:py-6 px-2 md:px-4 md:bg-slate-50/50 md:rounded-xl md:border md:border-slate-100"
                  >
                    <Stepper
                      active={active}
                      color="blue"
                      allowNextStepsSelect={false}
                      orientation={isSmallMobile ? "vertical" : "horizontal"}
                      size={isMobile ? "xs" : "md"}
                      classNames={{
                        root: "md:px-0",
                        steps: "px-2 md:px-0 flex justify-between",
                        separator: "hidden min-[450px]:block",
                        stepLabel:
                          "font-bold text-slate-700 text-sm md:text-base",
                        stepDescription:
                          "text-slate-400 text-[10px] md:text-xs",
                        content: "pt-4 md:pt-8", // Khoảng cách giữa stepper và nội dung bước
                      }}
                    >
                      <Stepper.Step
                        label="Thanh toán"
                        description="Giai đoạn 1"
                      >
                        <div className="bg-white md:p-4 rounded-xl md:border border-slate-100 md:shadow-sm">
                          <PaymentStep setActive={setActive} order={order} />
                        </div>
                      </Stepper.Step>

                      <Stepper.Step label="Chuẩn bị" description="Giai đoạn 2">
                        <div className="bg-white md:p-4 rounded-xl md:border border-slate-100 md:shadow-sm">
                          <WaitingConfirmStep order={order} />
                        </div>
                      </Stepper.Step>

                      <Stepper.Step label="Giao hàng" description="Giai đoạn 3">
                        <div className="bg-white md:p-4 rounded-xl md:border border-slate-100 md:shadow-sm">
                          <DeliveringStep setActive={setActive} order={order} />
                        </div>
                      </Stepper.Step>

                      <Stepper.Completed>
                        <div className="md:p-0">
                          <FinishStep order={order} />
                        </div>
                      </Stepper.Completed>
                    </Stepper>
                  </div>
                )}
              </div>
            </div>

            {/* Cột phải: Chat và Seller Info */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 order-2 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] px-4 md:px-0">
              <div className="h-[450px] md:h-[500px] lg:flex-1 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
                <OrderChat productId={product.id} />
              </div>

              <div className="shrink-0 flex flex-col gap-2 pb-6 lg:pb-0">
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                  Đối tác bán hàng
                </span>
                <OrderInfoCard product={product} order={order} />
              </div>
            </div>
          </div>
        </>
      ) : (
        user &&
        order.buyer &&
        order.buyer.id != user.id && <UnauthorizedAccess />
      )}
    </div>
  );
};

export default ProductOrderPage;
