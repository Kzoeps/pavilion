"use server";
import { classYearSchema as classYear } from "./constants";

import { z } from "zod";

let FilterSchema = z.object({
  advisor_id: z.string(),
  classYear,
});

export const filterStudents = async (form: FormData) => {};
