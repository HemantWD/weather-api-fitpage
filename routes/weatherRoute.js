import express from "express";
import { getWeatherForecast } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/weather/:id", getWeatherForecast);

export default router;
