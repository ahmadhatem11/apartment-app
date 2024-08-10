import express from "express";
import apartmentRoutes from "./apartment";
import areaRoutes from "./area";
import compoundRoutes from "./compound";

const router = express.Router();

router.use("/api", apartmentRoutes);
router.use("/api", areaRoutes);
router.use("/api", compoundRoutes);

export default router;
