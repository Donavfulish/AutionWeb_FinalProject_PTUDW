"use client";

import OtpInput from "@/components/OtpInput/OtpInput";
import { UserOTP } from "../../../shared/src/types/ResetPasswordOTP";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
export default function VerifyOtpPage() {
  const router = useRouter();
  const forgetUserId = useAuthStore((s) => s.forgetUserId);
  const verifyOTP = useAuthStore((s) => s.verifyOTP);
  const handleOtpComplete = async (otp: string) => {
    try {
      const user: UserOTP = {
        otp: otp,
        user_id: forgetUserId,
      };

      await verifyOTP(user);
      console.log(useAuthStore.getState().resetToken);
      if (useAuthStore.getState().resetToken) {
        router.push("/reset-password");
      }
      console.log("Mã OTP đã nhập:", otp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Xác thực OTP</h1>
        <p className="text-gray-500 mb-6">
          Vui lòng nhập mã 6 số chúng tôi vừa gửi vào email của bạn.
        </p>

        <OtpInput length={6} onComplete={handleOtpComplete} />

        <button
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          onClick={() => {
            /* Logic submit thủ công nếu cần */
          }}
        >
          Xác nhận
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Chưa nhận được mã?{" "}
          <span className="text-blue-500 cursor-pointer">Gửi lại</span>
        </p>
      </div>
    </div>
  );
}
