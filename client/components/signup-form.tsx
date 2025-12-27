"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterRequest } from "../../shared/src/types";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Tên không được để trống"),
    username: z.string().min(1, "Tên đăng nhập không được để trống"),
    email: z.email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 8 kí tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
    captchaToken: z
      .string("Vui lòng xác nhận bạn không phải là robot!")
      .min(1, "Vui lòng xác thực bạn không phải là robot"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { signUp } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setValue("captchaToken", token); // Đưa token vào form data
      trigger("captchaToken"); // Xóa lỗi validation (nếu có) ngay lập tức
    } else {
      setValue("captchaToken", ""); // Reset về rỗng nếu token hết hạn
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    // goi api backend
    try {
      const user: RegisterRequest = data;
      await signUp(user);
      router.push("/verify-otp");
    } catch (error) {
      console.log(error);
    } finally{
      recaptchaRef.current?.reset();
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 ">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Vùi lòng nhập thông tin dưới đây để tạo tại khoản
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="mtri123"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="mtri123"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <Field className="grid gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-destructive text-sm">
                        {errors.password.message}
                      </p>
                    )}
                    <FieldDescription>
                      Mật khẩu phải có ít nhất 8 kí tự
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Xác nhận mật khẩu
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>
                </Field>
              </Field>
              {/* ReCAPTCHA */}
              <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={onCaptchaChange}
                />
                {/* Hiển thị lỗi Zod cho Captcha */}
                {errors.captchaToken && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.captchaToken.message}
                  </p>
                )}
              </div>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  Tạo tài khoản
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Bạn đã có tài khoản chưa{" "}
                <Link href="/login" className="text-blue-500">
                  Đăng nhập
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
