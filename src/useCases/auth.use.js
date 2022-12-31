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

  let token;
  if (userFound.role === "company") {
    const isValidation = await userFound.isVerified;
    if (!isValidation)
      throw new StatusHttp("Este usuario no esta verificado", 400);
    token = jwt.sign({
      id: userFound._id,
      role: userFound.role,
      isVerified: userFound.isVerified,
    });
  } else {
    token = jwt.sign({ id: userFound._id, role: userFound.role });
  }
  return { token: token, user: userFound };
}

async function register(email, password) {
  const userFound =
    (await User.findOne({ email })) || (await Company.findOne({ email }));
  if (!userFound)
    throw new StatusHttp("Este usuario no se encuentra registrado", 400);
  const isValidPassword = await bcrypt.compare(password, userFound.password);
  if (!isValidPassword) throw new StatusHttp("Credenciales inválidas", 400);
  let token;
  if (userFound.role === "company") {
    const isValidation = await userFound.isVerified;
    token = jwt.sign({
      id: userFound._id,
      role: userFound.role,
      isVerified: isValidation,
    });
  } else {
    token = jwt.sign({ id: userFound._id, role: userFound.role });
  }
  return { token: token, user: userFound };
}

export { login, register };
