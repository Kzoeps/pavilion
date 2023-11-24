"use server";
import { revalidatePath } from "next/cache";
import { SafeParseReturnType, z } from "zod";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
interface AdvisorCreationPayload {
  name: string;
  email: string;
  role: string;
}

let UserSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .endsWith("@conncoll.edu", { message: "Email must be conncoll.edu" })
      .email({ message: "Invalid email address" }),
    classYear: z.coerce
      .number()
      .int()
      .min(2021, { message: `Class Year can't be less than 2021` })
      .max(2025, { message: `Class Year can't be greater than 2025` }),
    advisor: z.string(),
  })
  .required();

export const addStudent = async (prevState: any, form: FormData) => {
  try {
    const parsed = UserSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      classYear: form.get("classYear"),
      advisor: form.get("advisor"),
    });
    if (!parsed.success) {
      const errors = parsed.error.issues.reduce(
        (acc, issue) => {
          if (issue.path) {
            let fullPath = issue.path.join(".") as keyof typeof acc;
            acc[fullPath] = issue.message;
          }
          return acc;
        },
        { name: "", email: "", classYear: "", advisor: "" }
      );
      return errors;
    }
    // create a promise which waits for 4 seconds
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await wait(4000);
    console.log(parsed);
    // return { message: "Student added successfully" };
  } catch (err: any) {
    console.log(err);
  }
};

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
      return (
        { errors: errors || { ...DEFAULT_ERRORS }, message: "" }
      );
    }
    await sql`INSERT INTO users (name, email, role) VALUES (${parsed.data.name}, ${parsed.data.email}, ${parsed.data.role})`;
    revalidatePath("/dashboard");
    return { errors: { ...DEFAULT_ERRORS }, message: "Advisor added successfully"};
  } catch (err: any) {
    return {
      errors: { ...DEFAULT_ERRORS },
      message: err instanceof Error ? err.message : "An error occured, please try again",
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
