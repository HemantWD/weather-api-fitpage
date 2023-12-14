import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";
import locationRoutes from "./routes/locationRoute.js";
import weatherRoute from "./routes/weatherRoute.js";

// config env
dotenv.config();

// database config
connectDb();

// REST Object
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", locationRoutes);
app.use("/api", weatherRoute);

// REST API
app.use("/", (req, res) => {
  res.send("<h1>Welcome to the weather forecast</h1>");
});

// PORT
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
