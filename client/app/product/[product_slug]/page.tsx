"use client";
import BreadCrump from "@/components/Breadcrump";
import FunctionalButton from "@/components/FunctionalButton";
import {
  CalendarOutlineIcon,
  FlightOutlineIcon,
  LoveFullIcon,
  LoveIcon,
  UserOutlineIcon,
} from "@/components/icons";
import { ImageCarousel } from "@/components/ImageCarousel";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "../../../../shared/src/types";
import ProductCard from "@/components/ProductCard";

interface Question {
  name: string;
  question: string;
  response?: string;
  date: string;
}

function QuestionItem({ name, question, response, date }: Question) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-600"> {date}</p>
      </div>
      <p className="text-gray-600 mb-3">Câu hỏi: {question}</p>
      {response && (
        <div className="ml-4 pl-4 border-l-2 border-amber-400">
          <p className="text-sm font-medium text-amber-600 mb-1">
            Trả lời từ người bán:
          </p>
          <p className="text-sm text-gray-700">{response}</p>
        </div>
      )}
    </>
  );
}

export const mockQuestions: Question[] = [
  {
    name: "Nguyễn Văn A",
    question: "Làm sao để tối ưu SEO cho trang Next.js?",
    response: "Bạn có thể dùng metadata, sitemap và tối ưu tốc độ tải trang.",
    date: "2025-01-10",
  },
  {
    name: "Trần Thị B",
    question: "ISR trong Next.js khác gì với SSR?",
    response: undefined,
    date: "2025-02-14",
  },
  {
    name: "Lê Minh C",
    question: "App Router có thay thế hoàn toàn Pages Router không?",
    response:
      "Hiện tại App Router được khuyến khích dùng nhưng Pages Router vẫn được hỗ trợ.",
    date: "2025-03-01",
  },
  {
    name: "Phạm Duy D",
    question: "Làm sao fetch API trong server component?",
    response: undefined,
    date: "2025-04-21",
  },
  {
    name: "Hoàng Gia E",
    question: "Next.js hỗ trợ static export không?",
    response: "Có, bạn có thể dùng `next export`.",
    date: "2025-05-12",
  },
  {
    name: "Đỗ Hải F",
    question: "use client dùng khi nào?",
    response:
      "Dùng khi component cần interactivity: state, event handlers hoặc hooks client. dsad d asd sd asd asd asd asd asd asd asd asd asd as dsad d sad sad sad sad sad sad sad asd as sa d asd asd asda sdasd ",
    date: "2025-06-03",
  },
  {
    name: "Vũ Ngọc G",
    question: "Làm sao config middleware?",
    response: undefined,
    date: "2025-06-25",
  },
  {
    name: "Bùi Thanh H",
    question: "Server Actions là gì?",
    response:
      "Là một cách gọi server-side logic trực tiếp từ client mà không cần API routes.",
    date: "2025-07-14",
  },
  {
    name: "Đặng Quốc I",
    question: "Next.js có hỗ trợ i18n không?",
    response: undefined,
    date: "2025-08-02",
  },
  {
    name: "Phan Nhật K",
    question: "Làm sao tối ưu bundle size?",
    response:
      "Bạn có thể sử dụng dynamic import và kiểm tra bundle bằng `next build`.",
    date: "2025-08-20",
  },
];

interface BidHis {
  time: string;
  name: string;
  price: number;
}
export const mockBidHistory: BidHis[] = [
  {
    time: "2025-01-10 10:32:15",
    name: "Nguyễn Văn A",
    price: 1500000,
  },
  {
    time: "2025-01-10 10:35:42",
    name: "Trần Thị B",
    price: 1550000,
  },
  {
    time: "2025-01-10 10:40:03",
    name: "Lê Minh C",
    price: 1600000,
  },
  {
    time: "2025-01-10 10:45:55",
    name: "Phạm Duy D",
    price: 1650000,
  },
  {
    time: "2025-01-10 10:49:20",
    name: "Hoàng Gia E",
    price: 1700000,
  },
  {
    time: "2025-01-10 10:52:11",
    name: "Đỗ Hải F",
    price: 1750000,
  },
  {
    time: "2025-01-10 10:55:33",
    name: "Vũ Ngọc G dsad asd asd asd asd asd as fasdf sdf d asd as dsad asd asd asd  dsf dfs ds dsf dsf dsf sdf dsf sdf d dasd 1  ",
    price: 1780000666666,
  },
  {
    time: "2025-01-10 10:59:10",
    name: "Bùi Thanh H",
    price: 1800000,
  },
  {
    time: "2025-01-10 11:02:45",
    name: "Đặng Quốc I",
    price: 1850000,
  },
  {
    time: "2025-01-10 11:05:12",
    name: "Phan Nhật K",
    price: 1900000,
  },
];
export const mockProducts: Product[] = [
  {
    id: 1,
    slug: "dong-ho-rolex-day-kim-loai",
    seller: {
      id: 10,
      name: "Nguyễn Văn A",
      profile_img: "https://ui-avatars.com/api/?name=Nguyen+Van+A",
    },
    category_id: 1,
    main_image: "https://picsum.photos/seed/rolex/600/400",
    extra_images: [
      "https://picsum.photos/seed/rolex1/600/400",
      "https://picsum.photos/seed/rolex2/600/400",
    ],
    name: "Đồng hồ Rolex Day-Date 40mm",
    initial_price: 150000000,
    buy_now_price: 200000000,
    current_price: 155000000,
    top_bidder: {
      id: 22,
      name: "Trần Minh",
      profile_img: "https://ui-avatars.com/api/?name=Tran+Minh",
    },
    bid_count: 12,
    end_time: new Date("2025-12-20T15:30:00"),
    description: "Rolex Day-Date 40mm dây vàng khối, tình trạng 99%, fullbox.",
    auto_extend: true,
    price_increment: 2000000,
    created_at: new Date("2025-10-10T13:20:00"),
    updated_at: new Date("2025-11-01T09:15:00"),
  },

  {
    id: 2,
    slug: "macbook-pro-m3-2025",
    seller: {
      id: 11,
      name: "Trần Quốc Bảo",
      profile_img: "https://ui-avatars.com/api/?name=Tran+Quoc+Bao",
    },
    category_id: 2,
    main_image: "https://picsum.photos/seed/macbook/600/400",
    extra_images: ["https://picsum.photos/seed/macbook1/600/400"],
    name: "MacBook Pro M3 Max 2025 – 32GB / 1TB",
    initial_price: 45000000,
    buy_now_price: 55000000,
    current_price: 46800000,
    top_bidder: null,
    bid_count: 0,
    end_time: new Date("2025-12-28T20:00:00"),
    description:
      "MacBook Pro M3 Max mới 98%, hiệu năng cực mạnh, phù hợp editor.",
    auto_extend: false,
    price_increment: 500000,
    created_at: new Date("2025-11-05T08:30:00"),
    updated_at: null,
  },

  {
    id: 3,
    slug: "giay-jordan-1-lost-and-found",
    seller: {
      id: 15,
      name: "Phạm Hoàng Long",
      profile_img: "https://ui-avatars.com/api/?name=Pham+Hoang+Long",
    },
    category_id: 3,
    main_image: "https://picsum.photos/seed/jordan/600/400",
    extra_images: [
      "https://picsum.photos/seed/jordan1/600/400",
      "https://picsum.photos/seed/jordan2/600/400",
    ],
    name: "Jordan 1 Retro High OG - Lost & Found",
    initial_price: 8000000,
    buy_now_price: 11000000,
    current_price: 9000000,
    top_bidder: {
      id: 24,
      name: "Lê Thanh",
      profile_img: "https://ui-avatars.com/api/?name=Le+Thanh",
    },
    bid_count: 5,
    end_time: new Date("2025-12-25T18:45:00"),
    description: "Jordan 1 Lost & Found size 42, hàng chính hãng 100%.",
    auto_extend: true,
    price_increment: 200000,
    created_at: new Date("2025-10-30T11:00:00"),
    updated_at: new Date("2025-11-10T12:00:00"),
  },

  {
    id: 4,
    slug: "camera-sony-a7m4-body",
    seller: {
      id: 12,
      name: "Hoàng Gia Minh",
      profile_img: "https://ui-avatars.com/api/?name=Hoang+Gia+Minh",
    },
    category_id: 4,
    main_image: "https://picsum.photos/seed/sony/600/400",
    extra_images: [],
    name: "Sony A7 Mark IV (Body)",
    initial_price: 30000000,
    buy_now_price: 38000000,
    current_price: 31500000,
    top_bidder: null,
    bid_count: 2,
    end_time: new Date("2025-12-22T19:00:00"),
    description: "Sony A7M4 body đẹp 97%, chụp 25k shots.",
    auto_extend: true,
    price_increment: 1000000,
    created_at: new Date("2025-10-18T14:30:00"),
    updated_at: null,
  },

  {
    id: 5,
    slug: "lego-star-wars-millennium-falcon",
    seller: {
      id: 14,
      name: "Đỗ Hải Phong",
      profile_img: "https://ui-avatars.com/api/?name=Do+Hai+Phong",
    },
    category_id: 5,
    main_image: "https://picsum.photos/seed/lego/600/400",
    extra_images: ["https://picsum.photos/seed/lego1/600/400"],
    name: "LEGO Star Wars – Millennium Falcon (Ultimate Edition)",
    initial_price: 16000000,
    buy_now_price: 20000000,
    current_price: 16800000,
    top_bidder: {
      id: 33,
      name: "Ngô Nhật",
      profile_img: "https://ui-avatars.com/api/?name=Ngo+Nhat",
    },
    bid_count: 8,
    end_time: new Date("2025-12-30T21:30:00"),
    description: "Bản LEGO Millennium Falcon cực lớn, hơn 7,500 chi tiết.",
    auto_extend: false,
    price_increment: 300000,
    created_at: new Date("2025-11-02T10:00:00"),
    updated_at: new Date("2025-11-12T16:00:00"),
  },
];

export default function ProductPage() {
  const [question, setQuestion] = useState("");

  const handleLike = () => {
    console.log("Đã nhấn like");
  };
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question != "") {
      alert("Đã gửi:" + question);
      setQuestion("");
    }
  };

  const handleChangeQuesion = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuestion(e.target.value);
  };
  return (
    <div className="bg-[#F8FAFC] w-full">
      <div className="mb-4">
        <BreadCrump category_name="" category_slug="" product_name="" />
      </div>
      <div className="flex flex-col md:flex-row gap-12 mb-12 ">
        <div className="p-8 md:p-0 md:w-1/2 ">
          <ImageCarousel />
        </div>
        <div className="bg-white border  border-gray-200 rounded-lg p-4 sm:p-8 w-full">
          <div className="pb-6 border-b mb-6  border-slate-200">
            <h1 className="text-2xl font-bold mb-4 text-slate-900">
              Tôi là luân
            </h1>
            <p className="text-sm font-light mb-2 text-slate-600">
              Giá hiện tại
            </p>
            <p className="text-4xl font-bold text-teal-600 mb-2">
              100.000.000 ₫
            </p>
            <p className="text-sm text-slate-600 font-light">
              {" "}
              {10} Lượt đấu giá
            </p>
          </div>
          <div className="pb-6 border-b mb-6 border-slate-200 grid grid-cols-2">
            <div>
              <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                <CalendarOutlineIcon />
                Thời điểm đăng
              </p>
              <p className="ml-4 text-[16px] font-semibold text-slate-900">
                Ngày 33/15/2025
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                <UserOutlineIcon />
                Người ra giá cao nhất
              </p>
              <p className=" ml-4 text-[16px] font-semibold text-slate-900">
                Chưa có
              </p>
            </div>
          </div>

          <div className="pb-6 border-b  mb-6 border-slate-200">
            <div>
              <p className="text-sm font-medium  text-slate-600 mb-3">
                Người bán
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="rounded-[6px] overflow-hidden">
                <Image
                  src={
                    "https://tse2.mm.bing.net/th/id/OIP.69Uf7oJm4oddlrJyo4R_wAHaHa?pid=Api&P=0&h=180"
                  }
                  width={50}
                  height={50}
                  alt="..."
                />
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Tôi là luân</p>
                <p className="text-xs text-slate-600">⭐ {"4.5"}</p>
              </div>
            </div>
          </div>
          <div className="pb-6 border-b  mb-6 border-slate-200 ">
            <p className="text-sm text-slate-600 mb-2 font-light">
              Thời gian còn lại
            </p>
            <p className="text-xl font-bold text-teal-600">Đã kết thúc</p>
          </div>
          <div className="pb-6 border-b  mb-6 border-slate-200 ">
            <p className="text-sm text-slate-600 mb-2 font-light">
              Giá đấu tiếp theo
            </p>
            <p className="text-3xl font-bold text-teal-600">52.500.000 ₫</p>
          </div>
          <div className="pb-6 border-b  mb-6 border-slate-200 gap-4 flex flex-col">
            <div>
              <PrimaryButton text="Đặt lệnh đấu giá" />
            </div>
            <div>
              <SecondaryButton text={"Mua ngay " + "55.000.000" + " ₫"} />
            </div>
          </div>
          <div>
            <div
              onClick={handleLike}
              className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-300 rounded-lg hover:bg-slate-100  hover:cursor-pointer"
            >
              <LoveIcon />
              {/* <LoveFullIcon /> */}
              <span className="text-sm font-medium">Yêu thích</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 sm:p-6 mb-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Thông tin chi tiết sản phẩm
        </h3>
        <p>
          Rolex Datejust 41mm hai kim, mặt xanh, thép không gỉ. Đồng hồ chính
          hãng, có giấy tờ đầy đủ.
        </p>
      </div>
      <div className="bg-white rounded-lg p-3 sm:p-6 mb-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Hỏi & Đáp</h3>
        <div>
          <form
            className="flex flex-row gap-2 mb-8 "
            onSubmit={(e) => handleSend(e)}
          >
            <div className="flex-8 md:flex-9">
              <input
                placeholder="Bạn có câu hỏi về sản phẩm này?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                value={question}
                onChange={(e) => handleChangeQuesion(e)}
              />
            </div>

            <button
              type="submit"
              className="flex-2 md:flex-1 bg-blue-600 text-white flex justify-center items-center gap-1 rounded-2xl hover:cursor-pointer"
            >
              <FlightOutlineIcon />

              <span>Gửi</span>
            </button>
          </form>
        </div>
        {mockQuestions.map((question, index) => (
          <div key={index} className="py-6 border-t border-gray-200">
            {" "}
            <QuestionItem {...question} />{" "}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg p-6 mb-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Lịch sử đấu giá
        </h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3 px-3 text-sm font-semibold text-gray-600">
                Thời gian
              </th>
              <th className="text-left py-3 px-3 text-sm font-semibold text-gray-600">
                Người đấu giá
              </th>
              <th className="text-right py-3 px-3 text-sm font-semibold text-gray-600">
                Giá
              </th>
            </tr>
          </thead>
          <tbody>
            {mockBidHistory.map((his, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-1 sm:px-3 truncate text-[12px] sm:text-sm text-gray-700">
                  {his.time}
                </td>
                <td className="py-3 px-1 sm:px-3 truncate max-w-[90px] text-[12px] sm:text-sm font-medium text-gray-700">
                  {his.name}
                </td>
                <td className="py-3 px-1 sm:px-3 truncate text-[12px] sm:text-sm font-bold text-blue-600 text-right">
                  {his.price} ₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">
        Sản phẩm liên quan
      </h3>
      <div className=" grid gap-4 lg:gap-0 lg:grid-cols-5 ">
        {mockProducts.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
