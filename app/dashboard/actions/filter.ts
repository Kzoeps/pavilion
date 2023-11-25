"use server";
import { redirect } from "next/navigation";
import { classYearSchema as classYear } from "./constants";

import { z } from "zod";

let FilterSchema = z.object({
  advisor: z.string(),
  classYear: classYear.or(z.literal("all")),
});

export const filterStudents = async (form: FormData) => {
  const parsed = FilterSchema.parse({
    advisor: form.get("advisor"),
    classYear: form.get("classYear"),
  });
  redirect(
    "/dashboard?class_year=" +
      parsed.classYear +
      "&advisor_id=" +
      parsed.advisor
  );
};
