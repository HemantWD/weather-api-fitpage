import express from "express";
import {
  addLocationController,
  deleteLocationController,
  getLocationByIdController,
  specificLocationController,
} from "../controllers/locationController.js";

// router object
const router = express.Router();

// get request of a specific location
router.get("/locations", specificLocationController);

// add a new location
router.post("/locations", addLocationController);

// get location by id
router.get("/locations/:id", getLocationByIdController);

// delete a location
router.delete("/locations/:id", deleteLocationController);

export default router;
