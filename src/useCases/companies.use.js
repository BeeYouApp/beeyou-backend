import { Company } from "../models/companies.models.js";
import bcrypt from "../libs/bcrypt.js";
import { StatusHttp } from "../libs/statusHttp.js";

function getAll() {
  return Company.find({}).populate("discounts");
}

function getById(id) {
  return Company.findById(id).populate("discounts");
}

function deleteById(id) {
  return Company.findByIdAndDelete(id);
}

async function create(newCompany) {
  const { email, password } = newCompany;
  const companyFound = await Company.findOne({ email });
  if (companyFound) throw new StatusHttp("Ya existe un Writer con este email");
  const encryptedPassword = await bcrypt.hash(password); //

  return Company.create({ ...newCompany, password: encryptedPassword });
}
async function createDiscount(company, IdDiscount) {
  const data = await Company.findByIdAndUpdate(
    company,
    { $push: { discounts: IdDiscount } },
    { new: true }
  );
  if (!data) throw new StatusHttp("An error ocurred", 404);
  return data;
}

async function deleteDiscount(company, IdDiscount) {
  const data = await Company.findByIdAndUpdate(
    company,
    { $pull: { discounts: IdDiscount } },
    { new: true }
  );
  return data;
}

async function deleteComment(idCard, idComment) {
  const data = await Card.findByIdAndUpdate(
    idCard,
    { $pull: { comment: idComment } },
    { new: true }
  );
  return data;
}

async function updated(idCompany, updatedCompany) {
  const { password } = updatedCompany;
  if (password) {
    const encryptedPassword = await bcrypt.hash(password);
    return Company.findByIdAndUpdate(idCompany, {
      ...updatedCompany,
      password: encryptedPassword,
    });
  } else {
    return Company.findByIdAndUpdate(idCompany, updatedCompany);
  }
}

export { getAll, getById, deleteById, updated, create, createDiscount };
