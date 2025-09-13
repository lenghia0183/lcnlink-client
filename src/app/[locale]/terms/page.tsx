"use client";

// import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { FileText, AlertTriangle, Check, X, Scale, Users } from "lucide-react";

export default function TermsOfServicePage() {
  // const t = useTranslations("Terms");

  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "1. Chấp nhận điều khoản",
      content: [
        "Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản này",
        "Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng dịch vụ",
        "Chúng tôi có quyền cập nhật điều khoản này bất cứ lúc nào",
        "Việc tiếp tục sử dụng sau khi cập nhật đồng nghĩa với việc chấp nhận điều khoản mới"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "2. Tài khoản người dùng",
      content: [
        "Bạn phải cung cấp thông tin chính xác khi đăng ký tài khoản",
        "Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình",
        "Mỗi người chỉ được tạo một tài khoản duy nhất",
        "Chúng tôi có quyền đình chỉ tài khoản vi phạm điều khoản"
      ]
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "3. Sử dụng được phép",
      content: [
        "Tạo link rút gọn cho mục đích hợp pháp và chính đáng",
        "Chia sẻ link với người khác một cách có trách nhiệm",
        "Sử dụng tính năng thống kê để theo dõi hiệu quả",
        "Báo cáo các vấn đề kỹ thuật để chúng tôi cải thiện dịch vụ"
      ]
    },
    {
      icon: <X className="h-6 w-6" />,
      title: "4. Hành vi bị cấm",
      content: [
        "Tạo link đến nội dung bất hợp pháp, có hại hoặc không phù hợp",
        "Sử dụng dịch vụ để spam, lừa đảo hoặc gây tổn hại",
        "Cố gắng xâm nhập hoặc làm gián đoạn hệ thống",
        "Sao chép, bán lại hoặc khai thác thương mại dịch vụ",
        "Tạo tài khoản giả mạo hoặc cung cấp thông tin sai lệch"
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "5. Trách nhiệm và giới hạn",
      content: [
        "Dịch vụ được cung cấp \"như hiện tại\" không có bảo đảm nào",
        "Chúng tôi không chịu trách nhiệm về nội dung của link gốc",
        "Người dùng tự chịu trách nhiệm về việc sử dụng dịch vụ",
        "Chúng tôi có quyền ngừng cung cấp dịch vụ bất cứ lúc nào",
        "Không bảo đảm thời gian hoạt động 100% của hệ thống"
      ]
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "6. Quyền sở hữu trí tuệ",
      content: [
        "Tất cả quyền sở hữu trí tuệ của dịch vụ thuộc về chúng tôi",
        "Bạn giữ quyền sở hữu đối với nội dung bạn chia sẻ",
        "Bạn cấp cho chúng tôi quyền sử dụng dữ liệu để cung cấp dịch vụ",
        "Không được sao chép, phân phối lại mã nguồn hoặc thiết kế"
      ]
    }
  ];

  const pricing = [
    {
      feature: "Dịch vụ cơ bản",
      description: "Tạo và quản lý link rút gọn",
      price: "Miễn phí"
    },
    {
      feature: "Thống kê chi tiết",
      description: "Xem phân tích click và nguồn truy cập",
      price: "Miễn phí"
    },
    {
      feature: "Link tùy chỉnh",
      description: "Tạo alias tùy chỉnh cho link",
      price: "Miễn phí"
    },
    {
      feature: "Bảo vệ mật khẩu",
      description: "Thêm mật khẩu bảo vệ cho link",
      price: "Miễn phí"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Scale className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Điều khoản dịch vụ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng dịch vụ của chúng tôi. 
            Việc sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận các điều khoản này.
          </p>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Có hiệu lực từ: {new Date().toLocaleDateString('vi-VN')}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <AppCard key={index} className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <div className="text-blue-600 dark:text-blue-400">
                      {section.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </AppCard>
            ))}
          </div>

          {/* Pricing Information */}
          <AppCard className="p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Thông tin giá cả
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">
                  🎉 Tất cả dịch vụ hiện tại đều MIỄN PHÍ!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Chúng tôi cung cấp tất cả tính năng hoàn toàn miễn phí cho người dùng
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {pricing.map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.feature}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium ml-3">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AppCard>

          {/* Contact Info */}
          <AppCard className="p-8 mt-8 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-4">Có thắc mắc về điều khoản?</h3>
              <p className="text-blue-100 mb-6">
                Nếu bạn cần làm rõ bất kỳ điều khoản nào hoặc có câu hỏi pháp lý, 
                vui lòng liên hệ với bộ phận pháp chế của chúng tôi.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <span className="text-blue-100">Email: </span>
                <a 
                  href="mailto:legal@linkshortener.com" 
                  className="text-white font-semibold hover:text-blue-200 transition-colors"
                >
                  legal@linkshortener.com
                </a>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}