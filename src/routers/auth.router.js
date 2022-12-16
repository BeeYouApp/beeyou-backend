import express from "express";
import * as authUseCases from "../useCases/auth.use.js";

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const auth = await authUseCases.login(email, password);
    response.json({
      success: true,
      token: auth.token,
      user: auth.user,
    });
  } catch (error) {
    response.status(400);
    next(error);
  }
});

export default router;
