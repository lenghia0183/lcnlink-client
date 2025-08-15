import { z } from "zod";

export const getTestSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("test.emailInvalid")),
    password: z.string().min(6, t("test.passwordMin")),
    note: z.string().optional(),
    type: z.enum(["all", "mentions", "none"]),
    birthday: z.date(),
    eventDuration: z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    }),
    hobbies: z.array(z.string()).min(1, t("test.hobbiesMin")).optional(),
    country: z.object({ code: z.string(), label: z.string() }).optional(),
    user: z
      .array(z.object({ id: z.number(), title: z.string() }))
      .min(1, t("test.userMin"))
      .optional(),
  });

export type TestFormValues = z.infer<ReturnType<typeof getTestSchema>>;
