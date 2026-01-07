import express from "express";
import {
  createResume,
  deleteResume,
  getResumeById,
  getResumes,
  updateResume,
} from "../controllers/resumeControllers.js";
import { validate } from "../middlewares/validate.js";
import { createResumeSchema, updateResumeSchema } from "../db/schema.js";

const router = express.Router();

router.get("/", getResumes);

router.get("/:id", getResumeById);

router.post("/", validate(createResumeSchema), createResume);

router.put("/:id", validate(updateResumeSchema), updateResume);

router.delete("/:id", deleteResume);

export default router;
