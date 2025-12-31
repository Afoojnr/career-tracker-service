// @ts-nocheck
import express from "express";
import resumeRoutes from "./routes/resumeRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import logger from "./middlewares/logger.js";

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

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
