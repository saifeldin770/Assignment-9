import * as z from "zod";
import { GenderEnum } from "../../common/enum/user.enum.js";
import { validationFields } from "../../common/validation.js";
import { SystemLanguageEnum } from "../../common/enum/system.enum.js";

const loginSchemaBody = (lang) => {
  return z.object({
    email: validationFields(lang).email,
    password: validationFields(lang).password,
  });
};
export const loginSchema = (lang) => {
  return z.object({
    body: loginSchemaBody(lang),
  });
};

export const signupSchema = (lang) => {
  return z.object({
    body: loginSchemaBody(lang)
      .extend({
        username: validationFields(lang).username,
        phone: validationFields(lang).phone,
        gender: validationFields(lang).gender.optional(),
        DOB: validationFields(lang).DOB.optional(),
        confirmPassword: validationFields(lang).password,
      })
      .refine(
        (value) => {
          console.log({ value });
          return value.confirmPassword === value.password;
        },
        { error: "Confirm Password Miss Match Password" },
      ),
  });
};
