import express from "express";
import * as company from "../useCases/companies.use.js";
import { StatusHttp } from "../libs/statusHttp.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    let allCompanies = await company.getAll();
    response.json({
      success: true,
      data: {
        company: allCompanies,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});
router.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const companyByID = await company.getById(id);
    response.json({
      success: true,
      data: {
        company: companyByID,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { body: newCompanyData } = request;
    const newCompany = await company.create(newCompanyData);
    response.json({
      success: true,
      data: {
        company: newCompany,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete("/:id", auth, async (request, response, next) => {
  try {
    const { id } = request.params;
    const companyDelete = await company.deleteById(id);
    response.status(200).json({
      success: true,
      message: "company Deleted!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.patch("/:id", auth, async (request, response, next) => {
  try {
    const companyUpdated = request.body;
    const { id } = request.params;
    const updatedCompany = await company.updated(id, companyUpdated);
    response.json({
      success: true,
      message: "company Updated!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;
