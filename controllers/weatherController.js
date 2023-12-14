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

const getWeatherHistory = async (req, res) => {
  try {
    const { lat, lon, start, end } = req.query;

    // Check if any required parameter is missing
    if (!lat || !lon || !start || !end) {
      return res.status(400).send({
        success: false,
        message:
          "Missing required parameters. Please provide lat, lon, start, end",
      });
    }

    // Make the API request using the provided parameters
    const historicData = await axios.get(
      `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&start=${start}&end=${end}&appid=f8ce8e34435656266bc926511cea95c4`
    );

    // console.log(historicData.data);

    res.status(200).send({
      success: true,
      message: "Historical Data retrieved successfully",
      data: historicData.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { getWeatherForecast, getWeatherHistory };
