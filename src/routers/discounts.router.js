import express from "express";
import * as discount from "../useCases/disounts.use.js";
import { auth } from "../middlewares/auth.js";
import { StatusHttp } from "../libs/statusHttp.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    let allDiscounts = await discount.getAll();
    response.json({
      success: true,
      data: {
        company: allDiscounts,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});
router.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const discountByID = await discount.getById(id);
    response.json({
      success: true,
      data: {
        company: discountByID,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.post("/", auth, async (request, response, next) => {
  try {
    const { body: newDiscount, userCurrent } = request;
    const newDiscountData = await discount.create(newDiscount, userCurrent);
    response.json({
      success: true,
      data: {
        company: newDiscountData,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    await discount.deleteById(id);
    response.status(200).json({
      success: true,
      message: "dicount Deleted!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.patch("/:id", async (request, response, next) => {
  try {
    const discountUpdated = request.body;
    const { id } = request.params;
    const updatedDiscount = await discount.updated(id, discountUpdated);
    response.json({
      success: true,
      message: "company Updated!",
      data: updatedDiscount,
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;
