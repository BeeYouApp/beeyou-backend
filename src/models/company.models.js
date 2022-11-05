import mongoose from "mongoose";

// Schema de company

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /.*@.*\..*/,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    enum: ["basic", "premium"],
    default: "basic"
  },
  verificationLevel: {
    type: Number,
    required: true
  },
  brandName: {
    type: String,
    required: true,
    trim: true
  },
  rfc: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: [
      "Restaurante",
      "Cafetería",
      "Bar",
      "Tienda",
      "Libreria",
      "Discoteca/Antro",
      "Ocio/Entetenimieto",
    ],
    required: true
  },
  rfcName: {
    type: String,
    trim: true
  },
  legalRepresentative: {
    type: String
    trim: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  image: [
    {
      type: String,
      required: true,
      trim: true
    },
  ],
  discounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "discounts"
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events"
    },
  ],
  ranking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ranking"
    },
  ],
  address: {
    type: Object,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
});

const Company = mongoose.model("companies", companySchema);

export { Company };
