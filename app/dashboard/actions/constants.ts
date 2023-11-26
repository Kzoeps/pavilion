import { getCurrentClassYears } from "@/lib/class-years";
import { Roles } from "@/lib/types";
import { z } from "zod";

const validClassYears = getCurrentClassYears();

export const emailSchema = z
  .string()
  .endsWith("@conncoll.edu", { message: "Email must be a conncoll.edu domain" })
  .email({ message: "Invalid email address" });

export const roleSchema = z
  .literal(Roles.FACULTY, {
    description: "Role has to be either faculty or admin",
  })
  .or(
    z.literal(Roles.ADMIN, {
      description: "Role has to be either faculty or admin",
    })
  );

export const classYearSchema = z.coerce
  .number()
  .int()
  .min(+validClassYears[0], {
    message: `Class Year can't be less than ${validClassYears[0]}`,
  })
  .max(+validClassYears[validClassYears.length - 1], {
    message: `Class Year can't be greater than ${
      validClassYears[validClassYears.length - 1]
    }`,
  })
