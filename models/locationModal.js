import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

export default mongoose.model("location", locationSchema);
