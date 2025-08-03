"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/TextField";
import { TEXTFIELD_PREVENT } from "@/constants/regexes";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
});

type FormValues = z.infer<typeof schema>;

export default function TestSiteForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
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
            inputProps={{
              maxLength: 10,
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
            vertical={false}
            leftIcon={<Lock />}
          />

          <Button type="submit" className="w-full">
            Gửi
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
