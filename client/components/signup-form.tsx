"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Sử dụng Label chuẩn
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterRequest } from "../../shared/src/types";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from "lucide-react"; // Icon loading

const signUpSchema = z
  .object({
    name: z.string().min(1, "Tên không được để trống"),
    username: z.string().min(1, "Tên đăng nhập không được để trống"),
    email: z.email("Email không hợp lệ"),
    address: z.string().min(1, "Bắt buộc phải nhập địa chỉ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 8 kí tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
    captchaToken: z
      .string({ required_error: "Vui lòng xác thực bạn không phải là robot" })
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
  const signUp = useAuthStore((s) => s.signUp);
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
      setValue("captchaToken", token);
      trigger("captchaToken");
    } else {
      setValue("captchaToken", "");
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const user: RegisterRequest = data;
      await signUp(user);
      router.push("/verify-otp");
    } catch (error) {
      console.error(error);
      // Có thể thêm Toast thông báo lỗi tại đây
    } finally {
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-xl mx-auto", className)}
      {...props}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Tạo tài khoản
          </CardTitle>
          <CardDescription>
            Vui lòng nhập thông tin dưới đây để tạo tài khoản mới
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Row 1: Name & Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Họ và tên <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Nguyễn Văn A"
                  {...register("name")}
                  className={cn(
                    errors.name &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">
                  Tên đăng nhập <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  placeholder="nguyenvana123"
                  {...register("username")}
                  className={cn(
                    errors.username &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.username && (
                  <p className="text-destructive text-xs">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register("email")}
                className={cn(
                  errors.email &&
                    "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Row 3: Address */}
            <div className="space-y-2">
              <Label htmlFor="address">
                Địa chỉ <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                placeholder="123 Đường ABC, Phường X..."
                {...register("address")}
                className={cn(
                  errors.address &&
                    "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.address && (
                <p className="text-destructive text-xs">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Row 4: Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Mật khẩu <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={cn(
                    errors.password &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.password && (
                  <p className="text-destructive text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={cn(
                    errors.confirmPassword &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* ReCAPTCHA Section */}
            <div className=" pt-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={onCaptchaChange}
                theme="light"
              />
              {errors.captchaToken && (
                <p className="text-destructive text-xs mt-2 font-medium">
                  {errors.captchaToken.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Đăng ký tài khoản"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6 bg-muted/20">
          <div className="text-center text-sm text-muted-foreground">
            Bạn đã có tài khoản?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
