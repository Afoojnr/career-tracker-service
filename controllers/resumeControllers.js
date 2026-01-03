import { query } from "../config/db.js";

export const createResume = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    const { name, email, phone, years_of_experience } = req.body;

    const sql = `
      INSERT INTO resumes (name, email, phone, years_of_experience)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const params = [name, email, phone, years_of_experience];

    const result = await query(sql, params);
    const resume = result.rows[0];
    res.status(201).json(resume);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getResumes = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM resumes;";
    const result = await query(sql);
    const resumes = result.rows;
    res.status(200).json(resumes);
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM resumes WHERE id = $1;";
    const params = [id];
    const result = await query(sql, params);
    const resume = result.rows[0];
    if (resume) {
      res.status(200).json(resume);
    } else {
      next({ status: 404, message: "Resume not found" });
    }
  } catch (error) {
    next(error);
  }
};
export const updateResume = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, phone, years_of_experience } = req.body;

    const sql = `
      UPDATE resumes
      SET name = $1, email = $2, phone = $3, years_of_experience = $4
      WHERE id = $5
      RETURNING *;
    `;
    const params = [name, email, phone, years_of_experience, id];

    const result = await query(sql, params);
    const resume = result.rows[0];
    if (resume) {
      res.status(200).json(resume);
    } else {
      next({ status: 404, message: "Resume not found" });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteResume = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM resumes WHERE id = $1 RETURNING *;";
    const params = [id];
    const result = await query(sql, params);
    const resume = result.rows[0];
    if (resume) {
      res.status(204).send();
    } else {
      next({ status: 404, message: "Resume not found" });
    }
  } catch (error) {
    next(error);
  }
};
