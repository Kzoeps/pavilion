"use server";
import { z } from "zod";

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
        const errors = parsed.error.issues.reduce((acc, issue) => {
            if (issue.path) {
                let fullPath = issue.path.join('.') as keyof typeof acc
                acc[fullPath] = issue.message
            }
            return acc
        }, {name: '', email: '', classYear: '', advisor: ''})
        return errors 
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
