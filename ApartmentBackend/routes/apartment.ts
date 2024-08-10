import express from "express";
import {
  listApartments,
  getApartment,
  createApartment,
} from "../controllers/apartment_controller";

const router = express.Router();

router.route("/apartment").get(listApartments).post(createApartment);

router.route("/apartment/:id").get(getApartment);

export default router;
