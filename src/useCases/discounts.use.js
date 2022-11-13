import { Discounts } from "../models/discounts.models.js";
import { StatusHttp } from "../libs/statusHttp.js";

function getAll() {
  return Discounts.find({}).populate("company");
}

function getById(id) {
  return Discounts.findById(id).populate("company");
}

function deleteById(id) {
  return Discounts.findByIdAndDelete(id);
}

async function create(newDiscount, company) {
  return Discounts.create(newDiscount, company);
}

async function updated(idDiscount, updatedCompany) {
  return Discounts.findByIdAndUpdate(idDiscount, updatedCompany);
}

export { getAll, getById, deleteById, updated, create };
