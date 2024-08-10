import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import path from "path";
import { Model } from "objection";
import Knex from "knex";
import bodyParser from "body-parser";
import router from "./routes/index";
import knexConfig from "./config/knexfile";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || "3000";

const environment = process.env.NODE_ENV as keyof typeof knexConfig;
const config = knexConfig[environment] || knexConfig.development;

const knex = Knex(config);

Model.knex(knex);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
