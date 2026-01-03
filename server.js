import express from "express";
import resumeRoutes from "./routes/resumeRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import logger from "./middlewares/logger.js";
import { initDB, testConnection } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

// Routes
app.use("/resumes", resumeRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await testConnection();
    await initDB();
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
