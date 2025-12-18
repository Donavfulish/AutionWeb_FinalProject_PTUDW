import Image from "next/image";
import { BiddingProduct } from "../../../shared/src/types";
import Link from "next/link";
import { formatCurrency } from "@/app/(MainLayout)/product/[product_slug]/components/Question";
import { defaultImage } from "@/app/const";

const BidProduct = ({ product }: { product: BiddingProduct }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 w-full">
        <div className="flex items-center gap-3 ">
          <Image
            src={product.main_image || defaultImage}
            alt="Ảnh sản phẩm"
            width={90}
            height={90}
            className="rounded-md object-cover p-1 border border-gray-200"
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-gray-700 text-[15px]">
              {product.name}
            </span>
            <span className="text-slate-500 font-stretch-10% text-sm">
              Giá đấu của bạn:{" "}
              <span className="text-[#0D9488] font-bold text-md">
                {formatCurrency(product.user_price)}
              </span>
            </span>
          </div>
        </div>
        <div className="text-right flex flex-col gap-1">
          <span className="text-slate-500 font-stretch-10% text-sm">
            Giá hiện tại
          </span>
          <span className="text-[#0D9488] font-bold text-lg">
            {formatCurrency(product.current_price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BidProduct;
