import { StatusHttp } from "../libs/statusHttp.js";
import { Event } from "../models/events.model.js";
import { Company } from "../models/companies.models.js";

async function create(newEvent, company) {
  //nombre duplicado y compañia
  const companyFound = await Company.findById(company);
  if (!companyFound) throw new StatusHttp("No existe esta compañia", 404);
  const event = await Event.create({ ...newDiscount, company: company }); 
  if (!event) throw new StatusHttp("An error ocurred", 400);
  return  event
}

async function update(idEvent, newData, company) {
  // cómo validar si es de una compañía
  const eventFound = await Event.findById(idEvent).populate("company");
  if (!eventFound) throw new StatusHttp("No existe este evento", 404);
  if(eventFound.company._id === company){
    return await Event.findByIdAndUpdate(idEvent, newData);
  } else {
    throw new StatusHttp("No puedes actualizar un descuento que no te pertenece");
  }
}

async function deleteById(idEvent, company) {
  //vincular a company
  const eventFound = await Event.findById(idEvent).populate("company");

  if (eventFound.company._id == company){
     return await Event.findByIdAndDelete({ _id: idEvent });
  } else{
    throw new StatusHttp("No existe este evento", 404);
  }
 
}

async function getById(idEvent) {
  //INSERT POPULATE HERE
  return await Event.findById(idEvent).populate("company attendance");
}

async function getEventsByCompany(idEvent) {
  //INSERT POPULATE HERE
  return await Event.findById(idEvent).populate("company attendance");
}

async function getAll() {
  return await Event.find({}).populate("company attendance"); // Regresa una promesa //INSERT POPULATE HERE
}

async function getAllbyCompany() {
  return await Event.find({}).populate("company attendance"); // Regresa una promesa //INSERT POPULATE HERE
}

async function getAllByPage(page, limit) {
  //TBD numero de eventos por página
  return await Event.find().populate("company attendance")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
}

// Find; Sort: ordena forma descendente, por fecha de creación; Skip -> Saltar por límite de 10 Writers

export {
  create,
  update,
  deleteById,
  getById,
  getEventsByCompany,
  getAll,
  getAllByPage,
  getAllbyCompany,
};
