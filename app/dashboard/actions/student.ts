"use server";
import { getCurrentClassYears } from "@/lib/class-years";
import { SafeParseReturnType, z } from "zod";
import { DEFAULT_STUDENT_ERRORS } from "../utils/constants";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { emailSchema, classYearSchema } from "./constants";

interface StudentCreationPayload {
  name: string;
  email: string;
  classYear: string;
  advisor: string;
}

let UserSchema = z
  .object({
    name: z.string(),
    email: emailSchema,
    classYear: classYearSchema,
    advisor: z.string(),
  })
  .required();

const parseStudentPayload = (form: FormData) => {
  return UserSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    classYear: form.get("classYear"),
    advisor: form.get("advisor"),
  });
};

const getStudentErrors = (
  parsed: SafeParseReturnType<StudentCreationPayload, StudentCreationPayload>
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
      { ...DEFAULT_STUDENT_ERRORS }
    );
    return errors;
  }
};

export const addStudent = async (prevState: any, form: FormData) => {
  try {
    const parsed = parseStudentPayload(form);
    if (!parsed.success) {
      const errors = getStudentErrors(parsed);
      return {
        errors: errors || { ...DEFAULT_STUDENT_ERRORS },
        message: errors ? "" : "An Error Occurred",
      };
    }
    await sql`INSERT INTO users (name, email, class_year, advisor_id, role) VALUES (${
      parsed.data.name
    }, ${parsed.data.email}, ${parsed.data.classYear}, ${
      parsed.data.advisor
    }, ${"student"})`;
    revalidatePath("/dashboard");
    return {
      errors: { ...DEFAULT_STUDENT_ERRORS },
      message: "Student added successfully",
    };
  } catch (err: any) {
    return {
      errors: { ...DEFAULT_STUDENT_ERRORS },
      message: err instanceof Error ? err.message : "An error occured",
    };
  }
};
