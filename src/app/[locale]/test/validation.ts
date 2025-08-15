import { z } from "zod";

export const testSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
  note: z.string().optional(),
  type: z.enum(["all", "mentions", "none"]),
  birthday: z.date(),
  eventDuration: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  hobbies: z
    .array(z.string())
    .min(1, "Bạn phải chọn ít nhất 1 sở thích")
    .optional(),
  country: z.object({ code: z.string(), label: z.string() }).optional(),
  user: z
    .array(z.object({ id: z.number(), title: z.string() }))
    .min(1, "Bạn phải chọn ít nhất 1 người dùng")
    .optional(),
});

export type TestFormValues = z.infer<typeof testSchema>;
