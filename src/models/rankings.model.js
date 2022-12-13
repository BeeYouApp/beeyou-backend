import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: true
  },
  valoration: {
    type: Number,
    required: true
  },
  opinion: {
    type: String,
    required: true
  },
});

const Ranking = mongoose.model("rankings", rankingSchema);

export { Ranking };
