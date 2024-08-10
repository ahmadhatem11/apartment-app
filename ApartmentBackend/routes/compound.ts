import express from "express";
import { listCompounds } from "../controllers/compound_controller";

const router = express.Router();

router.route("/compound").get(listCompounds);

export default router;
