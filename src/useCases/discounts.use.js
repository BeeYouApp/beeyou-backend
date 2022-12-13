import { Discounts } from "../models/discounts.model.js";
import { StatusHttp } from "../libs/statusHttp.js";
import { Company } from "../models/companies.models.js";

async function getAll() {
  return await Discounts.find({}).populate("company");
}

async function getById(id) {
  const discountFind = await Discounts.findById(id).populate("company");
  if (discountFind) {
    return discountFind;
  } else {
    throw new StatusHttp("Descuento no encontrado");
  }
}

async function deleteById(id, company) {
  const discount = await Discounts.findById(id).populate("company");
  if (discount.company._id == company) {
    return await Discounts.findByIdAndDelete(id);
  } else {
    throw new StatusHttp("No puedes eliminar un descuento que no te pertenece");
  }
}

async function create(newDiscount, company) {
  const companyFound = await Company.findById(company);

  if (!companyFound) throw new StatusHttp("No existe esta compañia", 404);
  const discount = await Discounts.create({ ...newDiscount, company: company }); 
  if (!discount) throw new StatusHttp("An error ocurred", 400);
  return  discount
}

async function updated(idDiscount, updatedCompany, company) {
  const discount = await Discounts.findById(idDiscount).populate("company");
  if (discount.company._id == company) {
    return await Discounts.findByIdAndUpdate(idDiscount, updatedCompany);
  } else {
    throw new StatusHttp(
      "No puedes actualizar un descuento que no te pertenece"
    );
  }
}

async function deleteCompanyDiscount(idCompany){
  const discount = await Rankig.deleteMany({ company: idCompany });
  if (!discount) throw new StatusHttp("Comment not found", 404);
  return discount;
}

export { getAll, getById, deleteById, updated, create, deleteCompanyDiscount };
