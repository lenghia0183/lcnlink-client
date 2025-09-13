"use client";

// import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { Cookie, Settings, Eye, Shield, Trash2, CheckCircle } from "lucide-react";

export default function CookiePolicyPage() {
  // const t = useTranslations("Cookies");

  const cookieTypes = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Cookies cần thiết",
      description: "Các cookies này cần thiết để trang web hoạt động và không thể tắt.",
      required: true,
      examples: [
        "Phiên đăng nhập của người dùng",
        "Cài đặt bảo mật và xác thực",
        "Preferences cơ bản của trang web"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Cookies phân tích",
      description: "Giúp chúng tôi hiểu cách người dùng tương tác với trang web.",
      required: false,
      examples: [
        "Google Analytics để theo dõi lượt truy cập",
        "Thống kê thời gian sử dụng trang",
        "Phân tích hành vi người dùng"
      ]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Cookies chức năng",
      description: "Lưu trữ tùy chọn và cài đặt để cải thiện trải nghiệm.",
      required: false,
      examples: [
        "Ngôn ngữ hiển thị",
        "Chế độ dark/light theme",
        "Cài đặt giao diện người dùng"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Cookies bảo mật",
      description: "Bảo vệ trang web khỏi các cuộc tấn công và gian lận.",
      required: true,
      examples: [
        "CSRF protection tokens",
        "Rate limiting và spam protection",
        "Security headers và validation"
      ]
    }
  ];

  const managementOptions = [
    {
      browser: "Chrome",
      steps: [
        "Nhấp vào menu ba chấm ở góc trên bên phải",
        "Chọn 'Cài đặt' > 'Quyền riêng tư và bảo mật'",
        "Nhấp 'Cookies và dữ liệu trang web khác'",
        "Quản lý cookies theo ý muốn"
      ]
    },
    {
      browser: "Firefox",
      steps: [
        "Nhấp vào menu ba dạng ở góc trên bên phải",
        "Chọn 'Cài đặt' > 'Quyền riêng tư & Bảo mật'",
        "Tìm phần 'Cookies và dữ liệu trang web'",
        "Chỉnh sửa cài đặt cookies"
      ]
    },
    {
      browser: "Safari",
      steps: [
        "Vào menu 'Safari' > 'Tùy chọn'",
        "Nhấp tab 'Quyền riêng tư'",
        "Quản lý cài đặt cookies và website tracking",
        "Chọn mức độ bảo mật phù hợp"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Cookie className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Chính sách cookies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Chúng tôi sử dụng cookies để cải thiện trải nghiệm của bạn trên trang web. 
            Tìm hiểu về các loại cookies chúng tôi sử dụng và cách quản lý chúng.
          </p>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </div>
        </div>

        {/* What are cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <AppCard className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Cookies là gì?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Cookies là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập trang web. 
              Chúng giúp trang web ghi nhớ thông tin về lần truy cập của bạn, làm cho lần truy cập tiếp theo 
              dễ dàng hơn và trang web hữu ích hơn đối với bạn.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Cookies không chứa thông tin cá nhân có thể xác định danh tính và không thể chạy mã độc hại. 
              Chúng đơn giản là dữ liệu text được sử dụng để cải thiện trải nghiệm người dùng.
            </p>
          </AppCard>
        </div>

        {/* Types of cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Các loại cookies chúng tôi sử dụng
          </h2>
          
          <div className="grid gap-6">
            {cookieTypes.map((type, index) => (
              <AppCard key={index} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${
                    type.required 
                      ? 'bg-red-100 dark:bg-red-900' 
                      : 'bg-green-100 dark:bg-green-900'
                  }`}>
                    <div className={`${
                      type.required 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {type.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {type.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        type.required
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                      }`}>
                        {type.required ? 'Bắt buộc' : 'Tùy chọn'}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {type.description}
                    </p>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Ví dụ:
                      </h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {example}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        </div>

        {/* Cookie Management */}
        <div className="max-w-4xl mx-auto mb-12">
          <AppCard className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Cách quản lý cookies
            </h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quản lý trong trình duyệt
              </h3>
              <div className="space-y-6">
                {managementOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      {option.browser}
                    </h4>
                    <ol className="space-y-2">
                      {option.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Trash2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    Lưu ý quan trọng
                  </h4>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    Việc tắt cookies có thể ảnh hưởng đến chức năng của trang web. 
                    Một số tính năng có thể không hoạt động đúng cách nếu bạn tắt tất cả cookies.
                  </p>
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl mx-auto">
          <AppCard className="p-8 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-4">Cần hỗ trợ về cookies?</h3>
              <p className="text-blue-100 mb-6">
                Nếu bạn có câu hỏi về cách chúng tôi sử dụng cookies hoặc cần hỗ trợ 
                quản lý cài đặt cookies, đừng ngần ngại liên hệ.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <span className="text-blue-100">Email: </span>
                <a 
                  href="mailto:support@linkshortener.com" 
                  className="text-white font-semibold hover:text-blue-200 transition-colors"
                >
                  support@linkshortener.com
                </a>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}