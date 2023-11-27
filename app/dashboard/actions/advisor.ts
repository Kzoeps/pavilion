"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { SafeParseReturnType, z } from "zod";
import { emailSchema, roleSchema } from "./constants";
import sgMail from "@sendgrid/mail";
interface AdvisorCreationPayload {
  name: string;
  email: string;
  role: string;
}
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}
const msg = {
  from: "kyoezer@conncoll.edu",
  subject: "Welcome to Pavilion",
  text: "You have been invitied to pavilion you can now sign up  and use the platform",
};

let AdvisorSchema = z
  .object({
    name: z.string(),
    email: emailSchema,
    role: roleSchema,
  })
  .required();

const DEFAULT_ERRORS = {
  name: "",
  email: "",
  role: "",
};

export const addAdvisor = async (prevState: any, form: FormData) => {
  try {
    const parsed = parseAdvisorPayload(form);
    if (!parsed.success) {
      const errors = getErrorsIfAny(parsed);
      return { errors: errors || { ...DEFAULT_ERRORS }, message: "" };
    }
    await sql`INSERT INTO users (name, email, role) VALUES (${parsed.data.name}, ${parsed.data.email}, ${parsed.data.role})`;
    await sgMail.send({...msg, to: parsed.data.email});
    revalidatePath("/dashboard");
    return {
      errors: { ...DEFAULT_ERRORS },
      message: "Advisor added successfully",
    };
  } catch (err: any) {
    return {
      errors: { ...DEFAULT_ERRORS },
      message:
        err instanceof Error
          ? err.message
          : "An error occured, please try again",
    };
  }
};

const getErrorsIfAny = (
  parsed: SafeParseReturnType<AdvisorCreationPayload, AdvisorCreationPayload>
) => {
  if (!parsed.success) {
    const errors = parsed.error.issues.reduce(
      (acc, issue) => {
        if (issue.path) {
          let fullPath = issue.path.join(".") as keyof typeof acc;
          acc[fullPath] = issue.message;
        }
        return acc;
      },
      { ...DEFAULT_ERRORS }
    );
    return errors;
  }
  return undefined;
};

const parseAdvisorPayload = (form: FormData) => {
  return AdvisorSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    role: form.get("role"),
  });
};
