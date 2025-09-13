"use client";

// import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { Shield, Eye, Lock, Users, Database, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  // const t = useTranslations("Privacy");

  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "1. Thông tin chúng tôi thu thập",
      content: [
        "Thông tin cá nhân: Tên, email, số điện thoại khi bạn đăng ký tài khoản",
        "Dữ liệu sử dụng: Các link bạn tạo, số lần click, thời gian truy cập",
        "Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, hệ điều hành",
        "Cookies và dữ liệu theo dõi để cải thiện trải nghiệm người dùng"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "2. Cách chúng tôi sử dụng thông tin",
      content: [
        "Cung cấp và duy trì dịch vụ rút gọn link",
        "Cung cấp thống kê và phân tích cho người dùng",
        "Cải thiện và phát triển tính năng mới",
        "Gửi thông báo quan trọng về dịch vụ",
        "Hỗ trợ khách hàng và giải quyết vấn đề kỹ thuật"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "3. Chia sẻ thông tin với bên thứ ba",
      content: [
        "Chúng tôi KHÔNG bán thông tin cá nhân của bạn",
        "Chỉ chia sẻ khi có yêu cầu pháp lý hợp lệ",
        "Sử dụng nhà cung cấp dịch vụ đáng tin cậy (hosting, analytics)",
        "Tất cả đối tác phải tuân thủ nghiêm ngặt chính sách bảo mật"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "4. Bảo mật thông tin",
      content: [
        "Mã hóa SSL/TLS cho tất cả dữ liệu truyền tải",
        "Mã hóa dữ liệu nhạy cảm trong cơ sở dữ liệu",
        "Kiểm tra bảo mật định kỳ và cập nhật hệ thống",
        "Giới hạn quyền truy cập chỉ cho nhân viên cần thiết",
        "Sao lưu dữ liệu an toàn và khôi phục thảm họa"
      ]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "5. Lưu trữ và xóa dữ liệu",
      content: [
        "Dữ liệu được lưu trữ tại các trung tâm dữ liệu an toàn",
        "Bạn có thể yêu cầu xóa tài khoản và dữ liệu bất cứ lúc nào",
        "Dữ liệu thống kê ẩn danh có thể được lưu giữ để phân tích",
        "Tuân thủ quy định về thời gian lưu trữ dữ liệu theo pháp luật"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "6. Quyền lợi của bạn",
      content: [
        "Quyền truy cập: Xem thông tin cá nhân chúng tôi có về bạn",
        "Quyền chỉnh sửa: Cập nhật hoặc sửa đổi thông tin cá nhân",
        "Quyền xóa: Yêu cầu xóa tài khoản và dữ liệu cá nhân",
        "Quyền từ chối: Từ chối nhận email marketing hoặc thông báo",
        "Quyền khiếu nại: Liên hệ cơ quan bảo vệ dữ liệu nếu cần thiết"
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
              <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Chính sách bảo mật
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn. 
            Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
          </p>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
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

          {/* Contact Info */}
          <AppCard className="p-8 mt-8 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-4">Có câu hỏi về chính sách này?</h3>
              <p className="text-blue-100 mb-6">
                Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về chính sách bảo mật này, 
                đừng ngần ngại liên hệ với chúng tôi.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <span className="text-blue-100">Email: </span>
                <a 
                  href="mailto:privacy@linkshortener.com" 
                  className="text-white font-semibold hover:text-blue-200 transition-colors"
                >
                  privacy@linkshortener.com
                </a>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}