import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });

export const testConnection = async () => {
  await db.execute("SELECT 1 as ok");
  return true;
};

export default db;
