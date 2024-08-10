import express from "express";
import { listAreas } from "../controllers/area_controller";

const router = express.Router();

router.route("/area").get(listAreas);

export default router;
