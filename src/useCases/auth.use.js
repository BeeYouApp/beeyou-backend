import { User } from "../models/users.model.js";
import { Company } from "../models/companies.models.js";
import bcrypt from "../libs/bcrypt.js";
import jwt from "../libs/jwt.js";
import { StatusHttp } from "../libs/statusHttp.js";

async function loginUser(email, password) {
  const userFound = await User.findOne({ email });
  if(!userFound) throw new StatusHttp("Este usuario no se encuentra registrado", 400);
  const isValidPassword = await bcrypt.compare(password, userFound.password);
  if (!isValidPassword) throw new StatusHttp("Credenciales inválidas", 400);
  return jwt.sign({ id: userFound._id,  role: userFound.role });
}

async function loginCompany(email, password) {
  const companyFound = await Company.findOne({ email });
  if (!companyFound) throw new StatusHttp("Este usuario no se encuentra registrado", 400);
  const isValidPassword = await bcrypt.compare(password, companyFound.password);
  if(!isValidPassword) throw new StatusHttp("Credenciales inválidas, revisa tu password", 400);
  return jwt.sign({ id: companyFound._id,  role: companyFound.role });
}

export { loginUser, loginCompany };
