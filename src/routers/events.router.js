import express from "express";
import * as eventsUsesCases from "../useCases/events.use.js";
import { auth } from "../middlewares/auth.js";
import { StatusHttp } from "../libs/handleError.js";

const router = express.Router();
// La comunicación de fuera hacia dentro
// Endpoint -> Casos de uso -> Modelos

router.post("/", auth, async (request, response, next) => {
  try {
    const { body: newEvent } = request;
    await eventsUsesCases.create(newEvent);

    response.json({
      success: true,
      message: "¡Evento creado!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.get("/", async (request, response, next) => {
  try {
    let allEvents;
    const page = request.query.page;
    const limit = request.query.limit;
    if (page && limit) {
      // console.log("1");
      allEvents = await eventsUsesCases.getAllByPage(page, limit);
    } else {
      // console.log("2");
      allEvents = await eventsUsesCases.getAll();
    }
    response.json({
      success: true,
      data: allEvents,
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.get("/:id", auth, async (request, response, next) => {
  try {
    const { id } = request.params;
    let event = await eventsUsesCases.getById(id);
    if (!event) event = {};

    response.json({
      success: true,
      data: writer,
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.patch("/:id", auth, async (request, response, next) => {
  try {
    const { id } = request.params;
    const { body } = request;
    await eventsUsesCases.update(id, body);

    response.json({
      success: true,
      message: "¡Evento actualizado!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete("/:id", auth, async (request, response, next) => {
  try {
    const { id } = request.params;
    await eventsUsesCases.deleteById(id);

    response.json({
      success: true,
      message: "Evento eliminado",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;