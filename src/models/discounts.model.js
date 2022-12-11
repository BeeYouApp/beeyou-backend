import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mealsDiscounts: {
    type: Number,
  },
  beveragesDiscounts: {
    type: Number,
  },
  mealsDiscountsPorcentage: {
    type: Number,
  },
  beveragesDiscountsPorcentage: {
    type: Number,
  },
  twoOnePromos: {
    type: String,
  },
  threeTwoPromo: {
    type: String,
  },
  customDiscounts: {
    type: String,
  },
  initialDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: true,
  },
});

const Discounts = mongoose.model("discounts", discountSchema);

export { Discounts };
