import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumes = pgTable("resumes", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 50 }).notNull(),
  years_of_experience: integer().notNull(),
  address: varchar({ length: 500 }),
  about: varchar({ length: 1000 }),
});

const resumeInsertSchema = createInsertSchema(resumes, {
  name: (schema) => schema.trim().min(1, "Name is required"),
  email: (schema) => schema.trim().email().min(1, "Email is required"),
  phone: (schema) => schema.trim().min(1, "Phone is required"),

  years_of_experience: (schema) =>
    schema
      .int({ message: "Years of Experience must be an integer" })
      .nonnegative({ message: "Years of Experience must be >= 0" }),

  address: (schema) =>
    schema
      .min(2, "Address should be at least 2 characters")
      .max(500, "Address too long")
      .optional(),
});

export const createResumeSchema = z.object({
  body: resumeInsertSchema.omit({ id: true }),
});

export const updateResumeSchema = z.object({
  body: resumeInsertSchema.omit({ id: true }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
