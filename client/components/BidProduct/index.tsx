import Image from "next/image";
import { BiddingProduct } from "../../../shared/src/types";
import Link from "next/link";
import { formatCurrency } from "@/app/(MainLayout)/product/[product_slug]/components/Question";
import { defaultImage } from "@/app/const";
import { Clock, User, Star, TrendingUp, Trophy } from "lucide-react";

const BidProduct = ({ product }: { product: BiddingProduct }) => {
  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 w-full transition-all duration-300 hover:shadow-lg hover:border-blue-200 gap-4">
        {/* Phần bên trái: Ảnh + Thông tin sản phẩm & Người bán */}
        <div className="flex items-start gap-4 flex-1 w-full">
          <div className="relative shrink-0">
            <Image
              src={product.main_image || defaultImage}
              alt={product.name}
              width={90}
              height={90}
              className="rounded-xl object-cover border border-slate-100 shadow-sm transition-transform group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bold text-slate-800 text-[16px] line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Thông tin người bán */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-slate-600">
                <User className="w-3.5 h-3.5" />
                <span className="font-medium">
                  {product.seller?.name || "Người bán"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span className="font-bold text-xs">95%</span>
              </div>
            </div>

            {/* Thời gian còn lại & Giá của tôi */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[12px] font-bold uppercase tracking-tight">
                  02g : 15p : 30s
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg">
                <span className="text-[11px] font-medium uppercase">
                  Của tôi:
                </span>
                <span className="text-[12px] font-bold text-slate-800">
                  {formatCurrency(product.user_price)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Phần bên phải: Giá hiện tại & Người dẫn đầu */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <div className="text-left md:text-right">
            <div className="flex items-center md:justify-end gap-1.5 text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-3 h-3" />
              Giá hiện tại
            </div>
            <p className="text-[#0D9488] font-black text-xl leading-none">
              {formatCurrency(product.current_price)}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100">
            <div className="p-1 bg-white rounded-full shadow-sm">
              <Trophy className="w-3 h-3 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-teal-600 font-bold uppercase leading-none mb-0.5">
                Dẫn đầu
              </span>
              <span className="text-slate-700 font-bold text-xs leading-none">
                {"Ẩn danh"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BidProduct;
