"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/TextField";
import { TEXTFIELD_PREVENT } from "@/constants/regexes";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { RadioGroupField } from "@/components/ui/RadioGroupField";
import { CheckboxGroupField } from "@/components/ui/CheckboxGroupField";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
  note: z.email(),
  type: z.enum(["all", "mentions", "none"]),
  hobbies: z
    .array(z.string())
    .min(1, "Bạn phải chọn ít nhất 1 sở thích")
    .optional(),
});

type FormValues = z.infer<typeof schema>;

export default function TestSiteForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "lenghia@gmail.com",
      password: "nghialc@gmail.com",
      note: "hehehe",
      type: "mentions",
      hobbies: ["coding"],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ Submitted:", data);
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Test Form</h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <TextField
            name="email"
            label="Email"
            required
            placeholder="your@email.com"
            description="Chúng tôi sẽ không chia sẻ email của bạn."
            // allow={TEXTFIELD_ALLOW.ALPHA}
            rightIcon={<Mail color="currentColor" />}
            iconOnClick={() => {
              console.log("iconOnClick");
            }}
            onChange={() => {
              console.log("onChange heheh");
            }}
            prevent={TEXTFIELD_PREVENT.NUMERIC}
          />

          <TextField
            name="password"
            label="Mật khẩu"
            required
            type="password"
            placeholder="Nhập mật khẩu"
            rightIcon={<Lock />}
          />

          <TextAreaField
            name="note"
            label="Ghi chú"
            placeholder="Nhập ghi chú..."
            required
            description="Bạn có thể để trống nếu không có gì thêm."
          />

          <RadioGroupField
            name="type"
            label="Notify me about..."
            required
            options={[
              {
                label: "All new messages",
                value: "all",
              },
              { label: "Direct messages and mentions", value: "mentions" },
              { label: "Nothing", value: "none" },
            ]}
          />

          <CheckboxGroupField
            name="hobbies"
            label="Chọn sở thích"
            required
            description="Bạn có thể chọn nhiều mục"
            options={[
              { id: "reading", label: "Đọc sách" },
              { id: "music", label: "Nghe nhạc" },
              { id: "travel", label: "Du lịch" },
              { id: "coding", label: "Lập trình" },
            ]}
          />

          <Button type="submit" className="w-full">
            Gửi
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
