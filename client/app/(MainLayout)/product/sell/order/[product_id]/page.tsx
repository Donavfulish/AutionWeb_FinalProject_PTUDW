"use client";

import OrderHook from "@/hooks/useOrder";
import { useAuthStore } from "@/store/auth.store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Order,
  OrderStatus,
  Product,
} from "../../../../../../../shared/src/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import { Stepper } from "@mantine/core";
import { Store, PackageCheck, Info } from "lucide-react"; // Thay đổi icon cho đồng bộ logic
import PaymentStep from "./PaymentStep";
import BuyingProductCard from "./BuyingProductCard";
import ProductHook from "@/hooks/useProduct";
import ConfirmStep from "./ConfirmStep";
import DeliveringStep from "./DeliveringStep";
import FinishStep from "./FinishStep";
import OrderChat from "./components/OrderChat";
import OrderInfoCard from "./OrderInfoCard";
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

  // Responsive hooks đồng nhất với Buyer
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallMobile = useMediaQuery("(max-width: 500px)");

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
      const yOffset = -80; // Đồng bộ offset với Buyer
      const element = stepperRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [active]);

  useEffect(() => {
    if (!router || !user || !order || !product) return;
    if (user.id === order.buyer?.id) {
      router.replace(`/product/order/${product.id}`);
    }
  }, [router, user, order, product]);

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 pb-10 px-0 md:px-4 lg:px-0">
      {isLoadingOrder || isLoadingProduct ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : user && order && product && user.id === order.seller?.id ? (
        <>
          {/* Header Section - Căn lề mobile bằng padding nội bộ giống Buyer */}
          <div className="flex flex-col gap-1 mt-4 px-4 md:px-0">
            <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 md:gap-3">
              <Store className="text-teal-600 w-6 h-6 md:w-8 md:h-8" />
              Quản lý đơn hàng bán
            </h1>
            <p className="text-slate-500 text-xs md:text-sm font-medium">
              Theo dõi và cập nhật trạng thái đơn hàng cho khách hàng
            </p>
          </div>

          <div className="w-full grid grid-cols-12 gap-y-6 lg:gap-6 items-start">
            {/* Cột trái: Nội dung chính */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 md:gap-6 order-1">
              {/* Card Container - Mobile: Phẳng hóa, Desktop: Có border & shadow */}
              <div className="bg-white md:border md:border-slate-200 md:rounded-2xl p-0 md:p-6 md:shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-4 md:mb-6 px-4 md:px-0 pt-2 md:pt-0">
                  <div className="p-1.5 md:p-2 bg-teal-50 rounded-lg text-teal-600">
                    <PackageCheck size={18} />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-slate-800">
                    Tình trạng xử lý
                  </h2>
                </div>

                {/* Product Card tự thân nó đã có padding nên không cần bọc thêm */}
                <div className="mb-4 md:mb-8 px-4 md:px-0">
                  <BuyingProductCard product={product} order={order} />
                </div>

                {order.status === "cancelled" ? (
                  <div className="px-4 md:px-0 font-sans">
                    <div className="w-full py-12 md:py-16 flex flex-col justify-center items-center bg-red-50 rounded-2xl border border-dashed border-red-200">
                      <p className="text-red-500 text-xl md:text-3xl font-black italic text-center">
                        ĐƠN HÀNG ĐÃ HỦY
                      </p>
                      <p className="text-red-400 text-xs md:text-sm mt-2">
                        Giao dịch này không còn hiệu lực
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={stepperRef}
                    className="md:mt-10 py-4 md:py-6 px-2 md:px-4 md:bg-slate-50/50 md:rounded-xl md:border md:border-slate-100"
                  >
                    <Stepper
                      active={active}
                      color="teal"
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
                        content: "pt-4 md:pt-8",
                      }}
                    >
                      <Stepper.Step
                        label="Thanh toán"
                        description="Chờ người mua"
                      >
                        <div className="bg-white md:p-4 rounded-xl md:border border-slate-100 md:shadow-sm">
                          <PaymentStep order={order} product={product} />
                        </div>
                      </Stepper.Step>

                      <Stepper.Step
                        label="Chuẩn bị hàng"
                        description="Đóng gói & xác nhận"
                      >
                        <div className="bg-white md:p-4 rounded-xl md:border border-slate-100 md:shadow-sm">
                          <ConfirmStep
                            setActive={setActive}
                            order={order}
                            product={product}
                          />
                        </div>
                      </Stepper.Step>

                      <Stepper.Step
                        label="Giao hàng"
                        description="Đang vận chuyển"
                      >
                        <div className="bg-white md:p-4 rounded-xl md:border border-slate-100 md:shadow-sm">
                          <DeliveringStep order={order} />
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

            {/* Cột phải: Chat và Customer Info */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 order-2 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] px-4 md:px-0">
              <div className="h-[450px] md:h-[500px] lg:flex-1 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
                <OrderChat isSeller={true} productId={product.id} />
              </div>

              <div className="shrink-0 flex flex-col gap-2 pb-6 lg:pb-0">
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                  Thông tin khách hàng
                </span>
                <OrderInfoCard product={product} order={order} />
              </div>
            </div>
          </div>
        </>
      ) : (
        user &&
        order.buyer &&
        order.seller.id != user.id && <UnauthorizedAccess />
      )}
    </div>
  );
};

export default ProductOrderPage;
