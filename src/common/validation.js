import * as z from "zod";
import { GenderEnum } from "./enum/user.enum.js";
import { SystemLanguageEnum } from "./enum/system.enum.js";

export const validationFields = (lang) => {
  return {
    username: z.string().min(2).max(20),
    email: z.email({
      error:
        lang == SystemLanguageEnum.EN
          ? "Email Must Follow This Pattern email@domain.com"
          : "يجب أن يتبع البريد الإلكتروني هذا النمط: email@domain.com",
    }),
    password: z.string(),
    phone: z.e164(),
    gender: z.literal(Object.values(GenderEnum)),
    DOB: z.date(),
  };
};
