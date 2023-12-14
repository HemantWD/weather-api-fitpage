import locationModal from "../models/locationModal.js";
import axios from "axios";

// METHOD:GET || get weather forecast using id
const getWeatherForecast = async (req, res) => {
  try {
    const locationId = parseInt(req.params.id);

    // we are finding location by id in the mongodb collection to get weather forecast
    const location = await locationModal.findOne({ id: locationId });
    // validation
    if (!location) {
      return res.status(404).send({
        success: false,
        message: "Location not found",
      });
    }
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location.name
      )}&appid=f8ce8e34435656266bc926511cea95c4&units=metric`
    );
    if (!weatherResponse) {
      return res.status(500).send({
        success: false,
        message: "Error in getting Weather Forecast",
      });
    }
    const weatherData = weatherResponse.data;
    // console.log(weatherData);

    res.status(200).send({
      success: true,
      message: "Weather forecast retrieved successfully",
      data: weatherData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// METHOD:GET || get history of weather forecast
const getWeatherHistory = async (req, res) => {};

export { getWeatherForecast };
