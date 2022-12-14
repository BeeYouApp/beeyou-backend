import express from "express";
import * as rankingUseCase from "../useCases/rankings.use.js";
import * as companyUseCase from "../useCases/companies.use.js";
import { auth } from "../middlewares/auth.js";
import { StatusHttp } from "../libs/statusHttp.js";
import {access} from '../middlewares/accessRole.js'

const router = express.Router();

router.get("/:id", auth, access("User", "Company"), async (request, response, next) => {
  try {
    const { id } = request.params;
    const allPostRankings = await rankingUseCase.getByCompany(id);
    response.json({
      success: true,
      rankings: allPostRankings
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});


//es necesario este endpoint?
router.get("/me", auth, access("User"), async (request, response, next) => {
  try {
    const { currentUser } = request;
    allRankings = await rankingUseCase.getByUser(currentUser);
    response.json({
      success: true,
      data: {
        ranking: allRankings,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.post("/:id", auth, access("User"),async (request, response, next) => {
  try {
    const { id } = request.params;
    const {body: newRankingData, currentUser} = request;
    const newRanking = await rankingUseCase.create(newRankingData, currentUser, id);
    const pushRanking = await companyUseCase.createRanking(
        id,
        newRanking.id
    );
    response.json({
      success: true,
      data: {
        ranking: newRanking,
      },
      company: {
        pushRanking: pushRanking,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.patch("/:id", auth, access("User"),async (request, response, next) => {
  try {
    const {body: rankingUpdated, currentUser} = request;
    const { id } = request.params;
    const updatedRanking = await rankingUseCase.update(id, currentUser, rankingUpdated);
    response.json({
      success: true,
      data: {
        ranking: updatedRanking,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete("/:id", auth, access("User"),async (request, response, next) => {
  try {
    const { id } = request.params;
    const { currentUser } = request;
    const rankingDeleted = await rankingUseCase.deleteById(id, currentUser);
    const companyUpdated = await companyUseCase.deleteRanking(
        currentUser,
        id
    );
    response.json({
      success: true,
      data: {
        comment: rankingDeleted,
      },
      ranking: companyUpdated
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;