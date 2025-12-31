import Image from "next/image";
import OrderHook from "@/hooks/useOrder";
import {
  CreateRating,
  Order,
  OrderPayment,
  Product,
  UserRating,
} from "../../../../../../../shared/src/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { formatCurrency } from "../../[product_slug]/components/Question";
import { CircleMinus } from "lucide-react";
import { RatingHook } from "@/hooks/useRating";
import { useState } from "react";
import { ConfirmPopup } from "@/components/ConfirmPopup";
import { useRouter } from "next/navigation";
import ProductHook from "@/hooks/useProduct";
import RejectOrderButton from "./RejectOrderButton";

type ComponentProps = {
  order: Order;
  product: Product;
};

const PaymentStep = ({ order, product }: ComponentProps) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold ">
            Thông tin thanh toán đã được gửi đi
          </p>
          <div className="flex flex-row gap-3">
            <Image
              src="/seller-QR.jpg"
              alt="QR thanh toán"
              width={200}
              height={200}
            />
            <div className="my-2 flex flex-col text-lg font-medium">
              <div>
                <div className="grid grid-cols-11 gap-2">
                  <p className="col-span-4">Số tài khoản:</p>
                  <p className="col-span-7 font-mono text-lg text-gray-800">
                    1027329108
                  </p>
                </div>
                <div className="grid grid-cols-11 gap-2">
                  <p className="col-span-4">Tên tài khoản:</p>
                  <p className="col-span-7 font-mono text-lg text-gray-800">
                    {product.seller.name}
                  </p>
                </div>
                <div className="grid grid-cols-11 gap-2 mt-5">
                  <p className="col-span-4">Giá sản phẩm:</p>
                  <p className="col-span-7 text-xl text-red-500">
                    {formatCurrency(order.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xl font-bold">
              Vui lòng chờ người dùng thanh toán và xác nhận thông tin nhận hàng
            </p>
            <p className="text-lg font-medium text-gray-500">
              Bạn sẽ được chuyển tới bước Xác nhận sau khi người dùng xác nhận
              đơn hàng.
            </p>
          </div>

          <ul className="text-red-600 mt-2">
            <li>
              Vui lòng cư xử văn minh, kiên nhẫn chờ xác nhận đơn hàng từ người
              mua.
            </li>
            <li>
              Khi cần thiết, bạn có thể giao tiếp với người mua ở phần "Trò
              chuyện với người mua".
            </li>
            <li>
              Khi người mua không thanh toán, bạn có thể hủy đơn hàng và người
              mua sẽ bị cấm mọi thao tác ở sản phẩm này.
            </li>
          </ul>

          <div className="flex flex-row gap-2 justify-center mt-10">
            <RejectOrderButton order={order} product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentStep;
