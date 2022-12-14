import express from "express";
import * as company from "../useCases/companies.use.js";
import * as discount from "../useCases/discounts.use.js";
import { auth } from "../middlewares/auth.js";
import { StatusHttp } from "../libs/statusHttp.js";
import upload from "../middlewares/multer.js";
import {access} from '../middlewares/accessRole.js'

const router = express.Router();

router.get("/", auth, access("User", "Company"), async (request, response, next) => {
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
router.get("/:id", auth, access("User", "Company"), async (request, response, next) => {
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

router.post("/", auth, access("Company"), upload.single("images"), async (request, response, next) => {
    try {
      const { body: newDiscount, currentUser } = request;
      const newDiscountData = await discount.create(newDiscount, currentUser);
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
  }
);

router.patch("/:id", auth, access("Company"), async (request, response, next) => {
  try {
    const { body: discountUpdated, currentUser } = request;
    const { id } = request.params;
    const updatedDiscount = await discount.updated(
      id,
      discountUpdated,
      currentUser
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

router.delete("/:id", auth, access("Company"),  async (request, response, next) => {
  try {
    const { id } = request.params;
    const { currentUser } = request;
    await discount.deleteById(id, currentUser);
    const pushDiscount = await company.deleteDiscount(
      currentUser, id);
    response.status(200).json({
      success: true,
      message: "discount Deleted!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});


export default router;
