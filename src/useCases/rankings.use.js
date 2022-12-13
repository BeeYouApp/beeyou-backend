import { Ranking } from "../models/rankings.model.js";
import { StatusHttp } from "../libs/statusHttp.js";

async function getByCompany(id) {
  const ranking = await Ranking.find({ company: id }).populate("user company");
  if (ranking == false) throw new StatusHttp("Rankings not found", 404);
  return ranking;
}

async function getByUser(id) {
  const ranking = await Ranking.find({ users: id }).populate("user company");
  if (!ranking) throw new StatusHttp("Rankings not found", 404);
  return ranking;
}

async function create(newComment, user, company) {
  const ranking = await Ranking.create({ ...newComment, user: user, company: company });
  if (!ranking) throw new StatusHttp("An error ocurred", 400);
  return ranking;
}

async function update(idRnking, updatedRankig, idUser) {
  const ranking = await Ranking.findOneAndUpdate(
    { _id: idRnking, user: idUser },
    updatedRankig,
    { new: true }
  );
  if (!ranking) throw new StatusHttp("Rankings not found", 404);
  return ranking;
}

async function deleteById(id, idUser) {
  const ranking = await Ranking.findOneAndDelete({ _id: id, user: idUser });
  if (!ranking) throw new StatusHttp("Comment not found", 404);
  return ranking;
}

async function deleteCompanyRanking(idCompany) {
  console.log(idCompany)
  const ranking = await Ranking.deleteMany({ company: idCompany });
  if (!ranking) throw new StatusHttp("Comment not found", 404);
  return ranking;
}

export {
  create,
  getByCompany,
  getByUser,
  update,
  deleteById,
  deleteCompanyRanking,
};