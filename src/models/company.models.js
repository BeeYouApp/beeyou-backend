import mongoose from "mongoose";

// Schema de company

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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    enum: ["", "", ""],
    default: hola,
  },
  isVerified: {
    // es necesario?
    type: Boolean,
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
  rfcName: {
    type: String,
    trim: true,
  },
  legalRepresentative: {
    type: Number,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  discounts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ranking",
    required: true,
  },
  events: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true,
    trim: true,
  },
  ranking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ranking",
    required: true,
  },
  address: {
    type: Object,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("company", companySchema);

export { Company };
