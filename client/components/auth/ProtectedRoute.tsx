import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

/**
 * Component bảo vệ route phía Client (Next.js)
 *
 * @description
 * - Kiểm tra trạng thái đăng nhập của người dùng
 * - Nếu có accessToken hiển thị tiếp
 * - Redirect về /login nếu không xác thực
 *
 * @example
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
