"use client";

import { FlightOutlineIcon } from "@/components/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import ProductHook from "@/hooks/useProduct";
import {
  ProductQuestion,
  ProductQuestionPagination,
} from "../../../../../../shared/src/types";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthStore } from "@/store/auth.store";
export function formatDate(date?: Date | string): string {
  if (!date) return "--";
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) return "--";

  const pad = (n: number) => n.toString().padStart(2, "0");

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hour = pad(d.getHours());
  const minute = pad(d.getMinutes());

  return `Ngày ${day}/${month}/${year}, ${hour} giờ ${minute} phút`;
}

export function formatCurrency(value: number | null, currency = "₫"): string {
  if (value === null || value === undefined) return "0" + currency;

  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numberValue)) return "0" + currency;

  return numberValue.toLocaleString("vi-VN") + currency;
}

function QuestionItem({
  id,
  product_id,
  user,
  comment,
  answer,
  created_at,
}: ProductQuestion) {
  const date = new Date(created_at ?? "");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="flex flex-row justify-between">
        <p className="font-medium text-gray-900">{user.name}</p>
        {created_at && (
          <p className="text-xs text-gray-600">{formatDate(date)}</p>
        )}
      </div>

      <p className="text-gray-600 mb-2">Câu hỏi: {comment}</p>

      {/* Nút mở dropdown */}
      {answer && answer.length > 0 && (
        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-amber-600 hover:underline cursor-pointer"
        >
          {open ? "Ẩn câu trả lời" : `Xem ${answer.length} câu trả lời`}
        </button>
      )}

      {/* Dropdown answers */}
      {open && (
        <div className="mt-3">
          {answer?.map((item, index) => (
            <div
              key={index}
              className="ml-4 pl-4 border-l-2 border-amber-400 my-3"
            >
              <p className="text-sm font-semibold text-black">
                {item.user.name}
              </p>
              <p className="text-sm text-gray-700">
                Câu trả lời: {item.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
interface ProductId {
  productId: number;
}
export const Question = ({ productId }: ProductId) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("limit")) || 5;

  const {
    data: questionPagination,
    isLoading: isLoadingQuestion,
  }: {
    data: ProductQuestionPagination | undefined;
    isLoading: boolean;
  } = ProductHook.useGetProductQuestionsByPage(productId, page, per_page);

  const questions = questionPagination?.questions || [];
  const totalPages = questionPagination
    ? Math.ceil(questionPagination.total / per_page)
    : 0;

  const handlePageChange = (value: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", value.toString());
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const { mutate: createQuestion, isPending: isCreateQuestion } =
    ProductHook.useCreateProductQuestion();

  const schema = z.object({
    comment: z.string().nonempty("Vui lòng nhập câu hỏi"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ comment: string }>({
    resolver: zodResolver(schema),
    defaultValues: { comment: "" },
  });

  const handleSend: SubmitHandler<{ comment: string }> = (data) => {
    createQuestion({ id: productId, data: data });
    setValue("comment", "");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800">
          Hỏi & Đáp về sản phẩm
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          {questionPagination?.total || 0} câu hỏi thảo luận
        </p>
      </div>

      <div className="p-4 md:p-6">
        {/* Input Form */}
        {user ? (
          <form className="mb-8 md:mb-10" onSubmit={handleSubmit(handleSend)}>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <div className="flex-1 w-full">
                <input
                  {...register("comment")}
                  placeholder="Bạn muốn biết thêm gì về sản phẩm này?"
                  className={`
                  w-full px-4 py-3 
                  bg-slate-50 border 
                  rounded-xl transition-all duration-200 ease-in-out
                  placeholder:text-slate-400 text-slate-700
                  focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 
                  ${
                    errors.comment
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500"
                  }
                `}
                  type="text"
                  disabled={isCreateQuestion}
                />
                {errors.comment && (
                  <span className="text-red-500 text-sm mt-1.5 ml-1 block animate-fade-in">
                    {errors.comment.message}
                  </span>
                )}
              </div>
              {user ? (
                <button
                  type="submit"
                  disabled={isCreateQuestion}
                  className="
                w-full sm:w-auto shrink-0
                px-6 py-3 
                bg-blue-600 text-white font-medium
                rounded-xl shadow-md shadow-blue-600/20
                flex justify-center items-center gap-2 
                transition-all duration-200 
                hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5
                active:translate-y-0 active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
              "
                >
                  {isCreateQuestion ? (
                    // Có thể thay bằng icon loading nhỏ nếu muốn
                    <span>Đang gửi...</span>
                  ) : (
                    <>
                      <FlightOutlineIcon className="w-5 h-5" />
                      <span>Gửi câu hỏi</span>
                    </>
                  )}
                </button>
              ) : (
                <></>
              )}
            </div>
          </form>
        ) : (
          <></>
        )}

        {/* Question List Section */}
        <div className="relative min-h-[100px]">
          {isLoadingQuestion ? (
            <div className="flex justify-center items-center py-10">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {questions && questions.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className={`
                        ${
                          index !== questions.length - 1
                            ? "border-b border-slate-100 pb-6"
                            : ""
                        }
                      `}
                    >
                      <QuestionItem {...question} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  {user 
                    ? (<p>Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!</p>)
                    : (<p>Chưa có câu hỏi nào.</p>)
                  }
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 pt-4 border-t border-slate-100">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
