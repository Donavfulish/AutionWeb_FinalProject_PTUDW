import * as z from 'zod';

export const EditProfileSchema = z.object({
  name: z.string().min(1, "Tên đầy đủ không được để trống"),
  email: z.string().min(1, "Email không được để trống").email("Email không đúng định dạng"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  day_of_birth: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Ngày sinh không hợp lệ"
    ),
});

export type EditProfileInputs = z.infer<typeof EditProfileSchema>;