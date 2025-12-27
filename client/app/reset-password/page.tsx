"use client";
import { ResetPasswordForm } from "@/components/resetpassword-form";
import { useAuthStore } from "@/store/auth.store";
import AccessDenied from "@/components/AccessDefined";
export default function ResetPasswordPage() {
  const resetToken = useAuthStore((s) => s.resetToken);
  return (
    <>
      {resetToken ? (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <ResetPasswordForm />
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
