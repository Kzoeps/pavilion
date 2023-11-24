'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { SafeParseReturnType, z } from "zod";
interface AdvisorCreationPayload {
  name: string;
  email: string;
  role: string;
}

let AdvisorSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .endsWith("@conncoll.edu", { message: "Email must be conncoll.edu" }),
    role: z
      .literal("faculty", {
        description: "Role has to be either faculty or admin",
      })
      .or(
        z.literal("admin", {
          description: "Role has to be either faculty or admin",
        })
      ),
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