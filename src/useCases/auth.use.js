import { User } from "../models/user.model.js";
import { Company } from "../models/companies.models.js";
import bcrypt from "../libs/bcrypt.js";
import jwt from "../libs/jwt.js";
import { StatusHttp } from "../libs/statusHttp.js";

async function login(email, password) {
  //   const userFound = await User.findOne({ email });
  const companyFound = await Company.findOne({ email });
  //   const isValidPasswordUser = await bcrypt.compare(
  //     password,
  //     userFound.password
  //   );
  const isValidPassword = await bcrypt.compare(password, companyFound.password);
  if (companyFound && isValidPassword) {
    return jwt.sign({ id: companyFound._id });
  }
  //   else if (userFound && isValidPasswordUser) {
  //     return jwt.sign({ id: userFound._id });
  //   }
  else if (!isValidPassword || !companyFound) {
    throw new StatusHttp("Credenciales inválidas", 400);
  }
  //   else if (!isValidPasswordUser || !userFound) {
  //     throw new StatusHttp("Credenciales inválidas", 400);
  //   }
}

export { login };
