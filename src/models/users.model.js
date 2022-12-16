import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: /.*@.*\..*/,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    minLenght: 3,
    maxLenght: 35,
  },
  surname: {
    type: String,
    trim: true,
    minLenght: 3,
    maxLenght: 35,
  },
  birthDate: {
    type: Date,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Hombre", "Mujer", "Prefiero no decir"],
  },
  avatar: {
    type: String,
    trim: true,
  },
  keyAvatar: {
    type: String,
  },
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
  myFavs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },
  ],
  role: {
    type: String,
    enum: ["user", "company"],
    default: "user"
  }
});

const User = mongoose.model("users", userSchema);

export { User };
