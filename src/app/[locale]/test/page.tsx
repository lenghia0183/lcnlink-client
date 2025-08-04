"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/FormFields/TextField";
import { TEXTFIELD_PREVENT } from "@/constants/regexes";

import { RadioGroupField } from "@/components/FormFields/RadioGroupField";
import { CheckboxGroupField } from "@/components/FormFields/CheckboxGroupField";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";
import { AutoCompleteField } from "@/components/FormFields/AutoCompleteField";

// ✅ SCHEMA with `user` validated
const schema = z.object({
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
  country: z
    .object({
      code: z.string(),
      label: z.string(),
    })
    .optional(),
  user: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .nullable(),
});

type FormValues = z.infer<typeof schema>;

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

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
      user: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ Submitted:", data);
  };

  async function fetchPosts(query: string): Promise<Post[]> {
    const url = `/api/posts`;
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Test Form</h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <AutoCompleteField
            name="user"
            label="Select User"
            placeholder="Type a name..."
            required
            asyncRequest={fetchPosts}
            asyncRequestHelper={(data) => {
              return data.map((option) => ({
                id: option.id,
                title: option.title,
              }));
            }}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, val) => option?.id === val?.id}
            filterOptionsLocally={false}
            autoFetch={true}
            multiple={true}
          />

          <TextField
            name="email"
            label="Email"
            required
            placeholder="your@email.com"
            description="Chúng tôi sẽ không chia sẻ email của bạn."
            rightIcon={<Mail color="currentColor" />}
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
            description="Bạn có thể để trống nếu không có gì thêm."
          />

          <DatePickerField
            name="birthday"
            label="Ngày sinh"
            required
            mode="single"
            placeholder="Chọn ngày sinh"
            disabled={{ dayOfWeek: [0, 1, 2, 3, 6] }}
          />

          <DatePickerField
            name="eventDuration"
            label="Khoảng thời gian sự kiện"
            mode="range"
            placeholder="Chọn khoảng ngày"
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
