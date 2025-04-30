import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

import * as middlewares from "./middlewares";
import api from "./api";
import keycloak from "./utils/keycloak";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/healthCheck", (req, res) => {
  res.json({
    message: "OK",
  });
});

app.use(keycloak.middleware());

app.use("/api/v1", keycloak.protect(), api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
