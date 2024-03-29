import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// routes
import submissionRoutes from "./routes/submissions.router";
import judge0Routes from "./routes/judge0.router";
import {
  initializeRedisClient,
  redisCachingMiddleware,
} from "./middlewares/redis";

async function initializeExpressServer() {
  const app = express();
  await initializeRedisClient();

  dotenv.config();

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/submissions", redisCachingMiddleware(), submissionRoutes);
  app.use("/judge0", redisCachingMiddleware(), judge0Routes);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
  });
}

initializeExpressServer()
  .then()
  .catch((e) => console.error(e));
