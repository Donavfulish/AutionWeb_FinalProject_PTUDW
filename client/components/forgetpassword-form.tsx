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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPasswordRequest } from "../../shared/src/types";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react"; // Thêm icon

const forgetPasswordSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  email: z.email("Email không hợp lệ"),
});

type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const forgetPassword  = useAuthStore(s => s.forgetPassword);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPasswordFormValues) => {
    try {
      const user: ForgetPasswordRequest = data;
      await forgetPassword(user);
      router.push("/verify-otp");
    } catch (error) {
      console.error(error);
      // Nên thêm toast error ở đây
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
      {...props}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Quên mật khẩu?
          </CardTitle>
          <CardDescription>
            Đừng lo lắng! Vui lòng nhập thông tin dưới đây để khôi phục tài
            khoản.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                placeholder="mtri123"
                disabled={isSubmitting}
                {...register("username")}
                className={cn(
                  errors.username &&
                    "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.username && (
                <p className="text-destructive text-xs font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email đăng ký</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled={isSubmitting}
                {...register("email")}
                className={cn(
                  errors.email &&
                    "border-destructive focus-visible:ring-destructive"
                )}
              />
              {errors.email && (
                <p className="text-destructive text-xs font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang gửi yêu cầu...
                </>
              ) : (
                "Gửi mã xác nhận"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6 bg-muted/20">
          <Link
            href="/login"
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại đăng nhập
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
