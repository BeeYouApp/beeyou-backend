import { User } from "../models/user.model.js";
import { Company } from "../models/companies.models.js";
import bcrypt from "../libs/bcrypt.js";
import jwt from "../libs/jwt.js";
import { StatusHttp } from "../libs/statusHttp.js";

async function loginUser(email, password) {
  const userFound = await User.findOne({ email });
  const isValidPassword = await bcrypt.compare(password, userFound.password);
  if (!isValidPassword || !userFound) {
    throw new StatusHttp("Credenciales inválidas", 400);
  } 
  return jwt.sign({ id: userFound._id,  role: userFound.role });
}

async function loginCompany(email, password) {
  console.log(password)
  const companyFound = await Company.findOne({ email });
  
  const isValidPassword = await bcrypt.compare(password, companyFound.password);
  if (!isValidPassword || !companyFound) {
    throw new StatusHttp("Credenciales inválidas", 400);
  } 
  return jwt.sign({ id: companyFound._id,  role: companyFound.role });
}

export { loginUser, loginCompany };
