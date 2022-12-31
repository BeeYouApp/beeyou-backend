import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  }
});

const companySchema = new mongoose.Schema({
  isVerified:{
    type: Boolean,
    default: false,
    required: true
  },
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
  },
  brandName: {
    type: String,
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
    ]
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
  },
  image:{
    type: String,
    trim: true,
  },
  keyImage:{
    type: String,
  },
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
      ref: "rankings",
    },
  ],
  address:{
    type: String,
    trim: true,
  },
  coordinates: AddressSchema,
  avatar: {
    type: String,
  },
  racha: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  role: {
    type: String,
    enum: ["user", "company"],
    default: "company"
  },
  daysOfService: [{
    type: String,
    enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Todos los días"],
    default: ["Todos los días"]
  }],
  timeServiceStart: {
    type: String
  },
  timeServiceEnd: {
    type: String
  } 
});

const Company = mongoose.model("companies", companySchema);
export { Company };
