import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

// Render/other managed hosts sit behind a proxy.
app.set("trust proxy", 1);

// Middlewares
import cookieParser from "cookie-parser";
import cors from "cors";

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (health checks, curl, Postman).
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// deployment route
app.get("/", (req, res) => res.send("Blogify API is running"));
app.get("/health", (req, res) =>
  res.status(200).json({ success: true, message: "Blogify API is healthy" }),
);

// Routers
import userRouter from "./src/routes/user.route.js";
import blogRouter from "./src/routes/blog.route.js";
import categoryRouter from "./src/routes/category.route.js";
import commentRouter from "./src/routes/comment.route.js";
import likeRouter from "./src/routes/like.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/like", likeRouter)

// error middleware
import { errorMiddleware } from "./src/middleware/error.middleware.js";
app.use(errorMiddleware);

export { app };
