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
import { RegisterRequest } from "../../shared/src/types";
import Link from "next/link";

const forgetPasswordSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập phải có ít nhất 1 kí tự"),
  email: z.email("Email không hợp lệ"),
});

type forgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<forgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: forgetPasswordFormValues) => {
    // // goi api backend
    // const user: RegisterRequest = data;
    // await signUp(user);
    // router.push("/login");
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
