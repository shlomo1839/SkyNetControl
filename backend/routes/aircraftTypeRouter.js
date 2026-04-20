import express from "express";
import {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
} from "../controllers/aircraftTypeController.js";

const router = express.Router();

router.get("/", getAllTypes);
router.get("/:id", getTypeById);
router.post("/", createType);
router.put("/:id", updateType);
router.delete("/:id", deleteType);

export default router;
