import { FlightOutlineIcon } from "@/components/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import ProductHook from "@/hooks/useProduct";
import { ProductQuestion } from "../../../../../shared/src/types";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const second = pad(d.getSeconds());

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
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
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="font-medium text-gray-900">{user.name}</p>
        {created_at && (
          <p className="text-xs text-gray-600"> {formatDate(date)}</p>
        )}
      </div>
      <p className="text-gray-600 mb-3">Câu hỏi: {comment}</p>
      {answer && (
        <div className="ml-4 pl-4 border-l-2 border-amber-400">
          <p className="text-sm font-medium text-amber-600 mb-1">
            Trả lời từ người bán:
          </p>
          <p className="text-sm text-gray-700">{answer.comment}</p>
        </div>
      )}
    </>
  );
}
interface ProductId {
  productId: number;
}
export const Question = ({ productId }: ProductId) => {
  const {
    data: questions,
    isLoading: isLoadingQuestion,
  }: {
    data: ProductQuestion[] | undefined;
    isLoading: boolean;
  } = ProductHook.useGetProductQuestion(productId);

  const { mutate: createQuestion, isPending: isCreateQuestion } =
    ProductHook.useCreateProductQuestion();
  const handleSend: SubmitHandler<{ comment: string }> = (data) => {
    createQuestion({ id: productId, data: data });
    reset();
  };
  const schema = z.object({
    comment: z.string().nonempty("Vui lòng nhập câu hỏi"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ comment: string }>({
    resolver: zodResolver(schema),
    defaultValues: { comment: "" },
  });
  const question = watch("comment");
  return (
    <div className="bg-white rounded-lg p-3 sm:p-6 mb-8 border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">Hỏi & Đáp</h3>
      <div>
        <form className=" mb-8" onSubmit={handleSubmit(handleSend)}>
          <div className="w-full  ">
            <div className="flex flex-row">
              <div className="flex-8 md:flex-9 mr-2">
                <input
                  {...register("comment")}
                  placeholder="Bạn có câu hỏi về sản phẩm này?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                />
              </div>
              <button
                type="submit"
                className="flex-2 md:flex-1 bg-blue-600 text-white flex justify-center items-center gap-1 rounded-2xl hover:cursor-pointer"
              >
                <FlightOutlineIcon />

                <span>Gửi</span>
              </button>
            </div>
            <span className="text-red-600 text-sm mt-1 block mb-2">
              {errors.comment ? errors.comment.message : ""}
            </span>
          </div>
        </form>
      </div>
      {questions &&
        questions.map((question, index) => (
          <div key={index} className="py-6 border-t border-gray-200">
            {" "}
            <QuestionItem {...question} />{" "}
          </div>
        ))}
    </div>
  );
};
