import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  haveCost: {
    type: Boolean,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLenght: 10,
    maxLenght: 300,
  },
  images:{
      type: String,
      trim: true,
  },
  keyImages: [
    {
      type: String,
    },
  ],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: true,
  },
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const Event = mongoose.model("events", eventSchema);

export { Event };
