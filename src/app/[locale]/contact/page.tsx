"use client";

// import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { AppButton } from "@/components/AppButton";
import { TextField } from "@/components/FormFields/TextField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/AppToast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  subject: z.string().min(1, "Chủ đề là bắt buộc"),
  message: z.string().min(10, "Tin nhắn phải có ít nhất 10 ký tự"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  // const t = useTranslations("Contact");

  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (formValue: ContactFormValues) => {
    // Simulate form submission
    console.log("Contact form submitted:", formValue);
    
    // Reset form and show success message
    methods.reset();
    toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.");
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "support@linkshortener.com",
      subtext: "Phản hồi trong vòng 24 giờ",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Điện thoại",
      details: "+84 123 456 789",
      subtext: "Thứ 2 - Thứ 6, 9:00 - 17:00",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Địa chỉ",
      details: "123 Đường ABC, Quận 1",
      subtext: "TP. Hồ Chí Minh, Việt Nam",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Giờ làm việc",
      details: "Thứ 2 - Thứ 6",
      subtext: "9:00 AM - 5:00 PM (GMT+7)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi bất cứ khi nào bạn cần!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Thông tin liên hệ
            </h2>
            
            {contactInfo.map((info, index) => (
              <AppCard key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <div className="text-blue-600 dark:text-blue-400">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {info.subtext}
                    </p>
                  </div>
                </div>
              </AppCard>
            ))}

            {/* Additional Info */}
            <AppCard className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="text-white">
                <h3 className="font-semibold mb-2">Hỗ trợ khẩn cấp</h3>
                <p className="text-blue-100 text-sm">
                  Nếu bạn gặp vấn đề khẩn cấp, vui lòng gửi email với tiêu đề "URGENT" 
                  hoặc gọi hotline để được hỗ trợ ưu tiên.
                </p>
              </div>
            </AppCard>
          </div>

          {/* Contact Form */}
          <div>
            <AppCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Gửi tin nhắn
              </h2>
              
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <TextField
                      name="name"
                      label="Họ và tên"
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <TextField
                    name="subject"
                    label="Chủ đề"
                    placeholder="Tiêu đề tin nhắn"
                    required
                  />

                  <TextAreaField
                    name="message"
                    label="Tin nhắn"
                    placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                    rows={6}
                    required
                  />

                  <AppButton
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    iconLeft={<Send className="h-5 w-5" />}
                    loading={methods.formState.isSubmitting}
                  >
                    Gửi tin nhắn
                  </AppButton>
                </form>
              </FormProvider>
            </AppCard>

            {/* FAQ Section */}
            <AppCard className="p-6 mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Câu hỏi thường gặp
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Q: Tôi cần bao lâu để nhận được phản hồi?
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    A: Chúng tôi cam kết phản hồi trong vòng 24 giờ làm việc.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Q: Tôi có thể yêu cầu tính năng mới không?
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    A: Có! Chúng tôi luôn chào đón ý kiến đóng góp từ người dùng.
                  </p>
                </div>
              </div>
            </AppCard>
          </div>
        </div>
      </div>
    </div>
  );
}