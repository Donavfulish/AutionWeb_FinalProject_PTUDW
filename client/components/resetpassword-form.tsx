"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordRequest } from "../../shared/src/types";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Mật khẩu phải có ít nhất 8 kí tự"),
    confirmPassword: z.string().min(1, "Mật khẩu phải có ít nhất 8 kí tự"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau",
    path: ["confirmPassword"],
  });

type resetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { resetPassword } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: resetPasswordFormValues) => {
    // goi api backend
    try {
      const user: ResetPasswordRequest = data;
      await resetPassword(user);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 ">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Quên tài khoản</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Vùi lòng nhập thông tin dưới đây
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="newPassword">Mật khẩu mới</FieldLabel>
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-destructive text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Nhập mật khẩu mới
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>
              <Link
                href="/login"
                className="text-right text-[10px] text-gray-400 "
              >
                Trở lại đăng nhập
              </Link>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  Gửi yêu cầu
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
