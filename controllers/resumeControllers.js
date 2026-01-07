import * as resumeServices from "../services/resumeServices.js";

export const getResumes = async (req, res, next) => {
  try {
    const resumes = await resumeServices.getAllResumes();
    res.status(200).json(resumes);
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const resume = await resumeServices.getResumeById(id);
    if (resume) {
      res.status(200).json(resume);
    } else {
      next({ message: "Resume not found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export const createResume = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const resume = await resumeServices.createResume(req.body);
    res.status(201).json(resume);
  } catch (error) {
    console.log("Error creating resume:", error.message);
    next(error);
  }
};

export const updateResume = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedResume = await resumeServices.updateResume(id, req.body);
    if (updatedResume) {
      res.status(200).json(updatedResume);
    } else {
      next({ message: "Resume not found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedResume = await resumeServices.deleteResume(id);
    if (deletedResume) {
      res.status(204).send();
    } else {
      next({ message: "Resume not found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};
