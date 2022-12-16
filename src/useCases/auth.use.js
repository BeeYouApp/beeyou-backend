import { User } from "../models/users.model.js";
import { Company } from "../models/companies.models.js";
import bcrypt from "../libs/bcrypt.js";
import jwt from "../libs/jwt.js";
import { StatusHttp } from "../libs/statusHttp.js";

async function login(email, password) {
  const userFound =
    (await User.findOne({ email })) || (await Company.findOne({ email }));
  if (!userFound)
    throw new StatusHttp("Este usuario no se encuentra registrado", 400);
  const isValidPassword = await bcrypt.compare(password, userFound.password);
  if (!isValidPassword) throw new StatusHttp("Credenciales inválidas", 400);
  const token = jwt.sign({ id: user, role: type });
  return { token: token, user: userFound };
}

export { login };
