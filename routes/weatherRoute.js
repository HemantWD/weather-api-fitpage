import express from "express";
import {
  getWeatherForecast,
  getWeatherHistory,
} from "../controllers/weatherController.js";

const router = express.Router();

// get request for getting weather forecast
router.get("/weather/:id", getWeatherForecast);

// get request for getting historical data
router.get("/history", getWeatherHistory);

export default router;
