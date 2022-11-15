import express from "express";
import * as company from "../useCases/companies.use.js";
import * as discount from "../useCases/discounts.use.js";
import { auth } from "../middlewares/auth.js";
import { StatusHttp } from "../libs/statusHttp.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    let allDiscounts = await discount.getAll();
    response.json({
      success: true,
      data: {
        discounts: allDiscounts,
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
        discount: discountByID,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.post("/", auth, async (request, response, next) => {
  try {
    const { body: newDiscount, userCurrent } = request;
    console.log(userCurrent);
    const newDiscountData = await discount.create(newDiscount, userCurrent);
    const pushDiscount = await company.createDiscount(
      newDiscountData.company,
      newDiscountData.id
    );
    response.json({
      success: true,
      data: {
        discount: newDiscountData,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete("/:id", auth, async (request, response, next) => {
  try {
    const { id } = request.params;
    const { userCurrent } = request;
    await discount.deleteById(id, userCurrent);
    response.status(200).json({
      success: true,
      message: "dicount Deleted!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.patch("/:id", auth, async (request, response, next) => {
  try {
    const { body: discountUpdated, userCurrent } = request;
    const { id } = request.params;
    const updatedDiscount = await discount.updated(
      id,
      discountUpdated,
      userCurrent
    );
    response.json({
      success: true,
      message: "discount Updated!",
      data: updatedDiscount,
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;
