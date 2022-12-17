import express from "express";
import * as company from "../useCases/companies.use.js";
import { StatusHttp } from "../libs/statusHttp.js";
import { auth } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { access } from "../middlewares/accessRole.js";
import * as authUseCases from "../useCases/auth.use.js";

const router = express.Router();

router.get("/", auth, access("user"), async (request, response, next) => {
  try {
    const allCompanies = await company.getAll();
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
router.get(
  "/:id",
  auth,
  access("user", "company"),
  async (request, response, next) => {
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
  }
);

router.post("/", async (request, response, next) => {
  try {
    const { body: newCompanyData } = request;
    await company.create(newCompanyData);
    const auth = await authUseCases.login(
      newCompanyData.email,
      newCompanyData.password
    );
    response.json({
      success: true,
      company: "Negocio creado",
      user: auth.user,
      token: auth.token,
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete(
  "/:id",
  auth,
  access("company"),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const { currentUser } = request;
      const companyDelete = await company.deleteById(id, currentUser);
      response.status(200).json({
        success: true,
        message: "company Deleted!",
      });
    } catch (error) {
      next(new StatusHttp(error.message, error.status, error.name));
    }
  }
);

router.patch(
  "/:id",
  auth,
  access("company"),
  upload.single("image"),
  async (request, response, next) => {
    try {
      const { body: companyUpdated, file } = request;
      const { id } = request.params;
      await company.updated(id, companyUpdated, file);
      const company = await company.getById(id);
      response.json({
        success: true,
        message: "company Updated!",
        user: company,
      });
    } catch (error) {
      next(new StatusHttp(error.message, error.status, error.name));
    }
  }
);

export default router;
