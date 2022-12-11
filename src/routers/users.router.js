import express from "express";
import * as userUseCases from "../useCases/users.use.js";
import { auth } from "../middlewares/auth.js";
import { StatusHttp } from "../libs/statusHttp.js";
import upload from "../middlewares/multer.js";
import {access} from "../middlewares/accessRole.js"

const router = express.Router();

// es necesario este endpoint?
router.get("/", auth, access("User"),  async (request, response, next) => {
  try {
    console.log("hola");
    let allUsers;
    const page = request.query.page;
    const limit = request.query.limit;
    if (page && limit) {
      allUsers = await userUseCases.getAllByPage(page, limit);
    } else {
      allUsers = await userUseCases.getAll();
    }
    response.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.get("/:id", auth, access("User"), async (request, response, next) => {
  try {
    const { id } = request.params;
    let user = await userUseCases.getById(id);
    if (!user) user = {};
    response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { body: newUser } = request;
    await userUseCases.create(newUser);

    response.json({
      success: true,
      message: "¡Usuario creado!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

// PATCH/users/:id
router.patch("/:id", auth, access("User"), upload.single("avatar"), async (request, response, next) => {
  try {
    const { id } = request.params;
    const { body } = request;
    await userUseCases.update(id, body);

    response.json({
      success: true,
      message: "¡User actualizado!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

// DELETE/users/:id
router.delete("/:id", auth, access("User"), async (request, response, next) => {
  try {
    const { id } = request.params;
    await userUseCases.deleteById(id);

    response.json({
      success: true,
      message: "¡User eliminado!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;
