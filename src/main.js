import express from "express";
import { PORT } from "./config/config.js";
import globalErrorMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notfound.middleware.js";
import { connectDb } from "./DB/db.connection.js";
import authRouter from "./module/auth/auth.controller.js";
import userRouter from "./module/user/user.controller.js";
import cors from "cors";
export async function bootStrap() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  await connectDb();
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("{/*dummy}", notFoundMiddleware);
  app.use(globalErrorMiddleware);
  app.listen(PORT, () => {
    console.log(`Example app is listening on port ${PORT}`);
  });
}
bootStrap();
