import axios from "axios";
import locationModal from "../models/locationModal.js";

let uniqueId = 1;

// METHOD:GET || Specific Location
const specificLocationController = async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).send({
        success: false,
        message: "City name is required",
      });
    }

    // making the api call using axios
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=f8ce8e34435656266bc926511cea95c4&units=metric`
    );
    if (!response) {
      res.status(200).send({
        success: false,
        message: "Error in getting weather forecast",
      });
    }
    // console.log(response.data);
    const data = response.data;
    res.status(200).send({
      success: true,
      message: "Successfull",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// METHOD:POST || Add a new location

const addLocationController = async (req, res) => {
  try {
    const { name } = req.body;

    // validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "City name is Required",
      });
    }

    // make api request to get the data
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        name
      )}&appid=f8ce8e34435656266bc926511cea95c4&units=metric`
    );

    if (!weatherResponse) {
      return res.status(200).send({
        success: false,
        message: "Error in getting Weather Forecast",
      });
    }
    // console.log(weatherResponse.data);
    const { coord, weather, main } = weatherResponse.data;

    const newLocation = new locationModal({
      id: uniqueId++,
      name,
      temperature: main.temp,
      description: weather[0].description,
      latitude: coord.lat,
      longitude: coord.lon,
    });
    await newLocation.save();

    res.status(201).send({
      success: true,
      message: "Location added successfully",
      data: newLocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// METHOD: GET || Get a specific location by ID
const getLocationByIdController = async (req, res) => {
  try {
    const locationId = parseInt(req.params.id);

    // getting the data using location id
    const getLocation = await locationModal.findOne({ id: locationId });

    if (!getLocation) {
      return res.status(404).send({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).send({
      success: true,
      data: getLocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// METHOD:DELETE || delete a location by id
const deleteLocationController = async (req, res) => {
  try {
    const locationId = parseInt(req.params.id);

    // finding location by id in the array
    const deleteLocation = await locationModal.findOneAndDelete({
      id: locationId,
    });
    if (!deleteLocation) {
      return res.status(404).send({
        success: false,
        message: "Location not found",
      });
    }

    // const updatedLocation = await locationModal.find();
    // after deleting we call the api to reterive the data

    res.status(200).send({
      success: true,
      message: "Location deleted successfully",
      data: deleteLocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export {
  specificLocationController,
  addLocationController,
  deleteLocationController,
  getLocationByIdController,
};
