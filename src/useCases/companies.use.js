import { Company } from "../models/companies.models.js";
import bcrypt from "../libs/bcrypt.js";
import { StatusHttp } from "../libs/statusHttp.js";

async function create(newCompany) {
  const { email, password } = newCompany;
  const companyFound = await Company.findOne({ email });
  if (companyFound) throw new StatusHttp("Ya existe un Writer con este email");
  const encryptedPassword = await bcrypt.hash(password);
  return Company.create({ ...newCompany, password: encryptedPassword });
}
//manejar errores
async function getAll() {
  return Company.find({}).populate("discounts ranking events");
}

//manejar errores
async function getById(id) {
  return Company.findById(id).populate("discounts ranking events");
}

async function deleteById(id, idCompany) {
  const companyFound = await Company.findById(id).populate("discounts ranking");
  if(!companyFound) throw new StatusHttp("Compañia no encontrada");
  if (companyFound._id == idCompany) {
    return await Discounts.findByIdAndDelete(id);
  } else {
    throw new StatusHttp("No puedes eliminar un descuento que no te pertenece");
  }
}

async function update(idUser, newData, file) {
  
}
//manejar errores
async function updated(idCompany, updatedCompany, file) {
  const { password } = updatedCompany;
  if (password) {
    const encryptedPassword = await bcrypt.hash(password);
    if(file){
      const user = await Company.findById(idCompany);
      if (user.image && user.keyImage) {
      s3.deleteObject({
        Key: user.keyImage,
        Bucket: process.env.AWS_BUCKET_NAME
      }).promise();
    }
      const { location, key } = file;
      const companyToSave = { ...updatedCompany, avatar: location, keyAvatar: key };
      return await Company.findByIdAndUpdate(idCompany, {...companyToSave, password: encryptedPassword,});
    }else{
      return await Company.findByIdAndUpdate(idCompany, {...updatedCompany, password: encryptedPassword,});
    }
  } else {
    if(file){
      const user = await Company.findById(idCompany);
      if (user.avatar && user.keyAvatar) {
      s3.deleteObject({
        Key: user.keyAvatar,
        Bucket: process.env.AWS_BUCKET_NAME
      }).promise();
    }
      const { location, key } = file;
      const companyToSave = { ...newData, avatar: location, keyAvatar: key };
      return await Company.findByIdAndUpdate(idCompany, companyToSave);
    }else{
      return await Company.findByIdAndUpdate(idCompany, updatedCompany);
    }
  }
}

//manejar errores
async function createDiscount(company, idDiscount) {
  const data = await Company.findByIdAndUpdate(
    company,
    { $push: { discounts: idDiscount } },
    { new: true }
  );
  if (!data) throw new StatusHttp("An error ocurred", 404);
  return data;
}

//manejar errores
async function deleteDiscount(company, idDiscount) {
  const data = await Company.findByIdAndUpdate(
    company,
    { $pull: { discounts: idDiscount } },
    { new: true }
  );
  return data;
}

//manejar errores
async function createRanking(company, idRanking) {
  const data = await Company.findByIdAndUpdate(
    company,
    { $push: { ranking: idRanking } },
    { new: true }
  );
  if (!data) throw new StatusHttp("An error ocurred", 404);
  return data;
}
//manejar errores poblar compania con ranking y validar que exista el ranking y la compañia
async function deleteRanking(idCompany, idRanking) {
  const data = await Company.findByIdAndUpdate(
    idCompany,
    { $pull: { ranking: idRanking } },
    { new: true }
  );
  return data;
}

//manejar errores
async function createEvent(company, idRanking) {
  const data = await Company.findByIdAndUpdate(
    company,
    { $push: { ranking: idRanking } },
    { new: true }
  );
  if (!data) throw new StatusHttp("An error ocurred", 404);
  return data;
}
//manejar errores poblar compania con ranking y validar que exista el ranking y la compañia
async function deleteEvent(idCompany, idEvent) {
  const data = await Company.findByIdAndUpdate(
    idCompany,
    { $pull: { events: idEvent } },
    { new: true }
  );
  return data;
}


export { create, getAll, getById, deleteById, updated, createDiscount, deleteDiscount,
createRanking, deleteRanking, deleteEvent, createEvent};
