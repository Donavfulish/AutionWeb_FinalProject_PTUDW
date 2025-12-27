// components/AccessDenied.tsx
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  redirectLink?: string;
  redirectText?: string;
}

export default function AccessDenied({
  title = "Không có quyền truy cập",
  message = "Xin lỗi, bạn không có đủ quyền hạn để xem tài nguyên này. Vui lòng liên hệ quản trị viên hoặc quay lại trang chủ.",
  redirectLink = "/",
  redirectText = "Quay về trang chủ",
}: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">
        {/* Icon Animation */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full animate-pulse">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>

        <p className="text-gray-500 mb-8 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href={redirectLink}
            className="flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {redirectText}
          </Link>
        </div>
      </div>
    </div>
  );
}
