# FITPAGE WEATHER FORECAST BACKEND PROJECT
## Introduction

This is the documentation for the Real-time Weather Forecast API, which provides real-time weather forecasts based on geographical locations. The API fetches data from an external weather service and exposes endpoints for location management, weather forecasts, and historical data retrieval.

## Location Management

Users can add, retrieve, update, and delete locations.
Each location should have a name, latitude, and longitude.
Weather Forecast
Users can request weather forecasts for a specific location.
The API fetches real-time weather data from an external weather service.
Provide forecasts for parameters like temperature, humidity, wind speed, etc.
## Endpoints

1. /locations (GET, POST)
GET: Get all locations.
POST: Add a new location.

2. /locations/<location_id> (GET, PUT, DELETE)
GET: Get a specific location by ID.
PUT: Update a specific location by ID.
DELETE: Delete a specific location by ID.

3. /weather/<location_id> (GET)
GET: Get the weather forecast for a specific location.

4. /history (upto 30 days) (GET)
GET: Get historical data and show the summary for the last 30 days.
## Technical Guidelines

Integrate with an external weather service API to fetch real-time weather data based on location coordinates.

Implemented caching mechanisms to reduce the number of external API calls.

Ensure proper error handling for cases where the external service is unavailable or returns errors.

Used proper validation for location data and handle edge cases gracefully.
