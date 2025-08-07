"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/FormFields/TextField";
import { TEXTFIELD_PREVENT } from "@/constants/regexes";
import { RadioGroupField } from "@/components/FormFields/RadioGroupField";
import { CheckboxGroupField } from "@/components/FormFields/CheckboxGroupField";
import { DatePickerField } from "@/components/FormFields/DatePickerField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";
import { AutoCompleteField } from "@/components/FormFields/AutoCompleteField";
import { AppDialog } from "@/components/AppDialog";
import { toast } from "@/components/AppToast";
import { AppTabs } from "@/components/AppTabs";
import { AppCard } from "@/components/AppCard";
import { Backdrop } from "@/components/BackDrop";
import { AppPagination } from "@/components/AppPagination";
import { useQueryState } from "@/hooks/useQueryState";
import { AppDrawer } from "@/components/AppDrawer";

// Schema validation
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
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
    .min(1, "Bạn phải chọn ít nhất 1 người dùng")
    .optional(),
});

type FormValues = z.infer<typeof schema>;

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function TestSiteForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<FormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const { page, setPage, tab, setTab } = useQueryState({
    page: 1,
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "lenghia@gmail.com",
      password: "nghialc@gmail.com",
      note: "hehehe",
      type: "mentions",
      hobbies: ["coding"],
      user: [
        {
          id: 2,
          title:
            "Quisque non ligula laoreet, volutpat velit cursus, condimentum arcu.",
        },
        {
          id: 5,
          title: "Integer molestie metus eu felis facilisis venenatis.",
        },
      ],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      console.log("✅ Submitted:", data);
      setDialogData(data);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  async function fetchPosts(): Promise<Post[]> {
    const url = `/api/posts`;
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      // Hiển thị toast khi fetch lỗi
      toast.error("Lỗi tải dữ liệu", "Không thể tải danh sách người dùng");
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  const handleConfirm = async () => {
    if (!dialogData) return;

    setIsSubmitting(true);
    setIsDialogOpen(false);
    const loadingToastId = toast.loading("Đang xử lý...", "Vui lòng chờ", {
      duration: 100000,
    });

    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("Data confirmed:", dialogData);
      toast.dismiss(loadingToastId);
      const idToastDetail = toast.success(
        "Xác nhận thành công!",
        "Dữ liệu đã được lưu trữ",
        {
          action: {
            label: "Xem chi tiết",
            onClick: () => {
              setIsDialogOpen(true);
              toast.dismiss(idToastDetail);
            },
          },
        }
      );

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Confirmation error:", error);
      // Ẩn toast loading và hiển thị toast lỗi
      toast.dismiss(loadingToastId);
      toast.error(
        "Lỗi xác nhận",
        "Không thể lưu dữ liệu. Vui lòng thử lại sau.",
        {
          action: {
            label: "Thử lại",
            onClick: handleConfirm,
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Gửi và Xem Kết Quả"}
          </Button>

          <Button
            type="button"
            className="w-full"
            onClick={() => setOpen(true)}
          >
            Mở Drawer
          </Button>
        </form>
      </FormProvider>

      <AppTabs
        defaultValue={tab}
        onValueChange={(value) => {
          setTab(value);
        }}
        className="mt-5"
        tabs={[
          {
            value: "account",
            label: "Account",
            icon: <Mail className="w-4 h-4" />,
            content: (
              <AppCard
                title="User Profile"
                description="This is your user profile card."
                footer={<Button>Update</Button>}
                hoverAble
                padded
                variant="muted"
              >
                <p className="text-sm text-gray-600">
                  Name: John Doe <br />
                  Email: john@example.com
                </p>
              </AppCard>
            ),
          },
          {
            value: "security",
            label: "Security",
            icon: <Lock className="w-4 h-4" />,
            content: (
              <AppCard
                title="Security"
                description="This is your Security card."
                footer={
                  <Button
                    onClick={() => {
                      console.log("hehehehehehe");
                    }}
                  >
                    Update
                  </Button>
                }
                padded
                variant="elevated"
              >
                <p className="text-sm text-gray-600">
                  Name: Security <br />
                  Email: Security@example.com
                </p>
              </AppCard>
            ),
          },
        ]}
      />

      <AppPagination
        className="mt-10"
        currentPage={page}
        totalPages={10}
        onPageChange={(p) => setPage(p)}
      />

      <AppDrawer
        open={open}
        onOpenChange={setOpen}
        title="Cài đặt người dùng"
        description="Tùy chọn cho tài khoản của bạn"
        footer={
          <div className="w-1/4 m-auto">
            <Button className="w-full" onClick={() => setOpen(false)}>
              Lưu
            </Button>
          </div>
        }
      >
        <p className="w-1/4 m-auto">
          Đây là nội dung drawer. Bạn có thể đặt form, danh sách, v.v. Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, delectus
          quibusdam. Reprehenderit eum, cumque ipsum quo nobis at quaerat,
          illum, tenetur repellat doloremque dolore placeat adipisci!
          Reprehenderit, aperiam distinctio. Maiores corporis vero reprehenderit
          soluta veritatis tempora optio quis obcaecati. Culpa, magnam maiores
          facilis doloremque at iusto eum! Vel harum optio ipsum obcaecati fuga
          officia, qui accusantium at corrupti, inventore maxime minus nemo,
          iure ducimus soluta impedit dolores quos aliquam voluptatum esse
          cupiditate modi. Totam illum itaque recusandae incidunt nobis possimus
          blanditiis cupiditate, fugiat cumque officia sit laboriosam eligendi
          ad impedit iure placeat harum quasi! Reiciendis officiis molestiae
          velit reprehenderit commodi!
        </p>
      </AppDrawer>

      <AppDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Xác Nhận Thông Tin"
        description="Vui lòng kiểm tra kỹ thông tin trước khi xác nhận"
        footerActions={[
          {
            label: "Quay Lại",
            onClick: () => {
              setIsDialogOpen(false);
              toast.info(
                "Đã hủy xác nhận",
                "Bạn có thể chỉnh sửa lại thông tin"
              );
            },
            variant: "outline",
            disabled: isSubmitting,
          },
          {
            label: isSubmitting ? "Đang xử lý..." : "Xác Nhận",
            onClick: handleConfirm,
            variant: "default",
            disabled: isSubmitting,
          },
        ]}
      >
        {dialogData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Email</h3>
                <p className="mt-1">{dialogData.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">
                  Loại thông báo
                </h3>
                <p className="mt-1 capitalize">{dialogData.type}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Ngày sinh</h3>
                <p className="mt-1">
                  {dialogData.birthday.toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Sở thích</h3>
                <p className="mt-1">{dialogData.hobbies?.join(", ")}</p>
              </div>
            </div>

            {dialogData.user && dialogData.user.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-sm text-gray-500">
                  Người dùng đã chọn
                </h3>
                <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {dialogData.user.map((user) => (
                    <li key={user.id} className="p-3 border rounded-lg">
                      <p className="font-medium">ID: {user.id}</p>
                      <p className="text-sm line-clamp-2">{user.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dialogData.note && (
              <div className="mt-4">
                <h3 className="font-medium text-sm text-gray-500">Ghi chú</h3>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">
                  {dialogData.note}
                </p>
              </div>
            )}
          </div>
        )}
      </AppDialog>
      <Backdrop isOpen={isSubmitting} />
    </div>
  );
}
