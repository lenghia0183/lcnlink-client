"use client";

import { useTranslations } from "next-intl";
import { AppCard } from "@/components/AppCard";
import { AppButton } from "@/components/AppButton";
import { TextField } from "@/components/FormFields/TextField";
import { TextAreaField } from "@/components/FormFields/TextAreaField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/AppToast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

function getContactSchema(t: any) {
  return z.object({
    name: z.string().min(1, t("form.validation.nameRequired")),
    email: z.string().email(t("form.validation.emailInvalid")),
    subject: z.string().min(1, t("form.validation.subjectRequired")),
    message: z.string().min(10, t("form.validation.messageMin")),
  });
}

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;

export default function ContactPage() {
  const t = useTranslations("Contact");
  const contactSchema = getContactSchema(t);

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
    toast.success(t("form.successMessage"));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: t("contactDetails.email.title"),
      details: t("contactDetails.email.details"),
      subtext: t("contactDetails.email.subtext"),
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t("contactDetails.phone.title"),
      details: t("contactDetails.phone.details"),
      subtext: t("contactDetails.phone.subtext"),
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t("contactDetails.address.title"),
      details: t("contactDetails.address.details"),
      subtext: t("contactDetails.address.subtext"),
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t("contactDetails.hours.title"),
      details: t("contactDetails.hours.details"),
      subtext: t("contactDetails.hours.subtext"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("contactInfo")}
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
                <h3 className="font-semibold mb-2">{t("urgentSupport.title")}</h3>
                <p className="text-blue-100 text-sm">
                  {t("urgentSupport.description")}
                </p>
              </div>
            </AppCard>
          </div>

          {/* Contact Form */}
          <div>
            <AppCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("form.title")}
              </h2>
              
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <TextField
                      name="name"
                      label={t("form.name")}
                      placeholder={t("form.namePlaceholder")}
                      required
                    />
                    <TextField
                      name="email"
                      label={t("form.email")}
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      required
                    />
                  </div>

                  <TextField
                    name="subject"
                    label={t("form.subject")}
                    placeholder={t("form.subjectPlaceholder")}
                    required
                  />

                  <TextAreaField
                    name="message"
                    label={t("form.message")}
                    placeholder={t("form.messagePlaceholder")}
                    rows={6}
                    required
                  />

                  <AppButton
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    iconLeft={<Send className="h-5 w-5" />}
                    loading={methods.formState.isSubmitting}
                  >
                    {t("form.submit")}
                  </AppButton>
                </form>
              </FormProvider>
            </AppCard>

            {/* FAQ Section */}
            <AppCard className="p-6 mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t("faq.title")}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {t("faq.q1")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("faq.a1")}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {t("faq.q2")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("faq.a2")}
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