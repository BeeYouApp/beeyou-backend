import mongoose from "mongoose";

// Schema de ranking

const rankingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: true,
  },
  valoration: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
  },
  opinion: {
    type: String,
  },
});

const Ranking = mongoose.model("rankings", rankingSchema);

export { Ranking };
