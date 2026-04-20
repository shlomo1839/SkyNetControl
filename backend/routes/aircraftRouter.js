import express from "express";
import {
  createAircraft,
  updateAircraft,
  deleteAircraft,
  getAllAircrafts,
  getAircraftById,
} from "../controllers/aircraftController.js";

const router = express.Router();

router.post("/", createAircraft);
router.put("/:id", updateAircraft);
router.delete("/:id", deleteAircraft);
router.get("/", getAllAircrafts);
router.use("/:id", getAircraftById);

export default router;