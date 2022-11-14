import { Company } from "../models/companies.models.js";
import bcrypt from "../libs/bcrypt.js";
import { StatusHttp } from "../libs/statusHttp.js";

function getAll() {
  return Company.find({}).populate("discounts events ranking");
}

function getById(id) {
  return Company.findById(id).populate("discounts events ranking");
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

export { getAll, getById, deleteById, updated, create };
