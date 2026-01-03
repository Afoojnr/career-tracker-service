import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT) || 5432,
});

export const query = (text, params) => pool.query(text, params);

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected database error:", err);
});

export const testConnection = async () => {
  await pool.query("SELECT 1 as ok");
  return true;
};

export const initDB = async () => {
  // jobs, applications...
  const createResumeTableSql = `
    CREATE TABLE IF NOT EXISTS resumes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      years_of_experience INT NOT NULL
    );
  `;
  await query(createResumeTableSql);
  console.log("Resume table is ready");
};
