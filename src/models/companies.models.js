import mongoose from "mongoose";

// Schema de company
const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  numExt: {
    type: String,
    required: true,
  },
  numInt: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  cp: {
    type: String,
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
});

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /.*@.*\..*/,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  plan: {
    type: String,
    enum: ["basic", "premium"],
    default: "basic",
  },
  verificationLevel: {
    type: Number,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
    trim: true,
  },
  rfc: {
    type: String,
    trim: true,
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
    required: true,
  },
  rfcName: {
    type: String,
    trim: true,
  },
  legalRepresentative: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  discounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "discounts",
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  ranking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ranking",
    },
  ],
  address: AddressSchema,
  avatar: {
    type: String,
  },
});

const Company = mongoose.model("companies", companySchema);
export { Company };
