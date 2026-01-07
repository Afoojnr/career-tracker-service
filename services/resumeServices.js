import db from "../db/config.js";
import { resumes } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getAllResumes = async () => {
  const result = await db.select().from(resumes);
  return result;
};

export const createResume = async (data) => {
  const { name, email, phone, years_of_experience, address, about } = data;

  const [newResume] = await db
    .insert(resumes)
    .values({
      name,
      email,
      phone,
      years_of_experience,
      address,
      about,
    })
    .returning();

  return newResume;
};

export const getResumeById = async (id) => {
  const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
  return resume || null;
};

export const updateResume = async (id, data) => {
  const { name, email, phone, years_of_experience, address, about } = data;

  const [updatedResume] = await db
    .update(resumes)
    .set({
      name,
      email,
      phone,
      years_of_experience,
      address,
      about,
    })
    .where(eq(resumes.id, id))
    .returning();

  return updatedResume || null;
};

export const deleteResume = async (id) => {
  const [deletedResume] = await db
    .delete(resumes)
    .where(eq(resumes.id, id))
    .returning();

  return deletedResume || null;
};
