import express from "express";
import {
  createResume,
  deleteResume,
  getResumeById,
  getResumes,
  updateResume,
} from "../controllers/resumeControllers.js";

const router = express.Router();

router.get("/", getResumes);

router.get("/:id", getResumeById);

router.post("/", createResume);

router.put("/:id", updateResume);

router.delete("/:id", deleteResume);

export default router;
