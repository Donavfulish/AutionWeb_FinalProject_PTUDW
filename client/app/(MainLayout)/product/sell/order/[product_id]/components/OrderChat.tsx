"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import OrderHook from "@/hooks/useOrder";
import clsx from "clsx";
import { OrderMessage } from "../../../../../../../../shared/src/types";
import { Send, ShoppingBag } from "lucide-react";
import Image from "next/image";

type Props = {
  productId: number;
  isSeller?: boolean; // Prop mới
};

const formatChatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
};

const Avatar = ({
  name,
  img,
  isSeller,
}: {
  name: string;
  img?: string | null;
  isSeller?: boolean;
}) => {
  if (img) {
    return (
      <Image
        src={img}
        alt={name}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full object-cover shadow-md"
      />
    );
  }

  return (
    <div
      className={clsx(
        "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-md",
        isSeller ? "bg-teal-600" : "bg-blue-600"
      )}
    >
      {name?.charAt(0).toUpperCase()}
    </div>
  );
};

const OrderChat = ({ productId, isSeller = false }: Props) => {
  const user = useAuthStore((s) => s.user);
  const [message, setMessage] = useState("");
  const { data: conversation, isLoading } = OrderHook.useOrderChat(productId);
  const { mutate: sendMessage, isPending } = OrderHook.useCreateOrderChat();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [conversation?.messages.length]);

  if (isLoading || !conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
        <p className="text-sm text-slate-600 animate-pulse">
          Đang tải hội thoại...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden">
      {/* HEADER: Thay đổi gradient theo isSeller */}
      <div
        className={clsx(
          "relative px-6 py-4 shrink-0 transition-colors duration-500",
          isSeller
            ? "bg-gradient-to-r from-teal-700 via-teal-500 to-emerald-400"
            : "bg-gradient-to-r from-blue-800 via-cyan-500 to-indigo-300"
        )}
      >
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">
              Trao đổi đơn hàng
            </h3>
            <p className="text-xs text-white/80">
              {isSeller ? "Hỗ trợ khách hàng ngay" : "Luôn sẵn sàng hỗ trợ bạn"}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto p-4 space-y-1.5 bg-gradient-to-b from-slate-50/50 to-white"
      >
        {conversation.messages.map((msg: OrderMessage, idx: number) => {
          const isMe = msg.user.id === user?.id;
          const showAvatar =
            idx === 0 || conversation.messages[idx - 1].user.id !== msg.user.id;

          return (
            <div
              key={idx}
              className={clsx(
                "flex gap-2 animate-in slide-in-from-bottom-1 duration-300",
                isMe ? "justify-end" : "justify-start",
                showAvatar ? "mt-3" : "mt-0"
              )}
            >
              {!isMe && (
                <div className="w-8 shrink-0">
                  {showAvatar ? (
                    <Avatar
                      name={msg.user.name}
                      img={msg.user.profile_img}
                      isSeller={isSeller}
                    />
                  ) : (
                    <div className="w-8" />
                  )}
                </div>
              )}

              <div
                className={clsx(
                  "flex flex-col max-w-[85%]",
                  isMe ? "items-end" : "items-start"
                )}
              >
                <div
                  className={clsx(
                    "inline-block px-4 py-2 rounded-[18px] text-[14px] shadow-sm break-words transition-colors",
                    isMe
                      ? isSeller
                        ? "bg-teal-600 text-white rounded-tr-none"
                        : "bg-sky-500 text-white rounded-tr-none"
                      : "bg-slate-100 text-slate-900 rounded-tl-none"
                  )}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>

                {idx == conversation.messages.length - 1 && (
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {formatChatTime(msg.created_at.toString())}
                  </span>
                )}
              </div>

              {isMe && (
                <div className="w-8 shrink-0">
                  {showAvatar ? (
                    <Avatar
                      name={msg.user.name}
                      img={msg.user.profile_img}
                      isSeller={isSeller}
                    />
                  ) : (
                    <div className="w-8" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="flex gap-2 items-end">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className={clsx(
              "flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 transition-all",
              isSeller ? "focus:ring-teal-400" : "focus:ring-blue-400"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim() && !isPending) {
                sendMessage({ productId, payload: { message } });
                setMessage("");
              }
            }}
          />
          <button
            disabled={!message.trim() || isPending}
            onClick={() => {
              sendMessage({ productId, payload: { message } });
              setMessage("");
            }}
            className={clsx(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-slate-200 active:scale-90",
              message.trim() && !isPending
                ? isSeller
                  ? "bg-linear-to-r from-teal-600 to-emerald-400"
                  : "bg-gradient-to-r from-blue-500 to-cyan-400"
                : "bg-slate-300 shadow-none"
            )}
          >
            <Send className={clsx("w-5 h-5 text-white")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderChat;
