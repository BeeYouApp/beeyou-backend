import express from "express";
import * as eventsUsesCases from "../useCases/events.use.js";
import * as company from "../useCases/companies.use.js";
import { auth } from "../middlewares/auth.js";
import { StatusHttp } from "../libs/statusHttp.js";
import upload from "../middlewares/multer.js";
import {access} from '../middlewares/accessRole.js'

const router = express.Router();

//actualizar para las referencias a la compañia
router.post("/", auth, access("company"),  upload.single("images"), async (request, response, next) => {
    try {
      const { body: newEvent, currentUser } = request;
      const newEventData = await eventsUsesCases.create(newEvent, currentUser);
      const pushEvent = await company.createEvent(
        newEventData.company,
        newEventData.id
      );
      response.json({
        success: true,
        message: "¡Evento creado!",
      });
    } catch (error) {
      next(new StatusHttp(error.message, error.status, error.name));
    }
  }
);

router.get("/", auth, access("user", "company"), async (request, response, next) => {
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

router.get("/:id", auth, access("user", "company"), async (request, response, next) => {
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

router.patch("/:id", auth, access("company"), async (request, response, next) => {
  try {
    const { id } = request.params;
    const { body, currentUser } = request;
    await eventsUsesCases.update(id, body, currentUser);

    response.json({
      success: true,
      message: "¡Evento actualizado!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete("/:id", auth, access("company"), async (request, response, next) => {
  try {
    const { id } = request.params;
    const { currentUser } = request;
    await eventsUsesCases.deleteById(id,currentUser);
    const companyUpdated = await company.deleteEvent(
      currentUser,
      id
  );
    response.json({
      success: true,
      message: "Evento eliminado",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;
